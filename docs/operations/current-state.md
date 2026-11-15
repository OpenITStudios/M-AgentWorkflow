# Current State — Single Continuation and Proof Owner

**Source milestone:** initial governance and architecture import into `OpenITStudios/M-AgentWorkflow` on `main` (2026-11-15). For the exact immutable source revision, inspect the GitHub branch HEAD/commit, not this changing Markdown page.

| Area | Current state | Evidence or missing proof |
| --- | --- | --- |
| GitHub source repository | CREATED, private | `OpenITStudios/M-AgentWorkflow`; working source branch `main` |
| Architecture and examples | SOURCE_AUTHORED | Documentation, role fixtures and review procedures; no runtime application code claimed |
| Portable AgentSkill | SOURCE_ADOPTED | Byte-identical canonical tracked files and SHA-256 lock; host loading **NOT_VERIFIED** |
| OpenMausBot | NOT_CONFIGURED | Installed executable version, permissions, engine visibility and coordination not observed |
| Codex | PROJECT_INTEGRATION_NOT_CONFIGURED | Existing use of Codex elsewhere is not proof of this repo's engine setup |
| Hermes + K2 | NOT_CONFIGURED | Ollama/model installation, context/tool-loop, GPU placement not observed |
| Windows / RTX 3070 QA | NOT_EXECUTED | User-selected PC-local agent and later validation required; GitHub is source only |

## Durable decisions

- Repository: **`OpenITStudios/M-AgentWorkflow`**, initial branch **`main`**, private.
- OpenMausBot: the **sole orchestration/task/approval state owner**.
- Codex: **primary engineering agent** (not Claude).
- Hermes + K2-Horizon-7B Q4_K_M: **optional, experimental worker**; design GPU target RTX 3070 8 GB.
- OpenClaw: excluded from initial integration scope; no duplicate orchestrator.
- No default full access, unattended destructive writes, CI substitution, automatic promotion, release or deployment.

## Remaining gates

Source-only completion is permitted once GitHub commit and portable parity are verified. Later **separately selected** PC-local work must verify Codex, OpenMausBot, Hermes, Ollama, tool calling, delegated permissions and user-facing evidence before any operational readiness claim. Refer to [acceptance.md](acceptance.md); do not duplicate task status in other documents.
