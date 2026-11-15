# Current State — Single Continuation and Proof Owner

**Source milestone:** initial M-AgentWorkflow governance and architecture import (2026-11-15), followed by a source-only fail-closed routing-contract implementation. Inspect the selected GitHub branch HEAD/commit for the exact immutable source revision; this page does not replace that proof.

| Area | Current state | Evidence or missing proof |
| --- | --- | --- |
| GitHub repository | CREATED, private | `OpenITStudios/M-AgentWorkflow`; working branch `main` |
| Architecture and contract docs | SOURCE_AUTHORED | One coordinator, Codex-first, direct Ollama and experimental Hermes boundaries |
| Routing advisor and envelopes | SOURCE_AUTHORED | `src/policy/route-advice.mjs`, JSON policy, task/result schemas, example |
| Native engine map | SOURCE_AUTHORED | `src/integrations/native-engine-map.mjs` reviewed against pinned upstream; no installed host detected |
| Routing tests | TEST_AUTHORED_NOT_RUN | `tests/route-advice.test.mjs` and `tests/native-engine-map.test.mjs`; tests on hold |
| Portable AgentSkill | SOURCE_ADOPTED | Shared bytes and pinned lock unchanged; effective host use NOT_VERIFIED |
| OpenMausBot | NOT_CONFIGURED | Installed engine/approval/tool capabilities not observed |
| Codex | PROJECT_INTEGRATION_NOT_CONFIGURED | Existing Codex use elsewhere is not a runtime receipt for this repository |
| Direct Ollama/K2 | NOT_CONFIGURED | Model/runtime/GPU/context unverified; route disabled |
| Hermes ACP/K2 | NOT_CONFIGURED | ACP/tool-loop/64K context unverified; route disabled |
| Windows / RTX 3070 QA | NOT_EXECUTED | Needs a separately selected authenticated PC-local phase |

## Durable decisions

- One authority for task queue/delegation/approval: **OpenMausBot**.
- Primary software engineering engine: **Codex**; no Claude dependency.
- One small optional local worker: `ifm/k2-horizon:7b-q4_K_M`, RTX 3070 8 GB **design target**, not benchmark evidence.
- Text-only local tasks should use direct Ollama once proven; Hermes ACP only when tool use justifies it.
- `src/policy/route-advice.mjs` and `src/integrations/native-engine-map.mjs` are **advisory-only**; they do not start, configure or authorize native engines.
- Source-pinned OpenMausBot v0.1.153 has Codex and Hermes drivers; its documented local bot/thread default is Full access, so no native worker may start until host-enforced restrictions are verified.
- OpenClaw remains outside initial scope. No default full access, automatic promotion, unattended delete, CI, releases or deployments.

## Next to do — OpenCode handoff (2026-11-15)

**Selected next client:** OpenCode. This is an **intended handoff**, not proof that OpenCode is installed, that its executor is on the user's PC, or that any test hold is released. The engineering runtime remains **Codex-first**; OpenCode is an agent application/host, not evidence that Codex CLI or a particular OpenAI model is running.

**Continuation anchor:** last completed source commit before this handoff is `64ef614e8bd79fc540e1fb1f22f984dcf8f87a9a` on `main`. On entry, inspect the **fresh** branch HEAD and reconcile any newer commits. Current-state and governing source outrank historical `Next` fields.

1. **Recover authority and host.** Read root `AGENTS.md`, `GITHUB_RULES.md`, active `.agent-standard/profile.json`, actual `.agent-standard/project-policy.md`, and `.agent-standard/adapters/opencode.md`. Confirm OpenCode version, effective instruction/Skill discovery, permissions, exact working directory, and **where shell/filesystem tools execute**. Do not equate an OpenCode UI/model name with authenticated PC-local execution.
2. **Inspect installed prerequisites without changing them.** Inventory Windows/GPU evidence, OpenMausBot version, Codex CLI login/engine, Hermes ACP, Ollama and installed K2 model/hash. Compare actual installed interfaces with pinned upstream contract in [native engine mapping](../integrations/native-engines.md); record missing installations as **NOT_CONFIGURED**, not failures to be hidden.
3. **Secure the host before any task execution.** Verify OpenMausBot's per-bot/thread approval modes are not default `Full access`, delegated Chief-of-Staff permission inheritance, Codex sandbox, and Hermes' effective ACP/MCP/plugin tool inventory. Default to read-only and deny shell/file writes if the host cannot enforce narrower permission. No admin launch, credentials in Git, cross-repository writes, unattended destructive commands, push or deployment.
4. **Connect the smallest native path when authorized.** Prefer the built-in OpenMausBot `codex` engine; use `hermesAgent` rather than creating a redundant custom ACP wrapper. Keep the `OLLAMA_DIRECT` and `HERMES_ACP` routes disabled until actual model/resource/tool/permission evidence supports enabling them. The source `native-engine-map.mjs` and routing fixtures are **advice only**, not importable settings, approval grants or runtime adapters.
5. **Separate installation from validation.** Before installing/changing local software or enabling native tasks, verify owner authorization, exact scope and rollback. The repository profile currently sets `executionPolicy.tests=on_hold` and blocks `test`, `ci`, `deploy`, `release`; **do not run tests, CI or substitute cloud execution** until the user explicitly selects PC-local validation and releases the relevant hold. Do not modify the profile to bypass a gate.
6. **When later authorized for PC validation**, use [acceptance](acceptance.md) in order: scoped Codex read-only + denial test; K2/Ollama inference/VRAM/context; Hermes ACP tool-loop and 64K context feasibility; cancellation/delegation/evidence; then Codex-only versus hybrid efficiency comparison. Keep unproven paths off; report `BLOCKED`/ `NOT_EXECUTED` precisely.

**STOP / handoff target:** return the verified PC host identity, pinned repo/version/branch, effective permissions, installed-vs-missing components, exact blocker/next permitted action and evidence level. Do not claim `LOCAL_PC_PASS` from a source commit or a planned command. Keep task status with OpenMausBot, repository milestone status **only here**, and private runtime logs outside Git.

## Remaining gates

Review exact committed source/selected HEAD and source-level consistency. PC runtime installation, actual Codex/OpenMausBot/Hermes/tool integration, real test results, VRAM/context and benefit over Codex-only all remain **unverified**. Refer to [acceptance](acceptance.md) and [routing contract](../architecture/routing-and-contracts.md), not separate task logs.
