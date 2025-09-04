# Nassif Group Strapi Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Strapi Development Server
```bash
npm run develop
```

### 3. Access Admin Panel
- Open your browser and go to: `http://localhost:1337/admin`
- Create your first admin user account
- Start adding apartments!

## 📋 What's Included

### ✅ Complete Apartment Management System
- **600+ apartments support** with pagination
- **Advanced search** by location, price, features
- **Image management** for property photos
- **WhatsApp integration** for instant contact
- **SEO optimization** for each apartment

### ✅ Admin Panel Features
- **Easy apartment creation** with forms
- **Bulk operations** for managing multiple apartments
- **Image upload** and organization
- **Status management** (Available, Sold, Reserved, Pending)
- **Featured properties** for homepage

### ✅ Website Integration
- **Dynamic loading** from Strapi API
- **Search functionality** on services page
- **Location filtering** (Bouar, Adma, Zalka, Ghazir)
- **Pagination** for large apartment lists
- **Responsive design** for all devices

## 🏠 Adding Your First Apartment

### Step 1: Login to Admin Panel
1. Go to `http://localhost:1337/admin`
2. Login with your admin account

### Step 2: Create New Apartment
1. Click "Content Manager" in the sidebar
2. Select "Apartment" from the content types
3. Click "Create new entry"

### Step 3: Fill Apartment Details
**Required Fields:**
- **Name**: Apartment title (e.g., "Bouar Heights Luxury")
- **Location**: Select from dropdown (bouar, adma, zalka, ghazir)
- **Price**: Property price (e.g., 850000)
- **Description**: Detailed property description
- **Bedrooms**: Number of bedrooms
- **Bathrooms**: Number of bathrooms
- **Area**: Property area in square feet

**Optional Fields:**
- **Main Image**: Upload property photo
- **Images**: Upload multiple photos
- **Features**: Property features (JSON format)
- **Status**: Available, Sold, Reserved, Pending
- **Is Featured**: Check to show on homepage

### Step 4: Save and Publish
1. Click "Save" to save as draft
2. Click "Publish" to make it live on your website

## 🔧 Configuration

### Database
- **Default**: SQLite (file-based, no setup required)
- **Production**: Can be changed to MySQL/PostgreSQL

### API Endpoints
- **Base URL**: `http://localhost:1337/api`
- **Apartments**: `/apartments`
- **Featured**: `/apartments/featured`
- **Search**: `/apartments/search`
- **By Location**: `/apartments/location/{location}`

### Website Integration
- **API URL**: Update `js/strapi-api.js` if needed
- **CORS**: Configured for localhost development
- **Images**: Automatically served by Strapi

## 📱 Features Overview

### For Website Visitors
- **Browse apartments** by location
- **Search** by name, description, or features
- **Filter** by price range, bedrooms, bathrooms
- **View details** with high-quality images
- **Contact via WhatsApp** with pre-filled messages
- **Pagination** for easy browsing

### For Admin Users
- **Add apartments** with rich forms
- **Upload images** with drag-and-drop
- **Manage status** (Available, Sold, etc.)
- **Set featured properties** for homepage
- **Bulk operations** for efficiency
- **User management** and permissions

## 🎯 Apartment Data Structure

Each apartment includes:
- **Basic Info**: Name, location, price, description
- **Specifications**: Bedrooms, bathrooms, area, floor
- **Features**: Amenities, facilities, utilities
- **Media**: Main image, gallery, floor plans
- **Contact**: WhatsApp integration, phone numbers
- **SEO**: Meta titles, descriptions, keywords
- **Analytics**: Views, favorites, inquiries

## 🚀 Production Deployment

### 1. Build for Production
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Environment Variables
Create `.env` file:
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### 4. Database (Production)
For production, consider using:
- **MySQL**: Better performance for large datasets
- **PostgreSQL**: Advanced features and scalability
- **Cloud databases**: AWS RDS, Google Cloud SQL

## 🔒 Security

### Admin Panel Security
- **Strong passwords** required
- **JWT tokens** for authentication
- **Role-based permissions**
- **API rate limiting**

### API Security
- **CORS configuration**
- **Input validation**
- **SQL injection protection**
- **XSS protection**

## 📊 Performance

### Optimizations Included
- **Image optimization** and resizing
- **Lazy loading** for better performance
- **Pagination** to limit data transfer
- **Caching** for frequently accessed data
- **CDN ready** for image delivery

### Monitoring
- **View tracking** for each apartment
- **Search analytics** for popular queries
- **Performance metrics** in admin panel

## 🆘 Troubleshooting

### Common Issues

**1. Strapi won't start**
- Check Node.js version (18+ required)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

**2. Images not loading**
- Check file permissions
- Verify upload directory exists
- Check CORS settings

**3. API not responding**
- Verify Strapi is running on port 1337
- Check API URL in `js/strapi-api.js`
- Verify CORS configuration

**4. Admin panel access issues**
- Clear browser cache
- Check admin user permissions
- Verify JWT secret configuration

### Getting Help
- Check Strapi documentation: https://docs.strapi.io
- Review console errors in browser
- Check Strapi logs in terminal

## 🎉 Success!

Your Nassif Group real estate website is now powered by Strapi! You can:

1. **Add apartments** through the admin panel
2. **Manage your 600+ properties** efficiently
3. **Provide great user experience** with search and filters
4. **Scale easily** as your business grows

**Next Steps:**
- Add your first apartments
- Customize the admin panel
- Set up production hosting
- Train your team on the admin panel

Happy apartment managing! 🏠✨
