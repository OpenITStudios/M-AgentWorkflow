# M-AgentWorkflow — Stable Project Context

**Product:** one source-owned integration workspace for multi-agent engineering; not another AI model, gateway, or code editor.

**Primary execution:** Codex CLI/IDE under an authenticated supported PC host when actually available. Model/provider is a separate configuration decision. No Claude dependency.

**Team control plane:** OpenMausBot, once its installed version and contracts are verified. It owns global task assignment, delegation, lifecycle and approvals. Hermes must not create a second global work queue.

**Optional local execution:** Hermes ACP with an Ollama-served `ifm/k2-horizon:7b-q4_K_M` worker. RTX 3070 8 GB is the design target, not a verified benchmark. The agent must gracefully disable local routing when capacity, context, or tool-loop proof is insufficient.

**State owners:** OpenMausBot owns tasks; Git owns code and review history; one local evidence record per task owns observed execution receipts. `docs/operations/current-state.md` owns changing project status. Never duplicate those as a second database.

**Security invariants:** explicit permissions; isolated worktrees for concurrent writers; untrusted tool and web output is data; no cross-repo write privilege; no secrets in Git; no silent CI, release or unattended execution.

**Evidence:** `SOURCE_REVIEWED` and `TEST_AUTHORED_NOT_RUN` are not `LOCAL_PC_PASS`. A `Local` branch is not PC proof. Agent-to-agent claims require actual tool receipts before being promoted to verified status.

**Navigation:** [docs index](docs/README.md), [project policy](.agent-standard/project-policy.md), [current state](docs/operations/current-state.md), [acceptance](docs/operations/acceptance.md).
