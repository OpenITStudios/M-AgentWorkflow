# Hermes + K2-Horizon — Optional Experimental Local Path

**Target PC:** NVIDIA RTX 3070 (8 GB VRAM); actual system RAM, driver, versions and installed runtime are unverified.

**Candidate model:** `ifm/k2-horizon:7b-q4_K_M` through Ollama. Confirm actual tag and model hash before installation; Q4 weights fitting VRAM is not evidence that a long context or reliable agent loop fits. No installation or model checkpoint is provided here.

## Two separate local paths

**Direct K2:** use OpenMausBot's supported Ollama engine for a bounded text-only classification or summary, with no shell/computer/file tools and no cloud fallback for `local_only`. This is the preferred low-overhead local path once validated.

**Hermes ACP/K2:** enable only if the installed Hermes/OpenMausBot versions establish ACP handshake, tool discovery, host-enforced permissions, a two-step tool loop, cancellation and adequate model context. Hermes is a *worker*, not another owner of global task state. The tool path is an extra dependency, not necessary merely to query a local model.

## ACP tool and configuration safety

OpenMausBot v0.1.153 includes a built-in Hermes ACP driver (`hermesAgent`). Its injected model-selection path can change Hermes provider entries in `config.yaml`; inspect the selected default model and any actual configuration change before approving. The default Hermes ACP toolset includes terminal, file-write, patch, execute_code, and delegation. Keep the worker disabled until the **effective** tool/MCP/plugin inventory and host restrictions are independently verified. An Ask prompt is not sufficient evidence of filesystem isolation. See [native engine mapping](native-engines.md).

## Resource and proof gates

- Local worker concurrency = one; avoid persistent multi-model VRAM contention.
- Routing preview caps estimated local input to 4096 tokens; this is an initial workload-policy limit, not a model window size.
- Hermes route requires verified installed-version context budget >= 64K in the initial policy. This gate may require RAM/CPU offloading on RTX 3070, and must be validated in a separately approved PC-local phase. Do not change it merely to declare PASS.
- Record model/driver/Ollama versions, actual GPU-vs-CPU placement, context size, token speed, exact tool receipts and failures (locally, without secrets).
- Test no hallucinated writes, two-step tool continuity, denial when tools unavailable, cancellation, and resource exhaustion.

## Fallback

If any local readiness or privacy gate fails, keep that route **off** and report `BLOCKED` for local-only tasks. Codex may be proposed only when cloud use is explicitly permitted **and** the owner/host accepts the concrete handoff scope. No silent provider switch or privilege escalation.

The example routing policy is not native Hermes/ACP configuration. It contains no credentials and makes no runtime calls.
