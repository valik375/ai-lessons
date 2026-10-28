param(
  [string]$Task = 'dev',
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$TaskArgs
)
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
# Prefer the known working runtime; the system nvm shim may exist but fail.
$runtimeRoot = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
$nodeBin = Join-Path $runtimeRoot 'node\bin'
if (Test-Path (Join-Path $nodeBin 'node.exe')) {
  $env:PATH = "$nodeBin;$(Join-Path $runtimeRoot 'bin\fallback');$env:PATH"
} elseif (-not (Get-Command node -ErrorAction SilentlyContinue) -or -not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw 'Install Node.js 24 LTS and pnpm, then run this command again.'
}
$env:CYPRESS_CACHE_FOLDER = Join-Path (Get-Location) '.tools\cypress'
if ($Task -eq 'install') {
  & pnpm install --store-dir .pnpm-store @TaskArgs
} else {
  & pnpm run $Task @TaskArgs
}
exit $LASTEXITCODE
