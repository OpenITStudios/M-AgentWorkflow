// AUTHORED, NOT EXECUTED: PC-local validation is on hold.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { recommendRoute } from "../src/policy/route-advice.mjs";

const policy = JSON.parse(await readFile(
  new URL("../config/routing-policy.example.json", import.meta.url), "utf8"
));
const task = JSON.parse(await readFile(
  new URL("../examples/task.readonly.example.json", import.meta.url), "utf8"
));
const ready = {
  pcHostVerified: true, localInferenceVerified: true,
  gpuBudgetVerified: true, hermesAcpVerified: true,
  toolLoopVerified: true, contextTokens: 64000
};
const variant = (overrides = {}) => ({ ...task, ...overrides });

test("default code inspection is advisory Codex, never executed", () => {
  const x = recommendRoute(task, {}, policy);
  assert.equal(x.route, "CODEX");
  assert.equal(x.status, "PROPOSED");
  assert.equal(x.execution, "NOT_EXECUTED");
  assert.equal(x.permissionsGranted, false);
});
test("policy cannot execute or select unverified K2", () => {
  const x = recommendRoute(variant({kind:"utility_text"}), ready, policy);
  assert.equal(x.route, "CODEX"); // local disabled even if caller claims readiness
});
test("local only data cannot fall back to cloud", () => {
  const x = recommendRoute(variant({kind:"utility_text",dataBoundary:"local_only"}), {}, policy);
  assert.equal(x.status, "BLOCKED");
  assert.equal(x.route, "NONE");
});
test("enabled local still requires all resource gates", () => {
  const p = {...policy,local:{...policy.local,directEnabled:true}};
  const x = recommendRoute(variant({kind:"utility_text",dataBoundary:"local_only"}), {}, p);
  assert.equal(x.route, "NONE");
});
test("direct local only suggests a bounded non-tool route", () => {
  const p = {...policy,local:{...policy.local,directEnabled:true}};
  const x = recommendRoute(variant({kind:"utility_text",dataBoundary:"local_only"}), ready, p);
  assert.equal(x.route, "OLLAMA_DIRECT");
  assert.equal(x.permissionsGranted, false);
});
test("Hermes requires ACP, tool loop and configured context", () => {
  const p = {...policy,local:{...policy.local,hermesEnabled:true}};
  const t = variant({kind:"local_tool",dataBoundary:"local_only"});
  assert.equal(recommendRoute(t,{...ready,contextTokens:32000},p).route,"NONE");
  assert.equal(recommendRoute(t,ready,p).route,"HERMES_ACP");
});
test("oversize local input is held when cloud forbidden", () => {
  const p = {...policy,local:{...policy.local,directEnabled:true}};
  assert.equal(recommendRoute(variant({
    kind:"utility_text",dataBoundary:"local_only",estimatedInputTokens:8000
  }),ready,p).status,"BLOCKED");
});
test("unauthorized write cannot be routed", () => {
  assert.equal(recommendRoute(variant({
    kind:"code_change",requestedWrite:true
  }),{},policy).route,"NONE");
});
test("approved write still only proposes a Codex route", () => {
  const x = recommendRoute(variant({
    kind:"code_change",requestedWrite:true,writeApproved:true,isolatedWorktree:true
  }),{},policy);
  assert.equal(x.route,"CODEX");
  assert.equal(x.permissionsGranted,false);
});
test("delegation depth is bounded", () => {
  assert.equal(recommendRoute(variant({delegationDepth:2}),{},policy).route,"NONE");
});
test("missing acceptance criteria fails closed", () => {
  assert.equal(recommendRoute(variant({acceptanceCriteria:[]}),{},policy).route,"NONE");
});
test("unknown source or unsafe path fails closed", () => {
  assert.equal(recommendRoute(variant({source:{...task.source,head:"unknown"}}),{},policy).route,"NONE");
  assert.equal(recommendRoute(variant({scopePaths:["../secrets"]}),{},policy).route,"NONE");
});
test("forced local engineering is not allowed", () => {
  assert.equal(recommendRoute(variant({forceLocal:true}),{},policy).route,"NONE");
});
test("deterministic tasks never launch a tool from advice", () => {
  const x = recommendRoute(variant({kind:"deterministic",dataBoundary:"local_only"}),{},policy);
  assert.equal(x.route,"DETERMINISTIC_TOOL");
  assert.equal(x.execution,"NOT_EXECUTED");
});
