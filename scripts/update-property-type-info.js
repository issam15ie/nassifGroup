const fs = require('fs');
const path = require('path');

// Default JSON guide for propertyTypeInfo
const defaultPropertyTypeInfo = {
  "_guide": "PROPERTY TYPE INFO GUIDE - Define property types, sizes, status, and images. Fields: range (size range), status (available/sold_out), image (full URL). Order matters: first in JSON = first displayed on website.",
  "_example": "Copy this structure and replace with your actual property types",
  "_instructions": "1. Delete _guide, _example, and _instructions fields when done. 2. Replace simplex/duplex/shops with your actual property types. 3. Use exactly 'available' or 'sold_out' for status.",
  "simplex": {
    "range": "100-145m",
    "status": "available",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  },
  "duplex": {
    "range": "105-165m",
    "status": "available",
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  },
  "shops": {
    "range": "50-130m",
    "status": "sold_out",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  }
};

console.log('📋 Property Type Info Update Script');
console.log('=====================================');
console.log('');
console.log('This script will help you update existing projects with the default JSON guide.');
console.log('');
console.log('Default JSON Guide:');
console.log(JSON.stringify(defaultPropertyTypeInfo, null, 2));
console.log('');
console.log('📝 Instructions:');
console.log('1. Go to Strapi Admin Panel');
console.log('2. Navigate to Projects');
console.log('3. Edit "bouar 673" project');
console.log('4. Find the "propertyTypeInfo" field');
console.log('5. Clear the current content (delete "null")');
console.log('6. Copy and paste the JSON above');
console.log('7. Save the project');
console.log('');
console.log('💡 Alternative: Use the HTML guide');
console.log('Open "property-type-guide.html" in your browser for a visual guide with copy button.');
console.log('');
console.log('🎯 For "bouar 673" specifically, use this JSON:');
console.log('');

// Custom JSON for bouar 673 based on the existing data
const bouar673JSON = {
  "_guide": "PROPERTY TYPE INFO GUIDE - Define property types, sizes, status, and images. Fields: range (size range), status (available/sold_out), image (full URL). Order matters: first in JSON = first displayed on website.",
  "_example": "Copy this structure and replace with your actual property types",
  "_instructions": "1. Delete _guide, _example, and _instructions fields when done. 2. Replace with your actual property types. 3. Use exactly 'available' or 'sold_out' for status.",
  "simplex": {
    "range": "90-140m",
    "status": "sold_out",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  },
  "duplex": {
    "range": "130-200m",
    "status": "sold_out",
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  },
  "shops": {
    "range": "50-130m",
    "status": "sold_out",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  }
};

console.log(JSON.stringify(bouar673JSON, null, 2));
console.log('');
console.log('✅ Copy the JSON above and paste it into the propertyTypeInfo field in Strapi!');
