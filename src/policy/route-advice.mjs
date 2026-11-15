/**
 * Stateless policy advice only. It never executes a model, grants permissions,
 * starts a worker, writes a task queue, or approves a Git operation.
 * OpenMausBot remains the only task/approval owner. Every output is PROPOSED
 * or BLOCKED, never a runtime receipt.
 */
const KINDS = new Set([
  "architecture", "repo_inspection", "code_change", "qa_review",
  "utility_text", "local_tool", "deterministic"
]);
const BOUNDARIES = new Set(["cloud_allowed", "local_only"]);
const RISKS = new Set(["low", "elevated"]);
const SHA = /^[0-9a-f]{40}$/;
const REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);

function result(status, route, reasons = [], checks = []) {
  return Object.freeze({
    mode: "ADVISORY_ONLY",
    status,
    route,
    reasons,
    requiredHostChecks: checks,
    execution: "NOT_EXECUTED",
    permissionsGranted: false
  });
}
const blocked = (...reasons) => result("BLOCKED", "NONE", reasons);

function validPath(path) {
  return typeof path === "string" && path.length > 0 &&
    !path.startsWith("/") && !path.includes("\\") &&
    path.split("/").filter(Boolean).every(part => part !== "." && part !== "..") &&
    !/^[A-Za-z]:/.test(path);
}

function validPolicy(policy) {
  return isRecord(policy) && policy.schemaVersion === 1 &&
    policy.mode === "ADVISORY_ONLY" && policy.defaultEngine === "CODEX" &&
    isRecord(policy.local) && typeof policy.local.directEnabled === "boolean" &&
    typeof policy.local.hermesEnabled === "boolean" &&
    Number.isSafeInteger(policy.local.maxEstimatedInputTokens) &&
    policy.local.maxEstimatedInputTokens > 0 &&
    Number.isSafeInteger(policy.local.minHermesContextTokens) &&
    policy.local.minHermesContextTokens >= 16000 &&
    policy.local.maxConcurrentWorkers === 1 &&
    isRecord(policy.limits) && policy.limits.maxDelegationDepth === 1;
}

function validTask(t) {
  if (!isRecord(t) || t.schemaVersion !== 1 || typeof t.taskId !== "string" ||
      !/^[A-Za-z0-9_.-]{4,100}$/.test(t.taskId) ||
      !KINDS.has(t.kind) || !Array.isArray(t.acceptanceCriteria) ||
      t.acceptanceCriteria.length < 1 || t.acceptanceCriteria.length > 12 ||
      !t.acceptanceCriteria.every(c => typeof c === "string" && c.trim().length >= 5 && c.length <= 500) ||
      typeof t.objective !== "string" ||
      t.objective.trim().length < 5 || t.objective.length > 2000 ||
      !isRecord(t.source) || !REPO.test(t.source.repository) ||
      typeof t.source.branch !== "string" || !/^[A-Za-z0-9_.\/-]+$/.test(t.source.branch) ||
      !SHA.test(t.source.head) || !Array.isArray(t.scopePaths) ||
      t.scopePaths.length < 1 || t.scopePaths.length > 20 ||
      !t.scopePaths.every(validPath) ||
      !BOUNDARIES.has(t.dataBoundary) || !RISKS.has(t.risk) ||
      !Number.isSafeInteger(t.delegationDepth) || t.delegationDepth < 0 ||
      !Number.isSafeInteger(t.estimatedInputTokens) ||
      t.estimatedInputTokens < 0 || t.estimatedInputTokens > 2000000 ||
      typeof t.requestedWrite !== "boolean" ||
      typeof t.writeApproved !== "boolean" ||
      typeof t.isolatedWorktree !== "boolean" ||
      typeof t.forceLocal !== "boolean") return false;
  return true;
}

/**
 * Readiness is advisory metadata. A caller's true flags are NOT authentic
 * proof of PC execution or permission. The eventual host adapter must verify
 * evidence, scopes, and approvals independently before it performs any action.
 */
export function recommendRoute(task, readiness = {}, policy = {}) {
  if (!validPolicy(policy)) return blocked("INVALID_POLICY");
  if (!validTask(task)) return blocked("INVALID_TASK_CONTRACT");
  if (!isRecord(readiness)) return blocked("INVALID_READINESS");
  if (task.delegationDepth > policy.limits.maxDelegationDepth)
    return blocked("DELEGATION_DEPTH_EXCEEDED");
  if (task.requestedWrite &&
      (task.kind !== "code_change" || !task.writeApproved || !task.isolatedWorktree))
    return blocked("WRITE_SCOPE_OR_APPROVAL_MISSING");
  if (task.kind === "code_change" && !task.requestedWrite)
    return blocked("CODE_CHANGE_REQUIRES_APPROVED_WRITE");
  if (task.forceLocal && !["utility_text", "local_tool", "deterministic"].includes(task.kind))
    return blocked("FORCED_LOCAL_NOT_SUPPORTED_FOR_ENGINEERING");

  const sourceCheck = ["exact_repo_branch_and_head", "target_repo_policy", "host_permission_gate"];
  const codex = (...reasons) => task.dataBoundary === "local_only"
    ? blocked("CLOUD_ROUTE_FORBIDDEN_BY_DATA_BOUNDARY", ...reasons)
    : result("PROPOSED", "CODEX", reasons, [
        ...sourceCheck, "authenticated_codex_host", "owner_approval_if_mutating",
        "evidence_receipts"
      ]);

  if (task.kind === "deterministic") {
    return result("PROPOSED", "DETERMINISTIC_TOOL", [], [
      ...sourceCheck, "approved_script_identity", "no_unapproved_side_effects",
      "command_receipt_if_executed"
    ]);
  }
  if (["architecture", "repo_inspection", "code_change", "qa_review"].includes(task.kind))
    return codex();

  const inputSmallEnough =
    task.estimatedInputTokens <= policy.local.maxEstimatedInputTokens;
  const localBaseReady = readiness.pcHostVerified === true &&
    readiness.localInferenceVerified === true &&
    readiness.gpuBudgetVerified === true && inputSmallEnough &&
    task.risk === "low" && !task.requestedWrite;

  if (task.kind === "utility_text") {
    if (policy.local.directEnabled && localBaseReady)
      return result("PROPOSED", "OLLAMA_DIRECT", [], [
        ...sourceCheck, "local_model_identity", "bounded_input",
        "result_evidence_review", "max_one_local_worker"
      ]);
    if (task.forceLocal || task.dataBoundary === "local_only")
      return blocked("LOCAL_DIRECT_NOT_READY");
    return codex("LOCAL_DIRECT_NOT_READY");
  }

  if (task.kind === "local_tool") {
    const hermesReady = policy.local.hermesEnabled && localBaseReady &&
      readiness.hermesAcpVerified === true &&
      readiness.toolLoopVerified === true &&
      Number.isSafeInteger(readiness.contextTokens) &&
      readiness.contextTokens >= policy.local.minHermesContextTokens;
    if (hermesReady)
      return result("PROPOSED", "HERMES_ACP", [], [
        ...sourceCheck, "approved_hermes_tool_allowlist",
        "verified_acp_capabilities", "host_enforced_approval",
        "tool_loop_receipts", "max_one_local_worker"
      ]);
    if (task.forceLocal || task.dataBoundary === "local_only")
      return blocked("HERMES_TOOL_LOOP_NOT_READY");
    return codex("HERMES_TOOL_LOOP_NOT_READY");
  }
  return blocked("NO_SUPPORTED_ROUTE");
}
