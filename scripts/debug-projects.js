const strapi = require('@strapi/strapi');

async function debugProjects() {
  const app = await strapi().load();
  
  try {
    // Get all projects directly from database
    const projects = await app.entityService.findMany('api::project.project', {
      populate: ['propertyTypes', 'mainImage']
    });
    
    console.log('\n📊 DIRECT DATABASE QUERY RESULTS:');
    console.log('Total projects in database:', projects.length);
    
    console.log('\n📋 ALL PROJECTS:');
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ID: ${project.id}, Name: "${project.name}", Status: ${project.status}`);
      if (project.propertyTypes && project.propertyTypes.length > 0) {
        console.log(`   Property Types: ${project.propertyTypes.map(pt => pt.name).join(', ')}`);
      }
    });
    
    // Check for duplicates
    const projectNames = projects.map(p => p.name);
    const duplicates = projectNames.filter((name, index) => projectNames.indexOf(name) !== index);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️  DUPLICATE PROJECT NAMES FOUND:');
      duplicates.forEach(name => {
        const duplicateProjects = projects.filter(p => p.name === name);
        console.log(`"${name}" appears ${duplicateProjects.length} times with IDs:`, duplicateProjects.map(p => p.id));
      });
    } else {
      console.log('\n✅ No duplicate project names found');
    }
    
    // Compare with API response
    console.log('\n📡 API ENDPOINT COMPARISON:');
    const apiResponse = await app.entityService.findMany('api::project.project', {
      populate: ['propertyTypes', 'mainImage', 'images']
    });
    console.log('API returns:', apiResponse.length, 'projects');
    
  } catch (error) {
    console.error('Error debugging projects:', error);
  }
  
  process.exit(0);
}

debugProjects();
