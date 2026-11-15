# Checks the exact, source-adopted portable AgentSkill bundle against the pinned publisher revision.
# Only for an explicitly selected, trusted PC-local verification phase; read before executing.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$SourceSha = '40ca9df89e728513199e64128528606b893ac4e1'
$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$TemporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('m-agentworkflow-verify-' + [guid]::NewGuid().ToString('N'))
$SourceDir = Join-Path $TemporaryRoot 'AgentSkill'
function Require-Exit([string]$Action) { if ($LASTEXITCODE -ne 0) { throw "$Action failed (exit code $LASTEXITCODE)" } }
try {
  foreach ($tool in @('git','node')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "Missing required executable: $tool" }
  }
  New-Item -ItemType Directory -Path $TemporaryRoot -Force | Out-Null
  & git clone --quiet 'https://github.com/OpenITStudios/AgentSkill.git' $SourceDir
  Require-Exit 'Clone official source'
  & git -C $SourceDir checkout --quiet --detach $SourceSha
  Require-Exit 'Checkout pinned source'
  $ActualSha = (& git -C $SourceDir rev-parse HEAD).Trim()
  Require-Exit 'Read pinned HEAD'
  if ($ActualSha -ne $SourceSha) { throw "Canonical source mismatch: $ActualSha" }
  & node (Join-Path $SourceDir 'tools/standard.mjs') validate
  Require-Exit 'Validate canonical source'
  & node (Join-Path $SourceDir 'tools/standard.mjs') verify $ProjectRoot
  Require-Exit 'Verify exact portable source parity'
  Write-Output 'SOURCE PARITY VERIFIED. Host instruction loading and agent behavior remain unverified.'
} finally {
  if (Test-Path -LiteralPath $TemporaryRoot) { Remove-Item -LiteralPath $TemporaryRoot -Recurse -Force -ErrorAction SilentlyContinue }
}
