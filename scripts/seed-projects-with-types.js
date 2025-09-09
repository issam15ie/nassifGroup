const fs = require('fs');
const path = require('path');

// Project data with meter ranges and status
const projectsData = [
  {
    name: "bouar 638 (colina)",
    status: "available",
    description: "Premium residential project in Bouar with various property types",
    availablePropertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "100-165m",
      simplex: "100-145m",
      duplex: "105-165m",
      shops: "50-130m"
    },
    priority: 1
  },
  {
    name: "shayle 93",
    status: "available", 
    description: "Modern residential development in Shayle",
    availablePropertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "60-270m",
      simplex: "60-170m",
      duplex: "110-270m"
    },
    priority: 2
  },
  {
    name: "fat2a 315",
    status: "sold_out",
    description: "Completed residential project in Fat2a",
    availablePropertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "80-200m",
      simplex: "80-150m", 
      duplex: "120-200m"
    },
    priority: 3
  },
  {
    name: "mejlaya 246",
    status: "sold_out",
    description: "Luxury residential project in Mejlaya",
    availablePropertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "90-180m",
      simplex: "90-140m",
      duplex: "130-180m", 
      shops: "60-120m"
    },
    priority: 4
  },
  {
    name: "bouar 673",
    status: "sold_out",
    description: "High-end residential development in Bouar",
    availablePropertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "100-250m",
      simplex: "100-180m",
      duplex: "150-250m"
    },
    priority: 5
  },
  {
    name: "zouk 111",
    status: "sold_out",
    description: "Exclusive residential project in Zouk",
    availablePropertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "70-220m",
      simplex: "70-160m",
      duplex: "140-220m",
      shops: "40-100m"
    },
    priority: 6
  },
  {
    name: "zouk 2324",
    status: "sold_out", 
    description: "Premium residential development in Zouk",
    availablePropertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "85-200m",
      simplex: "85-150m",
      duplex: "130-200m"
    },
    priority: 7
  }
];

// Generate slug from name
function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Create project entries
const projectEntries = projectsData.map(project => ({
  name: project.name,
  slug: generateSlug(project.name),
  description: project.description,
  status: project.status,
  availablePropertyTypes: project.availablePropertyTypes,
  meterRanges: project.meterRanges,
  priority: project.priority,
  publishedAt: new Date().toISOString()
}));

// Save to file
const outputPath = path.join(__dirname, 'projects-with-types.json');
fs.writeFileSync(outputPath, JSON.stringify(projectEntries, null, 2));

console.log('✅ Project data with types and meter ranges generated successfully!');
console.log(`📁 Saved to: ${outputPath}`);
console.log('\n📊 Project Summary:');
console.log('Available Projects:');
projectsData.filter(p => p.status === 'available').forEach(p => {
  console.log(`  - ${p.name}: ${p.availablePropertyTypes.join(', ')} (${p.meterRanges.all})`);
});

console.log('\nSold Out Projects:');
projectsData.filter(p => p.status === 'sold_out').forEach(p => {
  console.log(`  - ${p.name}: ${p.availablePropertyTypes.join(', ')} (${p.meterRanges.all})`);
});

console.log('\n🔧 Next Steps:');
console.log('1. Import this data into your Strapi admin panel');
console.log('2. Create apartments and assign them to projects with appropriate property types');
console.log('3. The frontend will automatically show property type filters for each project');
