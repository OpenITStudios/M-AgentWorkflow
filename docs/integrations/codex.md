# Codex Executor — Primary Path

**Role:** architecture, coding, review and relevant tooling, running through a real supported Codex CLI/IDE host when available. Codex CLI and the selected GPT model are separate identities; this project does not depend on Claude.

**Startup:** inspect project rules on the exact target repo and branch, record current HEAD, permissions and allowed tools, then work within scope. Use separate worktrees for authorized concurrent writers.

**Proposed roles:** Research/Architect (read-only), Developer (approved bounded write), QA Reviewer (separate context; actual tests require an authorized PC host).

**Delivery:** changed files/commit SHA where applicable, tool invocation evidence, actual commands/results, uncertainties and unrun tests. Commit or PR existence is not PC test proof.

**Unsupported:** assuming an account has access to a specific GPT model ID, silently falling back to another provider, using cloud CI as local proof, push/merge/deploy without approval.
