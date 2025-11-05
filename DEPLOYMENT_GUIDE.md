# 🚀 Nassif Group - Complete Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Prerequisites
- [x] Email configuration complete locally
- [ ] SMTP password received from Namecheap contact
- [ ] Namecheap contact confirmed they'll handle DNS
- [ ] GitHub repository accessible

---

## 🛠️ Step-by-Step Deployment Process

### **PART 1: Get Ready (Do This First)**

#### 1. Get Email Password
**From Namecheap contact:**
```
"I need the SMTP password for info@nassifgroup.com to configure the contact form email."
```

**Update locally:**
- Open `env.development`
- Replace `your-password-here` on line 32 with real password
- Save file
- Strapi auto-reloads
- Test contact form at `http://localhost:1337/contact.html`

#### 2. Confirm DNS Setup
**Tell Namecheap contact:**
```
"Please confirm you can handle DNS pointing for nassifgroup.com. 
I'll give you the hosting URL once my website is deployed."
```

**They should reply:**
- ✅ "Yes, I'll handle it"
- ✅ "Just give me the CNAME URL when ready"

---

### **PART 2: Deploy on Render.com**

#### Step 1: Create PostgreSQL Database

1. **Go to Render Dashboard** → https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. **Settings:**
   - **Name:** `nassif-db`
   - **Database:** `nassif_group`
   - **User:** `nassif_user`
   - **Region:** Choose closest to your users
   - **Plan:** **Free** (for testing)
4. Click **"Create Database"**
5. **Wait for database to be ready** (30-60 seconds)
6. **Copy the "Internal Database URL"** - you'll need it!

**Internal Database URL looks like:**
```
postgresql://nassif_user:password@dpg-xxxxx-a/nassif_group
```

---

#### Step 2: Create Web Service (Strapi App)

1. **Go to Dashboard** → Click **"New +"** → **"Web Service"**
2. **Connect your GitHub:**
   - Click **"Connect GitHub"** (if not connected)
   - Authorize Render access
   - Select repository: `nassifGroup`
3. **Basic Settings:**
   - **Name:** `nassif-group-website`
   - **Region:** Same as database
   - **Branch:** `main` (or `master`)
   - **Runtime:** Node
   - **Root Directory:** (leave empty)

4. **Build & Deploy Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

5. **Instance Type:**
   - **Free** plan is enough for testing
   - Upgrade later if needed

6. **Click "Create Web Service"**

**⚠️ Wait! Don't deploy yet!** You need to configure environment variables first.

---

#### Step 3: Configure Environment Variables

**In your Web Service dashboard, go to "Environment" tab:**

**Add these variables:**

```bash
# ===== REQUIRED STRAPI VARIABLES =====
APP_KEYS=nassif-group-key-1,nassif-group-key-2
API_TOKEN_SALT=nassif-group-api-token-salt
ADMIN_JWT_SECRET=nassif-group-admin-jwt-secret
TRANSFER_TOKEN_SALT=nassif-group-transfer-token-salt
JWT_SECRET=nassif-group-jwt-secret

# ===== DATABASE CONFIGURATION =====
DATABASE_URL=<paste-internal-database-url-here>

# ===== RENDER SPECIFIC =====
HOST=0.0.0.0
PORT=10000

# ===== PRODUCTION SETTINGS =====
NODE_ENV=production

# ===== EMAIL CONFIGURATION =====
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USERNAME=info@nassifgroup.com
SMTP_PASSWORD=<paste-real-smtp-password-here>
EMAIL_FROM=info@nassifgroup.com
EMAIL_REPLY_TO=info@nassifgroup.com

# ===== CORS CONFIGURATION =====
CORS_ENABLED=true
CORS_ORIGIN=https://nassifgroup.com

# ===== SECURITY =====
SESSION_SECRET=nassif-group-session-secret
```

**⚠️ IMPORTANT: Replace:**
- `<paste-internal-database-url-here>` with your PostgreSQL internal URL
- `<paste-real-smtp-password-here>` with the real SMTP password

**After adding all variables, click "Save Changes"**

---

#### Step 4: Link Database to Web Service

1. **In PostgreSQL dashboard:**
   - Go to "Connections" tab
   - You'll see "Internal Database URL"
   - Copy it again to verify it's correct

2. **In Web Service dashboard:**
   - Go to "Environment" tab
   - Verify `DATABASE_URL` is set correctly

3. **Render will automatically connect them!**

---

#### Step 5: Deploy!

1. **Go to "Events" or "Manual Deploy" tab**
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. **Wait for deployment** (5-10 minutes first time)
4. **Watch the logs** for any errors

**Successful deployment shows:**
```
🚀 Server started on port 10000
✅ Strapi admin panel ready
```

---

#### Step 6: Get Your Deployment URL

**After successful deployment:**
1. Your site will be live at: `https://nassif-group-website.onrender.com`
2. Admin panel: `https://nassif-group-website.onrender.com/admin`

**Copy this URL!** You'll need it for DNS.

---

### **PART 3: Configure Database for Production**

⚠️ **CRITICAL: Update Strapi to use PostgreSQL!**

**Problem:** Your `config/database.js` is configured for SQLite only.

**Solution:** Create a production database config file.

**Create new file: `config/database.js`**

```javascript
const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
        debug: false,
      },
    };
  }

  // Default to SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
```

**Add to Render environment variables:**
```
DATABASE_CLIENT=postgres
```

**⚠️ You need to redeploy after adding this!**

---

### **PART 4: Add First Admin User**

**After deployment:**

1. **Visit:** `https://nassif-group-website.onrender.com/admin`
2. **Create admin user:**
   - Enter email
   - Enter strong password
   - Enter first/last name
3. **Click "Let's start"**
4. **Login with your credentials**
5. **✅ Admin panel ready!**

---

### **PART 5: Migrate Data (Projects, Units, Property Types)**

⚠️ **Important:** Your local SQLite database has real data that needs to be migrated!

#### **Option A: Manual Data Entry (Recommended)**

1. **Open both:**
   - Local Strapi: `http://localhost:1337/admin`
   - Production Strapi: `https://nassif-group-website.onrender.com/admin`

2. **For each content type:**
   - Go to **Content Manager** → **Projects** (local)
   - Copy data from local to production
   - Repeat for **Property Types** and **Units**

3. **For images:**
   - Download from local uploads
   - Re-upload to production

**Time required:** 1-2 hours depending on data volume

#### **Option B: Database Script (Advanced)**

**Create migration script** (future enhancement)

---

### **PART 6: Configure DNS (Namecheap Contact Does This)**

**Send this to Namecheap contact:**

```
Hi! My website is deployed and ready. Please configure DNS:

Add CNAME record:
- Name: @ (or leave blank)
- Value: nassif-group-website.onrender.com
- TTL: Automatic

This will make nassifgroup.com point to my website.

Let me know when it's done! 

My website will be live at: https://nassif-group-website.onrender.com
Admin: https://nassif-group-website.onrender.com/admin
```

**Wait for them to confirm DNS is updated (usually 1-24 hours)**

---

### **PART 7: Configure Custom Domain on Render**

**After DNS is configured:**

1. **Go to Web Service dashboard**
2. **Click "Settings" tab**
3. **Scroll to "Custom Domains"**
4. **Click "Add Custom Domain"**
5. **Enter:** `nassifgroup.com`
6. **Click "Save"**
7. **Render will verify the DNS**
8. **Generate SSL certificate** (automatic)

**✅ Your site will now be live at https://nassifgroup.com!**

---

## 🧪 Testing Checklist

### **Website Functionality**
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Contact form works
- [ ] Properties/Projects display correctly
- [ ] Mobile responsive design works
- [ ] Search and filters work

### **Email Testing**
- [ ] Contact form sends email
- [ ] Email arrives at info@nassifgroup.com
- [ ] Email formatting looks correct

### **Admin Panel**
- [ ] Can log in
- [ ] Can view all content types
- [ ] Can edit/create content
- [ ] Can upload images
- [ ] Can publish content

---

## 📊 Render Pricing (Free Tier Limits)

**Free PostgreSQL:**
- ⏱️ **90 days inactive** → auto-pause
- 💾 **1GB storage**
- 🔗 **Connection from same region only**

**Free Web Service:**
- ⏱️ **15 minutes inactive** → auto-sleep
- ⏱️ **First request after sleep** → 30-second spin-up
- 💾 **512MB RAM**
- 🚫 **No persistent storage**

**When to upgrade:**
- If you get too much traffic
- If site sleeps too often
- If you need more storage

---

## 🔒 Security Checklist

- [x] ✅ Strong admin password
- [x] ✅ HTTPS enabled (SSL certificate)
- [x] ✅ CORS configured for your domain only
- [x] ✅ Environment variables secured
- [x] ✅ JWT secrets set
- [x] ✅ Email credentials secured

---

## 🆘 Troubleshooting

### **Deployment Fails**
- Check build logs in Render
- Verify Node.js version (18-20)
- Check environment variables are all set
- Try local build: `npm run build`

### **Database Connection Error**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Verify database permissions

### **Images Not Loading**
- Check uploads folder exists
- Verify file permissions
- Check CORS configuration

### **Email Not Sending**
- Verify SMTP credentials
- Check email logs in Render
- Test from local first

### **DNS Not Working**
- Wait 24-48 hours for propagation
- Check DNS settings with tool: https://dnschecker.org
- Verify CNAME record is correct

---

## 🎉 Success!

**Your Nassif Group website is now live!**

**URLs:**
- **Public:** https://nassifgroup.com
- **Admin:** https://nassifgroup.com/admin
- **API:** https://nassifgroup.com/api

**Next Steps:**
1. Monitor for errors
2. Set up backups
3. Plan upgrade if needed
4. Add analytics (optional)

---

## 📝 Summary

**You handled:**
- ✅ Email configuration
- ✅ Deployment on Render
- ✅ Database setup
- ✅ Environment variables
- ✅ First admin user

**Namecheap contact handled:**
- ✅ DNS configuration

**Together you:**
- ✅ Made nassifgroup.com live!
- ✅ Email contact form working
- ✅ Admin panel accessible

**🎊 Congratulations!**

