# Nassif Group Website - Technical Documentation

## 📋 Project Overview

**Project Name:** Nassif Group Real Estate Website  
**Type:** Full-stack web application with headless CMS  
**Architecture:** Single-server deployment (Strapi + Frontend)  
**Purpose:** Real estate property management and showcase platform  

---

## 🛠️ Technology Stack

### Backend Framework
- **Strapi 4.15.5** - Headless CMS and API server
- **Node.js v22.17.1** - JavaScript runtime environment
- **SQLite** - Database (development environment)
- **Koa.js** - Web framework (built into Strapi)

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern features
- **Vanilla JavaScript (ES6+)** - No frontend frameworks
- **Bootstrap 5.3.0** - UI components and responsive grid
- **FontAwesome** - Icon library

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **PowerShell** - Command line interface
- **Cursor/VS Code** - Code editor

### Deployment & Hosting
- **Render.com** - Primary hosting platform
- **GitHub** - Code repository
- **Netlify** - Alternative hosting (user preference)

---

## 🏗️ Project Structure

```
nassifGroup/
├── 📁 config/                          # Strapi Configuration
│   ├── database.js                     # Database connection settings
│   ├── middlewares.js                  # Middleware configuration
│   ├── server.js                       # Server configuration
│   ├── admin.js                        # Admin panel settings
│   └── plugins.js                      # Plugin configurations
│
├── 📁 src/                             # Strapi Backend Code
│   ├── api/                            # API Content Types
│   │   ├── apartment/                  # Apartment content type
│   │   │   ├── content-types/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   ├── project/                    # Project content type
│   │   │   ├── content-types/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   └── property-type/              # Property Type content type
│   │       ├── content-types/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   ├── middlewares/
│   │   └── custom-index.js             # Custom redirect middleware
│   └── index.js                        # Strapi entry point
│
├── 📁 public/                          # Frontend Files (Served by Strapi)
│   ├── index.html                      # Homepage
│   ├── services.html                   # Property listings page
│   ├── about.html                      # Company information
│   ├── blog.html                       # Blog/news page
│   ├── contact.html                    # Contact form
│   ├── styles.css                      # Main stylesheet
│   ├── script.js                       # Main JavaScript file
│   ├── js/
│   │   └── strapi-api.js              # API communication layer
│   ├── uploads/                        # Media files
│   │   ├── colina_Simplex_870135b6ba.jpg
│   │   ├── bouar_84f7def137.jpg
│   │   └── depositphotos_*.jpg
│   ├── favicon.ico                     # Site favicon
│   └── *.png, *.svg                   # Logo and brand assets
│
├── 📁 scripts/                         # Utility Scripts
│   ├── seed-database.js               # Database seeding
│   ├── export-apartments.js           # Data export utilities
│   └── bulk-import-apartments.js      # Data import utilities
│
├── 📁 nassif-group-static/             # Static Website Alternative
│   ├── *.html                         # Static HTML files
│   ├── js/
│   │   ├── static-api.js              # Static data API
│   │   ├── embedded-website-data.js   # Embedded JSON data
│   │   └── website-data-manager.js    # Data management
│   └── data/
│       └── website-data.json          # Static JSON data
│
├── package.json                        # Dependencies and scripts
├── .env.development                    # Environment variables
├── .tmp/data.db                       # SQLite database file
└── README.md                          # Project documentation
```

---

## 🗄️ Database Schema

### Content Types

#### 1. **Projects**
```javascript
{
  name: String,           // Project name (e.g., "bouar 638 (colina)")
  slug: String,           // URL-friendly identifier
  description: Text,      // Project description
  location: String,       // Geographic location
  status: Enum,          // available, sold_out, coming_soon
  mainImage: Media,      // Primary project image
  images: Media[],       // Additional project images
  propertyTypes: Relation, // Many-to-many with PropertyType
  propertyTypeInfo: JSON  // Detailed property type information
}
```

#### 2. **Property Types**
```javascript
{
  name: String,          // Type name (simplex, duplex, shops)
  displayName: String,   // User-friendly name
  description: Text,     // Type description
  minSize: Integer,      // Minimum size in m²
  maxSize: Integer,      // Maximum size in m²
  sizeUnit: String,      // Unit (m²)
  image: Media,          // Representative image
  icon: String,          // FontAwesome icon class
  priority: Integer,     // Display order
  features: JSON         // Array of features
}
```

#### 3. **Apartments**
```javascript
{
  name: String,          // Apartment name
  project: Relation,     // Many-to-one with Project
  propertyType: Relation, // Many-to-one with PropertyType
  status: Enum,          // available, sold, reserved
  price: Decimal,        // Price value
  currency: String,      // Currency code ($, €, etc.)
  bedrooms: Integer,     // Number of bedrooms
  bathrooms: Integer,    // Number of bathrooms
  area: Decimal,         // Floor area
  areaUnit: String,      // Area unit (m², sqft)
  description: Text,     // Apartment description
  mainImage: Media,      // Primary apartment image
  amenities: JSON        // Available amenities
}
```

---

## 🌐 API Architecture

### Base URL Structure
- **Development:** `http://localhost:1337/api`
- **Production:** `https://your-app.onrender.com/api`

### Main Endpoints

#### Projects API
```http
GET /api/projects                        # Get all projects
GET /api/projects/:id                    # Get specific project
GET /api/projects?populate=propertyTypes # Get projects with relations
```

#### Property Types API
```http
GET /api/property-types                  # Get all property types
GET /api/property-types/:id              # Get specific type
```

#### Apartments API
```http
GET /api/apartments                      # Get all apartments
GET /api/apartments/:id                  # Get specific apartment
GET /api/apartments?filters[project][$eq]=:project # Filter by project
GET /api/apartments?filters[propertyType][$eq]=:type # Filter by type
```

### Custom Routes
- **Featured Apartments:** `/api/apartments/featured`
- **Project Statistics:** `/api/apartments/stats`
- **Location-based:** `/api/apartments/location/:location`

---

## 🎨 Frontend Architecture

### Page Structure
1. **Homepage (`index.html`)**
   - Hero section with company branding
   - Company highlights
   - About section preview
   - Contact information

2. **Services (`services.html`)**
   - Project listings with filtering
   - Property type cards
   - Dynamic content loading
   - Interactive property selection

3. **About (`about.html`)**
   - Company story and mission
   - Team member profiles
   - Company statistics and achievements

4. **Blog (`blog.html`)**
   - Featured blog posts
   - Category-based organization
   - Real estate market insights

5. **Contact (`contact.html`)**
   - Contact form
   - Company location and details
   - Interactive elements

### JavaScript Architecture

#### Core Files
- **`script.js`** - Main application logic
- **`strapi-api.js`** - API communication layer

#### Key Functions
```javascript
// API Communication
class StrapiAPI {
  constructor(baseURL = '/api')
  async getProjects()
  async getPropertyTypes()
  async getApartments()
  async getApartmentsByProjectAndType(project, propertyType)
}

// UI Management
function loadProjectsAndPropertyTypes()
function createPropertyCard(project, propertyType, info)
function filterPropertiesByProject(projectName)
function showApartmentModal(apartmentData)
```

### CSS Architecture
- **Mobile-first responsive design**
- **Custom CSS variables for theming**
- **Bootstrap 5 grid system**
- **Custom component styling**
- **Hover effects and animations**

---

## 🔧 Development Workflow

### Local Development Setup
```bash
# Clone repository
git clone <repository-url>
cd nassifGroup

# Install dependencies
npm install

# Start development server
npm run develop

# Access points
# Frontend: http://localhost:1337/
# Admin: http://localhost:1337/admin
# API: http://localhost:1337/api
```

### Environment Configuration
```bash
# .env.development
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=<your-jwt-secret>
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
APP_KEYS=<your-app-keys>
```

### Build Commands
```bash
npm run develop    # Development server with auto-reload
npm run build      # Build for production
npm run start      # Start production server
```

---

## 🚀 Deployment Guide

### Render.com Deployment

#### Build Configuration
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`
- **Node Version:** 22.17.1
- **Environment:** Node.js

#### Environment Variables
```bash
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=/opt/render/project/src/.tmp/data.db
HOST=0.0.0.0
PORT=10000
```

#### File Structure for Deployment
```
public/           # Frontend files served by Strapi
├── *.html       # All HTML pages
├── *.css        # Stylesheets
├── *.js         # JavaScript files
├── js/          # Additional JS modules
└── uploads/     # Media assets
```

### Alternative: Static Deployment
The project includes a static version in `nassif-group-static/` that can be deployed to:
- **Netlify** (drag & drop deployment)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

---

## 🔒 Security Considerations

### Content Security Policy (CSP)
```javascript
// Strapi's built-in CSP allows:
img-src: 'self' data: blob: https://market-assets.strapi.io
script-src: 'self'
style-src: 'self' 'unsafe-inline'
```

### API Security
- **CORS enabled** for frontend domain
- **JWT authentication** for admin access
- **Rate limiting** on API endpoints
- **Input validation** on all content types

### Data Protection
- **Local image storage** (no external CDNs)
- **SQLite database** with file-based storage
- **Environment variable protection** for secrets

---

## 🧪 Testing & Quality Assurance

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] API endpoints return expected data
- [ ] Image loading and CSP compliance
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Form functionality
- [ ] Search and filtering features

### Performance Considerations
- **Image optimization** (local storage)
- **Minimal external dependencies**
- **Efficient database queries**
- **CSS and JS minification** (production)

---

## 📊 Monitoring & Analytics

### Server Monitoring
- **Strapi built-in logging**
- **Performance metrics** via Render dashboard
- **Error tracking** through console logs

### Frontend Analytics
- **User interaction tracking** (can be added)
- **Page performance monitoring**
- **API response time tracking**

---

## 🔄 Maintenance & Updates

### Regular Maintenance Tasks
1. **Database backup** (SQLite file)
2. **Dependency updates** (`npm audit`)
3. **Content updates** via Strapi admin
4. **Image optimization** and cleanup
5. **Performance monitoring**

### Update Procedures
```bash
# Update dependencies
npm update

# Update Strapi
npm install @strapi/strapi@latest

# Rebuild after updates
npm run build
```

---

## 📞 Support & Troubleshooting

### Common Issues
1. **Port 1337 in use:** Kill existing processes or change port
2. **CSP violations:** Ensure all assets are local or whitelisted
3. **Database connection:** Check SQLite file permissions
4. **Build failures:** Clear node_modules and reinstall

### Debug Commands
```bash
# Check running processes
netstat -an | findstr :1337

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Database reset (development only)
rm .tmp/data.db
npm run develop
```

### Contact Information
- **Developer:** [Your Name]
- **Repository:** [GitHub URL]
- **Deployment:** [Render App URL]
- **Admin Panel:** [Admin URL]

---

## 📈 Future Enhancements

### Planned Features
- [ ] Advanced search and filtering
- [ ] User authentication system
- [ ] Favorite properties functionality
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

### Technical Improvements
- [ ] Redis caching implementation
- [ ] PostgreSQL migration (production)
- [ ] CDN integration for images
- [ ] API rate limiting
- [ ] Automated testing suite
- [ ] CI/CD pipeline setup

---

**Last Updated:** September 2025  
**Version:** 1.0.0  
**Documentation Status:** Complete
