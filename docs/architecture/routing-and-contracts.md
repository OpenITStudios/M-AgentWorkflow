# Routing and Handoff — Source Policy, Not a Second Orchestrator

**Status:** SOURCE_AUTHORED, **NOT_EXECUTED**. OpenMausBot owns task creation, cancellation, scheduling and approval; this repository supplies a stateless advisory decision contract. The preview cannot execute commands, start workers, open ACP sessions, or grant host permissions.

## Decision order

1. Validate the task envelope, exact repository/branch/HEAD, bounded scope, classification and delegation depth; reject invalid inputs.
2. For mutating work, require explicit write approval and an isolated worktree. The executing host must independently verify the approval and enforce filesystem/shell restrictions; user-supplied booleans are **not** proof.
3. Prefer a reviewed deterministic script for deterministic transformation; it still needs an authorized execution environment.
4. Route architecture, repository inspection, code changes and independent QA to **Codex**. A QA review must use a distinct context and check evidence.
5. For low-risk bounded text processing, propose direct **Ollama/K2** only when its policy is enabled and the local host/model/GPU are independently verified.
6. For local tasks needing tools, propose **Hermes ACP/K2** only when the same base gates, ACP handshake, tool discovery, permitted tool allowlist, multi-step tool loop and context budget are proven on the actual installed version.
7. If local proof is insufficient, block a `local_only` or `forceLocal` task. For `cloud_allowed`, propose Codex for owner review; **do not silently send local data to the cloud**.
8. Never spawn another global coordinator or automatically escalate approval, filesystem access, model context, or delegation depth. Stop on repeated failure.

## One authority for each state

| Data | Owner |
| --- | --- |
| Task identity, lifecycle, delegation, cancellation, approvals | OpenMausBot |
| Actual permission enforcement | Executing host/sandbox plus explicit owner decision |
| Working source/changes | Selected Git repository, branch and commit |
| Engine actions and results | Actual executor's authenticated receipts |
| Runtime evidence references | One local per-task record; not a parallel state database |
| Project policy, tests and examples | M-AgentWorkflow source |

The `recommendRoute()` function is **pure**; it does not read OpenMausBot state and cannot declare a task `APPROVED`, `RUNNING`, or `PASS`.

## Public contract in this repository

- `schemas/task-envelope.schema.json`: project-owned task/advice input.
- `config/routing-policy.example.json`: **advisory-only** routing options; both local paths disabled by default.
- `src/policy/route-advice.mjs`: fail-closed, side-effect-free route recommendation.
- `scripts/route-preview.mjs`: developer-only offline preview; always supplies **unverified** readiness and never launches a model.
- `schemas/result-envelope.schema.json`: transport-neutral evidence reference format. Do not store raw logs or secrets in Git.
- `tests/route-advice.test.mjs`: authored but not executed (project test hold).

```powershell
# Later in authorized PC-local phase only, after reviewing source:
node scripts/route-preview.mjs examples/task.readonly.example.json
```

Expected *source logic*, not observed output: route `CODEX`, status `PROPOSED`, `permissionsGranted: false`, `execution: NOT_EXECUTED`. Output is **not** permission to invoke Codex.

## Adapter boundary — explicitly unimplemented

After actual OpenMausBot/ACP versions and permissions are checked on a supported PC host, an adapter may translate platform-native task identity and current host-authorized scoped permissions into this advisory contract. The actual platform retains state, approvals, execution, recovery and logs. Do not assume `config/*.example.*` is accepted by upstream engines, nor use user-controlled `readiness` flags as authentication.

Proposed route values: `CODEX`, `DETERMINISTIC_TOOL`, `OLLAMA_DIRECT`, `HERMES_ACP`, `NONE`. Only `PROPOSED` and `BLOCKED` appear. A `PROPOSED` route must **not** be equated with authorized execution; the host independently checks role, scope, runtime, command, consent, active hold and evidence.

## Resource and failure policy

Only one local worker may run initially. Default local input estimate <= 4,096 tokens; tool-enabled Hermes requires verified installed-version context >= 64,000 (currently an unverified target on RTX 3070 8 GB). These are **conservative routing gates**, not proof the hardware meets them. If K2 cannot satisfy them, keep the Hermes path off; use Codex within already authorized scope.

No automatic retries past a bounded per-task policy; no recursive worker spawning, unbounded chat history copies, second task queue, or silent privilege/provider escalation. Record failure reason in OpenMausBot's task and reference real receipts, if any.
