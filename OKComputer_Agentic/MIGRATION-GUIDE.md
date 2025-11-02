# 🚀 WCAG Pipeline - Complete Migration Guide

## 📋 Quick Start Checklist

### ✅ Pre-Migration Setup
- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] Railway/Vercel account ready
- [ ] API keys prepared (HubSpot, SendGrid, Calendly)

### 🔄 Migration Steps
1. [ ] Initialize Git repository
2. [ ] Create ADHD-friendly folder structure
3. [ ] Set up deployment configuration
4. [ ] Configure environment variables
5. [ ] Deploy to production
6. [ ] Test all functionality

---

## 🛠️ Step-by-Step Migration

### 1. 📁 Create ADHD-Friendly Structure

```bash
# Create organized project structure
mkdir -p wcag-pipeline-organized
mkdir -p wcag-pipeline-organized/{src,docs,config,public}
mkdir -p wcag-pipeline-organized/src/{components,pages,api,utils}
mkdir -p wcag-pipeline-organized/public/{images,css,js}
mkdir -p wcag-pipeline-organized/docs/{guides,api,deployment}
```

### 2. 📝 Copy Essential Files

```bash
# Copy HTML files to src/pages
cp /mnt/okcomputer/output/*.html wcag-pipeline-organized/src/pages/

# Copy JavaScript files to src
cp /mnt/okcomputer/output/*.js wcag-pipeline-organized/src/

# Copy API files
cp /mnt/okcomputer/output/api/*.js wcag-pipeline-organized/src/api/

# Create public assets directory
cp -r /mnt/okcomputer/output wcag-pipeline-organized/public/
```

### 3. 🚀 Initialize Git Repository

```bash
cd wcag-pipeline-organized

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/
.next/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/
EOF

# Initial commit
git add .
git commit -m "Initial commit: ADHD-friendly WCAG Pipeline structure"
```

### 4. 🌐 Create GitHub Repository

```bash
# Create new repository on GitHub (use GitHub CLI or web interface)
# Then connect local repository:
git remote add origin https://github.com/YOUR_USERNAME/wcag-pipeline.git
git branch -M main
git push -u origin main
```

### 5. 📦 Create Package Configuration

```bash
# Create package.json for deployment
cat > package.json << 'EOF'
{
  "name": "wcag-pipeline",
  "version": "1.0.0",
  "description": "Professional WCAG compliance scanning and CEO outreach automation",
  "main": "src/index.js",
  "scripts": {
    "dev": "python -m http.server 8000",
    "build": "echo 'Build completed'",
    "start": "python -m http.server $PORT",
    "deploy": "railway deploy"
  },
  "keywords": ["wcag", "accessibility", "compliance", "automation"],
  "author": "Your Name",
  "license": "MIT",
  "engines": {
    "node": ">=14.0.0"
  }
}
EOF
```

### 6. 🚂 Railway Deployment Setup

```bash
# Create railway.toml configuration
cat > railway.toml << 'EOF'
[build]
builder = "static"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[environments.production]
variables = { NODE_ENV = "production" }
EOF
```

### 7. 🌍 Environment Configuration

```bash
# Create environment template
cat > .env.example << 'EOF'
# HubSpot API Configuration
HUBSPOT_API_KEY=your_hubspot_api_key_here
HUBSPOT_BASE_URL=https://api.hubapi.com

# SendGrid Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your-verified-email@domain.com

# Calendly Integration
CALENDLY_API_KEY=your_calendly_api_key_here
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_here

# Database Configuration (if using)
DATABASE_URL=your_database_connection_string
REDIS_URL=your_redis_connection_string

# Application Settings
APP_URL=https://your-app-domain.com
PORT=8000
NODE_ENV=production
EOF
```

### 8. 📚 Create Documentation

```bash
# Create comprehensive README
cat > README.md << 'EOF'
# 🚀 WCAG Pipeline

## 📋 Overview
Professional WCAG compliance scanning and CEO outreach automation platform.

## ✨ Features
- 🔍 Real-time WCAG 2.1 AA scanning
- 📊 Interactive compliance reports
- 📧 Automated CEO outreach
- 📅 Meeting scheduling integration
- 📄 PDF report generation
- 🎯 Industry-specific targeting

## 🛠️ Quick Start

### Prerequisites
- Node.js 14+
- Git
- API keys for integrations

### Installation
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your API keys
3. Run `npm install`
4. Start with `npm run dev`

### Deployment
- **Railway**: `railway deploy`
- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop build folder

## 📁 Project Structure
```
wcag-pipeline/
├── src/
│   ├── pages/          # HTML pages
│   ├── api/           # API integrations
│   ├── components/    # Reusable components
│   └── utils/         # Utility functions
├── public/            # Static assets
├── docs/              # Documentation
├── config/            # Configuration files
└── scripts/           # Build and deployment scripts
```

## 🔧 Configuration
See `docs/configuration.md` for detailed setup instructions.

## 📈 Usage
1. Start the application
2. Enter website URL for scanning
3. Review compliance report
4. Set up outreach campaigns
5. Monitor results in dashboard

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License
MIT License - see LICENSE file for details.
EOF
```

---

## 🎯 Deployment Commands

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set HUBSPOT_API_KEY=your_key
railway variables set SENDGRID_API_KEY=your_key
railway variables set CALENDLY_API_KEY=your_key

# Deploy
railway deploy
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add HUBSPOT_API_KEY
vercel env add SENDGRID_API_KEY
vercel env add CALENDLY_API_KEY
```

### GitHub Actions (Auto-Deploy)
```bash
# Create GitHub Actions workflow
mkdir -p .github/workflows
```

---

## 🔧 API Integration Setup

### HubSpot Setup
1. Create HubSpot developer account
2. Create private app
3. Copy API key
4. Add to environment variables

### SendGrid Setup
1. Create SendGrid account
2. Verify sender email
3. Generate API key
4. Configure email templates

### Calendly Setup
1. Connect Calendly account
2. Create webhook subscription
3. Configure meeting types
4. Test integration

---

## 🚨 Troubleshooting

### Common Issues
1. **Port already in use**: Change port in `.env`
2. **API key errors**: Verify keys are correct and active
3. **Deployment fails**: Check environment variables
4. **CORS errors**: Configure CORS in API settings

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm run dev

# Check logs
railway logs
vercel logs
```

---

## 📞 Support

- 📧 Email: support@your-domain.com
- 💬 Discord: [Join community](https://discord.gg/your-server)
- 📚 Documentation: [Full docs](https://docs.your-domain.com)
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/wcag-pipeline/issues)

---

*This guide follows ADHD-friendly principles with clear sections, visual cues, and step-by-step instructions.*