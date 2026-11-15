# Current State — Single Continuation and Proof Owner

**Source milestone:** initial M-AgentWorkflow governance and architecture import (2026-11-15), a source-only fail-closed routing-contract implementation, a **read-only PC host inventory** executed under OpenCode 2.3.0 (no installation, no native task, no test execution), and an owner-authorized **D:-rooted native component installation** (OpenMausBot, portable Ollama, K2 model, Hermes Agent). Inspect the selected GitHub branch HEAD/commit for the exact immutable source revision; this page does not replace that proof.

| Area | Current state | Evidence or missing proof |
| --- | --- | --- |
| GitHub repository | CREATED, **public** | `OpenITStudios/M-AgentWorkflow`; working branch `main`; owner changed visibility from private to public on 2026-11-15; `dataPolicy` in `.agent-standard/profile.json` updated to match |
| PC agent host | HOST_VERIFIED (OpenCode 2.3.0 desktop) | Local Windows workspace `D:\Work\AI Stuff\AgentWorkflow`; shell and file tools observed running on this PC; root `AGENTS.md` and `.agents/skills/*` discovered and loaded |
| Architecture and contract docs | SOURCE_AUTHORED | One coordinator, Codex-first, direct Ollama and experimental Hermes boundaries |
| Routing advisor and envelopes | SOURCE_AUTHORED | `src/policy/route-advice.mjs`, JSON policy, task/result schemas, example |
| Native engine map | SOURCE_AUTHORED | `src/integrations/native-engine-map.mjs` reviewed against pinned upstream; no installed host detected |
| Routing tests | TEST_AUTHORED_NOT_RUN | `tests/route-advice.test.mjs` and `tests/native-engine-map.test.mjs`; tests on hold |
| Portable AgentSkill | SOURCE_ADOPTED | Shared bytes and pinned lock unchanged; effective host use verified only for the loading observation below |
| OpenMausBot | INSTALLED, NOT CONFIGURED | `openmausbot@0.1.160` installed on D: (`runtime\openmausbot\`), data dir `local-data\openmausbot`; `--version` responds; newer than the reviewed v0.1.153 pin, so drivers must be compared before binding; no bot, thread or approval mode configured |
| Codex CLI | INSTALLED, AUTHENTICATED, NOT_SCOPED_FOR_THIS_REPO | `codex-cli 0.137.0` (npm global); `codex login status` → "Logged in using ChatGPT"; global `~/.codex/config.toml` sets `[windows] sandbox = "elevated"` and declares no explicit `approval_policy`; this repository has no trusted-project entry; effective per-task sandbox/approval NOT_VERIFIED |
| Direct Ollama/K2 | INSTALLED, ROUTE STILL DISABLED | Portable Ollama 0.40.16 on D: (`runtime\ollama\`), server on `127.0.0.1:11434`; `ifm/k2-horizon:7b-q4_K_M` present (5.59 GB, digest `16de169b…`), not loaded, no inference run; server default context 4096 |
| Hermes ACP/K2 | INSTALLED, NOT CONFIGURED | Hermes Agent v0.23.1 at `D:\OMB` (junction `local-data\hermes`), Python 3.14.9; `hermes.exe` + `hermes-acp.exe` published; installed without provider keys, browser or computer-use; `hermes acp --check` not run |
| Windows / RTX 3070 QA | NOT_EXECUTED | Host inventory only: Windows 11 Pro, RTX 3070 8192 MiB (driver 610.62), 31.8 GB RAM, Node.js v24.14.1 |

## Durable decisions

- One authority for task queue/delegation/approval: **OpenMausBot**.
- Primary software engineering engine: **Codex**; no Claude dependency.
- One small optional local worker: `ifm/k2-horizon:7b-q4_K_M`, RTX 3070 8 GB **design target**, not benchmark evidence.
- Text-only local tasks should use direct Ollama once proven; Hermes ACP only when tool use justifies it.
- `src/policy/route-advice.mjs` and `src/integrations/native-engine-map.mjs` are **advisory-only**; they do not start, configure or authorize native engines.
- Source-pinned OpenMausBot v0.1.153 has Codex and Hermes drivers; its documented local bot/thread default is Full access, so no native worker may start until host-enforced restrictions are verified.
- OpenClaw remains outside initial scope. No default full access, automatic promotion, unattended delete, CI, releases or deployments.
- The repository is **public** since 2026-11-15. No credentials, personal data, private task data, transcripts, runtime logs or model weights may be committed under that visibility.
- Native components are installed on `D:` under the working root (binaries, state and model weights); see [local PC runtime layout](local-pc-setup.md). **Installed is not configured and not validated**: no route is enabled and no native task may run until the evidence in [acceptance](acceptance.md) exists.
- Hermes Agent's home sits at the short path `D:\OMB` because Windows long paths are disabled on this machine; `local-data\hermes` is a junction into it.

## Next to do — OpenCode handoff (2026-11-15)

**Selected next client:** OpenCode. This is an **intended handoff**, not proof that OpenCode is installed, that its executor is on the user's PC, or that any test hold is released. The engineering runtime remains **Codex-first**; OpenCode is an agent application/host, not evidence that Codex CLI or a particular OpenAI model is running.

**Continuation anchor:** the inventory pass pinned `main` at `fc2189bb33b920ad01166c18ae9fde568e0f7f4d` (local, `origin/main` and the GitHub branch read agree). The handoff named `64ef614e8bd79fc540e1fb1f22f984dcf8f87a9a` as the last completed source commit before the handoff; `fc2189b` is the handoff document itself. The installation pass started from that same base plus the inventory commit. Current-state and governing source outrank historical `Next` fields.

### Verified in the inventory pass — read-only, no install, no test

1. **Authority and host — RECOVERED.** Root `AGENTS.md`, `GITHUB_RULES.md`, `.agent-standard/profile.json`, `.agent-standard/project-policy.md` and `.agent-standard/adapters/opencode.md` were read. Host application: **OpenCode 2.3.0 desktop** (`opencode-cli.exe` running from `%LOCALAPPDATA%\Roaming\ai.opencode.desktop\cli\2.3.0-x64`), workspace and shell target the user's Windows PC. `AGENTS.md` and the four repository Skills (`.agents/skills/`) were discovered and loaded by the running session. No `permissions` block is declared in the user OpenCode config; the effective scope observed in this session is shell plus file edit. Model/provider identity is recorded separately from host identity and is not used as execution proof.
2. **Installed prerequisites — INVENTORIED.** Compared against the pinned upstream contract in [native engine mapping](../integrations/native-engines.md). Present before installation: OpenCode 2.3.0, Codex CLI 0.137.0 (ChatGPT-authenticated), Ollama 0.31.1 (no server, no models), Git 2.53.0, Node.js v24.14.1. Absent: OpenMausBot (coordinator), Hermes Agent (ACP worker) and the `ifm/k2-horizon:7b-q4_K_M` Ollama model.
3. **Host securing — ONE CONFLICT FOUND.** No OpenMausBot per-bot or per-thread approval level existed to audit, no Chief-of-Staff delegation chain existed, and no Hermes ACP toolset existed to inspect. The one material conflict is on the Codex side: the global `~/.codex/config.toml` sets `[windows] sandbox = "elevated"` and declares no explicit `approval_policy`, and the global config also exposes browser/computer-use MCP tooling. That contradicts this project's "no administrator launch, read-only default, scoped inspection" policy. The file is user-global and shared with other repositories, so this repository does not modify it.

### Verified in the installation pass — owner-authorized, D:-rooted, no native task

4. **Coordinator, model store and worker installed.** `openmausbot@0.1.160` (npm, D:), portable Ollama 0.40.16 (D:) with `ifm/k2-horizon:7b-q4_K_M` pulled into `models\ollama`, and Hermes Agent v0.23.1 at `D:\OMB` with a junction at `local-data\hermes`. Binaries, runtime state and model weights live on D: under the working root; nothing new was written to C: apart from one user-PATH entry and a negligible uv data folder. Details, exact versions, digests and the MAX_PATH reason for the short Hermes path are in [local PC runtime layout](local-pc-setup.md). **Installation is not configuration and not validation**: no bot, thread, approval card, ACP session or inference was created.

### Remaining, in order — each item needs explicit owner authorization

5. **First-run setup for the coordinator.** The guided launch (`openmausbot setup` / first `serve`) chooses AI access, model and sign-in, and it needs the owner's own input. The documented default for new local bots and threads is **Full access**: before any task runs, the coordinator, the engineer and the Hermes bot must be set to **Ask for approval**, and delegated Chief-of-Staff permission inheritance must be checked. This is the host-enforcement prerequisite the whole workflow depends on.
6. **Scope Codex before any Codex task.** Decide the approval and sandbox posture for this repository — read-only plus "Ask for approval" — and whether the global `sandbox = "elevated"` setting is replaced with a narrower, non-administrator mode. This is a user-global configuration decision affecting other repositories and is therefore left to the owner.
7. **Compare the installed OpenMausBot against the reviewed pin.** The installed build is 0.1.160 while the reviewed contract is v0.1.153. Confirm the actual `codex` and `hermesAgent` driver behaviour and the approval-level semantics of the installed version before binding an engine; do not reuse the pin's assumptions silently.
8. **Keep both local routes off.** `OLLAMA_DIRECT` and `HERMES_ACP` stay disabled until an actual model, resource and tool-permission evidence base exists: K2 VRAM residency and real context measurement for Ollama, and `hermes acp --check` plus effective tool inventory, approval-denial behaviour and a real 64K context measurement for Hermes. The model's advertised 524288-token context is not evidence that 64K fits in 8 GB of VRAM. Do not reduce the 64K requirement to claim compatibility.
9. **Keep the test hold in place.** `.agent-standard/profile.json` still sets `executionPolicy.tests=on_hold` and blocks `test`, `ci`, `deploy` and `release`. Run nothing — not `tests/route-advice.test.mjs`, not `tests/native-engine-map.test.mjs`, not `scripts/route-preview.mjs`, not `scripts/check-structure.ps1`, not `hermes acp --check`, not a K2 inference — until the owner explicitly selects PC-local validation and releases the relevant hold. No cloud CI or GitHub Actions substitute.

**STOP / handoff target:** the verified PC host identity, pinned repo/version/branch, effective permissions, installed-vs-missing components, exact blocker and next permitted action are returned in the agent reply, and the durable status is recorded **here**. Do not claim `LOCAL_PC_PASS` from a source commit or a planned command. Keep task status with OpenMausBot, repository milestone status **only here**, and private runtime logs outside Git.

## Remaining gates

Review exact committed source/selected HEAD and source-level consistency. The native components are **installed** but the integration is still **unverified**: no coordinator task, no Codex approval-denial run, no Hermes ACP handshake, no K2 inference, no VRAM/context measurement, no real test results and no benefit-over-Codex-only comparison exist. Refer to [acceptance](acceptance.md), the [local PC runtime layout](local-pc-setup.md) and the [routing contract](../architecture/routing-and-contracts.md), not separate task logs.
