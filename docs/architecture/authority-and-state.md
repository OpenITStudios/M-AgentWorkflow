# Authority, State and Task Lifecycle

## Authorities

1. Human owner sets goal, acceptance, repository scope and privileged action approvals.
2. OpenMausBot routes/delegates approved tasks; it does not create new permissions.
3. Executing host enforces filesystem/shell/network permissions and verifies where commands actually run.
4. Git is the code source of truth; evidence is tied to exact branch and commit SHA.
5. Codex/Hermes workers return bounded artifacts and observations; their prose cannot elevate proof status.

## Lifecycle (proposed, not native platform schema)

`PROPOSED → APPROVED → ASSIGNED → RUNNING → REVIEW → ACCEPTED`.

Error/hold branches: `RUNNING → BLOCKED`, `RUNNING → FAILED`, `REVIEW → REWORK`, `* → CANCELLED` where supported by the host. Do not implement a competing scheduler/state database: translate the verified host's actual statuses at the adapter boundary.

## Minimal task contract

- `task_id` (coordinator-owned), objective, acceptance criteria, owner and permitted scope.
- `source_ref`: repo, selected branch, pre-task SHA; for writing, isolated worktree and permitted paths.
- `executor`: real host and agent application, model/provider, environment limits.
- `permission`: allowed tools, approval mode, timeout/token budget.
- `result`: artifact refs, changed SHA/diff, commands, terminal statuses, tool receipts, uncertainty/blocker.
- `review`: what was verified independently and where evidence is stored.

## STOP

Do not retry failed execution indefinitely or auto-escalate scopes. For unavailable host proof, finish as source-only/blocked rather than inventing success.
