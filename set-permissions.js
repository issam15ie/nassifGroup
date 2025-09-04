// Script to set public permissions for apartment API
const axios = require('axios');

async function setPermissions() {
  try {
    console.log('Setting public permissions for apartment API...');
    
    // This would normally require authentication, but for now let's just log what needs to be done
    console.log(`
To fix the 403 Forbidden error, you need to:

1. Go to http://localhost:1337/admin
2. Navigate to Settings > Users & Permissions Plugin > Roles
3. Click on "Public" role
4. Under "Apartment" section, check these permissions:
   - find
   - findOne
   - findFeatured
   - findByLocation
   - search
   - getStats
5. Click "Save"

Alternatively, the bootstrap script should have set these permissions automatically.
    `);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

setPermissions();
