# Nassif Group Real Estate - Setup Guide

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd nassifGroup
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start Strapi CMS
```bash
npm run develop
```
Wait for Strapi to start (you'll see "Welcome back!" message)

### 4. Seed the database with sample data
```bash
npm run seed
```

### 5. Start the website server (in a new terminal)
```bash
node server.js
```

### 6. Access your services
- **Website**: http://localhost:8080/
- **Strapi Admin**: http://localhost:1337/admin

## 🎯 Alternative: Use the startup script

```bash
# Windows
.\start-all.bat

# Then in another terminal after Strapi starts
npm run seed
```

## 📝 Adding More Apartments

### Via Admin Panel (Recommended)
1. Go to: http://localhost:1337/admin
2. Navigate to: Content Manager → Apartments
3. Click: "Create new entry"
4. Fill the form and save

### Via Bulk Import
```bash
node scripts/bulk-import-apartments.js
```

### Via API Scripts
Use the scripts in the `scripts/` folder for programmatic updates.

## 🔧 Troubleshooting

### PowerShell Execution Policy Error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
```powershell
# Kill all Node.js processes
taskkill /F /IM node.exe

# Or kill specific ports
netstat -ano | findstr ":8080"
netstat -ano | findstr ":1337"
# Then use the PID to kill: taskkill /F /PID <PID>
```

### Check if Services are Running
```powershell
# Check Node.js processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"}

# Check port usage
netstat -an | findstr ":1337\|:8080"
```

## 📊 Available Scripts

- `npm run develop` - Start Strapi in development mode
- `npm run start` - Start Strapi in production mode
- `npm run build` - Build Strapi for production
- `npm run seed` - Add sample apartments to database
- `npm run setup` - Seed database and show success message

## 🌐 URLs

- **Homepage**: http://localhost:8080/
- **Services**: http://localhost:8080/services.html
- **About**: http://localhost:8080/about.html
- **Contact**: http://localhost:8080/contact.html
- **Blog**: http://localhost:8080/blog.html
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

## 📁 Project Structure

```
nassifGroup/
├── scripts/           # Database seeding and import scripts
├── src/              # Strapi source code
├── config/           # Strapi configuration
├── public/           # Static files
├── .tmp/            # Database and temporary files (excluded from git)
├── *.html           # Website pages
├── *.js             # Website JavaScript
├── *.css            # Website styles
└── package.json     # Dependencies and scripts
```

## 🎉 Success!

Once everything is running, you should see:
- ✅ Strapi admin panel accessible
- ✅ Website displaying apartments
- ✅ Sample apartments in the database
- ✅ Search and filter functionality working
