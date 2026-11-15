/**
 * Source-reviewed upstream binding map, NOT a native runtime adapter.
 * No process spawn, file writes, API calls, auth, automatic engine selection
 * or task scheduling. OpenMausBot remains the task/approval owner.
 * OpenMausBot native driver identities verified at v0.1.153 (6f226f1).
 */
const DRIVER_PINS = Object.freeze({
  openmausbotTag: "v0.1.153",
  openmausbotCommit: "6f226f15def56c697626f2ed6dffac416510c79a",
  codex: "codex",
  hermes: "hermesAgent"
});
const VALID_ROUTES = new Set([
  "CODEX", "OLLAMA_DIRECT", "HERMES_ACP", "DETERMINISTIC_TOOL", "NONE"
]);

function stopped(reason) {
  return {
    status: "BLOCKED",
    reason,
    native: null,
    execution: "NOT_EXECUTED",
    runtimeVerified: false,
    permissionsGranted: false
  };
}

/**
 * Accept only the output of a source-level route advisor in its unprivileged
 * shape. This is NOT authentication: a malicious caller can forge this object
 * but can never gain access through this function, because it has no effects.
 */
export function mapToNativeEngine(advice) {
  if (!advice || typeof advice !== "object" || Array.isArray(advice) ||
      advice.mode !== "ADVISORY_ONLY" || advice.execution !== "NOT_EXECUTED" ||
      advice.permissionsGranted !== false ||
      !VALID_ROUTES.has(advice.route) ||
      !["PROPOSED", "BLOCKED"].includes(advice.status)) {
    return stopped("UNTRUSTED_OR_INVALID_ROUTE_ADVICE");
  }
  if (advice.status === "BLOCKED" || advice.route === "NONE") {
    return stopped("ROUTING_GATE_BLOCKED");
  }
  const base = {
    status: "PLAN_ONLY",
    upstream: {
      repository: "milind-soni/OpenMausBot",
      tag: DRIVER_PINS.openmausbotTag,
      commit: DRIVER_PINS.openmausbotCommit
    },
    execution: "NOT_EXECUTED",
    runtimeVerified: false,
    permissionsGranted: false,
    requiredChecks: [
      "installed_upstream_version_and_driver",
      "bot_and_thread_approval_is_not_full_access",
      "host_enforced_scope_and_permissions",
      "task_and_source_sha_review",
      "native_status_and_evidence_receipts"
    ]
  };

  switch (advice.route) {
    case "CODEX":
      return {
        ...base,
        native: {
          engine: "OpenMausBot built-in Codex",
          driverKind: DRIVER_PINS.codex,
          modelSelection: "use authenticated Codex account and advertised model catalog"
        },
        requiredChecks: [...base.requiredChecks, "codex_account_and_sandbox_confirmed"]
      };
    case "OLLAMA_DIRECT":
      return {
        ...base,
        native: {
          engine: "OpenMausBot local Ollama model discovery",
          driverKind: null,
          model: "ifm/k2-horizon:7b-q4_K_M",
          modelSelection: "select exact installed Ollama model; no agent tool access"
        },
        requiredChecks: [
          ...base.requiredChecks,
          "model_hash_and_gpu_context_verified",
          "native_tool_surface_disabled_or_operation_blocked",
          "local_only_data_never_sent_to_cloud"
        ]
      };
    case "HERMES_ACP":
      return {
        ...base,
        native: {
          engine: "OpenMausBot built-in Hermes ACP",
          driverKind: DRIVER_PINS.hermes,
          defaultCommand: "hermes",
          defaultArgs: ["acp"],
          modelSelection: "Hermes own local config; verify native model picker",
          toolPolicy: "deny all unsafe tools until actual host-enforced allowlist verified"
        },
        requiredChecks: [
          ...base.requiredChecks,
          "hermes_acp_check_and_session_handshake",
          "hermes_effective_toolsets_and_mcp_inventory",
          "no_unapproved_shell_file_or_code_execution",
          "64k_context_and_multistep_tool_receipts",
          "cancellation_permission_denial_and_fallback"
        ]
      };
    case "DETERMINISTIC_TOOL":
      return {
        ...base,
        native: null,
        handoff: "reviewed local script/CLI; not an OpenMausBot agent engine",
        requiredChecks: [
          ...base.requiredChecks,
          "reviewed_script_identity_and_permissions",
          "command_receipts_if_future_execution"
        ]
      };
    default:
      return stopped("UNKNOWN_ROUTE");
  }
}
