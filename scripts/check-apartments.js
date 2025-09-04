const axios = require('axios');

const API_BASE_URL = 'http://localhost:1337/api';

async function checkApartments() {
  console.log('🔍 Checking apartments in database...');
  
  try {
    // Check if Strapi is running
    await axios.get(`${API_BASE_URL}/apartments?pagination[pageSize]=1`);
    console.log('✅ Strapi is running and accessible');
  } catch (error) {
    console.error('❌ Strapi is not running or not accessible');
    console.error('Please start Strapi first: npm run develop');
    process.exit(1);
  }

  try {
    // Get all apartments
    const response = await axios.get(`${API_BASE_URL}/apartments?pagination[pageSize]=100`);
    const apartments = response.data.data;
    
    console.log(`📊 Found ${apartments.length} apartments in database:`);
    console.log('=' .repeat(50));
    
    apartments.forEach((apt, index) => {
      console.log(`${index + 1}. ${apt.attributes.name}`);
      console.log(`   Location: ${apt.attributes.location}`);
      console.log(`   Price: ${apt.attributes.currency}${apt.attributes.price}`);
      console.log(`   Status: ${apt.attributes.status}`);
      console.log(`   Featured: ${apt.attributes.isFeatured ? 'Yes' : 'No'}`);
      console.log('');
    });
    
    console.log('=' .repeat(50));
    console.log(`✅ Total: ${apartments.length} apartments`);
    
    if (apartments.length > 0) {
      console.log('\n💡 To export all apartments for seeding script, run:');
      console.log('   node scripts/export-apartments.js');
    }
    
  } catch (error) {
    console.error('❌ Failed to check apartments:', error.message);
    console.error('Error details:', error.response?.data || error.message);
  }
}

// Run the check
checkApartments().catch(console.error);
