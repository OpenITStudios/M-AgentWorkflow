#!/usr/bin/env node
// Offline policy preview only. No model calls, files changed, or orchestration.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname, join } from "node:path";
import { recommendRoute } from "../src/policy/route-advice.mjs";
import { mapToNativeEngine } from "../src/integrations/native-engine-map.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (process.argv.length !== 3) {
  process.stderr.write("Usage: node scripts/route-preview.mjs TASK_JSON_PATH\n");
  process.exitCode = 2;
} else {
  try {
    const [task, policy] = await Promise.all([
      readFile(resolve(process.argv[2]), "utf8").then(JSON.parse),
      readFile(join(root, "config/routing-policy.example.json"), "utf8").then(JSON.parse)
    ]);
    // No untrusted user flags can promote local runtime readiness in this preview.
    const advice = recommendRoute(task, {}, policy);
    process.stdout.write(JSON.stringify({ ...advice, nativeBinding: mapToNativeEngine(advice) }, null, 2) + "\n");
    if (advice.status === "BLOCKED") process.exitCode = 1;
  } catch (error) {
    process.stderr.write("Route preview failed: invalid or unreadable JSON input.\n");
    process.exitCode = 2;
  }
}
