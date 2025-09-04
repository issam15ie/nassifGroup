const axios = require('axios');

const API_BASE_URL = 'http://localhost:1337/api';

const sampleApartments = [
  // From bulk-import-apartments.js
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
    contactPhone: "+961 70 123 456"
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
    contactPhone: "+961 70 123 457"
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
    contactPhone: "+961 70 123 458"
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
    contactPhone: "+961 70 123 459"
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
    contactPhone: "+961 70 123 460"
  },
  // Additional apartments
  {
    name: "Modern Apartment in Jounieh",
    slug: "modern-apartment-jounieh-1",
    location: "jounieh",
    price: 180000,
    currency: "$",
    description: "Stunning modern apartment in Jounieh with sea view. Close to all amenities and transportation.",
    shortDescription: "Modern 2BR apartment with sea view",
    status: "available",
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    isFeatured: true,
    priority: 7,
    address: "Jounieh, Mount Lebanon",
    contactPhone: "+961 70 234 567"
  },
  {
    name: "Family Apartment in Antelias",
    slug: "family-apartment-antelias-1",
    location: "antelias",
    price: 200000,
    currency: "$",
    description: "Spacious family apartment in Antelias with large living areas and modern kitchen.",
    shortDescription: "Spacious 4BR family apartment",
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    isFeatured: true,
    priority: 6,
    address: "Antelias, Mount Lebanon",
    contactPhone: "+961 70 456 789"
  },
  {
    name: "Studio Apartment in Kaslik",
    slug: "studio-apartment-kaslik-1",
    location: "kaslik",
    price: 80000,
    currency: "$",
    description: "Modern studio apartment in Kaslik, perfect for students and young professionals.",
    shortDescription: "Modern studio in Kaslik",
    status: "available",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    isFeatured: false,
    priority: 2,
    address: "Kaslik, Mount Lebanon",
    contactPhone: "+961 70 567 890"
  },
  {
    name: "Premium Apartment in Broumana",
    slug: "premium-apartment-broumana-1",
    location: "broumana",
    price: 220000,
    currency: "$",
    description: "Premium apartment in Broumana with mountain views and luxury finishes throughout.",
    shortDescription: "Premium 3BR with mountain views",
    status: "available",
    bedrooms: 3,
    bathrooms: 3,
    area: 160,
    isFeatured: true,
    priority: 4,
    address: "Broumana, Mount Lebanon",
    contactPhone: "+961 70 678 901"
  },
  {
    name: "Affordable Apartment in Sin El Fil",
    slug: "affordable-apartment-sin-el-fil-1",
    location: "sin-el-fil",
    price: 95000,
    currency: "$",
    description: "Affordable apartment in Sin El Fil, great value for money with good transportation links.",
    shortDescription: "Affordable 2BR in Sin El Fil",
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    isFeatured: false,
    priority: 1,
    address: "Sin El Fil, Mount Lebanon",
    contactPhone: "+961 70 789 012"
  },
  {
    name: "Penthouse in Dbayeh",
    slug: "penthouse-dbayeh-1",
    location: "dbayeh",
    price: 350000,
    currency: "$",
    description: "Luxurious penthouse in Dbayeh with panoramic views and premium amenities.",
    shortDescription: "Luxury penthouse with panoramic views",
    status: "available",
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    isFeatured: true,
    priority: 5,
    address: "Dbayeh, Mount Lebanon",
    contactPhone: "+961 70 890 123"
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Check if Strapi is running
    await axios.get(`${API_BASE_URL}/apartments?pagination[pageSize]=1`);
    console.log('✅ Strapi is running and accessible');
  } catch (error) {
    console.error('❌ Strapi is not running or not accessible');
    console.error('Please start Strapi first: npm run develop');
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const apartment of sampleApartments) {
    try {
      const response = await axios.post(`${API_BASE_URL}/apartments`, {
        data: apartment
      });
      
      console.log(`✅ Added: ${apartment.name}`);
      successCount++;
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Failed to add: ${apartment.name}`);
      console.error(`   Error: ${error.response?.data?.error?.message || error.message}`);
      errorCount++;
    }
  }

  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Successfully added: ${successCount} apartments`);
  console.log(`❌ Failed to add: ${errorCount} apartments`);
  
  if (successCount > 0) {
    console.log('\n🎉 Database seeded successfully!');
    console.log('🌐 Visit your website: http://localhost:8080/services.html');
  }
}

// Run the seeding
seedDatabase().catch(console.error);
