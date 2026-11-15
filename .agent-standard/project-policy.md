# M-AgentWorkflow — Project-specific Policy

**Status:** active project-specific restriction layer for `OpenITStudios/M-AgentWorkflow`. Read it after the byte-identical portable shared roots and active profile. It narrows the shared rules and does not replace them. Source adoption and effective agent-host loading are distinct.

## Scope and execution surface

- The target repository is `OpenITStudios/M-AgentWorkflow`; the initial working source branch is `main`. Pin its actual HEAD for every material change. Never assume another repo's `Local`, `Rust`, or `develop` applies here.
- `CHATGPT_GITHUB`: source inspection and authorized GitHub changes only. No real PC runtime or local benchmark is implied. `LOCAL_PC_AGENT`: only an authorized, authenticated agent actually executing on the user's PC; separate validation phase.
- GitHub Actions, hosted CI as PC-test substitutes, automatic branches/promotions, merge, deploy and release are disabled. Do not run tests marked on hold or claim them as run.
- No cross-repository writes without separate, explicit scope and permission; treat all linked repositories as READ ONLY by default.

## Architecture and ownership

- **OpenMausBot:** single global owner of task queue, assignment, cancellation, and approval state. It is not a source-of-truth for Git diffs or test receipts.
- **Codex:** preferred engineering runtime for planning, coding, source review, and significant design decisions. Do not silently switch to Claude or another provider.
- **Hermes / K2-Horizon-7B:** optional, experimental utility worker. Route only scoped work it can actually complete. Do not promote it to repository writer or final QA without tool-loop and evidence checks.
- **OpenClaw:** optional future messaging gateway, not part of the initial implementation and not a second orchestrator.
- **Evidence:** task outcomes must include concrete source refs, diff/worktree scope, commands actually executed, result, and explicit unknowns. A language model's confidence is not proof.

## Permissions and safety

- No `full-access` default, no administrator launch, no unattended shell deletion, no token export, no arbitrary host filesystem access. Use explicit per-agent allowlists and approval gates where supported; if an installed tool cannot enforce the required boundary, disable that operation.
- Coordinator delegates but does not independently mutate project repositories. Concurrent developer workers use distinct worktrees/branches when authorized; never modify a shared tree concurrently.
- Do not commit provider/API keys, refresh tokens, credentials, personal chats, model weights, generated logs, or private task data. Local-only data are outside Git.
- STOP on model context exhaustion, repeated tool-loop failures, missing approval, ambiguous write target, no verified host, or unauditable agent actions.

## Source rules and integration readiness

- AgentSkill (`OpenITStudios/AgentSkill`) is a **canonical shared-source reference**, not proof of runtime adoption. Pinned standard source: `40ca9df89e728513199e64128528606b893ac4e1` as verified for this repository bootstrap; keep byte parity before updating.
- Read `docs/architecture/authority-and-state.md` for the task control/state map, `docs/governance/permission-matrix.md` for the only project permission mapping, `docs/operations/current-state.md` for live status, and `docs/operations/acceptance.md` for evidence gates.
- `config/*.example.yaml` are **design fixtures, not native OpenMausBot/Hermes configuration files**. Do not copy them into production agent engines without verifying supported versions and schemas.
- Do not invent ACP support, delegate tools or model stability for the installed versions. Each integration receives contract checks and PC-local verification before production status.

## Delivery and continuity

- Document significant future work under `[Unreleased]`; keep versions stable until release approval. No fabricated version bumps, release tags or published packages.
- Commit messages for material work follow the canonical `Surface / Goal / Work / State / Proof / Next` format and `Decision / Unresolved` for critical architecture/security changes.
- Stop at source-evidence ceiling. Distinguish approved design, authored source, unexecuted checks, real Codex/Windows test receipts, and final user acceptance.
