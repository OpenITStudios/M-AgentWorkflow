# M-AgentWorkflow — Stable Project Context

**Product:** one source-owned multi-agent workflow integration project; not another model, gateway, task queue or editor.

**Primary engineering:** Codex CLI/IDE under an actually authenticated supported PC host. Provider and engine are separate decisions; no Claude dependency.

**Task owner:** OpenMausBot is the single owner for global task IDs, assignment, delegation, cancellation, approval and current task state. Hermes must not create a second global scheduler.

**Execution paths:** prefer reviewed deterministic scripts when sufficient, Codex for engineering/review, direct Ollama/K2 for bounded text-only local utility, and Hermes ACP/K2 only for tool-using local tasks that pass runtime/tool/context gates. These are proposed paths, **not installed integrations**.

**Optional model:** `ifm/k2-horizon:7b-q4_K_M` on RTX 3070 8 GB via Ollama. Actual VRAM, token speed, 64K context and tool-loop reliability are unverified. Both local routes start disabled.

**Routing source owner:** `docs/architecture/routing-and-contracts.md` plus a stateless `src/policy/route-advice.mjs`. Its output never approves, executes, schedules, verifies hardware or changes the host's task state.

**State owners:** OpenMausBot owns tasks; Git owns code/diff; authenticated executor owns real command receipts; one local evidence reference per task; `docs/operations/current-state.md` owns changing project milestone status. No duplicate task databases.

**Security:** explicit scope/permissions, isolated worktrees, untrusted output as data, no cross-repo writes, no secrets in Git, no CI or unattended execution. A local-only data boundary blocks cloud fallback.

**Evidence:** `SOURCE_REVIEWED`/`SOURCE_COMMITTED`/`TEST_AUTHORED_NOT_RUN` are not `LOCAL_PC_PASS`. Agent/model prose or `Local` branch names cannot establish PC execution.

**Navigation:** [docs index](docs/README.md), [project policy](.agent-standard/project-policy.md), [current state](docs/operations/current-state.md), [acceptance](docs/operations/acceptance.md).
