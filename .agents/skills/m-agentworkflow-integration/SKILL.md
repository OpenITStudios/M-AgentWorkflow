---
name: m-agentworkflow-integration
description: Use when designing or reviewing M-AgentWorkflow's Codex/OpenMausBot/Hermes integration contracts and evidence gates. Do not use for unrelated repository edits, runtime claims, or unattended PC operations.
---

# M-AgentWorkflow Integration Review

## Scope

Review one integration boundary at a time. First read `AGENTS.md`, `GITHUB_RULES.md`, the active project profile/policy and current source. Resolve actual host/tool support before promising implementation.

## Procedure

1. Pin repo, branch, HEAD, in-scope interface, installed version if available, and accepted goal.
2. Select one owner: orchestration (`docs/integrations/openmausbot.md`), execution (`codex.md`), or local model (`hermes-k2.md`).
3. Identify true supported API/ACP capabilities from original upstream sources at the installed/pinned version; mark assumptions unknown.
4. Specify input, output, scope, permission gate, failure behavior, and evidence handoff without creating duplicate task databases.
5. Propose the smallest complete change, including affected callers and risk to concurrent agents.
6. Report `SOURCE_REVIEWED`, `TEST_AUTHORED_NOT_RUN`, or actual host evidence as appropriate; never invent PASS.

## Negative triggers

Do not activate for unrelated Minecraft/Blockbench authoring, general discussion, speculative model rankings, unapproved cross-repo modifications, or attempts to use this skill as execution permission.
