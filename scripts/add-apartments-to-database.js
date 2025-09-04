// Script to add apartments directly to SQLite database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your SQLite database
const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');

// Sample apartments to add
const apartments = [
  {
    name: "Penthouse in Adma",
    slug: "penthouse-adma",
    location: "adma",
    price: 300000,
    currency: "$",
    description: "Luxurious penthouse with panoramic views in Adma. Perfect for executives.",
    shortDescription: "Executive penthouse with views",
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    isFeatured: true,
    priority: 15,
    address: "Adma, Mount Lebanon",
    contactInfo: "+961 70 123 461"
  },
  {
    name: "Garden Villa in Zalka",
    slug: "garden-villa-zalka",
    location: "zalka",
    price: 200000,
    currency: "$",
    description: "Beautiful villa with large garden and private pool in Zalka.",
    shortDescription: "Villa with garden and pool",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    isFeatured: true,
    priority: 12,
    address: "Zalka, Mount Lebanon",
    contactInfo: "+961 70 123 462"
  },
  {
    name: "Modern Loft in Ghazir",
    slug: "modern-loft-ghazir",
    location: "ghazir",
    price: 95000,
    currency: "$",
    description: "Contemporary loft with open plan design in Ghazir.",
    shortDescription: "Modern open-plan loft",
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    isFeatured: false,
    priority: 7,
    address: "Ghazir, Mount Lebanon",
    contactInfo: "+961 70 123 463"
  }
];

function addApartmentsToDatabase() {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Error opening database:', err.message);
      return;
    }
    console.log('✅ Connected to SQLite database');
  });

  // Get current timestamp
  const now = new Date().toISOString();

  apartments.forEach((apartment, index) => {
    const sql = `
      INSERT INTO apartments (
        name, slug, location, price, currency, description, short_description,
        status, bedrooms, bathrooms, area, is_featured, priority, address,
        contact_phone, created_at, updated_at, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      apartment.name,
      apartment.slug,
      apartment.location,
      apartment.price,
      apartment.currency,
      apartment.description,
      apartment.shortDescription,
      apartment.status,
      apartment.bedrooms,
      apartment.bathrooms,
      apartment.area,
      apartment.isFeatured ? 1 : 0, // SQLite uses 1/0 for boolean
      apartment.priority,
      apartment.address,
      apartment.contactInfo,
      now,
      now,
      now // published_at
    ];

    db.run(sql, values, function(err) {
      if (err) {
        console.error(`❌ Error inserting ${apartment.name}:`, err.message);
      } else {
        console.log(`✅ Added: ${apartment.name} (ID: ${this.lastID})`);
      }
    });
  });

  // Close database connection
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log('🎉 Database operations completed!');
      console.log('📱 Check your website at: http://localhost:8080/services.html');
    }
  });
}

// Run the function
addApartmentsToDatabase();
