# Nassif Group Static Website

A static version of the Nassif Group website that works without a backend server.

## 🚀 Quick Start

### Option 1: Direct File Access (No Server Needed)
Simply open `services.html` directly in your browser:
```
file:///C:/Users/IssamEid/OneDrive%20-%20intalio/Documents/GitHub/nassifGroup/nassif-group-static/services.html
```

### Option 2: With Local Server
1. Start a local server in the `nassif-group-static` folder
2. Open `http://localhost:8000/services.html`

## 📁 File Structure

```
nassif-group-static/
├── services.html              # Main services page
├── data-editor.html           # JSON data editor
├── data/
│   └── website-data.json      # All website data in one file
├── js/
│   └── website-data-manager.js # Data management class
├── uploads/                   # Property images
└── styles.css                 # Website styles
```

## 📊 Data Management

### Easy Data Editing
1. Open `data-editor.html` in your browser
2. Edit the JSON data in the text areas
3. Click "Save All Changes" to download the updated JSON
4. Replace `data/website-data.json` with the downloaded file

### Manual JSON Editing
Edit `data/website-data.json` directly to update:
- **Projects** - Add/remove projects, update descriptions, pricing
- **Property Types** - Modify simplex, duplex, shops information
- **Apartments** - Update individual apartment listings
- **Settings** - Change contact info, currency, social media links

## 🎨 Features

- ✅ **Project Filtering** - Click project buttons to filter property types
- ✅ **Hover Effects** - Smooth animations and transitions
- ✅ **Responsive Design** - Works on all devices
- ✅ **Real Images** - Uses actual property images
- ✅ **WhatsApp Integration** - Contact buttons for available properties
- ✅ **Status Badges** - Available/Sold Out indicators
- ✅ **JSON Data Management** - Easy to update content

## 🔧 Customization

### Adding New Projects
1. Open `data/website-data.json`
2. Add a new project object to the `projects` array
3. Include property types and pricing information

### Adding New Property Types
1. Add to `propertyTypes` array in JSON
2. Add to project's `propertyTypes` array
3. Include in project's `propertyTypeInfo`

### Updating Images
1. Add images to `uploads/` folder
2. Update image paths in JSON data
3. Use relative paths: `uploads/filename.jpg`

## 📱 Contact Information

- **Phone:** +961 78 858 784
- **WhatsApp:** 96178858784
- **Currency:** USD ($)

## 🛠️ Technical Details

- **No Backend Required** - Pure HTML/CSS/JavaScript
- **JSON Data Source** - Single file for all content
- **Bootstrap 5** - Modern responsive framework
- **Font Awesome** - Icons and graphics
- **File Protocol Compatible** - Works with `file://` URLs

## 🚀 Deployment

### Static Hosting
Upload the entire `nassif-group-static` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

### Local Development
1. Make changes to JSON data
2. Test with `services.html`
3. Use `data-editor.html` for easy editing

## 📝 Data Structure

The `website-data.json` file contains:
- **projects** - Array of project objects with property types
- **propertyTypes** - Array of property type definitions
- **apartments** - Array of individual apartment listings
- **settings** - Website configuration and contact info

Each project includes:
- Basic info (name, description, location)
- Property types available
- Pricing and status for each property type
- Images and features

## 🎯 Usage Tips

1. **Backup Data** - Always backup `website-data.json` before making changes
2. **Validate JSON** - Use the data editor to avoid syntax errors
3. **Test Changes** - Refresh the page after updating data
4. **Image Optimization** - Keep images under 500KB for fast loading
5. **Mobile Testing** - Test on mobile devices for responsive design

## 🔍 Troubleshooting

### Images Not Loading
- Check image paths in JSON data
- Ensure images exist in `uploads/` folder
- Use relative paths: `uploads/filename.jpg`

### Data Not Updating
- Clear browser cache
- Check JSON syntax for errors
- Verify file path in data manager

### Hover Effects Not Working
- Ensure Bootstrap CSS is loaded
- Check for JavaScript errors in console
- Verify custom CSS is included

## 📞 Support

For technical support or questions about the static website, refer to the original Strapi-based website documentation.