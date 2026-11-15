# Integration Contracts

These documents describe **source contracts**, not installed software or native import files.

- [OpenMausBot](openmausbot.md): sole coordinator and approval/task owner.
- [Codex](codex.md): primary engineering executor, model selection independent from agent host.
- [Hermes + K2](hermes-k2.md): optional ACP worker; direct K2 without Hermes is preferred for no-tool utility tasks.
- [Routing and envelopes](../architecture/routing-and-contracts.md): fail-closed advisory policy, source schema and evidence handoff.

Integration approach: **use native engine/ACP/provider support where verified**, do not fork or duplicate the upstream scheduler, permissions broker, or memory database. Tool names, protocol schemas, default model settings and installed-version capability must be checked at the actual runtime before binding. `config/*.example.*` are **not** an OpenMausBot, Hermes, or Ollama production format.
