# Current State — Single Continuation and Proof Owner

**Source milestone:** initial M-AgentWorkflow governance and architecture import (2026-11-15), a source-only fail-closed routing-contract implementation, and a **read-only PC host inventory** executed under OpenCode 2.3.0 (no installation, no native task, no test execution). Inspect the selected GitHub branch HEAD/commit for the exact immutable source revision; this page does not replace that proof.

| Area | Current state | Evidence or missing proof |
| --- | --- | --- |
| GitHub repository | CREATED, **public** | `OpenITStudios/M-AgentWorkflow`; working branch `main`; owner changed visibility from private to public on 2026-11-15; `dataPolicy` in `.agent-standard/profile.json` updated to match |
| PC agent host | HOST_VERIFIED (OpenCode 2.3.0 desktop) | Local Windows workspace `D:\Work\AI Stuff\AgentWorkflow`; shell and file tools observed running on this PC; root `AGENTS.md` and `.agents/skills/*` discovered and loaded |
| Architecture and contract docs | SOURCE_AUTHORED | One coordinator, Codex-first, direct Ollama and experimental Hermes boundaries |
| Routing advisor and envelopes | SOURCE_AUTHORED | `src/policy/route-advice.mjs`, JSON policy, task/result schemas, example |
| Native engine map | SOURCE_AUTHORED | `src/integrations/native-engine-map.mjs` reviewed against pinned upstream; no installed host detected |
| Routing tests | TEST_AUTHORED_NOT_RUN | `tests/route-advice.test.mjs` and `tests/native-engine-map.test.mjs`; tests on hold |
| Portable AgentSkill | SOURCE_ADOPTED | Shared bytes and pinned lock unchanged; effective host use verified only for the loading observation below |
| OpenMausBot | **NOT_INSTALLED** | No executable, package, service or `~/.openmausbot` configuration found; the coordinator, approval owner and cancellation path are therefore absent on this host |
| Codex CLI | INSTALLED, AUTHENTICATED, NOT_SCOPED_FOR_THIS_REPO | `codex-cli 0.137.0` (npm global); `codex login status` → "Logged in using ChatGPT"; global `~/.codex/config.toml` sets `[windows] sandbox = "elevated"` and declares no explicit `approval_policy`; this repository has no trusted-project entry; effective per-task sandbox/approval NOT_VERIFIED |
| Direct Ollama/K2 | NOT_CONFIGURED | Ollama 0.31.1 installed at `%LOCALAPPDATA%\Programs\Ollama`; loopback port 11434 not listening; `~/.ollama/models` contains no manifest or blob, so `ifm/k2-horizon:7b-q4_K_M` is absent |
| Hermes ACP/K2 | **NOT_INSTALLED** | No `hermes` executable and no Hermes configuration directory found |
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
- No native engine is installed on this host. Installing OpenMausBot — and any Hermes, Ollama model or Codex scope change — is a **separately authorized action**, never an automatic consequence of an inventory.

## Next to do — OpenCode handoff (2026-11-15)

**Selected next client:** OpenCode. This is an **intended handoff**, not proof that OpenCode is installed, that its executor is on the user's PC, or that any test hold is released. The engineering runtime remains **Codex-first**; OpenCode is an agent application/host, not evidence that Codex CLI or a particular OpenAI model is running.

**Continuation anchor:** this pass pinned `main` at `fc2189bb33b920ad01166c18ae9fde568e0f7f4d` (local, `origin/main` and the GitHub branch read agree). The handoff named `64ef614e8bd79fc540e1fb1f22f984dcf8f87a9a` as the last completed source commit before the handoff; `fc2189b` is the handoff document itself. Current-state and governing source outrank historical `Next` fields.

### Verified in this pass — read-only inventory, no install, no test

1. **Authority and host — RECOVERED.** Root `AGENTS.md`, `GITHUB_RULES.md`, `.agent-standard/profile.json`, `.agent-standard/project-policy.md` and `.agent-standard/adapters/opencode.md` were read. Host application: **OpenCode 2.3.0 desktop** (`opencode-cli.exe` running from `%LOCALAPPDATA%\Roaming\ai.opencode.desktop\cli\2.3.0-x64`), workspace and shell target the user's Windows PC. `AGENTS.md` and the four repository Skills (`.agents/skills/`) were discovered and loaded by the running session. No `permissions` block is declared in the user OpenCode config; the effective scope observed in this session is shell plus file edit. Model/provider identity is recorded separately from host identity and is not used as execution proof.
2. **Installed prerequisites — INVENTORIED.** Compared against the pinned upstream contract in [native engine mapping](../integrations/native-engines.md). Installed: OpenCode 2.3.0, Codex CLI 0.137.0 (ChatGPT-authenticated), Ollama 0.31.1 (no server, no models), Git 2.53.0, Node.js v24.14.1. Missing: OpenMausBot (coordinator), Hermes Agent (ACP worker), and the `ifm/k2-horizon:7b-q4_K_M` Ollama model. All missing items are recorded as **NOT_INSTALLED / NOT_CONFIGURED**, not as failures.
3. **Host securing — BLOCKED BY ABSENCE, WITH ONE CONFLICT FOUND.** No OpenMausBot per-bot or per-thread approval level exists to audit, no Chief-of-Staff delegation chain exists, and no Hermes ACP toolset exists to inspect. The one material conflict is on the Codex side: the global `~/.codex/config.toml` sets `[windows] sandbox = "elevated"` and declares no explicit `approval_policy`, and the global config also exposes browser/computer-use MCP tooling. That contradicts this project's "no administrator launch, read-only default, scoped inspection" policy. The file is user-global and shared with other repositories, so this repository does not modify it.

### Remaining, in order — each item needs explicit owner authorization

4. **Install the coordinator, deliberately.** Installing OpenMausBot is the prerequisite for every other native step, because it owns task IDs, approval and cancellation. Confirm the exact version, install scope, data location and rollback before installing; the pinned contract references v0.1.153, so verify the actual installed version and its Codex/Hermes drivers before binding.
5. **Scope Codex before any Codex task.** Decide the approval and sandbox posture for this repository — read-only plus "Ask for approval" — and whether the global `sandbox = "elevated"` setting is replaced with a narrower, non-administrator mode. This is a user-global configuration decision affecting other repositories and is therefore left to the owner.
6. **Keep both local routes off.** `OLLAMA_DIRECT` and `HERMES_ACP` stay disabled until an actual model, resource and tool-permission evidence base exists: K2 model tag/hash plus VRAM and context residency for Ollama, and `hermes acp --check` plus effective tool inventory, approval-denial behaviour and a real 64K context measurement for Hermes. Do not reduce the 64K requirement to claim compatibility.
7. **Keep the test hold in place.** `.agent-standard/profile.json` still sets `executionPolicy.tests=on_hold` and blocks `test`, `ci`, `deploy` and `release`. Run nothing — not `tests/route-advice.test.mjs`, not `tests/native-engine-map.test.mjs`, not `scripts/route-preview.mjs`, not `scripts/check-structure.ps1` — until the owner explicitly selects PC-local validation and releases the relevant hold. No cloud CI or GitHub Actions substitute.

**STOP / handoff target:** the verified PC host identity, pinned repo/version/branch, effective permissions, installed-vs-missing components, exact blocker and next permitted action are returned in the agent reply, and the durable status is recorded **here**. Do not claim `LOCAL_PC_PASS` from a source commit or a planned command. Keep task status with OpenMausBot, repository milestone status **only here**, and private runtime logs outside Git.

## Remaining gates

Review exact committed source/selected HEAD and source-level consistency. PC runtime installation, actual Codex/OpenMausBot/Hermes/tool integration, real test results, VRAM/context and benefit over Codex-only all remain **unverified**. Refer to [acceptance](acceptance.md) and [routing contract](../architecture/routing-and-contracts.md), not separate task logs.
