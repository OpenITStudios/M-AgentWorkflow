# M-AgentWorkflow

**OpenITStudios multi-agent workflow integration — Codex-first, source-only.**

This public repository defines contracts for **OpenMausBot** (the sole task/approval owner), **OpenAI Codex** (primary engineering), optional **Ollama + K2-Horizon-7B Q4_K_M** (direct bounded text utility), and optional **Hermes ACP/K2** (experimental tool-using worker on RTX 3070 8 GB). It is not a fork, a native OpenMausBot configuration package, an installed runtime or proof that any integration works on Windows.

## Current capability and proof

- **Source implemented:** fail-closed, stateless routing *advice*, source-pinned non-executing native engine mapping, and task/result envelope schemas. The preview never schedules a task, calls an LLM, changes a file, grants approval or verifies PC hardware.
- **Initial policy:** Codex-first, with both direct K2 and Hermes routes disabled until the actual PC host, model, tool/ACP capabilities and boundaries are verified.
- **Proof:** `SOURCE_COMMITTED` and `TEST_AUTHORED_NOT_RUN` only; runtime implementation and tests are on hold until a separately selected PC-local phase.
- **Host inventory (2026-11-15):** an OpenCode 2.3.0 desktop session verified the local Windows host and its installed prerequisites. OpenMausBot and Hermes are **not installed** and no Ollama model is present, so no native route is enabled. See [current state](docs/operations/current-state.md).
- **Excluded:** OpenClaw as a second orchestrator, default full access, cross-repository writes without authorization, cloud CI substitution and unattended deployment.

## Navigation

| Need | Owner |
| --- | --- |
| Stable context and scope | [CONTEXT.md](CONTEXT.md) |
| Documentation navigation | [docs/README.md](docs/README.md) |
| Runtime ownership | [system architecture](docs/architecture/system.md) |
| Routing and task/result formats | [routing contract](docs/architecture/routing-and-contracts.md) |
| Project permissions | [permission matrix](docs/governance/permission-matrix.md) |
| Runtime adapter boundaries | [integration docs](docs/integrations/README.md), [native engine map](docs/integrations/native-engines.md) |
| Source rules | [AGENTS.md](AGENTS.md), [GITHUB_RULES.md](GITHUB_RULES.md), [project policy](.agent-standard/project-policy.md) |
| Shared AgentSkill 1:1 | [adoption](docs/governance/standard-adoption.md) |
| Changing status and test holds | [current state](docs/operations/current-state.md), [acceptance](docs/operations/acceptance.md) |

## Advisory routing preview (not a running agent)

The source defines a **pure function** `recommendRoute()` and an offline, read-only preview using Node.js and its standard library. They are not connected to the OpenMausBot task API. The example is synthetic and uses a pinned historical SHA intentionally; never reuse its task identity as approval.

```powershell
# Only when the PC-local phase is independently selected; review the script first.
node scripts/route-preview.mjs examples/task.readonly.example.json
```

The expected *source design* is `status=PROPOSED`, `route=CODEX`, `permissionsGranted=false`, `execution=NOT_EXECUTED`. The preview script itself has not been executed on the user's PC: only read-only host inventory commands were run under the OpenCode session, and the test hold still blocks the repository's own checks.

`config/routing-policy.example.json` is an **advisory source fixture**, not native OpenMausBot/Hermes/Ollama configuration. `config/*.example.yaml` describes roles and proposed model routes; actual installed-version mappings, approval settings and ACP interfaces must be verified before use.

## Future Windows workspace

Prerequisites for optional source checks: Git, PowerShell and Node.js. Only when a PC-local phase is selected:

```powershell
git clone https://github.com/OpenITStudios/M-AgentWorkflow.git
cd M-AgentWorkflow
powershell -NoProfile -File .\scripts\check-structure.ps1
powershell -NoProfile -File .\scripts\verify-agent-standard.ps1
```

The portable AgentSkill files are already tracked at a pinned source revision with an SHA-256 lock. Neither these commands nor their success proves OpenMausBot, Codex, Hermes, Ollama or K2 is installed, configured or performing correctly. The project has no GitHub Actions or cloud test substitute.

## Privacy, contribution and licensing

Keep API credentials, OAuth sessions, caches, private logs, transcripts, model weights and runtime task data outside Git. Only an authenticated host can enforce per-task permissions. See [SECURITY.md](SECURITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md). No project license is declared by this repository. Use [CHANGELOG.md](CHANGELOG.md) for [Unreleased]; releases, tags and deployment require explicit authorization.
