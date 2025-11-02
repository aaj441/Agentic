# Vercel Deployment Guide - Step by Step

## 🚀 **Complete Vercel Deployment Process**

This guide will walk you through deploying your WCAG Pipeline to Vercel with full HubSpot, SendGrid, and Calendly integrations.

## 📋 **Prerequisites**

### **Required Accounts**
- [ ] GitHub account (for code repository)
- [ ] Vercel account (free signup)
- [ ] HubSpot account (free CRM)
- [ ] SendGrid account (free tier)
- [ ] Calendly account (free plan)

### **Required Tools**
- [ ] Node.js installed (v14+)
- [ ] Git installed
- [ ] Text editor (VS Code recommended)
- [ ] Terminal/Command Prompt

## 🔧 **Step 1: Prepare Your Code**

### **1.1 Create Git Repository**
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit initial version
git commit -m "Initial WCAG Pipeline deployment"

# Create GitHub repository (go to github.com and create new repo)
# Then connect your local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### **1.2 Create Vercel Configuration**
Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "env": {
    "HUBSPOT_API_KEY": "@hubspot_api_key",
    "SENDGRID_API_KEY": "@sendgrid_api_key",
    "CALENDLY_API_KEY": "@calendly_api_key",
    "SENDGRID_FROM_EMAIL": "@sendgrid_from_email"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

## 🔑 **Step 2: Set Up API Keys**

### **2.1 HubSpot API Key**
1. Go to [HubSpot](https://www.hubspot.com/) and create a free account
2. Navigate to Settings → Integrations → API Key
3. Create a new API key with CRM permissions
4. Copy the API key

### **2.2 SendGrid API Key**
1. Go to [SendGrid](https://sendgrid.com/) and create a free account
2. Navigate to Settings → API Keys
3. Create a new API key with full access
4. Verify a sender email address (Settings → Sender Authentication)
5. Copy the API key

### **2.3 Calendly API Key**
1. Go to [Calendly](https://calendly.com/) and create a free account
2. Navigate to Integrations → API and Webhooks
3. Create a personal access token
4. Create an event type for "WCAG Compliance Consultation"
5. Copy the event type UUID and API key

## 🚀 **Step 3: Deploy to Vercel**

### **Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel --prod

# Follow the prompts:
# 1. Set up and deploy → Y
# 2. Which scope → Select your account
# 3. Link to existing project → N
# 4. What's your project's name → wcag-pipeline
# 5. In which directory is your code located → ./
# 6. Override settings → N
```

### **Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com/) and login
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework: Static
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Add environment variables
6. Click "Deploy"

## ⚙️ **Step 4: Configure Environment Variables**

### **4.1 Using Vercel Dashboard**
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```bash
HUBSPOT_API_KEY=your-actual-hubspot-api-key
SENDGRID_API_KEY=your-actual-sendgrid-api-key
CALENDLY_API_KEY=your-actual-calendly-api-key
SENDGRID_FROM_EMAIL=your-verified-sender-email
```

### **4.2 Using Vercel CLI**
```bash
# Add environment variables
vercel env add HUBSPOT_API_KEY
vercel env add SENDGRID_API_KEY  
vercel env add CALENDLY_API_KEY
vercel env add SENDGRID_FROM_EMAIL

# Redeploy with new environment variables
vercel --prod
```

## 🧪 **Step 5: Test Your Deployment**

### **5.1 Basic Functionality Test**
1. Open your deployed URL
2. Check that the dashboard loads correctly
3. Verify all navigation links work
4. Test the scanning interface

### **5.2 Integration Test**
1. Open the browser console (F12)
2. Look for the "Test Integrations" button (bottom right)
3. Click to run integration tests
4. Check results in console

### **5.3 API Endpoint Test**
```bash
# Test HubSpot integration
curl -X POST https://your-app.vercel.app/api/hubspot-contact \
  -H "Content-Type: application/json" \
  -d '{
    "contactData": {
      "email": "test@example.com",
      "firstname": "Test",
      "lastname": "User",
      "company": "Test Company",
      "jobtitle": "CEO",
      "risk": "High"
    }
  }'
```

## 🎨 **Step 6: Customize Your Application**

### **6.1 Update Branding**
1. Edit `index.html` title and meta tags
2. Update company name in navigation
3. Modify footer information
4. Change color scheme in CSS variables

### **6.2 Configure Scanning Parameters**
1. Edit `main.js` scanning limits
2. Update violation detection rules
3. Modify email template variables
4. Adjust outreach campaign settings

### **6.3 Add Custom Domain (Optional)**
1. Buy domain from Namecheap, GoDaddy, etc.
2. Add domain to Vercel project settings
3. Update DNS records to point to Vercel
4. Wait for SSL certificate (automatic)

## 📊 **Step 7: Set Up Monitoring**

### **7.1 Google Analytics**
1. Create GA4 property
2. Add tracking code to `index.html`
3. Set up conversion events
4. Configure goals and funnels

### **7.2 Performance Monitoring**
1. Enable Vercel Analytics
2. Set up performance budgets
3. Monitor Core Web Vitals
4. Configure alerts for issues

## 🔒 **Step 8: Security Configuration**

### **8.1 API Security**
- ✅ Environment variables are secure
- ✅ API keys not exposed in client code
- ✅ CORS properly configured
- ✅ Rate limiting implemented

### **8.2 Application Security**
- ✅ HTTPS automatically enabled
- ✅ SSL certificates managed
- ✅ DDoS protection included
- ✅ Security headers configured

## 📈 **Step 9: Scale Your Application**

### **9.1 Monitor Usage**
- Track API call volumes
- Monitor bandwidth usage
- Watch function execution times
- Set up usage alerts

### **9.2 Optimize Performance**
- Implement caching strategies
- Optimize images and assets
- Minimize JavaScript bundles
- Use lazy loading

### **9.3 Plan for Growth**
- Set up backup systems
- Prepare for traffic spikes
- Plan database scaling
- Consider team collaboration

## 🛠️ **Troubleshooting Guide**

### **Common Issues**

#### **Deployment Fails**
```bash
# Check logs
vercel logs your-app-name

# Redeploy with debug info
vercel --prod --debug
```

#### **API Integration Not Working**
1. Check environment variables are set
2. Verify API keys are correct
3. Test API endpoints individually
4. Check CORS configuration
5. Review error logs

#### **Performance Issues**
1. Check bundle size
2. Optimize images
3. Enable compression
4. Use CDN for assets
5. Monitor Core Web Vitals

### **Getting Help**
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://vercel.com/community
- GitHub Issues: Report bugs on your repository
- Discord: Join Vercel's community server

## 📋 **Success Checklist**

### **Deployment Complete**
- [ ] Application deployed successfully
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Forms submit successfully

### **Integrations Working**
- [ ] HubSpot contacts created
- [ ] SendGrid emails sent
- [ ] Calendly meetings scheduled
- [ ] API endpoints responding

### **Performance Optimized**
- [ ] Page load speed < 3 seconds
- [ ] All images optimized
- [ ] JavaScript minified
- [ ] CSS optimized

### **Monitoring Active**
- [ ] Google Analytics tracking
- [ ] Performance monitoring
- [ ] Error tracking enabled
- [ ] Uptime monitoring

## 🎉 **You're Live!**

Your WCAG Pipeline is now deployed and ready to:

1. **Scan websites** for accessibility violations
2. **Generate leads** through automated outreach
3. **Create HubSpot contacts** and deals
4. **Send compliance alerts** via email
5. **Schedule meetings** with Calendly
6. **Track performance** with analytics

**Next Steps:**
1. Start scanning target websites
2. Monitor lead generation results
3. Optimize based on performance data
4. Scale up as your business grows

---

**Your complete WCAG compliance automation platform is now live and ready to generate high-value leads for your business!**

For ongoing support and optimization, refer to the documentation files:
- `INTEGRATION_GUIDE.md` - API setup and troubleshooting
- `ADDITIONAL_INTEGRATIONS.md` - More CRM and marketing tools
- `HOSTING_COMPARISON.md` - Cost analysis and recommendations