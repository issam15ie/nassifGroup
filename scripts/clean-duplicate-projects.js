const strapi = require('@strapi/strapi');

async function cleanDuplicateProjects() {
  const app = await strapi().load();
  
  try {
    console.log('🧹 Cleaning duplicate and test projects...\n');
    
    // Projects to delete (the newer/duplicate ones)
    const projectsToDelete = [
      { id: 8, name: "test", reason: "Test project" },
      { id: 9, name: "Bouar 638", reason: "Duplicate of 'bouar 638 (colina)'" },
      { id: 10, name: "Shayle 93", reason: "Duplicate of 'shayle 93'" },
      { id: 11, name: "Fat2a 315", reason: "Duplicate of 'Fatqa 315'" },
      { id: 12, name: "Mejlaya 246", reason: "Duplicate of 'Mejdlaya 246'" }
    ];
    
    for (const project of projectsToDelete) {
      try {
        console.log(`🗑️  Deleting: ID ${project.id} - "${project.name}" (${project.reason})`);
        await app.entityService.delete('api::project.project', project.id);
        console.log(`✅ Deleted project ID ${project.id}`);
      } catch (error) {
        console.error(`❌ Failed to delete project ID ${project.id}:`, error.message);
      }
    }
    
    // Verify the cleanup
    const remainingProjects = await app.entityService.findMany('api::project.project', {
      populate: ['propertyTypes']
    });
    
    console.log('\n📊 AFTER CLEANUP:');
    console.log('Remaining projects:', remainingProjects.length);
    console.log('\n📋 REMAINING PROJECTS:');
    remainingProjects.forEach((project, index) => {
      console.log(`${index + 1}. ID: ${project.id}, Name: "${project.name}", Status: ${project.status}`);
    });
    
  } catch (error) {
    console.error('Error cleaning projects:', error);
  }
  
  process.exit(0);
}

cleanDuplicateProjects();
