$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$path = Join-Path $root "src\routes\patient.tsx"

if (-not (Test-Path (Join-Path $root "package.json"))) {
  throw "Wrong folder. Run this from C:\Users\SHARAN\SIH\smart-doctor-desk"
}

if (-not (Test-Path $path)) {
  throw "Cannot find src\routes\patient.tsx"
}

# Make a backup first
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = Join-Path $root "patient.tsx.backup-$stamp"
Copy-Item $path $backup

$s = Get-Content $path -Raw

# Remove the old doctor-assignment display from the patient verification screen.
# Use a single-quoted PowerShell string so the JSX quotes do not break the script.
$old = '<Row label="Assigned Doctor" value={getDoctorById(patient.assignedDoctorId)?.name ?? patient.assignedDoctorId} />'
$new = '<Row label="OPD Queue" value="Common queue - doctor selected by severity and urgency" />'

if ($s.Contains($old)) {
  $s = $s.Replace($old, $new)
}

# Also handle the multiline version if that is what the local file contains.
$oldMulti = @'
              <Row
                label="Assigned Doctor"
                value={getDoctorById(patient.assignedDoctorId)?.name ?? patient.assignedDoctorId}
              />
'@

if ($s.Contains($oldMulti)) {
  $s = $s.Replace($oldMulti, $new)
}

# Remove getDoctorById from the import if it is no longer used.
$s = $s.Replace('  getDoctorById,' + "`r`n", '')
$s = $s.Replace('  getDoctorById,' + "`n", '')

# Remove any remaining exact JSX reference.
$s = $s.Replace(
  'getDoctorById(patient.assignedDoctorId)?.name ?? patient.assignedDoctorId',
  'Common queue - doctor selected by severity and urgency'
)

Set-Content $path $s -Encoding utf8

Write-Host ""
Write-Host "PATIENT PORTAL FIX APPLIED" -ForegroundColor Green
Write-Host ""
Write-Host "Backup created:"
Write-Host $backup
Write-Host ""
Write-Host "Next:"
Write-Host "1. If bun run dev is currently running, press Ctrl+C."
Write-Host "2. Run: bun run dev"
Write-Host "3. Open: http://localhost:8081/patient"
Write-Host ""
Write-Host "The patient portal should now compile without the old doctor-assignment reference."
