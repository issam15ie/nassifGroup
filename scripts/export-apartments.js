const axios = require('axios');

const API_BASE_URL = 'http://localhost:1337/api';

async function exportApartments() {
  console.log('📤 Exporting all apartments from database...');
  
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
    
    console.log(`📊 Found ${apartments.length} apartments in database`);
    
    // Format apartments for seeding script
    const formattedApartments = apartments.map(apt => ({
      name: apt.attributes.name,
      slug: apt.attributes.slug,
      location: apt.attributes.location,
      price: apt.attributes.price,
      currency: apt.attributes.currency,
      description: apt.attributes.description,
      shortDescription: apt.attributes.shortDescription,
      status: apt.attributes.status,
      bedrooms: apt.attributes.bedrooms,
      bathrooms: apt.attributes.bathrooms,
      area: apt.attributes.area,
      isFeatured: apt.attributes.isFeatured,
      priority: apt.attributes.priority,
      address: apt.attributes.address,
      contactPhone: apt.attributes.contactPhone
    }));
    
    // Create the JavaScript array format
    const jsArray = `const sampleApartments = ${JSON.stringify(formattedApartments, null, 2)};`;
    
    console.log('\n📝 Formatted apartments for seeding script:');
    console.log('=' .repeat(50));
    console.log(jsArray);
    console.log('=' .repeat(50));
    
    console.log('\n✅ Export completed!');
    console.log('📋 Copy the above array and replace the sampleApartments in scripts/seed-database.js');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    console.error('Error details:', error.response?.data || error.message);
  }
}

// Run the export
exportApartments().catch(console.error);
