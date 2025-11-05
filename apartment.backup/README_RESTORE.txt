APARTMENT TABLE BACKUP
======================

This folder contains a backup of the apartment content type.

Created: Backup was created before potential removal

HOW TO RESTORE:
---------------

Option 1: Run the restore script
- Windows: Double-click "restore-apartments.bat"
- PowerShell: Run ".\restore-apartments.ps1"

Option 2: Manual restore
1. Navigate to: root folder
2. If "src/api/apartment" folder exists, delete it
3. Run: Copy-Item -Recurse apartment.backup src/api/apartment
4. Restart Strapi server

WHY WAS THIS BACKED UP:
-----------------------
- The apartment table is not currently being used in production
- Most apartments (8 out of 9) were linked to "Unknown Project"
- Featured apartments section on homepage is commented out
- "View Details" buttons showed empty results

The backup was created to allow easy rollback if needed in the future.

