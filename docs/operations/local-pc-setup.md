# Local PC Runtime Layout — D:-Rooted Installation

**Status:** `INSTALL_VERIFIED` for the installed artifacts. **No bot, thread, approval flow, ACP session or model inference has been executed**, so runtime acceptance stays **NOT_EXECUTED** until the owner selects the PC-local validation phase and releases the test hold in [`.agent-standard/profile.json`](../../.agent-standard/profile.json).

**Purpose:** record exactly where each native component lives on the user's PC, how it is started, and what remains unproven. The layout keeps every new artifact on `D:`; nothing new was written to `C:` except one user-PATH entry and a negligible uv data folder.

## Root and layout

Working root: `D:\Work\AI Stuff\AgentWorkflow` (repository checkout). The directories below are already covered by `.gitignore` (`runtime/`, `local-data/`, `models/`), so installed binaries, runtime state and model weights can never enter Git.

| Path | Holds | Git-ignored |
| --- | --- | --- |
| `runtime\openmausbot\` | OpenMausBot npm package (`openmausbot@0.1.160`), CLI at `runtime\openmausbot\node_modules\.bin\openmausbot.cmd` | yes (`node_modules/`) |
| `runtime\ollama\` | Portable Ollama 0.40.16 (`ollama.exe` + `lib\`), started manually | yes (`runtime/`) |
| `runtime\installers\` | Installer scripts used for the setup (`hermes-install.ps1`, sha256 `9BD2C140…5D2D7`) | yes (`runtime/`) |
| `runtime\downloads\` | Release archives (Ollama 0.40.16 zip, 1.62 GB) | yes (`runtime/`) |
| `runtime\uv-python\`, `runtime\uv-cache\`, `runtime\npm-cache\` | Package-manager caches and the uv-managed Python 3.14.9 | yes (`runtime/`) |
| `runtime\bin\` | Wrapper scripts (`env.ps1`, `openmausbot.ps1`, `ollama.ps1`, `hermes.ps1`) that set the D: environment before launching a tool | yes (`runtime/`) |
| `runtime\logs\` | Local runtime logs (never committed) | yes (`runtime/`, `*.log`) |
| `local-data\openmausbot\` | Coordinator state: `config.json`, threads, decisions, attachments (`OMB_DATA_DIR`) | yes (`local-data/`) |
| `local-data\hermes\` | **Directory junction** to `D:\OMB` (Hermes home) | yes (`local-data/`) |
| `models\ollama\` | Ollama model store (`OLLAMA_MODELS`) — K2 weights, 5.59 GB | yes (`models/`) |
| `D:\OMB\` | Physical Hermes home: checkout `hermes-agent\`, venv, `config.yaml`, `bin\`, `installs\`, `tools\` | outside the repository by necessity — see the path-length note |

### Why the Hermes home is `D:\OMB`

Hermes generates internal paths such as `<home>\installs\<32-hex>\environments\<32-hex>\workspace\plugins\config_backends\remote\vendor\conformance\config-resolution\<78-char file>.json`. With the home under `local-data\hermes` that reaches **263 characters** and fails on Windows, because `LongPathsEnabled` is `0` on this machine and the session is not elevated. The first install attempt died with `shutil.Error: [WinError 3]`. The home therefore lives at the short path `D:\OMB` (still on D:), and `local-data\hermes` is a junction that keeps it visible inside the working root. Enabling Windows long paths as administrator would remove the need for this workaround.

## Environment contract

`runtime\bin\env.ps1` is the single source of these variables; the launchers apply it before starting a tool.

| Variable | Value | Purpose |
| --- | --- | --- |
| `OMB_DATA_DIR` | `D:\Work\AI Stuff\AgentWorkflow\local-data\openmausbot` | Moves coordinator state off `C:\Users\<user>\.openmausbot` |
| `OLLAMA_MODELS` | `D:\Work\AI Stuff\AgentWorkflow\models\ollama` | Moves model weights off `C:\Users\<user>\.ollama` |
| `OLLAMA_HOST` | `127.0.0.1:11434` | Loopback only; no LAN exposure |
| `HERMES_HOME` | `D:\OMB` | Moves the Hermes checkout, venv, config and command off `%LOCALAPPDATA%\hermes` |
| `UV_PYTHON_INSTALL_DIR`, `UV_CACHE_DIR` | under `runtime\` | Keeps the managed Python and uv cache on D: |
| `npm_config_cache` | `runtime\npm-cache` | Keeps npm's cache on D: |

## Installed components and versions

| Component | Installed version | Location | Evidence / notes |
| --- | --- | --- | --- |
| OpenMausBot (coordinator) | `0.1.160` | `runtime\openmausbot\` | `openmausbot --version` → `0.1.160`. The pinned source contract in [native engine mapping](../integrations/native-engines.md) references v0.1.153, so the installed build is **newer than the reviewed pin**: its Codex and Hermes drivers must be compared against the pin before any binding. The bundle contains the built-in `codex` and `hermesAgent` driver kinds. |
| Ollama (portable) | `0.40.16` | `runtime\ollama\` | Replaces the pre-existing `C:\Users\Administrator\AppData\Local\Programs\Ollama` build (0.31.1) for this project, because the pinned K2 model refuses to pull on 0.31.1 (`412: requires a newer version of Ollama`). The old C: installation is stopped and left untouched. Server reports `Listening on 127.0.0.1:11434`, GPU `NVIDIA GeForce RTX 3070` (CUDA 13.3, 8.0 GiB, 6.9 GiB free) and a **vram-based default context of 4096**. |
| K2 model | `ifm/k2-horizon:7b-q4_K_M` | `models\ollama\` | Present in `/api/tags`: 5,592,229,553 bytes, digest `sha256:16de169bc273d3f274709a954479fa8e6c31888c1535fb3c6e1f66d834ed928a`, GGUF, 9.0B, Q4_K_M, model context 524288, capabilities `thinking`, `tools`, `completion`. `/api/ps` is empty: the model is **not loaded** and no inference has been run. |
| Hermes Agent | `v0.23.1` (2026.9.24), commit `3b421578588243f920886e6fe79a6faa87ea026e` | `D:\OMB` (junction at `local-data\hermes`) | `hermes --version` → `Hermes Agent v0.23.1 (2026.9.24) · stable · local 3b4215785882`, Python 3.14.9, OpenAI SDK 2.54.0. `hermes.exe` and `hermes-acp.exe` are published to `D:\OMB\bin`, which was added to the **user** PATH. Installed with `-NonInteractive -SkipSetup -SkipBrowser -SkipComputerUse`: no provider keys, no browser runtime and no computer-use driver were installed. `hermes acp --check` exists but was **not run**. Upstream enables a background skill-curation pass (first run deferred ~7 days, agent-created skills only); it is enabled by default and was not changed here. |
| Codex CLI | `0.137.0` | `C:\Users\Administrator\AppData\Roaming\npm\codex.cmd` (pre-existing) | Authenticated with a ChatGPT account. Not moved: it predates this project. |

## Start commands

```powershell
# Coordinator (data dir on D:). First launch is interactive: AI access, model, sign-in.
powershell -NoProfile -File .\runtime\bin\openmausbot.ps1 serve

# Ollama (models on D:, loopback only)
powershell -NoProfile -File .\runtime\bin\ollama.ps1 serve

# Hermes
powershell -NoProfile -File .\runtime\bin\hermes.ps1 --version
```

## Still unproven

- No bot, thread or approval card has been created; the documented **Full access** default for new local bots and threads is therefore still unverified **and unconfigured**.
- No Codex sandbox or approval-denial behaviour has been exercised, and the user-global `~/.codex/config.toml` still carries `[windows] sandbox = "elevated"` with no explicit `approval_policy`.
- No Hermes ACP handshake (`hermes acp --check`), tool inventory, approval-denial test or 64K context measurement has been run; no Hermes provider is configured.
- No K2 inference, VRAM residency or context-window measurement has been performed. The model's advertised 524288 context does not mean 64K fits in 8 GB of VRAM; that must be measured before the Hermes route is considered.
- The Ollama server is started manually and is not installed as a Windows service; it does not survive a reboot.

## Rules for this layout

- Never commit anything under `runtime/`, `local-data/` or `models/`; the `.gitignore` entries are the guard, not a convention.
- Keep `OLLAMA_HOST` on loopback and keep the coordinator bound to `127.0.0.1`; a LAN or public exposure changes the trust model.
- Installing is not validating. Enabling `OLLAMA_DIRECT` or `HERMES_ACP` still requires the evidence in [acceptance](acceptance.md) and the owner's release of the test hold.
