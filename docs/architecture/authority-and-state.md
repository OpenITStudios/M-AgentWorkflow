# Authority, State and Task Lifecycle

## Authorities

1. Human owner sets goal, acceptance, repository scope and privileged action approvals.
2. OpenMausBot routes/delegates approved tasks; it does not create new permissions.
3. Executing host enforces filesystem/shell/network permissions and verifies where commands actually run.
4. Git is the code source of truth; evidence is tied to exact branch and commit SHA.
5. Codex/Hermes workers return bounded artifacts and observations; their prose cannot elevate proof status.
6. The stateless [route advisor](routing-and-contracts.md) emits **PROPOSED** or **BLOCKED** only; it never owns queue state or executes.

## Lifecycle (proposed, not native platform schema)

`PROPOSED → APPROVED → ASSIGNED → RUNNING → REVIEW → ACCEPTED`.

Error/hold branches: `RUNNING → BLOCKED`, `RUNNING → FAILED`, `REVIEW → REWORK`, `* → CANCELLED` where supported by the host. Do not implement a competing scheduler/state database: translate the verified host's actual statuses at the adapter boundary.

## Minimal task contract

See [task envelope schema](../../schemas/task-envelope.schema.json) for the **advisory example**. Its `writeApproved` flag is not an authorization token: the actual host must check the owner's real approval. Required semantics:

- Coordinator-owned `taskId`, objective, acceptance criteria and known user permission.
- `source`: exact target repo, selected branch, head SHA; allowed paths and separate worktree for scoped write.
- `kind`, data boundary, risk, estimated context/size, delegation depth and optional local preference.
- Authenticated host/agent application, provider/model and permission limits (checked by the *real* host).
- Result with changed source, command/test receipts, explicit unknowns and reviewer decision.

A result may use the [result envelope schema](../../schemas/result-envelope.schema.json) as a reference format. This does not replace OpenMausBot's own task and event APIs. Never put raw private task data, credentials or transcripts into Git.

## STOP

Do not retry failed execution indefinitely or auto-escalate scopes. For unavailable host proof, finish as source-only/blocked rather than inventing success.
