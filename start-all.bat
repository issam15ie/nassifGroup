@echo off
echo 🚀 Starting Nassif Group Real Estate System...
echo.
echo This will start both Strapi CMS and Website Server
echo.
echo 📱 Strapi Admin: http://localhost:1337/admin
echo 🌐 Website: http://localhost:8080/
echo.
cd /d "%~dp0"

echo Starting Strapi CMS in background...
start "Strapi CMS" cmd /k "npm run develop"

echo Waiting 10 seconds for Strapi to start...
timeout /t 10 /nobreak > nul

echo Starting Website Server...
start "Website Server" cmd /k "node server.js"

echo.
echo ✅ Both services are starting!
echo.
echo 📱 Strapi Admin Panel: http://localhost:1337/admin
echo 🌐 Your Website: http://localhost:8080/
echo.
echo Press any key to close this window...
pause > nul
