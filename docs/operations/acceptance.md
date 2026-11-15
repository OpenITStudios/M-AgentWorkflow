# Acceptance and Verification Plan

**Evidence policy:** a GitHub commit is `SOURCE_COMMITTED`, not native Windows/ACP/GPU proof. Tests are on hold per `.agent-standard/profile.json`. No GitHub Actions or cloud runner may replace user-PC validation.

## Phase A — Repository source ready (this work)

- Explicit selected `main` HEAD pinned, permitted source-only changes committed once and actual GitHub commit/tree/paths verified.
- Canonical AgentSkill files, root rules and profile retained unchanged with existing 1:1 lock.
- Pure routing advisor exists: no network, command execution, approval grant, external provider call, scheduler or task database.
- Advisory-only config leaves direct K2 and Hermes **disabled** by default; invalid/unsafe task inputs fail closed; privacy boundary is maintained.
- The task/result schemas, source examples, runtime boundaries, docs, affected readers and source-authored test cases agree.
- No credentials, logs, user data, CI workflows, installed runtime or model weights committed.
- Source proof ceiling: `SOURCE_REVIEWED`, `SOURCE_COMMITTED`, `TEST_AUTHORED_NOT_RUN`; no native PASS.

## Phase B — Supervised PC-local preparation (separately selected later)

- Actual authenticated PC-local agent confirmed; record Windows, RTX 3070, VRAM, RAM, driver and running product versions.
- Verify installed OpenMausBot's Codex, Ollama and Hermes ACP engine definitions, approvals, tool discovery and cancellation.
- Verify Codex scoped read-only operation and denial of an unauthorized file write.
- Confirm model tag/hash, Ollama GPU/CPU residency, context window and inference/tool behavior. Do not treat Q4 model size as free GPU context.
- Verify local-only tasks cannot be uploaded to Codex/cloud; check host-enforced permissions, not only route preview JSON.

## Phase C — Multi-agent and failure paths (separately selected later)

- One actual OpenMausBot task ID delegated to Codex within approved repo/ref/HEAD.
- Direct Ollama utility run evaluated against a known fixture; output contains verifiable references.
- Hermes ACP adapter and >= 64K context gate are attempted only if resource/installed-version evidence supports them; otherwise route remains disabled without holding Codex.
- For Hermes: two-step tool sequence, tool denial, unavailable tool, cancellation, failure recovery and replay/idempotence checked.
- Reviewer from independent context rejects one planted unsupported claim.
- Concurrent writes never share worktrees; no cross-repo write/CI/remote push without explicit independent permission.
- Actual signed/recorded tool/test receipts support all PASS claims. Failures remain FAIL/BLOCKED.

## Phase D — Efficiency decision

Compare **Codex-only baseline** to **Codex + direct K2 / Hermes worker** on the *same* approved tasks. Record correctness, total elapsed time, Codex usage, worker CPU/GPU residency, human interventions and rework. Disable a local route when its quality or cost per successfully verified task fails to improve. Do not invent benchmark figures or claim cost savings in advance.

## Stop condition

At the available proof ceiling, stop once the actual source and expected consumers are coherent. A future PC-local phase requires a separate owner-selected transition and explicit release of the test hold.
