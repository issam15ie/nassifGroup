// Script to update apartments through Strapi API (recommended method)
const axios = require('axios');

// Example: Update an existing apartment
async function updateApartment(apartmentId, updates) {
  const baseURL = 'http://localhost:1337';
  
  try {
    console.log(`🔄 Updating apartment ID: ${apartmentId}...`);
    
    const response = await axios.put(`${baseURL}/api/apartments/${apartmentId}`, {
      data: updates
    });
    
    console.log(`✅ Updated: ${response.data.data.attributes.name} (ID: ${response.data.data.id})`);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Failed to update apartment ${apartmentId}:`);
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

// Example: Update multiple apartments
async function updateMultipleApartments() {
  const updates = [
    {
      id: 1,
      data: {
        name: "Updated Sarkis Home",
        price: 130000,
        description: "Updated description for Sarkis home with new features.",
        status: "available"
      }
    },
    {
      id: 2,
      data: {
        price: 125000,
        isFeatured: true,
        priority: 15
      }
    }
  ];

  try {
    console.log('🚀 Starting apartment updates via API...');
    
    for (const update of updates) {
      await updateApartment(update.id, update.data);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🎉 All updates completed successfully!');
    console.log('📱 Check your website at: http://localhost:8080/services.html');
    
  } catch (error) {
    console.error('❌ Update process failed:', error.message);
  }
}

// Example usage
async function main() {
  // Wait for Strapi to start
  console.log('⏳ Waiting for Strapi to start...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  // Test if Strapi is running
  try {
    await axios.get('http://localhost:1337/api/apartments');
    console.log('✅ Strapi is running, proceeding with updates...');
  } catch (error) {
    console.error('❌ Strapi is not running. Please start it first with: npm run develop');
    return;
  }
  
  // Run updates
  await updateMultipleApartments();
}

// Run the script
main();
