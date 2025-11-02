#!/bin/bash

# AGENTIC-BROWSER WCAG Pipeline Deployment Script
# This script helps deploy the application with full HubSpot integration

set -e

echo "🚀 AGENTIC-BROWSER WCAG Pipeline Deployment"
echo "==========================================="

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Installation menu
echo ""
echo "📋 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. AWS S3 + CloudFront"
echo "4. Local Development Setup"
echo ""

read -p "Choose deployment option (1-4): " deployment_choice

# Get API credentials
echo ""
echo "🔑 API Configuration:"
read -p "HubSpot API Key: " hubspot_api_key
read -p "SendGrid API Key: " sendgrid_api_key
read -p "Calendly API Key (optional): " calendly_api_key

# Create environment file
echo ""
echo "📄 Creating environment configuration..."
cat > .env.local << EOF
# HubSpot Integration
HUBSPOT_API_KEY=$hubspot_api_key
HUBSPOT_PORTAL_ID=your-portal-id

# Email Integration
SENDGRID_API_KEY=$sendgrid_api_key
SENDGRID_FROM_EMAIL=compliance@yourcompany.com

# Meeting Scheduling
CALENDLY_API_KEY=$calendly_api_key
CALENDLY_EVENT_TYPE=your-event-type-uuid

# Application Settings
APP_URL=https://your-domain.com
APP_NAME="AGENTIC-BROWSER WCAG Pipeline"
EOF

case $deployment_choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        
        if ! command_exists vercel; then
            echo "📦 Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        # Create vercel.json if it doesn't exist
        if [ ! -f vercel.json ]; then
            cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "env": {
    "HUBSPOT_API_KEY": "$hubspot_api_key",
    "SENDGRID_API_KEY": "$sendgrid_api_key",
    "CALENDLY_API_KEY": "$calendly_api_key"
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
  ]
}
EOF
        fi
        
        # Deploy to Vercel
        vercel --prod
        
        echo "✅ Vercel deployment completed!"
        ;;
        
    2)
        echo ""
        echo "🚀 Deploying to Netlify..."
        
        if ! command_exists netlify; then
            echo "📦 Installing Netlify CLI..."
            npm i -g netlify-cli
        fi
        
        # Create netlify.toml if it doesn't exist
        if [ ! -f netlify.toml ]; then
            cat > netlify.toml << EOF
[build]
  publish = "."
  command = "echo 'Static site'"

[build.environment]
  HUBSPOT_API_KEY = "$hubspot_api_key"
  SENDGRID_API_KEY = "$sendgrid_api_key"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
EOF
        fi
        
        # Deploy to Netlify
        netlify deploy --prod
        
        echo "✅ Netlify deployment completed!"
        ;;
        
    3)
        echo ""
        echo "🚀 Setting up AWS deployment..."
        
        if ! command_exists aws; then
            echo "❌ AWS CLI is required but not installed."
            echo "Please install AWS CLI from: https://aws.amazon.com/cli/"
            exit 1
        fi
        
        read -p "AWS S3 Bucket Name: " bucket_name
        read -p "AWS Region (us-east-1): " aws_region
        aws_region=${aws_region:-us-east-1}
        
        # Create S3 bucket
        echo "📦 Creating S3 bucket..."
        aws s3 mb s3://$bucket_name --region $aws_region
        
        # Enable static website hosting
        aws s3 website s3://$bucket_name --index-document index.html
        
        # Upload files
        echo "📁 Uploading files to S3..."
        aws s3 sync . s3://$bucket_name --exclude "*.md" --exclude "*.json" --exclude "*.sh" --exclude ".*"
        
        # Set bucket policy for public access
        cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$bucket_name/*"
        }
    ]
}
EOF
        
        aws s3api put-bucket-policy --bucket $bucket_name --policy file://bucket-policy.json
        
        echo "✅ AWS S3 deployment completed!"
        echo "🌐 Website URL: http://$bucket_name.s3-website-$aws_region.amazonaws.com"
        ;;
        
    4)
        echo ""
        echo "🔧 Setting up local development environment..."
        
        # Create package.json for local development
        cat > package.json << EOF
{
  "name": "wcag-pipeline",
  "version": "1.0.0",
  "description": "AGENTIC-BROWSER WCAG Pipeline",
  "scripts": {
    "dev": "python -m http.server 8000",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "keywords": ["wcag", "accessibility", "compliance"],
  "author": "AGENTIC-BROWSER",
  "license": "MIT"
}
EOF
        
        echo "✅ Local development setup completed!"
        echo "🌐 Run 'npm run dev' to start local server"
        echo "🌐 Open http://localhost:8000 in your browser"
        ;;
        
    *)
        echo "❌ Invalid option. Please choose 1-4."
        exit 1
        ;;
esac

# Create API integration files
echo ""
echo "🔌 Creating API integration files..."

# Create API directory
mkdir -p api

# HubSpot Contact API
cat > api/hubspot-contact.js << 'EOF'
// HubSpot Contact Creation API
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { contactData } = req.body;
        
        // Validate required fields
        if (!contactData.email || !contactData.company) {
            return res.status(400).json({ error: 'Email and company are required' });
        }
        
        // Create HubSpot contact
        const hubspotResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: {
                    email: contactData.email,
                    firstname: contactData.firstname,
                    lastname: contactData.lastname,
                    company: contactData.company,
                    jobtitle: contactData.jobtitle,
                    phone: contactData.phone,
                    wcag_risk_level: contactData.risk,
                    last_contacted: contactData.lastContact,
                    notes: contactData.notes
                }
            })
        });
        
        const result = await hubspotResponse.json();
        
        res.status(200).json({
            success: true,
            contactId: result.id,
            message: 'Contact created successfully'
        });
        
    } catch (error) {
        console.error('HubSpot API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create HubSpot contact'
        });
    }
}
EOF

# SendGrid Email API
cat > api/send-email.js << 'EOF'
// SendGrid Email API
const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const { to, subject, templateData, templateId } = req.body;
        
        const msg = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            templateId,
            dynamicTemplateData: templateData
        };
        
        await sgMail.send(msg);
        
        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
        
    } catch (error) {
        console.error('SendGrid error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email'
        });
    }
}
EOF

# Calendly Integration API
cat > api/calendly-meeting.js << 'EOF'
// Calendly Meeting Scheduling API
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { contactData } = req.body;
        
        const calendlyResponse = await fetch('https://api.calendly.com/scheduled_events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: process.env.CALENDLY_EVENT_TYPE,
                invitees: [{
                    email: contactData.email,
                    name: contactData.name
                }],
                custom_questions: [{
                    question: 'Company Website',
                    answer: contactData.website
                }, {
                    question: 'Current Accessibility Concerns',
                    answer: contactData.riskLevel
                }]
            })
        });
        
        const result = await calendlyResponse.json();
        
        res.status(200).json({
            success: true,
            meetingUrl: result.resource.scheduled_event.location.join_url,
            message: 'Meeting scheduled successfully'
        });
        
    } catch (error) {
        console.error('Calendly API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to schedule meeting'
        });
    }
}
EOF

# Create package.json for API dependencies
cat > api/package.json << 'EOF'
{
  "name": "wcag-pipeline-api",
  "version": "1.0.0",
  "description": "API functions for WCAG Pipeline",
  "dependencies": {
    "@sendgrid/mail": "^7.7.0"
  }
}
EOF

echo ""
echo "✅ API integration files created!"
echo ""
echo "📋 Next Steps:"
echo "1. Update your HubSpot API key in the environment variables"
echo "2. Configure your SendGrid templates"
echo "3. Set up Calendly event types"
echo "4. Test the integrations using the provided test functions"
echo "5. Monitor the deployment and check logs"
echo ""
echo "🔗 Integration Guide: Check INTEGRATION_GUIDE.md for detailed setup"
echo "📊 Monitoring: Set up analytics and error tracking"
echo "🔧 Support: Refer to the troubleshooting section in the guide"
echo ""
echo "🎉 Deployment completed successfully!"