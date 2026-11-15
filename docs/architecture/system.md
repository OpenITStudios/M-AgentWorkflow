# System Architecture — Intended Design

## Scope

Use one orchestrator and two distinct execution paths, not three independent AI leadership loops. This is a **target design**, not evidence of an installed or working integration.

```text
[Human Owner / explicit consent]
                |
                v
 [OpenMausBot coordination UI]
  assignment | task ID | approval | cancellation
          /                      \
         v                        v
[Codex CLI/IDE executor]   [Hermes ACP adapter (optional)]
  primary engineering          |
  git and tooling        [Ollama local API]
  planned reviews               |
                         [K2-Horizon-7B Q4_K_M]
         \                       /
          v                     v
   [Evidence + bounded result handoff]
                |
                v
     [Independent review / Owner]
```

## Design responsibilities

1. **OpenMausBot**: owns global task IDs, delegation and approvals. Cannot implicitly grant OS/GitHub rights; host permission checks still apply.
2. **Codex**: primary reasoning, architecture, implementation and scoped repo QA (not a guarantee that a test ran).
3. **Hermes**: translates a delegated, bounded local task into tools/model calls. It must not manage a duplicate global task database.
4. **Ollama/K2**: local inference, not a computer-control agent by itself. GPU target RTX 3070 8 GB; 64K agent context and reliable multistep tool use are **unverified**.
5. **OpenClaw**: out of initial scope. If added later, give it messaging-only responsibility or a separately designed edge; no duplicate authority.

## Avoid overlapping controls

- One **task lifecycle** owner: OpenMausBot.
- One **repository truth**: exact Git branch/commit and current source.
- One **local permission decision**: the executing host/tool sandbox and explicit owner approvals.
- One **evidence payload per task**: references to receipts, not copied model assertions.
- One **model route decision** per task: default Codex, experimental Hermes only when task class and resource budget permit.

## Planned connectors (not implemented)

| Connection | Target interface | Initial state | Blocking proof |
|---|---|---|---|
| OpenMausBot → Codex | Built-in Codex engine, version to be pinned | Not configured | Agent handshake and simple verified task |
| OpenMausBot → Hermes | ACP adapter, version to be pinned | Not configured | Tool availability, context and delegation test |
| Hermes → Ollama | Local model API | Not configured | Runtime model/version, GPU memory and tool-loop test |
| OpenClaw (optional) | No initial connection | Out of scope | Separate decision and security review |

## Concurrency

Independent read-only research may run concurrently. Changes to shared code require explicitly authorized isolated Git worktrees. Aggregation must verify which SHA, branch, test command and result each worker used. Never accept a worker's claimed PASS without evidence.
