# Nassif Group Real Estate - Start All Services
Write-Host "🚀 Starting Nassif Group Real Estate System..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start both Strapi CMS and Website Server" -ForegroundColor Yellow
Write-Host ""
Write-Host "📱 Strapi Admin: http://localhost:1337/admin" -ForegroundColor Cyan
Write-Host "🌐 Website: http://localhost:8080/" -ForegroundColor Cyan
Write-Host ""

# Start Strapi in background
Write-Host "Starting Strapi CMS..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run develop"

# Wait for Strapi to start
Write-Host "Waiting 15 seconds for Strapi to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Start Website Server
Write-Host "Starting Website Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server.js"

Write-Host ""
Write-Host "✅ Both services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Strapi Admin Panel: http://localhost:1337/admin" -ForegroundColor Cyan
Write-Host "🌐 Your Website: http://localhost:8080/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
