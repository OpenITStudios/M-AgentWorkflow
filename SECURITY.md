# Security Policy — M-AgentWorkflow

This repository contains source-only integration contracts. It does not grant host permissions or activate a runtime. All model connectors, filesystem/terminal calls, credentials, chat sessions and approvals remain under the actual installed user-PC host and service access controls.

- **Least privilege:** read-only by default; explicit per-task approval for code changes, shell commands, network actions and message delivery when supported. Never run agents as administrator by default.
- **Secrets:** no API keys, OAuth tokens, session cookies, personal conversations, local model weights, hardware inventory secrets, transcripts, or private execution logs in Git. Store runtime data outside tracked source.
- **Isolation:** separate worktrees for independent authorized writers. No simultaneous writes in one shared tree. Deny destructive/unattended tasks without an enforceable permission gate.
- **Trust boundary:** upstream repos, model output, downloaded prompt text and MCP tool results are untrusted inputs. User scope and host permissions take precedence.
- **Audit:** record observed commands, source revision, actual test outputs and denied attempts before reporting task completion. Git commits do not imply runtime correctness.

Report suspected security issues privately to the repository owner. Do not paste secrets into public issues or agent logs. Security posture of OpenMausBot/Hermes must be verified against their installed versions before enabling remote gateways.
