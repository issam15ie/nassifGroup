# 🏠 Property Type Management Guide

## Overview
This guide explains how to manage property types for your projects in the Nassif Group website. Property types control what appears on your services page and how they're ordered.

## 📋 Two Ways to Manage Property Types

### 1. 🎯 Property Types Relation (Primary Method)
**Location**: In Strapi Admin → Projects → [Your Project] → "Property Types" field

**How to use:**
1. Go to your project in Strapi admin panel
2. Find the "Property Types" relation field
3. Select property types from the dropdown
4. **IMPORTANT**: Select them in the order you want them to appear on the website
5. You can reorder by dragging items in the list

**Benefits:**
- ✅ Easy to use dropdown interface
- ✅ Order is preserved exactly as you select
- ✅ Visual drag-and-drop reordering
- ✅ Integrates with Property Types collection

### 2. 📝 Property Type Info JSON (Details & Fallback)
**Location**: In Strapi Admin → Projects → [Your Project] → "Property Type Info" field

**JSON Structure:**
```json
{
  "simplex": {
    "range": "100-145m",
    "status": "available",
    "image": "https://your-image-url.com/simplex.jpg"
  },
  "duplex": {
    "range": "105-165m",
    "status": "available", 
    "image": "https://your-image-url.com/duplex.jpg"
  },
  "shops": {
    "range": "50-130m",
    "status": "sold_out",
    "image": "https://your-image-url.com/shops.jpg"
  }
}
```

**Fields Explained:**
- `range`: Size range (e.g., "100-145m", "50-130m")
- `status`: "available" or "sold_out"
- `image`: Full URL to property type image

## 🎯 Recommended Workflow

### Step 1: Set Up Property Types Collection
1. Go to "Property Types" in Strapi admin
2. Create property types (simplex, duplex, shops, etc.)
3. Add images and descriptions to each property type

### Step 2: Configure Project
1. Go to "Projects" in Strapi admin
2. Select your project
3. **Use Property Types relation** to select and order property types
4. **Use Property Type Info JSON** to add specific details (ranges, status, images)

## 📋 Ordering Rules

### Priority Order:
1. **Property Types Relation Order** (if set)
2. **Property Type Info JSON Order** (if no relation set)
3. **Alphabetical Order** (fallback)

### How Ordering Works:
- **Property Types Relation**: Order you select them in the dropdown
- **JSON Order**: Order they appear in the JSON object
- **First = First displayed**, **Second = Second displayed**, etc.

## 💡 Best Practices

### ✅ Do:
- Use the Property Types relation for easy ordering
- Add images to make property types more attractive
- Use descriptive range formats (e.g., "100-145m")
- Set correct status (available/sold_out)
- Test the website after making changes

### ❌ Don't:
- Mix different ordering methods
- Use invalid property type names
- Forget to add images (optional but recommended)
- Use relative image paths (use full URLs)

## 🔧 Troubleshooting

### Property Types Not Showing:
1. Check if Property Types relation is set
2. Check if Property Type Info JSON is valid
3. Verify property type names match exactly
4. Clear browser cache and refresh

### Wrong Order:
1. Check Property Types relation order first
2. If using JSON only, check JSON order
3. Make sure you're editing the correct project

### Images Not Loading:
1. Use full URLs (starting with http:// or https://)
2. Make sure image URLs are accessible
3. Check for typos in image URLs

## 📖 Examples

### Example 1: Simple Project
**Property Types Relation**: Select "Simplex" first, then "Duplex"

**Property Type Info JSON**:
```json
{
  "simplex": {
    "range": "100-145m",
    "status": "available",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  },
  "duplex": {
    "range": "105-165m", 
    "status": "available",
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  }
}
```

**Result**: Simplex appears first, Duplex appears second

### Example 2: Complex Project
**Property Types Relation**: Select in order: "Shops", "Simplex", "Duplex"

**Property Type Info JSON**:
```json
{
  "shops": {
    "range": "50-130m",
    "status": "sold_out",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  },
  "simplex": {
    "range": "100-145m",
    "status": "available",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  },
  "duplex": {
    "range": "105-165m",
    "status": "available", 
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  }
}
```

**Result**: Shops appears first, Simplex second, Duplex third

## 🆘 Need Help?

1. Check the sample file: `scripts/sample-property-type-info.json`
2. Look at existing projects for reference
3. Test changes on a development environment first
4. Contact the development team for assistance

---

**Last Updated**: December 2024  
**Version**: 1.0
