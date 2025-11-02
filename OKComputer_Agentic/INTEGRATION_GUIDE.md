# AGENTIC-BROWSER WCAG Pipeline - Integration & Hosting Guide

## HubSpot Integration

### 1. HubSpot API Setup

#### Required Credentials
```javascript
// Add these to your environment variables
HUBSPOT_API_KEY = "your-hubspot-api-key"
HUBSPOT_PORTAL_ID = "your-portal-id"
```

#### Contact Creation API
```javascript
// HubSpot Contact Creation
const createHubSpotContact = async (contactData) => {
    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
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
    
    return response.json();
};
```

#### Deal Creation for High-Risk Sites
```javascript
const createHubSpotDeal = async (dealData) => {
    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/deals`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            properties: {
                dealname: `WCAG Compliance - ${dealData.company}`,
                dealstage: 'appointmentscheduled',
                pipeline: 'default',
                hubspot_owner_id: 'your-owner-id',
                amount: dealData.estimatedValue || 25000,
                closedate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                dealtype: 'newbusiness',
                wcag_violations_count: dealData.violationsCount,
                wcag_risk_level: dealData.riskLevel
            }
        })
    });
    
    return response.json();
};
```

### 2. Email Integration

#### SendGrid API Integration
```javascript
const sendEmailViaSendGrid = async (emailData) => {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: emailData.to }],
                subject: emailData.subject,
                dynamic_template_data: emailData.templateData
            }],
            from: { email: 'compliance@yourcompany.com' },
            template_id: emailData.templateId
        })
    });
    
    return response;
};
```

#### Email Templates for HubSpot
```html
<!-- HubSpot Email Template -->
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">Critical ADA Compliance Alert</h2>
    
    <p>Dear {{ contact.firstname }},</p>
    
    <p>Our automated accessibility scanning system has identified <strong>{{ contact.company }}</strong> as having critical ADA compliance violations.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #e74c3c; margin-top: 0;">Risk Assessment</h3>
        <ul>
            <li>Risk Level: <strong>{{ contact.wcag_risk_level }}</strong></li>
            <li>Estimated Legal Exposure: <strong>${{ contact.estimated_legal_exposure }}</strong></li>
            <li>Violations Found: <strong>{{ contact.wcag_violations_count }}</strong></li>
        </ul>
    </div>
    
    <p><strong>Recent Lawsuit Examples:</strong></p>
    <ul>
        <li>Seattle Public Schools: $815,000 settlement</li>
        <li>Manatee County: $16,000 + daily fines</li>
        <li>Morgan Stanley: $9 million lawsuit</li>
    </ul>
    
    <p>We offer a complimentary accessibility audit to help you address these issues.</p>
    
    <p>
        <a href="{{ meeting_link }}" 
           style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Schedule Free Consultation
        </a>
    </p>
    
    <p>Best regards,<br>The AGENTIC-BROWSER Team</p>
</div>
```

### 3. Meeting Scheduling Integration

#### Calendly Integration
```javascript
const createCalendlyLink = async (contactData) => {
    const response = await fetch('https://api.calendly.com/scheduled_events', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CALENDLY_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_type: 'your-event-type-uuid',
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
    
    return response.json();
};
```

## Hosting Options

### 1. Vercel (Recommended for Frontend)

#### Deployment Steps
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel --prod

# Set environment variables
vercel env add HUBSPOT_API_KEY
vercel env add SENDGRID_API_KEY
vercel env add CALENDLY_API_KEY
```

#### vercel.json Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "env": {
    "HUBSPOT_API_KEY": "@hubspot_api_key",
    "SENDGRID_API_KEY": "@sendgrid_api_key",
    "CALENDLY_API_KEY": "@calendly_api_key"
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
```

### 2. Netlify Alternative

#### netlify.toml Configuration
```toml
[build]
  publish = "."
  command = "echo 'Static site'"

[build.environment]
  HUBSPOT_API_KEY = "your-hubspot-api-key"
  SENDGRID_API_KEY = "your-sendgrid-api-key"

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
```

### 3. AWS S3 + CloudFront (Enterprise)

#### AWS Setup
```bash
# Create S3 bucket
aws s3 mb s3://your-wcag-scanner-bucket

# Enable static website hosting
aws s3 website s3://your-wcag-scanner-bucket --index-document index.html

# Upload files
aws s3 sync . s3://your-wcag-scanner-bucket --exclude "*.md" --exclude "*.json"

# Create CloudFront distribution
aws cloudfront create-distribution --origin-domain-name your-wcag-scanner-bucket.s3.amazonaws.com
```

#### CloudFront Configuration
```json
{
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-your-wcag-scanner-bucket",
      "DomainName": "your-wcag-scanner-bucket.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-wcag-scanner-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    }
  }
}
```

## API Integration Examples

### 1. Serverless Functions (Vercel)

#### /api/hubspot-contact.js
```javascript
module.exports = async (req, res) => {
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
        const hubspotResponse = await createHubSpotContact(contactData);
        
        // Log activity
        console.log(`HubSpot contact created: ${contactData.email}`);
        
        res.status(200).json({
            success: true,
            contactId: hubspotResponse.id,
            message: 'Contact created successfully'
        });
        
    } catch (error) {
        console.error('HubSpot API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create HubSpot contact'
        });
    }
};
```

#### /api/send-email.js
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { to, subject, templateData, templateId } = req.body;
        
        const msg = {
            to,
            from: 'compliance@yourcompany.com',
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
};
```

### 2. Environment Variables Setup

#### .env.local (for local development)
```bash
# HubSpot
HUBSPOT_API_KEY=your-hubspot-api-key
HUBSPOT_PORTAL_ID=your-portal-id

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=compliance@yourcompany.com

# Calendly
CALENDLY_API_KEY=your-calendly-api-key
CALENDLY_EVENT_TYPE=your-event-type-uuid

# Database (if using)
DATABASE_URL=your-database-url
```

#### Environment Variables in Hosting Platform
```javascript
// vercel.json environment setup
{
  "env": {
    "HUBSPOT_API_KEY": "@hubspot_api_key",
    "SENDGRID_API_KEY": "@sendgrid_api_key",
    "CALENDLY_API_KEY": "@calendly_api_key"
  }
}
```

## Testing Integration

### 1. HubSpot Test
```javascript
// Test HubSpot integration
const testHubSpot = async () => {
    const testContact = {
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        jobtitle: 'CEO',
        risk: 'High'
    };
    
    try {
        const response = await fetch('/api/hubspot-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contactData: testContact })
        });
        
        const result = await response.json();
        console.log('HubSpot test result:', result);
    } catch (error) {
        console.error('HubSpot test failed:', error);
    }
};
```

### 2. Email Test
```javascript
// Test email integration
const testEmail = async () => {
    const testEmail = {
        to: 'test@example.com',
        subject: 'WCAG Compliance Test',
        templateData: {
            firstname: 'Test',
            company: 'Test Company',
            risk: 'High'
        },
        templateId: 'your-template-id'
    };
    
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testEmail)
        });
        
        const result = await response.json();
        console.log('Email test result:', result);
    } catch (error) {
        console.error('Email test failed:', error);
    }
};
```

## Monitoring & Analytics

### 1. Performance Monitoring
```javascript
// Add to main.js
const trackPerformance = () => {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime)
            });
        }
    });
};
```

### 2. Error Tracking
```javascript
// Error tracking
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    
    // Send to error tracking service
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(event.error);
    }
});
```

## Security Considerations

### 1. API Key Security
```javascript
// Never expose API keys in client-side code
// Use environment variables and serverless functions

// ❌ BAD - Don't do this
const API_KEY = 'sk-1234567890abcdef';

// ✅ GOOD - Use environment variables
const API_KEY = process.env.HUBSPOT_API_KEY;
```

### 2. CORS Configuration
```javascript
// Proper CORS setup for API endpoints
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
```

## Deployment Checklist

- [ ] Set up HubSpot API key
- [ ] Configure SendGrid for email delivery
- [ ] Set up Calendly integration
- [ ] Deploy to hosting platform (Vercel/Netlify)
- [ ] Configure environment variables
- [ ] Test all integrations
- [ ] Set up monitoring and analytics
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate
- [ ] Test email deliverability
- [ ] Verify HubSpot contact creation
- [ ] Test meeting scheduling

## Support & Troubleshooting

### Common Issues
1. **CORS errors**: Check API endpoint configuration
2. **Email not sending**: Verify SendGrid API key and template ID
3. **HubSpot contact not created**: Check API permissions and rate limits
4. **Meeting link not working**: Verify Calendly event type UUID

### Getting Help
- HubSpot Developer Docs: https://developers.hubspot.com/
- SendGrid API Docs: https://sendgrid.com/docs/api-reference/
- Calendly API Docs: https://developer.calendly.com/
- Vercel Documentation: https://vercel.com/docs

This integration setup provides a robust, scalable solution for automating WCAG compliance outreach while maintaining professional standards and legal compliance.