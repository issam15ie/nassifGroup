const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '.tmp', 'data.db');

async function createProjectsSQLite() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('❌ Error opening database:', err.message);
        reject(err);
        return;
      }
      console.log('✅ Connected to SQLite database');
    });

    db.serialize(async () => {
      try {
        console.log('🌱 Starting SQLite project data creation...');

        // Create locations
        console.log('📍 Creating locations...');
        const locations = [
          { name: 'Colina', slug: 'colina', description: 'Prime location in Colina area', city: 'Beirut', region: 'Mount Lebanon' },
          { name: 'Shayle', slug: 'shayle', description: 'Desirable location in Shayle area', city: 'Beirut', region: 'Mount Lebanon' },
          { name: 'Fat2a', slug: 'fat2a', description: 'Location in Fat2a area', city: 'Beirut', region: 'Mount Lebanon' },
          { name: 'Mejlaya', slug: 'mejlaya', description: 'Location in Mejlaya area', city: 'Beirut', region: 'Mount Lebanon' },
          { name: 'Zouk', slug: 'zouk', description: 'Location in Zouk area', city: 'Beirut', region: 'Mount Lebanon' }
        ];

        const locationMap = {};

        for (const location of locations) {
          await new Promise((resolve, reject) => {
            const stmt = db.prepare(`
              INSERT INTO locations (name, slug, description, city, region, created_at, updated_at, published_at)
              VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
            `);
            
            stmt.run([location.name, location.slug, location.description, location.city, location.region], function(err) {
              if (err) {
                console.error(`❌ Error creating location ${location.name}:`, err.message);
                stmt.finalize();
                reject(err);
              } else {
                locationMap[location.name] = this.lastID;
                console.log(`✅ Created location: ${location.name} (ID: ${this.lastID})`);
                stmt.finalize();
                resolve();
              }
            });
          });
        }

        // Create projects
        console.log('🏗️  Creating projects...');
        const projects = [
          {
            name: 'Bouar 638',
            slug: 'bouar-638',
            description: 'Premium residential project in Colina with various unit types',
            status: 'available',
            location_id: locationMap['Colina'],
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
            location_id: locationMap['Shayle'],
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
            location_id: locationMap['Fat2a'],
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
            location_id: locationMap['Mejlaya'],
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
            location_id: locationMap['Colina'],
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
            location_id: locationMap['Zouk'],
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
            location_id: locationMap['Zouk'],
            priority: 1,
            units: [
              { type: 'simplex', size_min: 85, size_max: 125, status: 'sold' },
              { type: 'duplex', size_min: 125, size_max: 185, status: 'sold' }
            ]
          }
        ];

        for (const project of projects) {
          await new Promise((resolve, reject) => {
            const stmt = db.prepare(`
              INSERT INTO projects (name, slug, description, status, location_id, priority, created_at, updated_at, published_at)
              VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
            `);
            
            stmt.run([project.name, project.slug, project.description, project.status, project.location_id, project.priority], function(err) {
              if (err) {
                console.error(`❌ Error creating project ${project.name}:`, err.message);
                stmt.finalize();
                reject(err);
              } else {
                const projectId = this.lastID;
                console.log(`✅ Created project: ${project.name} (ID: ${projectId})`);
                stmt.finalize();
                
                // Create units for this project
                const unitPromises = project.units.map((unit) => {
                  return new Promise((resolveUnit, rejectUnit) => {
                    const unitStmt = db.prepare(`
                      INSERT INTO units (name, type, size_min, size_max, status, project_id, created_at, updated_at, published_at)
                      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
                    `);
                    
                    const unitName = `${project.name} - ${unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}`;
                    
                    unitStmt.run([unitName, unit.type, unit.size_min, unit.size_max, unit.status, projectId], function(err) {
                      if (err) {
                        console.error(`  ❌ Error creating unit:`, err.message);
                        unitStmt.finalize();
                        rejectUnit(err);
                      } else {
                        console.log(`  ✅ Created unit: ${unit.type} (${unit.size_min}-${unit.size_max}m²)`);
                        unitStmt.finalize();
                        resolveUnit();
                      }
                    });
                  });
                });
                
                Promise.all(unitPromises).then(() => {
                  resolve();
                }).catch((err) => {
                  reject(err);
                });
              }
            });
          });
        }

        console.log('🎉 SQLite project data creation completed!');
        resolve();

      } catch (error) {
        console.error('❌ Data creation failed:', error.message);
        reject(error);
      }
    });

    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('✅ Database connection closed');
      }
    });
  });
}

// Run the data creation
createProjectsSQLite().catch(console.error);
