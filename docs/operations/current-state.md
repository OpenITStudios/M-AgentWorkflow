# Current State — Single Continuation and Proof Owner

**Source milestone:** initial M-AgentWorkflow governance and architecture import (2026-11-15), followed by a source-only fail-closed routing-contract implementation. Inspect the selected GitHub branch HEAD/commit for the exact immutable source revision; this page does not replace that proof.

| Area | Current state | Evidence or missing proof |
| --- | --- | --- |
| GitHub repository | CREATED, private | `OpenITStudios/M-AgentWorkflow`; working branch `main` |
| Architecture and contract docs | SOURCE_AUTHORED | One coordinator, Codex-first, direct Ollama and experimental Hermes boundaries |
| Routing advisor and envelopes | SOURCE_AUTHORED | `src/policy/route-advice.mjs`, JSON policy, task/result schemas, example |
| Routing tests | TEST_AUTHORED_NOT_RUN | `tests/route-advice.test.mjs`; `tests` on hold |
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
- `src/policy/route-advice.mjs` is **advisory-only**, not a new scheduler/executor and cannot grant permissions.
- OpenClaw remains outside initial scope. No default full access, automatic promotion, unattended delete, CI, releases or deployments.

## Remaining gates

Review exact committed source/selected HEAD and source-level consistency. PC runtime installation, actual Codex/OpenMausBot/Hermes/tool integration, real test results, VRAM/context and benefit over Codex-only all remain **unverified**. Refer to [acceptance](acceptance.md) and [routing contract](../architecture/routing-and-contracts.md), not separate task logs.
