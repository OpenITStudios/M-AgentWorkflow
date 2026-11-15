# Changelog

## [Unreleased]

- Established source-only M-AgentWorkflow architecture and task/evidence ownership.
- Adopted pinned OpenITStudios AgentSkill standard at exact-byte source parity.
- Added a stateless, fail-closed advisory routing policy, task/result schemas and bounded input example. Default local routes remain off.
- Defined Codex-first, direct Ollama/K2 and Hermes ACP integration boundaries; no new scheduler, approval broker or runtime daemon.
- Source-reviewed OpenMausBot v0.1.153 native Codex/Hermes drivers; added a pure native engine map, approval/toolset risk documentation, and authored tests. No native runtime, CI or multi-agent tests executed.
