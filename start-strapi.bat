@echo off
echo 🚀 Starting Strapi CMS...
echo.
echo This will start the Strapi admin panel at: http://localhost:1337/admin
echo.
cd /d "%~dp0"
npm run develop
pause
