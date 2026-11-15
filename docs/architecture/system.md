# System Architecture — Intended Design and Source-Only Policy

## Scope

Use one orchestrator and up to three **execution recommendations**, not three competing AI leadership loops. This is a source design, **not** proof that OpenMausBot or Hermes is installed or working on Windows.

```text
[Human owner: goal, scope, approval]
                 |
        [OpenMausBot task owner]
                 |
    [host-enforced permissions]
                 |
       [stateless policy advice]
             /    |     \
            /     |      \
 [Codex native] [Reviewed CLI] [Local task]
    primary     deterministic    /      \
 engineering                [Ollama] [Hermes ACP]
                             direct     |
                                       [Ollama]
                                          |
                                    [K2-Horizon]
                   \         |          /
                    [real evidence receipts]
                             |
                   [review / human owner]
```

## Ownership

1. **OpenMausBot**: global task IDs, delegation, lifecycle, cancellation and approvals, never a substitute for filesystem permissions.
2. **Codex**: primary engineering agent for architecture, code, source inspection, and independent review (separate context).
3. **Script/CLI**: deterministic transformations only through an approved script/host, with real command receipts.
4. **Direct Ollama/K2**: optional local bounded text utility without Hermes when no agent tools are needed.
5. **Hermes ACP/K2**: optional experimental local agent when tool-loop, context, ACP and permission enforcement are actually verified.
6. **OpenClaw**: outside initial scope. Do not introduce a second global orchestrator.
7. **Git**: repository source of truth; runtime evidence stays on the PC or inside engine-owned state and must identify the exact source SHA.

## Source policy versus active runtime

[Routing and handoff](routing-and-contracts.md) defines a **pure offline advisory function** and task/result contracts. It **cannot** submit work, grant approval or claim tests passed. `config/*.example.*` are not native OpenMausBot/Hermes import files.

## Planned connectors (not implemented)

| Connection | Preferred boundary | Missing acceptance |
| --- | --- | --- |
| OpenMausBot -> Codex | Installed built-in Codex engine | Authenticated host, scoped read, real receipt |
| OpenMausBot -> Ollama/K2 | Supported local model provider for text-only utility | Model identity, actual VRAM/context, privacy |
| OpenMausBot -> Hermes | Installed Hermes ACP engine | Handshake, tools, approvals, cancellation |
| Hermes -> Ollama/K2 | Installed local inference endpoint | Context >= configured gate, multi-step tool loop |
| Model outputs -> reviewer | Bounded evidence reference envelope | Source pin, independent proof, explicit unknowns |

## Concurrency and budget

Initial limit: one local worker, no nested worker delegation, no simultaneous writes to a shared worktree. Parallelize independent **read-only** work only when it reduces end-to-end cost. Repo writes require approved isolated worktrees and affected-consumer review. Do not enable CI or native tests during the source-only hold.
