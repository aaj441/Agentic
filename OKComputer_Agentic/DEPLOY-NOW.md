# 🚀 Deploy WCAG Pipeline - Quick Start

## ⚡ Immediate Deployment (5 minutes)

### 1. Run Automated Setup
```bash
# Make sure you're in the project directory
cd /mnt/okcomputer/output

# Run the automated setup
./setup.sh
```

### 2. Configure API Keys
```bash
# Edit the environment file
nano .env

# Add your API keys:
HUBSPOT_API_KEY=your_actual_key
SENDGRID_API_KEY=your_actual_key
CALENDLY_API_KEY=your_actual_key
```

### 3. Deploy to Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway deploy
```

### 4. Alternative: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 📋 Complete Migration Checklist

### ✅ Pre-Deployment
- [ ] Run `./setup.sh` ✨
- [ ] Update `.env` with API keys 🔑
- [ ] Test locally with `npm run dev` 🧪
- [ ] Commit changes to git 📦

### ✅ GitHub Setup
- [ ] Create GitHub repository 🆕
- [ ] Push code to main branch 🚀
- [ ] Set up GitHub Secrets 🔐
- [ ] Enable GitHub Actions ⚙️

### ✅ Production Deployment
- [ ] Deploy to Railway/Vercel 🌐
- [ ] Configure domain name 🏷️
- [ ] Set environment variables 🌍
- [ ] Test all functionality ✅

### ✅ Post-Deployment
- [ ] Verify WCAG scanning works 🔍
- [ ] Test CEO outreach automation 📧
- [ ] Check PDF report generation 📄
- [ ] Monitor application logs 📊

---

## 🎯 API Key Setup Guide

### HubSpot (Free Tier Available)
1. Go to [HubSpot Developers](https://developers.hubspot.com/)
2. Create a Private App
3. Copy the API key
4. Add to `.env` file

### SendGrid (Free 100 emails/day)
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Verify your sender email
3. Create API key
4. Add to `.env` file

### Calendly (Free Plan Available)
1. Go to [Calendly Integrations](https://calendly.com/integrations)
2. Create API key
3. Set up webhook
4. Add to `.env` file

---

## 🔧 Troubleshooting

### Common Issues
1. **Port already in use**: Change port in `.env`
   ```bash
   PORT=8001
   ```

2. **API key errors**: Verify keys are active
   ```bash
   # Test HubSpot API
   curl -H "Authorization: Bearer YOUR_KEY" https://api.hubapi.com/crm/v3/objects/contacts
   ```

3. **Deployment fails**: Check logs
   ```bash
   railway logs
   # or
   vercel logs
   ```

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm run dev
```

---

## 📞 Support Resources

### Documentation
- 📖 [Complete Migration Guide](MIGRATION-GUIDE.md)
- 🗂️ [Project Documentation](docs/)
- 🎥 [Video Tutorials](https://youtube.com/your-channel)

### Community
- 💬 [Discord Community](https://discord.gg/your-server)
- 🐛 [GitHub Issues](https://github.com/YOUR_USERNAME/wcag-pipeline/issues)
- 📧 [Email Support](support@your-domain.com)

### Updates
- 🔄 [Release Notes](CHANGELOG.md)
- 🆕 [Latest Features](docs/updates.md)
- 🛣️ [Roadmap](docs/roadmap.md)

---

## 🎉 Success Indicators

When everything is working correctly:
- ✅ Application loads without errors
- ✅ WCAG scanning produces results
- ✅ PDF reports generate successfully
- ✅ CEO outreach emails send
- ✅ Meeting scheduling works
- ✅ Dashboard shows analytics
- ✅ All integrations respond correctly

---

*This quick start guide follows ADHD-friendly principles with clear steps, visual indicators, and immediate feedback.*