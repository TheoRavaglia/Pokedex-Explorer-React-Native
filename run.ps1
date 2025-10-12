# Script para rodar o app no emulador Small_Phone
Write-Host "Iniciando emulador Small_Phone..." -ForegroundColor Green

$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path = "$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools;$env:Path"

# Iniciar emulador
Start-Process "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd","Small_Phone"

Write-Host ""
Write-Host "Aguarde o emulador abrir (30-60 segundos)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Depois execute: npm start" -ForegroundColor Cyan
Write-Host "E pressione 'a' para abrir no Android" -ForegroundColor Cyan
Write-Host ""
