const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '.tmp', 'data.db');

async function checkProjects() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('❌ Error opening database:', err.message);
        reject(err);
        return;
      }
      console.log('✅ Connected to SQLite database');
    });

    db.serialize(() => {
      console.log('🔍 Checking existing data...');

      // Check locations
      db.all("SELECT * FROM locations", (err, rows) => {
        if (err) {
          console.error('❌ Error querying locations:', err.message);
        } else {
          console.log(`📍 Found ${rows.length} locations:`);
          rows.forEach(row => {
            console.log(`  - ${row.name} (ID: ${row.id}, Slug: ${row.slug})`);
          });
        }
      });

      // Check projects
      db.all("SELECT * FROM projects", (err, rows) => {
        if (err) {
          console.error('❌ Error querying projects:', err.message);
        } else {
          console.log(`🏗️  Found ${rows.length} projects:`);
          rows.forEach(row => {
            console.log(`  - ${row.name} (ID: ${row.id}, Status: ${row.status})`);
          });
        }
      });

      // Check units
      db.all("SELECT * FROM units", (err, rows) => {
        if (err) {
          console.error('❌ Error querying units:', err.message);
        } else {
          console.log(`🏠 Found ${rows.length} units:`);
          rows.forEach(row => {
            console.log(`  - ${row.name} (Type: ${row.type}, Status: ${row.status})`);
          });
        }
      });

      // Close database
      db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
        } else {
          console.log('✅ Database connection closed');
        }
        resolve();
      });
    });
  });
}

// Run the check
checkProjects().catch(console.error);
