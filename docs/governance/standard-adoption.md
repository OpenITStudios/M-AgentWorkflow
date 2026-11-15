# Portable AgentSkill — Verified Source Adoption

**Canonical upstream:** `OpenITStudios/AgentSkill@40ca9df89e728513199e64128528606b893ac4e1` (`0.1.0-draft`).

The tracked portable files `AGENTS.md`, `GITHUB_RULES.md`, `.agent-standard/core/`, `.agent-standard/adapters/`, `.agent-standard/methods.json`, and the three shared `.agents/skills/oits-*` are copied without modification from the source revision. `.agent-standard/standard.lock.json` lists the exact SHA-256 of each portable file and `status: ADOPTED` as **source identity**, not host runtime conformance.

`M-AgentWorkflow` is a newly created repository, so it has no original root files to archive under `.agent-standard/history/`. The project-specific profile, policy, domain skill and docs are independent from the portable shared files.

## Verification (user-selected PC-local phase only)

1. Read repository-specific `profile.json` and `project-policy.md` before activating project Skills.
2. Review `scripts/check-structure.ps1` and `scripts/verify-agent-standard.ps1` before running them on a PC where Git/Node.js are installed.
3. The structure script checks file presence and SHA-256 lock parity; the standard verification script checks the repository against a freshly cloned **pinned** canonical source using `node tools/standard.mjs verify`.
4. Verify actual Codex/OpenMausBot/Hermes host instruction loading separately. A static `ADOPTED` lock is not proof that any host read or followed policy.

No background automatic standard update, repository-wide third-party Skill install, or cross-repository write is authorized. To upgrade the pinned standard, review the upstream revision, all changed portable files and local policy compatibility, then apply one explicitly scoped change.
