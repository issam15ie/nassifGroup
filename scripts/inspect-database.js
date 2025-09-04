// Script to inspect SQLite database structure
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your SQLite database
const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');

function inspectDatabase() {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Error opening database:', err.message);
      return;
    }
    console.log('✅ Connected to SQLite database');
  });

  // Get table schema
  db.all("PRAGMA table_info(apartments)", (err, rows) => {
    if (err) {
      console.error('❌ Error getting table info:', err.message);
    } else {
      console.log('\n📋 Apartments table structure:');
      console.log('Column Name | Type | Not Null | Default Value');
      console.log('----------------------------------------------');
      rows.forEach(row => {
        console.log(`${row.name} | ${row.type} | ${row.notnull} | ${row.dflt_value || 'NULL'}`);
      });
    }
  });

  // Get existing apartments
  db.all("SELECT id, name, location, price, status FROM apartments", (err, rows) => {
    if (err) {
      console.error('❌ Error getting apartments:', err.message);
    } else {
      console.log('\n🏠 Existing apartments:');
      console.log('ID | Name | Location | Price | Status');
      console.log('------------------------------------');
      rows.forEach(row => {
        console.log(`${row.id} | ${row.name} | ${row.location} | ${row.price} | ${row.status}`);
      });
    }

    // Close database connection
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('\n✅ Database inspection completed!');
      }
    });
  });
}

// Run the function
inspectDatabase();
