const axios = require('axios');

const API_BASE_URL = 'http://localhost:1337/api';

const sampleApartments = [
  {
    name: "Luxury Apartment in Bouar",
    slug: "luxury-apartment-bouar-1",
    location: "bouar",
    price: 150000,
    currency: "$",
    description: "Beautiful luxury apartment with garden view in Bouar. Perfect for families with modern amenities.",
    shortDescription: "Luxury 3BR apartment with garden",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    isFeatured: true,
    priority: 10,
    address: "Bouar, Mount Lebanon",
    contactPhone: "+961 70 123 456"
  },
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
    priority: 9,
    address: "Jounieh, Mount Lebanon",
    contactPhone: "+961 70 234 567"
  },
  {
    name: "Cozy Apartment in Zalka",
    slug: "cozy-apartment-zalka-1",
    location: "zalka",
    price: 120000,
    currency: "$",
    description: "Cozy and comfortable apartment in Zalka. Perfect for young professionals and small families.",
    shortDescription: "Cozy 2BR apartment in Zalka",
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    isFeatured: false,
    priority: 5,
    address: "Zalka, Mount Lebanon",
    contactPhone: "+961 70 345 678"
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
    priority: 8,
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
    priority: 3,
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
    priority: 7,
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
    priority: 4,
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
    priority: 6,
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
