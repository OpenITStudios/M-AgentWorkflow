# Permission Matrix — Default Deny

The table is a **policy target**. It is not proof any current installed engine enforces the rules. Verify actual engine settings before use.

| Actor | Read repository | Write repository | Shell | Network | Git push/deploy |
|---|---|---|---|---|---|
| Coordinator (OpenMausBot) | Approved metadata | No | No by default | Approved services only | No |
| Research / Architect (Codex) | Scoped read | No | Read-only inspection after approval | Bounded | No |
| Developer (Codex) | Scoped read | Approved worktree only | Approved commands | Bounded | Denied unless separately authorized |
| QA / Reviewer (Codex) | Scoped read | Test artifacts only when approved | Approved test commands, PC-only proof | Bounded | No |
| Utility (Hermes/K2) | Task-specific allowlist | No initially | Disabled initially | Local Ollama API only initially | No |

All roles: no admin privileges, no access to private credentials, no recursive deletion, no destructive commands without explicit user approval and actual policy enforcement. Read the current target repo's `AGENTS.md`, `GITHUB_RULES.md`, `.agent-standard/profile.json`, and its actual project policy before editing it.

### Workspace separation

Use separate worktrees for concurrent writers. A repo branch named `Local` is not evidence of local execution. Keep transcripts and task artifacts in ignored runtime storage, not in Git.

### Fallback

If a tool cannot enforce permissions, downgrade it to read-only or disable it. Never use a narrative prompt as the only enforcement for high-risk operations.
