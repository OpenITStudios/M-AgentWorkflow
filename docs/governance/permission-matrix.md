# Permission Matrix — Default Deny

The table is a **policy target**, not evidence an installed engine enforces these rules. OpenMausBot/ACP permission levels vary by provider. The authenticated host must enforce access independently of any task JSON or model prompt.

| Actor | Read repository | Write repository | Shell | Network | Git push/deploy |
| --- | --- | --- | --- | --- | --- |
| Coordinator (OpenMausBot) | Approved metadata | No | No by default | Approved services only | No |
| Research / Architect (Codex) | Scoped read | No | Approved read-only inspection | Bounded | No |
| Developer (Codex) | Scoped read | Approved isolated worktree only | Approved commands | Bounded | Denied unless separately authorized |
| QA / Reviewer (Codex) | Scoped read | Test artifacts only when approved | Approved PC-local test commands after hold release | Bounded | No |
| Direct local model (Ollama/K2) | Bounded supplied input | No | No | Local endpoint only | No |
| Utility (Hermes/K2) | Task-specific allowlist | No initially | Disabled initially | Local Ollama API only initially | No |

All roles: no administrator privileges, no private credentials, no recursive deletion, no default full-access computer control, and no destructive commands without explicit approval and enforceable host safeguards. The `writeApproved` field in a design task envelope is untrusted metadata and **cannot** grant actual filesystem rights.

## Workspace and information boundaries

- Local-only payloads must never fall back to Codex/cloud automatically. `cloud_allowed` is a **classification**, not blanket approval to upload data; check actual data owner and allowed content.
- Initial local K2 routing is **off**, and Hermes tools are disabled until real installed-version capability checks succeed.
- Separate worktrees for concurrent writers. A branch called `Local` is not proof of local PC execution.
- Preserve each target repository's current `AGENTS.md`, `GITHUB_RULES.md`, profile, project policy, branch, holds and protected files. A task from this repo grants no cross-repository write permission.
- Keep transcripts, model weights and runtime artifacts out of Git. Promote only reviewed, sanitized knowledge to durable docs/Skills.

## Approval and fallback

OpenMausBot controls task approval state, and the host owns actual shell/filesystem grants. Do not downgrade a required host approval to a model self-report. If an engine cannot enforce a boundary, disable the operation or run read-only. No automatic escalation, model/provider change that violates the data boundary, or background continuation after cancellation.
