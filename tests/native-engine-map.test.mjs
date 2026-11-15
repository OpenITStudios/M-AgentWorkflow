// Authored source fixture, NOT EXECUTED while PC-local tests remain on hold.
import test from "node:test";
import assert from "node:assert/strict";
import { mapToNativeEngine } from "../src/integrations/native-engine-map.mjs";

const proposed = route => ({
  status: "PROPOSED", mode: "ADVISORY_ONLY", route,
  execution: "NOT_EXECUTED", permissionsGranted: false
});

test("Codex route maps to the native driver without executing", () => {
  const r = mapToNativeEngine(proposed("CODEX"));
  assert.equal(r.native.driverKind, "codex");
  assert.equal(r.runtimeVerified, false);
  assert.equal(r.permissionsGranted, false);
});
test("Hermes uses built-in Hermes ACP, not a custom ACP wrapper", () => {
  const r = mapToNativeEngine(proposed("HERMES_ACP"));
  assert.equal(r.native.driverKind, "hermesAgent");
  assert.deepEqual(r.native.defaultArgs, ["acp"]);
  assert.ok(r.requiredChecks.includes("no_unapproved_shell_file_or_code_execution"));
});
test("Ollama is model discovery, not an invented native driver", () => {
  const r = mapToNativeEngine(proposed("OLLAMA_DIRECT"));
  assert.equal(r.native.driverKind, null);
  assert.equal(r.native.model, "ifm/k2-horizon:7b-q4_K_M");
});
test("blocked and forged privileged advice fail closed", () => {
  assert.equal(mapToNativeEngine({...proposed("HERMES_ACP"), status:"BLOCKED"}).status,"BLOCKED");
  assert.equal(mapToNativeEngine({...proposed("CODEX"),permissionsGranted:true}).status,"BLOCKED");
  assert.equal(mapToNativeEngine({...proposed("CODEX"),execution:"LOCAL_PC_PASS"}).status,"BLOCKED");
  assert.equal(mapToNativeEngine(proposed("unknown")).status,"BLOCKED");
  assert.equal(mapToNativeEngine(null).status,"BLOCKED");
});
test("deterministic task does not fabricate a provider process", () => {
  const r = mapToNativeEngine(proposed("DETERMINISTIC_TOOL"));
  assert.equal(r.native,null);
  assert.equal(r.status,"PLAN_ONLY");
});
