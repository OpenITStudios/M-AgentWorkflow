# Static source/layout and SHA-256 parity check only; not a PC agent/model test.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Required = @(
  'AGENTS.md', 'GITHUB_RULES.md',
  '.agent-standard/profile.json', '.agent-standard/project-policy.md',
  '.agent-standard/standard.lock.json', '.agent-standard/core/INDEX.md',
  'README.md', 'CONTEXT.md', 'docs/README.md',
  'docs/architecture/system.md', 'docs/architecture/authority-and-state.md',
  'docs/governance/permission-matrix.md', 'docs/operations/current-state.md',
  'docs/operations/acceptance.md', 'config/team.example.yaml',
  '.agents/skills/m-agentworkflow-integration/SKILL.md'
)
$Missing = @($Required | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_) -PathType Leaf) })
if ($Missing.Count -gt 0) { throw ('Missing required file(s): ' + ($Missing -join ', ')) }
$Profile = Get-Content -LiteralPath (Join-Path $Root '.agent-standard/profile.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$Lock = Get-Content -LiteralPath (Join-Path $Root '.agent-standard/standard.lock.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($Profile.repository -ne 'OpenITStudios/M-AgentWorkflow') { throw 'Wrong repository identity' }
if ($Profile.activeBranch -ne 'main') { throw 'Unexpected source branch' }
if ($Lock.status -ne 'ADOPTED') { throw 'Portable standard not source-adopted' }
if ($Lock.sourceCommit -ne '40ca9df89e728513199e64128528606b893ac4e1') { throw 'Unexpected pinned source' }
if ($Lock.files.PSObject.Properties.Count -eq 0) { throw 'Empty standard parity lock' }
foreach ($Entry in $Lock.files.PSObject.Properties) {
  $Path = [string]$Entry.Name
  if ([System.IO.Path]::IsPathRooted($Path) -or $Path.Contains('\') -or $Path.Split('/') -contains '..' -or $Path.Split('/') -contains '') {
    throw "Invalid portable file path: $Path"
  }
  $Target = Join-Path $Root ($Path -replace '/', [System.IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath $Target -PathType Leaf)) { throw "Missing portable file: $Path" }
  $Observed = (Get-FileHash -LiteralPath $Target -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($Observed -ne ([string]$Entry.Value).ToLowerInvariant()) { throw "Portable SHA-256 mismatch: $Path" }
}
Write-Output 'STATIC SOURCE STRUCTURE/PARITY PASS. No installed host, tool loop or model inference tested.'
