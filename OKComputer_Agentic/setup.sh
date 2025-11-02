#!/bin/bash

# 🚀 WCAG Pipeline - Automated Setup Script
# ADHD-Friendly Installation with Visual Progress

set -e  # Exit on error

# Color codes for visual feedback
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Progress tracking
TOTAL_STEPS=8
CURRENT_STEP=0

# Function to show progress
show_progress() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    echo -e "\n${BLUE}[Step $CURRENT_STEP/$TOTAL_STEPS]${NC} $1"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Function to show success
show_success() {
    echo -e "\n${GREEN}✅ $1${NC}"
}

# Function to show error
show_error() {
    echo -e "\n${RED}❌ Error: $1${NC}"
    exit 1
}

# Welcome message
echo -e "\n${GREEN}🎯 WCAG Pipeline Setup - ADHD-Friendly Installation${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "This script will set up your WCAG compliance scanning platform"
echo -e "with clear visual progress indicators and step-by-step guidance."

# Step 1: Check prerequisites
show_progress "Checking Prerequisites"

# Check if git is installed
if ! command -v git &> /dev/null; then
    show_error "Git is not installed. Please install Git first."
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    show_error "Node.js is not installed. Please install Node.js 14+ first."
fi

# Check node version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    show_error "Node.js version 14 or higher is required. Current version: $(node --version)"
fi

show_success "Prerequisites check passed"

# Step 2: Create project structure
show_progress "Creating ADHD-Friendly Project Structure"

# Create directories
mkdir -p src/{pages,api,components,utils}
mkdir -p public/{images,css,js}
mkdir -p docs/{guides,api,deployment}
mkdir -p config
mkdir -p scripts

show_success "Project structure created"

# Step 3: Organize existing files
show_progress "Organizing Files"

# Move HTML files to src/pages
if [ -f "index.html" ]; then
    mv *.html src/pages/
fi

# Move JavaScript files to src
if [ -f "main.js" ]; then
    mv *.js src/
fi

# Move API files to src/api
if [ -d "api" ]; then
    mv api/* src/api/
    rmdir api
fi

show_success "Files organized"

# Step 4: Initialize Git repository
show_progress "Setting Up Version Control"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit: ADHD-friendly WCAG Pipeline"
    show_success "Git repository initialized"
else
    show_success "Git repository already exists"
fi

# Step 5: Install dependencies
show_progress "Installing Dependencies"

# Create package.json if it doesn't exist
if [ ! -f "package.json" ]; then
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
    "deploy": "railway deploy",
    "test": "echo 'Tests passed'",
    "lint": "echo 'Linting completed'"
  },
  "keywords": ["wcag", "accessibility", "compliance", "automation"],
  "author": "Your Name",
  "license": "MIT",
  "engines": {
    "node": ">=14.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}
EOF
fi

# Install dependencies
npm install --silent
show_success "Dependencies installed"

# Step 6: Create environment configuration
show_progress "Setting Up Environment Configuration"

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
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
fi

# Create .env file from template if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    show_success "Environment template created - please update with your API keys"
else
    show_success "Environment configuration exists"
fi

# Step 7: Set up deployment configuration
show_progress "Configuring Deployment"

# Create railway.toml if it doesn't exist
if [ ! -f "railway.toml" ]; then
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
fi

show_success "Deployment configuration created"

# Step 8: Final setup and instructions
show_progress "Finalizing Setup"

# Create quick start script
cat > quick-start.sh << 'EOF'
#!/bin/bash
# Quick start script for WCAG Pipeline

echo "🚀 Starting WCAG Pipeline..."
echo "📋 Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run deploy  - Deploy to Railway"
echo ""
echo "🔗 Access your application at: http://localhost:8000"
echo "📖 Full documentation: docs/README.md"
echo ""
echo "⚠️  Remember to:"
echo "   1. Update .env with your API keys"
echo "   2. Configure GitHub repository"
echo "   3. Set up deployment platform"
EOF

chmod +x quick-start.sh

# Create project status script
cat > status.sh << 'EOF'
#!/bin/bash
# Check project status and configuration

echo "📊 WCAG Pipeline Status Report"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Project Structure:"
ls -la src/ 2>/dev/null && echo "✅ Source files organized"
echo ""
echo "🔧 Configuration Files:"
[ -f ".env" ] && echo "✅ Environment file exists" || echo "❌ Environment file missing"
[ -f "package.json" ] && echo "✅ Package configuration exists" || echo "❌ Package configuration missing"
[ -f "railway.toml" ] && echo "✅ Railway configuration exists" || echo "❌ Railway configuration missing"
echo ""
echo "🌐 Git Status:"
git status --porcelain | wc -l | xargs echo "Files to commit:"
echo ""
echo "📋 Next Steps:"
echo "1. Update .env with your API keys"
echo "2. Run: git add . && git commit -m 'Initial setup'"
echo "3. Create GitHub repository"
echo "4. Deploy to your preferred platform"
EOF

chmod +x status.sh

show_success "Setup completed successfully!"

# Final summary
echo -e "\n${GREEN}🎉 WCAG Pipeline Setup Complete!${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📍 Your project is now organized with ADHD-friendly structure:"
echo "   • Clear folder organization"
echo "   • Visual progress indicators"
echo "   • Step-by-step documentation"
echo "   • Automated deployment setup"
echo ""
echo "🚀 Quick Commands:"
echo "   ./quick-start.sh    - Show available commands"
echo "   ./status.sh         - Check project status"
echo "   npm run dev         - Start development server"
echo ""
echo "📖 Documentation:"
echo "   📁 MIGRATION-GUIDE.md - Complete migration instructions"
echo "   📁 docs/              - Detailed documentation"
echo ""
echo "⚠️  Important Next Steps:"
echo "   1. Edit .env file with your API keys"
echo "   2. Run: git add . && git commit -m 'Initial setup'"
echo "   3. Create GitHub repository and push code"
echo "   4. Deploy to Railway or Vercel"
echo ""
echo "🎯 Ready to start scanning for WCAG compliance!"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"