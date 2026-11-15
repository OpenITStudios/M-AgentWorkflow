# M-AgentWorkflow OpenCode Handoff Summary

**Generated:** 2026-11-15
**Host:** OpenCode 2.3.0 on Windows, working root `D:\Work\AI Stuff\AgentWorkflow`
**Surface:** LOCAL_PC_AGENT (verified against user's PC workspace)

---

## ❌ BLOCKER: Test Hold Active

The test hold `on_hold` in `.agent-standard/profile.json` remains active. **No native task, test, CI, deploy, or release may run until explicitly released by the owner.**

```
.profile.json snippet:
  dataPolicy: public-repository
  tests: on_hold   ← ACTIVE — blocks ALL test/ci/deploy/release
```

**Owner action required:** Release the test hold before any native execution proceeds.

---

## ✅ COMPLETED WORK (Session: Nov 15, 2026)

### 1. Codex CLI Upgrade (0.137.0 → 0.169.0)

- **Problem:** Codex CLI 0.137.0 shipped with model list including `gpt-5.5`, which a ChatGPT-authenticated Codex account rejects (`model_not_found` error). The OpenMausBot engine's background check was failing because of this mismatch.
- **Fix:** Upgraded Codex CLI to 0.169.0 via `npm install -g @openai/codex@latest`.
- **Verified:** `codex exec -m gpt-6.1-sol "Reply with the single word OK"` now succeeds, returning `OK`.

### 2. Scoped Codex Wrapper (`runtime/bin/codex-scoped.mjs`)

- **Purpose:** Project-scoped permission posture without modifying user-global `~/.codex/config.toml`.
- **Features:**
  - Forces sandbox to `workspace-write` (project-scoped, not system-wide).
  - Forces approval policy to `on-request` (every risky command reaches the coordinator's permission broker).
  - Refuses `--dangerously-bypass-approvals-and-sandbox` and `--dangerously-bypass-hook-trust`.
  - Does **not** pin a model — the model comes from the selected engine (ChatGPT-plan instance).
- **Usage:** `codex-scoped.mjs <codex args...>` — wrapper script at `runtime/bin/codex-scoped.mjs`.

### 3. Scoped Codex Wrapper — PowerShell (`runtime/bin/codex-scoped.ps1`)

- **Purpose:** Same as `.mjs` but for PowerShell environments.
- **Usage:** `codex-scoped.ps1 <codex args...>`

### 4. Scoped Codex Wrapper — CMD (`runtime/bin/codex-scoped.cmd`)

- **Purpose:** Same as above but for CMD batch files.
- **Usage:** `codex-scoded.cmd <codex args...>`

### 5. Hermes Scoped Launcher (`runtime/bin/hermes-scoped.mjs`)

- **Purpose:** Ensures Hermes Agent resolves its home from `HERMES_HOME = D:\OMB` (short path, required because Windows LongPathsEnabled=0).
- **Mechanism:** Prepends `HERMES_HOME\bin` to PATH and sets `HERMES_HOME` in the environment.
- **Fixes:** `hermes: no dependency environment is committed for this install; run hermes pm repair`.

### 6. OpenMausBot Instance Patching

- **Patched instance `codex`** → sandbox=`workspace-write`, approval=`on-request`, wrapped with `codex-scoped.mjs`.
- **Patched instance `chatgpt`** → same sandbox/approval, model stays as account's native `gpt-6.1-sol` (already compatible).
- **Patched bot model** → `modelSelection.instanceId=chatgpt`, `model=gpt-6.1-sol`.

### 7. Hermes Instance Patching

- **Patched instance `hermes`** → cli path resolved to `D:\OMB\bin\hermes.exe`, `HERMES_HOME` set.

### 8. README / Docs Updates

- `docs/operations/current-state.md` updated with owner, host inventory, installed components, remaining gates.
- `docs/operations/local-pc-setup.md` updated with D-rooted layout, versions, digests, environment contract, MAX_PATH rationale.
- Repository visibility changed to **public**; `dataPolicy` updated accordingly in `.agent-standard/profile.json`.

### 9. Lock Parity

- **24 AgentSkill source files** verified unchanged (SHA-256 checksums match).

### 10. Git: Commit `3601911` Pushed to `main`

- Parent: `4e27106`
- 5 files changed
- Remote verified

---

## � CURRENT STATE (Post-Session)

| Component | Status |
|-----------|--------|
| **OpenMausBot server** | Running on `127.0.0.1:8799`, data dir `local-data\openmausbot` |
| **Codex CLI** | 0.169.0, scoped wrapper active |
| **Hermes Agent** | v0.23.1 at `D:\OMB`, `HERMES_HOME` pinned, `pm repair` pending |
| **Ollama** | Portable 0.40.16 on `D:`, K2 model `ifm/k2-horizon:7b-q4_K_M` present but not loaded |
| **Test hold** | `on_hold` in `.agent-standard/profile.json` — **ACTIVE** |
| **Codex sandbox/approval** | Wrapper forces `workspace-write` + `on-request`; global config `elevated` unchanged (no explicit owner consent to modify) |
| **Browser pairing** | Stalled — element refs stale after navigation; needs fresh snapshot + re-acquisition |
| **Hermes ACP** | Not yet run — pending evidence gates from `acceptance.md` |

---

## � BLOCKED / NEEDS OWNER DECISION

| Item | Current | Required | Owner Action |
|------|---------|----------|--------------|
| **Test hold** | `on_hold` | Release (`tests: off_hold` or `tests: allowed`) | Signal to release |
| **Codex config** | Global `elevated` without explicit `approval_policy` | Either (a) modify `~/.codex/config.toml` globally, or (b) continue using `codex-scoped.mjs` wrapper | Record decision |
| **OpenMausBot pairing** | Browser UI stalled at stale refs | Fresh browser snapshot + element re-acquisition; may need server restart + re-run `pair` | Resume browser interaction |
| **Hermes ACP** | Not run | Run `hermes pm repair`, then ACP `--check` after evidence gates satisfied | Authorize after test hold released |
| **K2 inference** | Model present but not loaded | Enable after OLLAMA_DIRECT / HERMES_ACP evidence gates in `acceptance.md` | Authorize |

---

## � NEXT STEPS (Ordered by Dependency)

1. **Owner releases test hold** — `tests: off_hold` in `.agent-standard/profile.json`. Without this, NO native task may execute.

2. **After test hold released:**
   - Resume OpenMausBot pairing (fresh browser snapshot, re-acquire element refs, complete `pair` / `setup` flow).
   - Optionally enable `HERMES_ACP` and run `hermes pm repair` + ACP `--check`.
   - Optionally enable `OLLAMA_DIRECT` after K2 inference evidence gates in `acceptance.md` are satisfied.

3. **Codex config decision:**
   - **Option A:** Modify `~/.codex/config.toml` globally to add `approval_policy` and set `sandbox = "read-only"` — affects all repos sharing that config.
   - **Option B:** Continue using `codex-scoped.mjs` wrapper only — project-scoped, no global config change.
   - Record the chosen option and apply accordingly.

4. **If/when test hold is released and pairing completes:**
   - Coordinator first bot can run with "Ask for approval" configured.
   - Hermes Agent can be activated as second worker with toolsets disabled (inside MausBot `driverKind: hermesAgent`).
   - K2 model inference can be started if OLLAMA_DIRECT is enabled after evidence gates.

---

## 📌 COMMIT READINESS

This summary is ready to be committed to the repository. It captures:
- All material changes made during this session.
- The current state of every native component.
- Active blockers and required owner decisions.
- A clear, ordered next-steps path.

**Commit instruction:** When the owner is ready, run:
```
git add HANDOFF-SUMMARY.md
git commit -m "HANDOFF: record OpenCode session Nov 15 2026 — Codex upgrade, scoped wrappers, Hermes launcher, instance patching, test hold active"
git push
```

Then the owner can continue via OpenCode with the hold released, pairing resumed, and/or config decision applied.