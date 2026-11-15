# Native Engine Binding — Pinned Source Contract

**Status:** `SOURCE_REVIEWED`; no local installation, host handshake, permission test or native engine execution. This page records upstream behavior at **specific source revisions**, not proof that the user's Windows setup supports them.

| Upstream | Inspected ref | Source-of-truth path |
| --- | --- | --- |
| OpenMausBot | [v0.1.153 / 6f226f15](https://github.com/milind-soni/OpenMausBot/tree/6f226f15def56c697626f2ed6dffac416510c79a) | [Hermes built-in](https://github.com/milind-soni/OpenMausBot/blob/6f226f15def56c697626f2ed6dffac416510c79a/server/drivers/acp/hermes.ts), [Codex built-in](https://github.com/milind-soni/OpenMausBot/blob/6f226f15def56c697626f2ed6dffac416510c79a/server/drivers/codex.ts), [local model discovery](https://github.com/milind-soni/OpenMausBot/blob/6f226f15def56c697626f2ed6dffac416510c79a/server/drivers/local-inject.ts), [approval levels](https://github.com/milind-soni/OpenMausBot/blob/6f226f15def56c697626f2ed6dffac416510c79a/docs/approval-levels.md) |
| Hermes Agent | [main / 77a30e91](https://github.com/NousResearch/hermes-agent/tree/77a30e9127998c0277306c361663f63c0694b88b) | [ACP host integration](https://github.com/NousResearch/hermes-agent/blob/77a30e9127998c0277306c361663f63c0694b88b/website/docs/user-guide/features/acp.md), [provider setup](https://github.com/NousResearch/hermes-agent/blob/77a30e9127998c0277306c361663f63c0694b88b/website/docs/integrations/providers.md) |

These are source pins for design, **not** runtime version locks or endorsement of all default settings. Later installation must identify its own actual versions, compare relevant changed paths and preserve the stricter project policy.

## Verified route mapping

| Advisory route | Intended OpenMausBot integration | Source-backed identity | Gate |
| --- | --- | --- | --- |
| `CODEX` | Built-in Codex engine | `driverKind: codex` | Authenticated Codex CLI/host, sandbox and approval settings |
| `OLLAMA_DIRECT` | Model discovered from local Ollama | No stable dedicated driver asserted | Exact model/hash and host tool-disabling policy verified |
| `HERMES_ACP` | **Built-in Hermes ACP engine** | `driverKind: hermesAgent`, default launch `hermes` with `acp` | ACP, tool allowlist, approvals, 64K context, resource evidence |
| `DETERMINISTIC_TOOL` | Independently approved script/CLI | No agent engine | Verified exact script, host scope, commands and receipts |
| `NONE` | No engine | None | Block |

Source preview implementation: [`src/integrations/native-engine-map.mjs`](../../src/integrations/native-engine-map.mjs). Only `PLAN_ONLY` / `BLOCKED` can result, with `runtimeVerified: false`, `permissionsGranted: false`, `execution: NOT_EXECUTED`. It maps **after** the existing [route advisor](../../src/policy/route-advice.mjs), never executes its result.

### Do not add a redundant adapter

OpenMausBot v0.1.153 **already** implements Hermes in `server/drivers/acp/hermes.ts`. Prefer this built-in driver. The documented `customAcp` instance is a **fallback only** when a specific installed version lacks the Hermes driver, and only after reviewing the actual [custom engine docs](https://github.com/milind-soni/OpenMausBot/blob/6f226f15def56c697626f2ed6dffac416510c79a/docs/custom-engines.md). Do not silently write `~/.openmausbot/config.json` or build an ACP proxy.

The built-in Hermes path may add provider entries to the Hermes configuration when an injected local model is selected. Avoid unreviewed model switching: inspect the installed Hermes default and the picked model ID; record any actual configuration change before approving. Native `hermes-default` is a model-picker option, not evidence that K2 is selected.

## Critical security behavior

- OpenMausBot's documented **default for new local bots and conversations is Full access** (company-hosted policies differ). Before any trial, explicitly set **Ask for approval** on the coordinator, engineer and Hermes bot **and their relevant threads**. A Chief of Staff may propagate its approval level into delegated workers.
- Hermes ACP's default toolset exposes **terminal, process, file writes, patch, code execution and delegation**. It is not inherently read-only. ACP permission requests may be handled by the host; **a prompt or a chat approval level alone is not a filesystem sandbox**.
- Review effective `platform_toolsets.acp`, `agent.disabled_toolsets`, enabled plugin/MCP toolsets, host restrictions and any editor-provided per-session MCP servers before enabling Hermes. Do **not** assume an empty ACP toolset is empty when plugins can add tools.
- A native OpenMausBot model picker can mount tools for API-compatible models. `OLLAMA_DIRECT` means **intended text-only use**; prohibit this route if tool access cannot be disabled and enforced.
- No default shell permissions, no administrative launch, no cross-repository writes, no automatic push/deploy, and no reuse of provider credentials across bots. Never store tokens in this repository.
- Stop if the host fails to enforce permissions, or if a task unexpectedly receives tools not listed by the owner's approved capability inventory.

## Hermes local setup boundary (later PC-local phase)

The upstream Hermes provider documentation supports a **Custom Endpoint** at `http://127.0.0.1:11434/v1` with the locally installed Ollama model ID. No keys are required for a loopback Ollama endpoint. Do not connect a remote/cloud endpoint under a `local_only` task.

The published Hermes Ollama agent guidance requires **64,000 context tokens** and recommends server-side Ollama configuration (API request context does not set it). The RTX 3070 8 GB target may require CPU/RAM offload. **Do not reduce the requirement to claim compatibility**; if a real host cannot meet it, keep Hermes disabled and use the Codex-only path. Direct Ollama text-only routing can be evaluated independently.

## Evidence required before real binding

1. Read installed OpenMausBot version and actual engine list; never infer an installation from this source pin.
2. Verify `codex` and `hermesAgent` are present, or stop. Compare implementation if the installed version differs from the pin.
3. Verify Codex account/CLI mode and **Ask for approval** with actual file/shell restrictions.
4. Verify Ollama model/hash, context, VRAM residency, and an approved no-tool local text session.
5. Verify Hermes `hermes acp --check`, model selection, effective tool inventory and permission-denial behavior before a **bounded** ACP session.
6. Run an approved negative test (unauthorized write denied), then actual cancellation and safe task handoff. All native tests remain **on hold** until a separate, user-selected PC-local validation phase.

**No tool adapter here overrides OpenMausBot's queue, its approval state, or the PC host.** Runtime transcripts and credentials remain local.
