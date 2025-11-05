const strapi = require('@strapi/strapi');

async function migratePropertyTypes() {
  const app = await strapi().load();
  
  try {
    console.log('🔄 Migrating property types to clean structure...\n');
    
    // Define the complete property type data
    const propertyTypesData = {
      'simplex': {
        displayName: 'Simplex',
        description: 'Modern simplex apartments with open layouts and contemporary design',
        minSize: 60,
        maxSize: 180,
        sizeUnit: 'm²',
        priceRange: '$150,000 - $200,000',
        features: ['Open plan living', 'Modern kitchen', 'Balcony access', 'Parking space', 'Security system'],
        icon: 'fas fa-home',
        priority: 1,
        status: 'available'
      },
      'duplex': {
        displayName: 'Duplex',
        description: 'Spacious duplex apartments with two levels and premium finishes',
        minSize: 105,
        maxSize: 270,
        sizeUnit: 'm²',
        priceRange: '$250,000 - $350,000',
        features: ['Two-level layout', 'Premium finishes', 'Private terrace', 'Master suite', 'Guest room', 'Storage space'],
        icon: 'fas fa-building',
        priority: 2,
        status: 'available'
      },
      'shops': {
        displayName: 'Shops',
        description: 'Commercial spaces perfect for retail and business use',
        minSize: 40,
        maxSize: 130,
        sizeUnit: 'm²',
        priceRange: '$80,000 - $150,000',
        features: ['Street level access', 'High foot traffic', 'Flexible layout', 'Storage area', 'Parking available'],
        icon: 'fas fa-store',
        priority: 3,
        status: 'available'
      }
    };
    
    // Update each property type
    for (const [typeName, typeData] of Object.entries(propertyTypesData)) {
      try {
        // Find existing property type
        const existingType = await app.entityService.findMany('api::property-type.property-type', {
          filters: { name: typeName }
        });
        
        if (existingType && existingType.length > 0) {
          const typeId = existingType[0].id;
          console.log(`📝 Updating ${typeName} (ID: ${typeId})`);
          
          await app.entityService.update('api::property-type.property-type', typeId, {
            data: {
              displayName: typeData.displayName,
              description: typeData.description,
              minSize: typeData.minSize,
              maxSize: typeData.maxSize,
              sizeUnit: typeData.sizeUnit,
              priceRange: typeData.priceRange,
              features: typeData.features,
              icon: typeData.icon,
              priority: typeData.priority,
              status: typeData.status
            }
          });
          
          console.log(`✅ Updated ${typeName} successfully`);
        } else {
          console.log(`➕ Creating new property type: ${typeName}`);
          
          await app.entityService.create('api::property-type.property-type', {
            data: {
              name: typeName,
              displayName: typeData.displayName,
              description: typeData.description,
              minSize: typeData.minSize,
              maxSize: typeData.maxSize,
              sizeUnit: typeData.sizeUnit,
              priceRange: typeData.priceRange,
              features: typeData.features,
              icon: typeData.icon,
              priority: typeData.priority,
              status: typeData.status
            }
          });
          
          console.log(`✅ Created ${typeName} successfully`);
        }
      } catch (error) {
        console.error(`❌ Failed to update ${typeName}:`, error.message);
      }
    }
    
    // Verify the migration
    const allPropertyTypes = await app.entityService.findMany('api::property-type.property-type');
    
    console.log('\n📊 MIGRATION COMPLETE:');
    console.log('Total property types:', allPropertyTypes.length);
    
    console.log('\n📋 UPDATED PROPERTY TYPES:');
    allPropertyTypes.forEach((pt, index) => {
      console.log(`${index + 1}. ${pt.name} (${pt.displayName})`);
      console.log(`   Size: ${pt.minSize}-${pt.maxSize}${pt.sizeUnit}`);
      console.log(`   Price: ${pt.priceRange}`);
      console.log(`   Priority: ${pt.priority}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error migrating property types:', error);
  }
  
  process.exit(0);
}

migratePropertyTypes();
