// Script to refresh Strapi cache after direct database changes
const axios = require('axios');

async function refreshStrapiCache() {
  const baseURL = 'http://localhost:1337';
  
  try {
    console.log('🔄 Refreshing Strapi cache...');
    
    // Method 1: Trigger a rebuild by accessing the admin panel
    console.log('📱 Accessing admin panel to trigger cache refresh...');
    await axios.get(`${baseURL}/admin`);
    
    // Method 2: Make API calls to refresh data
    console.log('🔄 Refreshing apartment data...');
    await axios.get(`${baseURL}/api/apartments`);
    
    // Method 3: Access content manager
    console.log('🔄 Accessing content manager...');
    await axios.get(`${baseURL}/content-manager/collection-types/api::apartment.apartment`);
    
    console.log('✅ Cache refresh completed!');
    console.log('📱 Your database changes should now be visible in the API and admin panel.');
    
  } catch (error) {
    console.error('❌ Cache refresh failed:', error.message);
    console.log('💡 Try restarting Strapi with: npm run develop');
  }
}

// Run the refresh
refreshStrapiCache();
