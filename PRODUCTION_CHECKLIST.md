# 🚀 Production Deployment Checklist

## 📋 Pre-Deployment

### ✅ 1. Get Email Password from Namecheap
```
Ask: "I need the SMTP password for info@nassifgroup.com"
Update: env.development line 32
Test: http://localhost:1337/contact.html
```

### ✅ 2. Confirm DNS Arrangement
```
Ask: "Can you handle DNS pointing for nassifgroup.com?"
Response needed: "Yes, give me the URL when ready"
```

---

## 🛠️ Your Deployment Steps

### ✅ **Step 1: Install PostgreSQL Packages** (DONE!)
```powershell
cd C:\Users\IssamEid\OneDrive - intalio\Documents\GitHub\nassifGroup
npm install pg pg-connection-string
```
**✅ COMPLETED!**

### ✅ **Step 2: Create Production Database Config** (DONE!)
**File:** `config/env/production/database.js` - Created
**✅ COMPLETED!**

### ✅ **Step 3: Create Production Server Config** (DONE!)
**File:** `config/env/production/server.js` - Created
**✅ COMPLETED!**

### ✅ **Step 4: Update Main Database Config** (DONE!)
**File:** `config/database.js` - Updated to support PostgreSQL
**✅ COMPLETED!**

### **Step 5: Commit Changes**
```powershell
git add .
git commit -m "Add PostgreSQL support for production deployment"
git push
```

---

## 🌐 Deploy on Render.com

### **Create PostgreSQL Database**
1. **Render Dashboard** → "New +" → "PostgreSQL"
2. **Settings:**
   - Name: `nassif-db`
   - Plan: Free
   - Region: Choose closest
3. Click "Create Database"
4. **Copy "Internal Database URL"**

---

### **Create Web Service**
1. **Dashboard** → "New +" → "Web Service"
2. **Connect GitHub** → Select `nassifGroup` repository
3. **Settings:**
   - Name: `nassif-group-website`
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Plan: Free

### **Add Environment Variables**
```bash
# Database
DATABASE_URL=<paste-internal-url-here>

# Strapi Required
APP_KEYS=nassif-group-key-1,nassif-group-key-2
API_TOKEN_SALT=nassif-group-api-token-salt
ADMIN_JWT_SECRET=nassif-group-admin-jwt-secret
TRANSFER_TOKEN_SALT=nassif-group-transfer-token-salt
JWT_SECRET=nassif-group-jwt-secret

# Server
NODE_ENV=production
HOST_URL=https://nassif-group-website.onrender.com
HOST=0.0.0.0
PORT=10000

# Email
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USERNAME=info@nassifgroup.com
SMTP_PASSWORD=<paste-real-password>
EMAIL_FROM=info@nassifgroup.com
EMAIL_REPLY_TO=info@nassifgroup.com

# CORS
CORS_ENABLED=true
CORS_ORIGIN=https://nassifgroup.com

# Security
SESSION_SECRET=nassif-group-session-secret
```

**Click "Create Web Service"** → Wait for deployment

---

### **Get Deployment URL**
After deployment, note your URL:
```
https://nassif-group-website.onrender.com
```

---

## 👤 Create First Admin
1. Visit: `https://nassif-group-website.onrender.com/admin`
2. Enter email, password, name
3. Click "Let's start"
4. ✅ Admin created!

---

## 📦 Migrate Your Data

### **Manual Copy (Recommended)**
1. **Open both:**
   - Local: http://localhost:1337/admin
   - Production: https://nassif-group-website.onrender.com/admin

2. **Copy content:**
   - Content Manager → Projects → Copy each one
   - Content Manager → Property Types → Copy each one
   - Content Manager → Units → Copy each one

3. **Upload images:**
   - Download from local
   - Upload to production

**Time: 1-2 hours**

---

## 🌍 Configure DNS

### **Send to Namecheap Contact:**
```
Hi! My website is deployed. Please add:

CNAME: @ → nassif-group-website.onrender.com

This will make nassifgroup.com point to my website.

Let me know when done!
```

---

### **Configure Custom Domain on Render**
**After DNS is set:**

1. Web Service → Settings → Custom Domains
2. Add: `nassifgroup.com`
3. Click "Save"
4. Wait for SSL certificate (automatic)

---

## ✅ Testing

### **Website**
- [ ] https://nassifgroup.com loads
- [ ] All images show
- [ ] Contact form works
- [ ] Projects display
- [ ] Mobile responsive

### **Email**
- [ ] Contact form sends email
- [ ] Email arrives at info@nassifgroup.com

### **Admin**
- [ ] Can log in
- [ ] Can edit content
- [ ] Can upload images
- [ ] Can publish

---

## 📊 Costs

**Free Tier:**
- ✅ PostgreSQL: 90 days no auto-sleep
- ✅ Web Service: Sleeps after 15 min inactivity
- ✅ First request after sleep: 30 seconds to wake up

**When to upgrade:**
- Too much traffic
- Site sleeps too often
- Need more storage

---

## 🆘 Troubleshooting

**Deployment fails:**
- Check Render logs
- Verify all env variables set
- Try: `npm run build` locally

**Database error:**
- Check DATABASE_URL
- Verify PostgreSQL running

**Email not working:**
- Check SMTP credentials
- Check Render logs

**DNS not working:**
- Wait 24-48 hours
- Check with: https://dnschecker.org

---

## 🎉 Success!

**Your URLs:**
- 🌐 Public: https://nassifgroup.com
- 🛠️ Admin: https://nassifgroup.com/admin
- 🔌 API: https://nassifgroup.com/api

**Next:**
- Monitor for errors
- Plan backups
- Upgrade if needed
- Add analytics (optional)

---

## 📝 Summary

**You handle:**
- ✅ Email config
- ✅ Render deployment
- ✅ Database setup
- ✅ Data migration

**They handle:**
- ✅ DNS configuration

**Together:**
- ✅ Live website!
- ✅ Email working!
- ✅ Admin ready!

**🎊 Done!**

