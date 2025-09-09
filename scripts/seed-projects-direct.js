const strapi = require('@strapi/strapi');

async function seedProjectsDirect() {
  let strapiInstance;
  
  try {
    console.log('🌱 Starting direct project seeding...');
    
    // Initialize Strapi
    strapiInstance = await strapi({
      appDir: process.cwd(),
      distDir: './dist'
    });
    
    await strapiInstance.load();
    
    console.log('📍 Creating locations...');
    
    // Create locations
    const locations = [
      { name: 'Colina', slug: 'colina', description: 'Prime location in Colina area', city: 'Beirut', region: 'Mount Lebanon' },
      { name: 'Shayle', slug: 'shayle', description: 'Desirable location in Shayle area', city: 'Beirut', region: 'Mount Lebanon' },
      { name: 'Fat2a', slug: 'fat2a', description: 'Location in Fat2a area', city: 'Beirut', region: 'Mount Lebanon' },
      { name: 'Mejlaya', slug: 'mejlaya', description: 'Location in Mejlaya area', city: 'Beirut', region: 'Mount Lebanon' },
      { name: 'Zouk', slug: 'zouk', description: 'Location in Zouk area', city: 'Beirut', region: 'Mount Lebanon' }
    ];
    
    const locationMap = {};
    
    for (const locationData of locations) {
      try {
        const location = await strapiInstance.entityService.create('api::location.location', {
          data: locationData
        });
        locationMap[locationData.name] = location.id;
        console.log(`✅ Created location: ${locationData.name}`);
      } catch (error) {
        console.error(`❌ Error creating location ${locationData.name}:`, error.message);
      }
    }
    
    console.log('🏗️  Creating projects...');
    
    // Create projects
    const projects = [
      {
        name: 'Bouar 638',
        slug: 'bouar-638',
        description: 'Premium residential project in Colina with various unit types',
        status: 'available',
        location: locationMap['Colina'],
        priority: 10,
        units: [
          { type: 'simplex', size_min: 100, size_max: 145, status: 'available' },
          { type: 'duplex', size_min: 105, size_max: 165, status: 'available' },
          { type: 'shop', size_min: 50, size_max: 130, status: 'available' }
        ]
      },
      {
        name: 'Shayle 93',
        slug: 'shayle-93',
        description: 'Modern residential development in Shayle area',
        status: 'available',
        location: locationMap['Shayle'],
        priority: 9,
        units: [
          { type: 'simplex', size_min: 60, size_max: 170, status: 'available' },
          { type: 'duplex', size_min: 110, size_max: 270, status: 'available' }
        ]
      },
      {
        name: 'Fat2a 315',
        slug: 'fat2a-315',
        description: 'Completed residential project in Fat2a',
        status: 'sold_out',
        location: locationMap['Fat2a'],
        priority: 5,
        units: [
          { type: 'simplex', size_min: 80, size_max: 120, status: 'sold' },
          { type: 'duplex', size_min: 120, size_max: 180, status: 'sold' }
        ]
      },
      {
        name: 'Mejlaya 246',
        slug: 'mejlaya-246',
        description: 'Completed residential project in Mejlaya',
        status: 'sold_out',
        location: locationMap['Mejlaya'],
        priority: 4,
        units: [
          { type: 'simplex', size_min: 70, size_max: 110, status: 'sold' },
          { type: 'duplex', size_min: 110, size_max: 160, status: 'sold' }
        ]
      },
      {
        name: 'Bouar 673',
        slug: 'bouar-673',
        description: 'Completed residential project in Bouar',
        status: 'sold_out',
        location: locationMap['Colina'],
        priority: 3,
        units: [
          { type: 'simplex', size_min: 90, size_max: 140, status: 'sold' },
          { type: 'duplex', size_min: 130, size_max: 200, status: 'sold' }
        ]
      },
      {
        name: 'Zouk 111',
        slug: 'zouk-111',
        description: 'Completed residential project in Zouk',
        status: 'sold_out',
        location: locationMap['Zouk'],
        priority: 2,
        units: [
          { type: 'simplex', size_min: 75, size_max: 115, status: 'sold' },
          { type: 'duplex', size_min: 115, size_max: 175, status: 'sold' }
        ]
      },
      {
        name: 'Zouk 2324',
        slug: 'zouk-2324',
        description: 'Completed residential project in Zouk',
        status: 'sold_out',
        location: locationMap['Zouk'],
        priority: 1,
        units: [
          { type: 'simplex', size_min: 85, size_max: 125, status: 'sold' },
          { type: 'duplex', size_min: 125, size_max: 185, status: 'sold' }
        ]
      }
    ];
    
    for (const projectData of projects) {
      try {
        const { units, location, ...projectInfo } = projectData;
        
        const project = await strapiInstance.entityService.create('api::project.project', {
          data: {
            ...projectInfo,
            location: location
          }
        });
        
        console.log(`✅ Created project: ${projectData.name}`);
        
        // Create units for this project
        for (const unitData of units) {
          try {
            await strapiInstance.entityService.create('api::unit.unit', {
              data: {
                ...unitData,
                name: `${projectData.name} - ${unitData.type.charAt(0).toUpperCase() + unitData.type.slice(1)}`,
                project: project.id
              }
            });
            console.log(`  ✅ Created unit: ${unitData.type} (${unitData.size_min}-${unitData.size_max}m²)`);
          } catch (error) {
            console.error(`  ❌ Error creating unit:`, error.message);
          }
        }
      } catch (error) {
        console.error(`❌ Error creating project ${projectData.name}:`, error.message);
      }
    }
    
    console.log('🎉 Direct project seeding completed!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    if (strapiInstance) {
      await strapiInstance.destroy();
    }
  }
}

// Run the seeding
seedProjectsDirect();
