// Script to export Strapi data to static JSON format
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:1337/api';

async function exportToStatic() {
  console.log('📤 Exporting Strapi data to static JSON files...');
  
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
    console.log('📊 Fetching apartments...');
    const apartmentsResponse = await axios.get(`${API_BASE_URL}/apartments?pagination[pageSize]=100&populate=mainImage,project`);
    const apartments = apartmentsResponse.data.data;
    
    // Get all projects
    console.log('🏢 Fetching projects...');
    const projectsResponse = await axios.get(`${API_BASE_URL}/projects?pagination[pageSize]=100&populate=propertyTypes,mainImage,images`);
    const projects = projectsResponse.data.data;
    
    // Get all property types
    console.log('🏠 Fetching property types...');
    const propertyTypesResponse = await axios.get(`${API_BASE_URL}/property-types?pagination[pageSize]=100&populate=image,projects`);
    const propertyTypes = propertyTypesResponse.data.data;
    
    // Convert apartments to static format
    const staticApartments = apartments.map(apt => {
      const attrs = apt.attributes;
      
      // Handle project field - could be string or relation object
      let projectName = 'Unknown Project';
      if (typeof attrs.project === 'string') {
        projectName = attrs.project;
      } else if (attrs.project?.data?.attributes?.name) {
        projectName = attrs.project.data.attributes.name;
      }
      
      // Handle property type - convert 'apartment' to 'simplex'
      let propertyType = attrs.propertyType || 'simplex';
      if (propertyType === 'apartment') {
        propertyType = 'simplex';
      }
      
      return {
        id: apt.id,
        name: attrs.name || 'Unnamed Apartment',
        project: projectName,
        propertyType: propertyType,
        status: attrs.status || 'available',
        price: attrs.price || 0,
        currency: attrs.currency || '$',
        bedrooms: attrs.bedrooms || 0,
        bathrooms: attrs.bathrooms || 0,
        area: attrs.area || 0,
        areaUnit: attrs.areaUnit || 'sq ft',
        description: attrs.description || 'Beautiful property with modern amenities',
        isFeatured: attrs.isFeatured || false,
        mainImage: attrs.mainImage?.url || '/uploads/default-apartment.jpg',
        amenities: {
          parking: attrs.parking || false,
          balcony: attrs.balcony || false,
          pool: attrs.pool || false,
          gym: attrs.gym || false,
          security: attrs.security || false,
          elevator: attrs.elevator || false
        }
      };
    });
    
    // Convert projects to static format
    const staticProjects = projects.map(proj => {
      const attrs = proj.attributes;
      return {
        id: proj.id,
        name: attrs.name || 'Unnamed Project',
        slug: attrs.slug || 'unnamed-project',
        description: attrs.description || 'Modern residential development',
        status: attrs.status || 'available',
        location: attrs.location || 'Unknown Location',
        mainImage: attrs.mainImage?.url || '/uploads/default-project.jpg',
        propertyTypes: attrs.propertyTypes?.data?.map(pt => pt.attributes.name) || ['simplex']
      };
    });
    
    // Create static directory if it doesn't exist
    const staticDir = path.join(__dirname, '..', 'nassif-group-static', 'data');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    // Write apartments JSON
    const apartmentsPath = path.join(staticDir, 'apartments.json');
    fs.writeFileSync(apartmentsPath, JSON.stringify(staticApartments, null, 2));
    console.log(`✅ Exported ${staticApartments.length} apartments to ${apartmentsPath}`);
    
    // Write projects JSON
    const projectsPath = path.join(staticDir, 'projects.json');
    fs.writeFileSync(projectsPath, JSON.stringify(staticProjects, null, 2));
    console.log(`✅ Exported ${staticProjects.length} projects to ${projectsPath}`);
    
    // Write property types JSON
    const propertyTypesPath = path.join(staticDir, 'property-types.json');
    const staticPropertyTypes = propertyTypes.map(pt => ({
      id: pt.id,
      name: pt.attributes.name,
      displayName: pt.attributes.displayName || pt.attributes.name.charAt(0).toUpperCase() + pt.attributes.name.slice(1),
      description: pt.attributes.description || `${pt.attributes.name} units with modern amenities`
    }));
    fs.writeFileSync(propertyTypesPath, JSON.stringify(staticPropertyTypes, null, 2));
    console.log(`✅ Exported ${staticPropertyTypes.length} property types to ${propertyTypesPath}`);
    
    console.log('\n🎉 Export completed successfully!');
    console.log('📁 Static data files created in: nassif-group-static/data/');
    console.log('🌐 You can now use the static website without Strapi!');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    console.error('Error details:', error.response?.data || error.message);
  }
}

// Run the export
exportToStatic().catch(console.error);
