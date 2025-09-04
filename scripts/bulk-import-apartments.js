// Bulk import apartments script
const axios = require('axios');

// Sample apartment data - you can modify this array
const apartments = [
  {
    name: "Modern Apartment in Bouar",
    slug: "modern-apartment-bouar",
    location: "bouar",
    price: 120000,
    currency: "$",
    description: "Beautiful modern apartment with garden view in Bouar. Perfect for families.",
    shortDescription: "Modern 3BR apartment with garden",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    isFeatured: true,
    priority: 10,
    address: "Bouar, Mount Lebanon",
    contactInfo: "+961 70 123 456"
  },
  {
    name: "Luxury Villa in Adma",
    slug: "luxury-villa-adma",
    location: "adma",
    price: 250000,
    currency: "$",
    description: "Spacious luxury villa with private pool and garden in Adma.",
    shortDescription: "Luxury 4BR villa with pool",
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    isFeatured: true,
    priority: 9,
    address: "Adma, Mount Lebanon",
    contactInfo: "+961 70 123 457"
  },
  {
    name: "Cozy Apartment in Zalka",
    slug: "cozy-apartment-zalka",
    location: "zalka",
    price: 80000,
    currency: "$",
    description: "Cozy 2-bedroom apartment in the heart of Zalka, close to all amenities.",
    shortDescription: "Cozy 2BR in Zalka center",
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    isFeatured: false,
    priority: 5,
    address: "Zalka, Mount Lebanon",
    contactInfo: "+961 70 123 458"
  },
  {
    name: "Family Home in Ghazir",
    slug: "family-home-ghazir",
    location: "ghazir",
    price: 180000,
    currency: "$",
    description: "Perfect family home with large garden and parking in Ghazir.",
    shortDescription: "Family home with garden",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    isFeatured: true,
    priority: 8,
    address: "Ghazir, Mount Lebanon",
    contactInfo: "+961 70 123 459"
  },
  {
    name: "Studio Apartment in Bouar",
    slug: "studio-apartment-bouar",
    location: "bouar",
    price: 60000,
    currency: "$",
    description: "Compact studio apartment perfect for young professionals in Bouar.",
    shortDescription: "Studio for professionals",
    status: "available",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    isFeatured: false,
    priority: 3,
    address: "Bouar, Mount Lebanon",
    contactInfo: "+961 70 123 460"
  }
];

async function importApartments() {
  const baseURL = 'http://localhost:1337';
  
  try {
    console.log('🚀 Starting bulk import of apartments...');
    
    for (let i = 0; i < apartments.length; i++) {
      const apartment = apartments[i];
      
      try {
        const response = await axios.post(`${baseURL}/api/apartments`, {
          data: apartment
        });
        
        console.log(`✅ Imported: ${apartment.name} (ID: ${response.data.data.id})`);
      } catch (error) {
        console.error(`❌ Failed to import: ${apartment.name}`);
        console.error('Error:', error.response?.data || error.message);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🎉 Bulk import completed!');
    console.log('📱 Check your website at: http://localhost:8080/services.html');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

// Run the import
importApartments();
