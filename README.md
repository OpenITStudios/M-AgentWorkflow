# M-AgentWorkflow

**OpenITStudios multi-agent workflow integration — source architecture and governance.**

This private repository defines the project-owned coordination and evidence contracts for **OpenMausBot** (task orchestration), **OpenAI Codex** (primary engineering agent), and optional **Hermes Agent + K2-Horizon-7B Q4_K_M through Ollama** (bounded experimental local worker on RTX 3070 8 GB). It is **not a fork**, an installed runtime, or a claim that integrations already work on Windows.

## Status and responsibilities

- **Source:** governance files and documentation maintained on the repository's initial `main` branch. Use `docs/operations/current-state.md` for up-to-date source/host proof; never infer readiness from a commit alone.
- **Primary path:** OpenMausBot delegates an approved task to Codex; a separate reviewer checks evidence and acceptance. One owner per task, permission decision and source of truth.
- **Local option:** Hermes and K2 are not a replacement for Codex, and long-context/tool-loop capacity on RTX 3070 remains **NOT_EXECUTED** until an authorized PC-local phase.
- **Out of initial scope:** OpenClaw, duplicated orchestrators, direct cloud CI or Actions, default full disk access, hosted testing in lieu of PC proof, and silent upstream source modifications.

## Repository navigation

| Need | Canonical owner |
| --- | --- |
| Current project scope | [CONTEXT.md](CONTEXT.md) |
| Documentation routing | [docs/README.md](docs/README.md) |
| Architecture and task state | [docs/architecture/system.md](docs/architecture/system.md), [authority](docs/architecture/authority-and-state.md) |
| Source rules and permissions | [AGENTS.md](AGENTS.md), [GITHUB_RULES.md](GITHUB_RULES.md), [project policy](.agent-standard/project-policy.md) |
| Portable standard and parity | [docs/governance/standard-adoption.md](docs/governance/standard-adoption.md) |
| Integration boundaries | [docs/integrations/README.md](docs/integrations/README.md) |
| Evidence and acceptance | [docs/operations/current-state.md](docs/operations/current-state.md), [acceptance](docs/operations/acceptance.md) |

## Prepare a Windows workspace (later PC-local phase)

Prerequisites are Git, PowerShell and Node.js for optional standard verification. Clone the repository when the PC-local phase has been explicitly selected:

```powershell
git clone https://github.com/OpenITStudios/M-AgentWorkflow.git
cd M-AgentWorkflow
```

The portable AgentSkill files are already tracked in this repository at a pinned source commit, with a SHA-256 lock. They **do not require bootstrap cloning to appear**. To verify source identity on your own authorized PC, review and run:

```powershell
powershell -NoProfile -File .\scripts\check-structure.ps1
powershell -NoProfile -File .\scripts\verify-agent-standard.ps1
```

These commands are *optional verification procedures*, not receipts for this GitHub-only source operation. No model download, executable installation, engine login or runtime test is performed by this repository's source commit.

For proposed per-engine setup, see [Codex](docs/integrations/codex.md), [OpenMausBot](docs/integrations/openmausbot.md), and [Hermes/K2](docs/integrations/hermes-k2.md). `config/*.example.yaml` are **illustrative contracts**, not validated configuration schemas of those upstream applications.

## Security and proof

Keep credentials, OAuth sessions, caches, transcripts, model files, task data and runtime logs outside Git. Grant only per-task privileges supported by the actual installed host. Read [SECURITY.md](SECURITY.md) and [permission matrix](docs/governance/permission-matrix.md). Keep source reviews distinct from evidence of Windows/RTX 3070 execution.

## Contribution and licensing

[CONTRIBUTING.md](CONTRIBUTING.md) describes scoped source changes. No project license is declared by this repository; visibility alone does not grant an open-source license. Version changes, releases and deployments require separate explicit approval. See [CHANGELOG.md](CHANGELOG.md) for Unreleased notes.
