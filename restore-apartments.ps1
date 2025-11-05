# PowerShell script to restore apartments table from backup

Write-Host "Restoring apartment table from backup..." -ForegroundColor Cyan

if (Test-Path "apartment.backup") {
    if (Test-Path "src\api\apartment") {
        Write-Host "Removing existing apartment folder..." -ForegroundColor Yellow
        Remove-Item -Path "src\api\apartment" -Recurse -Force
    }
    Write-Host "Copying backup..." -ForegroundColor Yellow
    Copy-Item -Path "apartment.backup" -Destination "src\api\apartment" -Recurse -Force
    Write-Host ""
    Write-Host "SUCCESS: Apartment table restored!" -ForegroundColor Green
    Write-Host "You need to clear cache and restart your Strapi server for changes to take effect." -ForegroundColor Yellow
    Write-Host "Run: Remove-Item -Recurse -Force .cache,build; npm run build; npm run develop" -ForegroundColor Yellow
} else {
    Write-Host "ERROR: Backup folder not found at apartment.backup" -ForegroundColor Red
}

Read-Host "Press Enter to continue"
