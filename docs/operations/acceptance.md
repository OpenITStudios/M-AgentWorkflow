# Acceptance and Verification Plan

## Phase A — Repository source ready

- Actual `OpenITStudios/M-AgentWorkflow` GitHub repo exists with visibility as approved.
- Current branch/HEAD pinned; portable shared files copied from pinned AgentSkill release/source, lock `ADOPTED`, parity verification PASS.
- Local `.agent-standard/profile.json` and `.agent-standard/project-policy.md` loaded; links and structure checked.
- `CONTEXT.md`, README and domain owners consistent; no secrets, no workflows/CI, no unapproved external source copies.
- Proof: `SOURCE_REVIEWED`/`SOURCE_COMMITTED` only. Never claim PC test PASS.

## Phase B — PC-local inference (separate phase)

- Local PC agent verified by real command receipts; `nvidia-smi` confirms RTX 3070.
- Ollama successfully loads pinned K2; record VRAM, token speed, context setting, error behavior.
- Test reasoning/tool-call on small bounded fixtures; compare output with Codex, no production writes.
- Record actual test commands/results; failures remain FAIL/BLOCKED, not silent fallback successes.

## Phase C — Multi-agent interaction (separate phase)

- Codex engine can run a read-only task in OpenMausBot.
- Hermes ACP engine can connect, and its permitted tools are discoverable in the installed version.
- Coordinator delegates task, worker returns bounded evidence, reviewer catches deliberately false/unsupported claim.
- Cancellation, failure recovery, permission denial, and resource exhaustion tested.
- Separate worktrees verified before concurrent writes are ever allowed.

## Stop condition

Stop at the achieved proof ceiling. Do not convert an authored test plan or GitHub commit into a claim that Windows/OpenMausBot/Hermes/Codex was actually tested.
