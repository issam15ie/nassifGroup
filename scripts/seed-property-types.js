const fs = require('fs');
const path = require('path');

// Property type data
const propertyTypesData = [
  {
    name: "simplex",
    displayName: "Simplex",
    description: "Modern simplex apartments with open layouts and contemporary design",
    icon: "fas fa-home",
    features: [
      "Open plan living",
      "Modern kitchen",
      "Balcony access",
      "Parking space",
      "Security system"
    ],
    priority: 1
  },
  {
    name: "duplex",
    displayName: "Duplex",
    description: "Spacious duplex apartments with two levels and premium finishes",
    icon: "fas fa-building",
    features: [
      "Two-level layout",
      "Premium finishes",
      "Private terrace",
      "Master suite",
      "Guest room",
      "Storage space"
    ],
    priority: 2
  },
  {
    name: "shops",
    displayName: "Shops",
    description: "Commercial spaces perfect for retail and business use",
    icon: "fas fa-store",
    features: [
      "Street level access",
      "High foot traffic",
      "Flexible layout",
      "Storage area",
      "Parking available"
    ],
    priority: 3
  }
];

// Project data with property type assignments
const projectsData = [
  {
    name: "bouar 638 (colina)",
    status: "available",
    propertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "100-165m",
      simplex: "100-145m",
      duplex: "105-165m",
      shops: "50-130m"
    }
  },
  {
    name: "shayle 93",
    status: "available",
    propertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "60-270m",
      simplex: "60-170m",
      duplex: "110-270m"
    }
  },
  {
    name: "fat2a 315",
    status: "sold_out",
    propertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "80-200m",
      simplex: "80-150m",
      duplex: "120-200m"
    }
  },
  {
    name: "mejlaya 246",
    status: "sold_out",
    propertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "90-180m",
      simplex: "90-140m",
      duplex: "130-180m",
      shops: "60-120m"
    }
  },
  {
    name: "bouar 673",
    status: "sold_out",
    propertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "100-250m",
      simplex: "100-180m",
      duplex: "150-250m"
    }
  },
  {
    name: "zouk 111",
    status: "sold_out",
    propertyTypes: ["simplex", "duplex", "shops"],
    meterRanges: {
      all: "70-220m",
      simplex: "70-160m",
      duplex: "140-220m",
      shops: "40-100m"
    }
  },
  {
    name: "zouk 2324",
    status: "sold_out",
    propertyTypes: ["simplex", "duplex"],
    meterRanges: {
      all: "85-200m",
      simplex: "85-150m",
      duplex: "130-200m"
    }
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

// Create property type entries
const propertyTypeEntries = propertyTypesData.map(type => ({
  name: type.name,
  displayName: type.displayName,
  description: type.description,
  minSize: type.minSize,
  maxSize: type.maxSize,
  sizeUnit: type.sizeUnit,
  icon: type.icon,
  features: type.features,
  priority: type.priority,
  publishedAt: new Date().toISOString()
}));

// Create project entries
const projectEntries = projectsData.map(project => ({
  name: project.name,
  slug: generateSlug(project.name),
  status: project.status,
  meterRanges: project.meterRanges,
  propertyTypes: project.propertyTypes, // This will be handled by relations
  publishedAt: new Date().toISOString()
}));

// Save to files
const propertyTypesPath = path.join(__dirname, 'property-types.json');
const projectsPath = path.join(__dirname, 'projects-updated.json');

fs.writeFileSync(propertyTypesPath, JSON.stringify(propertyTypeEntries, null, 2));
fs.writeFileSync(projectsPath, JSON.stringify(projectEntries, null, 2));

console.log('✅ Property type and project data generated successfully!');
console.log(`📁 Property types saved to: ${propertyTypesPath}`);
console.log(`📁 Projects saved to: ${projectsPath}`);

console.log('\n📊 Property Types Summary:');
propertyTypesData.forEach(type => {
  console.log(`  - ${type.displayName}: ${type.minSize}-${type.maxSize}${type.sizeUnit}`);
});

console.log('\n📊 Projects Summary:');
projectsData.forEach(project => {
  console.log(`  - ${project.name} (${project.status}): ${project.propertyTypes.join(', ')}`);
});

console.log('\n🔧 Next Steps:');
console.log('1. Import property-types.json into Strapi admin panel');
console.log('2. Import projects-updated.json into Strapi admin panel');
console.log('3. Manually assign property types to projects in Strapi admin');
console.log('4. Update frontend to fetch data from Strapi API');
console.log('5. Add images to property types in Strapi admin');
