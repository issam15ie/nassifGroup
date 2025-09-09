# Strapi CMS Setup Guide for Nassif Group

## Overview
Your website has been updated to use Strapi CMS for managing projects, property types, and their information. This allows you to manage all content through the Strapi admin panel instead of hardcoded JavaScript.

## What's Been Created

### 1. PropertyType Content Type
- **Location**: `src/api/property-type/`
- **Fields**:
  - `name`: Enumeration (simplex, duplex, shops)
  - `displayName`: String (e.g., "Simplex", "Duplex", "Shops")
  - `description`: Text (detailed description)
  - `image`: Media (property type image)
  - `icon`: String (FontAwesome icon class)
  - `features`: JSON (array of features)
  - `projects`: Relation (many-to-many with projects)
  - `priority`: Integer (display order)

### 2. Updated Project Content Type
- **Location**: `src/api/project/content-types/project/schema.json`
- **New Fields**: 
  - `propertyTypes` (many-to-many relation with PropertyType)
  - `propertyTypeInfo` (JSON field for complete property type information per project)

### 3. API Endpoints
- `GET /api/property-types` - Get all property types
- `GET /api/property-types/project/:projectId` - Get property types by project
- `GET /api/property-types/with-projects` - Get all property types with project info
- `GET /api/projects` - Get all projects with property types

### 4. Frontend Updates
- **File**: `script.js`
- **Changes**: 
  - Removed hardcoded `PROJECTS_DATA`
  - Added `loadProjectsAndPropertyTypes()` function
  - Added fallback to static data if Strapi is unavailable
  - Updated property type cards to use Strapi data

## Setup Instructions

### Step 1: Start Strapi Server
```bash
npm run develop
```

### Step 2: Access Strapi Admin
1. Go to `http://localhost:1337/admin`
2. Create your admin account if not already done

### Step 3: Import Property Types
1. Go to **Content Manager** → **Property Types**
2. Click **Create new entry**
3. Create these 3 property types:

#### Simplex Property Type
- **Name**: simplex
- **Display Name**: Simplex
- **Description**: Modern simplex apartments with open layouts and contemporary design
- **Icon**: fas fa-home
- **Features**: 
  ```json
  [
    "Open plan living",
    "Modern kitchen", 
    "Balcony access",
    "Parking space",
    "Security system"
  ]
  ```
- **Priority**: 1

#### Duplex Property Type
- **Name**: duplex
- **Display Name**: Duplex
- **Description**: Spacious duplex apartments with two levels and premium finishes
- **Icon**: fas fa-building
- **Features**:
  ```json
  [
    "Two-level layout",
    "Premium finishes",
    "Private terrace",
    "Master suite",
    "Guest room",
    "Storage space"
  ]
  ```
- **Priority**: 2

#### Shops Property Type
- **Name**: shops
- **Display Name**: Shops
- **Description**: Commercial spaces perfect for retail and business use
- **Icon**: fas fa-store
- **Features**:
  ```json
  [
    "Street level access",
    "High foot traffic",
    "Flexible layout",
    "Storage area",
    "Parking available"
  ]
  ```
- **Priority**: 3

### Step 4: Update Projects
1. Go to **Content Manager** → **Projects**
2. For each project, update the **Property Types** field:
   - Select the appropriate property types for each project
   - **Bouar 638 (Colina)**: Select Simplex, Duplex, Shops
   - **Shayle 93**: Select Simplex, Duplex
   - **Fat2a 315**: Select Simplex, Duplex
   - **Mejlaya 246**: Select Simplex, Duplex, Shops
   - **Bouar 673**: Select Simplex, Duplex
   - **Zouk 111**: Select Simplex, Duplex, Shops
   - **Zouk 2324**: Select Simplex, Duplex

### Step 5: Add Images (Optional)
1. For each Property Type, upload appropriate images
2. Images will be displayed on the property type cards

### Step 6: Publish Content
1. Make sure all Property Types and Projects are **Published**
2. Unpublished content won't appear on the website

## Status Management

### How Status Works
The system supports both project-level and property-type-level status with intelligent fallback:

#### Project Status
- **Available**: Project is still selling units
- **Sold Out**: Project is completely sold out

#### Property Type Info (Per Project)
- Each project can have individual information for each property type
- Stored in the `propertyTypeInfo` JSON field
- Contains both `range` and `status` for each property type
- **Complete Override Logic**: Project status completely overrides all property type statuses:
  - If project is "available" → ALL property types show as "available"
  - If project is "sold_out" → ALL property types show as "sold out"
- **Fallback Logic**: Only used if project status is unknown

#### Property Types
- Property types are **general and reusable** across all projects
- They contain only basic information: name, displayName, description, image, features
- **No individual status** - status is managed per project

#### Examples:
- **Project "Bouar 638" (Available)**:
  - Simplex (available) → Shows "Available"
  - Duplex (available) → Shows "Available"  
  - Shops (available) → Shows "Available"

- **Project "Shayle 93" (Available)**:
  - Simplex (available) → Shows "Available"
  - Duplex (sold_out) → Shows "Sold Out"

- **Project "Fat2a 315" (Sold Out)**:
  - Simplex (no specific status) → Shows "Sold Out" (uses project status)
  - Duplex (no specific status) → Shows "Sold Out" (uses project status)

### Managing Status

#### Option 1: Project-Level Status (Affects All Property Types)
1. Go to Content Manager → Projects
2. Select the project you want to update
3. Update the "Status" field to "available" or "sold_out"
4. Save and Publish

#### Option 2: Property Type-Specific Info (Per Project)
1. Go to Content Manager → Projects
2. Select the project you want to update
3. In the "Property Type Info" JSON field, add:
   ```json
   {
     "simplex": {
       "range": "100-145m",
       "status": "available"
     },
     "duplex": {
       "range": "105-165m", 
       "status": "sold_out"
     },
     "shops": {
       "range": "50-130m",
       "status": "available"
     }
   }
   ```
4. Save and Publish

## Data Structure

### Property Type Data Flow
```
Strapi PropertyType → Frontend PROJECTS_DATA → Property Type Cards
```

### Project Data Flow
```
Strapi Project → Frontend PROJECTS_DATA → Project Filter Buttons
```

## Fallback System
If Strapi is unavailable, the website will automatically fall back to static data to ensure the site continues working.

## Testing
1. Start your website
2. Go to the Services page
3. Click on project buttons
4. Verify property type cards display correctly
5. Check that images, descriptions, and features are shown

## Benefits
- ✅ **Easy Content Management**: Update projects and property types through Strapi admin
- ✅ **Rich Content**: Add descriptions, features, and images for each property type
- ✅ **Flexible**: Add new projects or property types without code changes
- ✅ **Reliable**: Fallback system ensures site works even if Strapi is down
- ✅ **SEO Friendly**: Content is managed in a structured way

## Troubleshooting
- **Property types not showing**: Check if Property Types are published in Strapi
- **Images not loading**: Verify images are uploaded and published in Strapi
- **Projects not loading**: Check if Projects have Property Types assigned
- **API errors**: Check Strapi server is running and permissions are set

## Next Steps
1. Add more detailed descriptions for each property type
2. Upload high-quality images for each property type
3. Add more features to the features array
4. Consider adding pricing information
5. Add virtual tours or floor plans
