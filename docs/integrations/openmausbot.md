# OpenMausBot Adapter — Intended Contract

**Role:** one owner for task queue, role assignment, human review and cancellation.

**Prerequisites to verify:** installed OpenMausBot version, available Codex engine, Hermes ACP engine (if used), actual tool capabilities, delegation method, approval policy, task identifiers and state persistence.

**Input:** task ID, goal, acceptance, repo/ref scope, selected engine, permissions, owner-approved budget.

**Output:** worker progress status, bounded results, evidence references and explicit errors or holds.

**Do not assume:** automatically available cross-bot tools, MCP forwarding through all ACP engines, global permission inheritance, or source code write authorization.

**Initial acceptance:** configure one Codex bot, complete one read-only repository inspection with known evidence, reject one disallowed write, then test bounded cross-bot handoff if supported by actual installed version.
