@echo off
echo 🌐 Starting Website Server...
echo.
echo This will start the website at: http://localhost:8080/
echo.
cd /d "%~dp0"
node server.js
pause
