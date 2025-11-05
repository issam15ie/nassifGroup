@echo off
echo Restoring apartment table from backup...

if exist "apartment.backup" (
    if exist "src\api\apartment" (
        echo Removing existing apartment folder...
        rmdir /s /q src\api\apartment
    )
    echo Copying backup...
    xcopy /E /I /Y apartment.backup src\api\apartment
    echo.
    echo SUCCESS: Apartment table restored!
    echo You need to clear cache and restart your Strapi server for changes to take effect.
    echo Run: rmdir /s /q .cache build ^&^& npm run build ^&^& npm run develop
) else (
    echo ERROR: Backup folder not found at apartment.backup
)

pause
