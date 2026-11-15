# Hermes + K2-Horizon — Optional Experimental Local Path

**Target PC:** NVIDIA RTX 3070 (8 GB VRAM); system RAM and Windows/Ollama versions to be observed, not assumed.

**Model candidate:** `ifm/k2-horizon:7b-q4_K_M` served by Ollama. Validate the exact tag and runtime support before integration. Use a bounded initial context and measure placement and tool use; do not infer that the published maximum context fits GPU memory.

**Agent contract:** OpenMausBot may delegate an explicitly scoped task to Hermes through its documented ACP integration **only after real installed-version handshake and tool verification**. Hermes alone controls its execution tools; no duplicate task queue or automatic admin permissions.

**Proof gates:** model download hash/version; model loads; GPU/CPU split observed (`ollama ps`, `nvidia-smi`); bounded inference; two-step tool loop; recovery from failed tool call; idempotent handoff; no hallucinated source writes; stop on memory overflow.

**Fallback:** run Codex without the local worker if any gate fails. Inference-only K2 results cannot be considered verified repository tests, and 8 GB VRAM is not proof of a functional 64K context Hermes setup.

No Hermes or Ollama runtime is included in this repository scaffold.
