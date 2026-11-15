# OpenMausBot Adapter — Intended Contract

**Role:** one authoritative owner for task creation, assignment, approval, cancellation and review state. Do not build a second scheduler or task database in M-AgentWorkflow.

## Recommended native paths (capability must be verified on the installed version)

- Codex CLI engine for engineering and independent review, within Codex/host permissions.
- Direct Ollama provider for bounded text-only K2 utility work when enabled and tested.
- Hermes ACP engine when a **real** tool-using local worker is required, and tool availability/approval are verified.

Documented upstream interfaces are not proof the selected Windows release supports each behavior exactly. Do not assume `coordinate_bots`, ACP tool forwarding, model switching or approval inheritance works in all versions.

## Contract at integration boundary

**Input:** coordinator-owned task ID, objective/acceptance, target repo/ref/HEAD, bounded scope, data boundary, risk, selected engine and actual owner-approved budget.

**Output:** real worker status, evidence references, changed SHA/diff if applicable, failure/cancellation state and uncertainty. Reconcile native status using the installed provider's documented interface; no synthetic SUCCESS.

**Permission gate:** the executing host must enforce actual shell/filesystem/network grants. Task JSON readiness and `writeApproved` are not proof. Prefer Ask/approval, disable unsafe provider defaults, and verify cancellation stops new work.

**Initial acceptance:** read-only Codex inspection, denied unauthorized write, bounded K2 direct task, Hermes ACP capability check, and delegated handoff with independent evidence. These are future PC-local tests, not performed by the source-only policy code.
