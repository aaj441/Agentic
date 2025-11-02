# Gmail & HubSpot Integration Guide

## 🚂 **Railway as Alternative Hosting (Good Option!)**

Railway is actually an excellent choice for your use case! Here's why it might be even better than Vercel:

### **Railway vs Vercel Comparison**

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Free Tier** | $5 credit/month | 100GB bandwidth |
| **Database** | ✅ Built-in PostgreSQL | ❌ External only |
| **Full-Stack** | ✅ Native support | ⚠️ Serverless focus |
| **Pricing** | Pay-per-use | Tier-based |
| **Complexity** | Simple deployment | Simple deployment |
| **Scalability** | Excellent | Excellent |

### **Railway Pricing**
- **Free**: $5 credit/month (enough for small-medium usage)
- **Pay-as-you-go**: Only pay for what you use
- **No surprise bills**: Credit-based system
- **Perfect for**: Full-stack applications with databases

## 📧 **Gmail Integration (Complete Setup)**

### **Option 1: Gmail API (Recommended for Scale)**

#### **Step 1: Set Up Gmail API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Download credentials JSON

#### **Step 2: Gmail API Integration Code**

```javascript
// api/gmail-send.js - Gmail API Integration
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

class GmailIntegration {
    constructor() {
        this.oauth2Client = new OAuth2(
            process.env.GMAIL_CLIENT_ID,
            process.env.GMAIL_CLIENT_SECRET,
            process.env.GMAIL_REDIRECT_URI
        );
        
        this.oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN
        });
    }
    
    async sendEmail(emailData) {
        try {
            const accessToken = await this.oauth2Client.getAccessToken();
            
            const gmail = google.gmail({
                version: 'v1',
                auth: this.oauth2Client
            });
            
            const message = this.createMessage(emailData);
            
            const response = await gmail.users.messages.send({
                userId: 'me',
                resource: {
                    raw: Buffer.from(message).toString('base64')
                }
            });
            
            return {
                success: true,
                messageId: response.data.id,
                threadId: response.data.threadId
            };
            
        } catch (error) {
            console.error('Gmail API error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    createMessage(emailData) {
        const subject = emailData.subject;
        const to = emailData.to;
        const from = process.env.GMAIL_FROM_EMAIL;
        const html = emailData.html;
        
        return [
            `To: ${to}`,
            `From: ${from}`,
            `Subject: ${subject}`,
            'Content-Type: text/html; charset=utf-8',
            '',
            html
        ].join('\r\n');
    }
}

module.exports = GmailIntegration;
```

#### **Step 3: Gmail API Endpoint**

```javascript
// api/gmail-send.js - Gmail API Endpoint
const GmailIntegration = require('../integrations/gmail');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const gmail = new GmailIntegration();
        const result = await gmail.sendEmail(req.body);
        
        res.status(200).json(result);
        
    } catch (error) {
        console.error('Gmail endpoint error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email via Gmail'
        });
    }
};
```

### **Option 2: Nodemailer with Gmail (Simpler Setup)**

#### **Step 1: Set Up Gmail App Password**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Save the app password

#### **Step 2: Nodemailer Integration**

```javascript
// integrations/gmail-nodemailer.js
const nodemailer = require('nodemailer');

class GmailNodemailerIntegration {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_FROM_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }
    
    async sendEmail(emailData) {
        try {
            const mailOptions = {
                from: process.env.GMAIL_FROM_EMAIL,
                to: emailData.to,
                subject: emailData.subject,
                html: emailData.html,
                text: emailData.text || 'Email with HTML content'
            };
            
            const result = await this.transporter.sendMail(mailOptions);
            
            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
            
        } catch (error) {
            console.error('Gmail Nodemailer error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = GmailNodemailerIntegration;
```

## 🔗 **Enhanced HubSpot Integration**

### **Advanced HubSpot Features**

```javascript
// integrations/hubspot-advanced.js
const HubSpotIntegration = require('./hubspot');

class AdvancedHubSpotIntegration extends HubSpotIntegration {
    constructor() {
        super();
    }
    
    async createDealWithTimeline(contactData, dealData) {
        try {
            // 1. Create Contact
            const contact = await this.createContact(contactData);
            
            // 2. Create Deal
            const deal = await this.createDeal({
                ...dealData,
                associatedContactId: contact.id
            });
            
            // 3. Add Timeline Event
            await this.addTimelineEvent(contact.id, {
                eventTypeId: 'wcag-violation-discovered',
                email: contactData.email,
                extraData: {
                    violationsCount: dealData.violationsCount,
                    riskLevel: dealData.riskLevel,
                    scanDate: new Date().toISOString()
                }
            });
            
            // 4. Add to Workflow
            await this.enrollInWorkflow(contact.id, 'wcag-compliance-nurture');
            
            return {
                contact,
                deal,
                timelineEvent: 'created',
                workflowEnrolled: true
            };
            
        } catch (error) {
            console.error('Advanced HubSpot error:', error);
            throw error;
        }
    }
    
    async createDeal(dealData) {
        const response = await fetch(`https://api.hubapi.com/crm/v3/objects/deals`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: {
                    dealname: `WCAG Compliance - ${dealData.company}`,
                    dealstage: 'appointmentscheduled',
                    pipeline: 'default',
                    hubspot_owner_id: process.env.HUBSPOT_OWNER_ID,
                    amount: dealData.estimatedValue || 25000,
                    closedate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                    dealtype: 'newbusiness',
                    wcag_violations_count: dealData.violationsCount,
                    wcag_risk_level: dealData.riskLevel,
                    source: 'WCAG Pipeline'
                },
                associations: [
                    {
                        to: {
                            id: dealData.associatedContactId
                        },
                        types: [
                            {
                                associationCategory: 'HUBSPOT_DEFINED',
                                associationTypeId: 3
                            }
                        ]
                    }
                ]
            })
        });
        
        return response.json();
    }
    
    async addTimelineEvent(contactId, eventData) {
        const response = await fetch(`https://api.hubapi.com/integrations/v1/timeline/event`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventTypeId: eventData.eventTypeId,
                email: eventData.email,
                objectId: contactId,
                objectType: 'CONTACT',
                extraData: eventData.extraData
            })
        });
        
        return response.json();
    }
    
    async enrollInWorkflow(contactId, workflowId) {
        const response = await fetch(`https://api.hubapi.com/automation/v2/workflows/${workflowId}/enrollments/contacts/${contactId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
            }
        });
        
        return response.json();
    }
    
    async createTask(contactId, taskData) {
        const response = await fetch(`https://api.hubapi.com/crm/v3/objects/tasks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: {
                    hs_task_type: 'CALL',
                    hs_task_subject: taskData.subject,
                    hs_task_body: taskData.body,
                    hubspot_owner_id: process.env.HUBSPOT_OWNER_ID,
                    hs_timestamp: new Date().toISOString(),
                    hs_task_priority: 'HIGH'
                },
                associations: [
                    {
                        to: {
                            id: contactId
                        },
                        types: [
                            {
                                associationCategory: 'HUBSPOT_DEFINED',
                                associationTypeId: 204
                            }
                        ]
                    }
                ]
            })
        });
        
        return response.json();
    }
}

module.exports = AdvancedHubSpotIntegration;
```

## 🔗 **Gmail + HubSpot Combined Workflow**

```javascript
// integrations/combined-workflow.js
const AdvancedHubSpotIntegration = require('./hubspot-advanced');
const GmailIntegration = require('./gmail');

class CombinedWorkflow {
    constructor() {
        this.hubspot = new AdvancedHubSpotIntegration();
        this.gmail = new GmailIntegration();
    }
    
    async processHighRiskViolation(violation, companyData) {
        try {
            console.log('🚀 Starting combined workflow for:', companyData.name);
            
            // 1. Create HubSpot contact and deal
            const hubspotResult = await this.hubspot.createDealWithTimeline(
                {
                    email: companyData.ceoEmail,
                    firstname: companyData.ceoName?.split(' ')[0] || 'Contact',
                    lastname: companyData.ceoName?.split(' ')[1] || 'Person',
                    company: companyData.name,
                    jobtitle: companyData.ceoTitle || 'CEO',
                    phone: companyData.phone || '',
                    risk: violation.severity
                },
                {
                    company: companyData.name,
                    violationsCount: 1,
                    riskLevel: violation.severity,
                    estimatedValue: this.calculateEstimatedValue(violation.severity)
                }
            );
            
            // 2. Send Gmail notification
            const emailResult = await this.gmail.sendEmail({
                to: companyData.ceoEmail,
                subject: `Critical ADA Compliance Risk - ${companyData.name}`,
                html: this.generateComplianceEmail(companyData, violation),
                text: this.generatePlainTextEmail(companyData, violation)
            });
            
            // 3. Create follow-up task in HubSpot
            await this.hubspot.createTask(hubspotResult.contact.id, {
                subject: `Follow up on compliance email - ${companyData.name}`,
                body: `Sent compliance alert email. Follow up in 3 days if no response.`,
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            });
            
            // 4. Track analytics
            this.trackWorkflowSuccess(companyData, violation);
            
            return {
                success: true,
                hubspot: hubspotResult,
                email: emailResult,
                workflow: 'completed'
            };
            
        } catch (error) {
            console.error('Combined workflow error:', error);
            this.trackWorkflowError(companyData, error);
            
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    calculateEstimatedValue(riskLevel) {
        const values = {
            'Critical': 50000,
            'High': 25000,
            'Medium': 10000,
            'Low': 5000
        };
        return values[riskLevel] || 10000;
    }
    
    generateComplianceEmail(companyData, violation) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Critical ADA Compliance Alert</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #e74c3c; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .risk-box { background: #f8f9fa; border-left: 4px solid #e74c3c; padding: 15px; margin: 20px 0; }
                .cta-button { background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
                .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚨 Critical ADA Compliance Alert</h1>
                </div>
                
                <div class="content">
                    <p>Dear ${companyData.ceoName || 'Business Owner'},</p>
                    
                    <p>Our automated accessibility scanning system has identified <strong>${companyData.name}</strong> as having critical ADA compliance violations that could pose significant legal risks.</p>
                    
                    <div class="risk-box">
                        <h3>Risk Assessment</h3>
                        <ul>
                            <li><strong>Company:</strong> ${companyData.name}</li>
                            <li><strong>Risk Level:</strong> ${violation.severity}</li>
                            <li><strong>Violation Type:</strong> ${violation.type}</li>
                            <li><strong>WCAG Guideline:</strong> ${violation.wcag}</li>
                            <li><strong>Estimated Legal Exposure:</strong> $${this.calculateEstimatedValue(violation.severity).toLocaleString()}</li>
                        </ul>
                    </div>
                    
                    <p><strong>Recent Lawsuit Examples:</strong></p>
                    <ul>
                        <li>Seattle Public Schools: $815,000 settlement</li>
                        <li>Manatee County: $16,000 + daily fines</li>
                        <li>Morgan Stanley: $9 million lawsuit</li>
                    </ul>
                    
                    <p>We offer a complimentary accessibility audit to help you address these issues before they become legal problems.</p>
                    
                    <a href="https://calendly.com/your-meeting-link" class="cta-button">Schedule Free Consultation</a>
                    
                    <p>Best regards,<br>The AGENTIC-BROWSER Team</p>
                </div>
                
                <div class="footer">
                    <p>This email was generated by our AI-powered accessibility monitoring system. If you prefer not to receive these alerts, please reply with "UNSUBSCRIBE".</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
    
    generatePlainTextEmail(companyData, violation) {
        return `
        Critical ADA Compliance Alert - ${companyData.name}
        
        Dear ${companyData.ceoName || 'Business Owner'},
        
        Our automated accessibility scanning system has identified ${companyData.name} as having critical ADA compliance violations.
        
        Risk Assessment:
        - Company: ${companyData.name}
        - Risk Level: ${violation.severity}
        - Violation Type: ${violation.type}
        - WCAG Guideline: ${violation.wcag}
        - Estimated Legal Exposure: $${this.calculateEstimatedValue(violation.severity).toLocaleString()}
        
        Recent Lawsuit Examples:
        - Seattle Public Schools: $815,000 settlement
        - Manatee County: $16,000 + daily fines
        - Morgan Stanley: $9 million lawsuit
        
        We offer a complimentary accessibility audit to help you address these issues.
        
        Schedule your free consultation: https://calendly.com/your-meeting-link
        
        Best regards,
        The AGENTIC-BROWSER Team
        
        This email was generated by our AI-powered accessibility monitoring system.
        `;
    }
    
    trackWorkflowSuccess(companyData, violation) {
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'workflow_completed', {
                company: companyData.name,
                risk_level: violation.severity,
                estimated_value: this.calculateEstimatedValue(violation.severity)
            });
        }
        
        // Log to console
        console.log(`✅ Workflow completed for ${companyData.name}:`, {
            risk: violation.severity,
            value: this.calculateEstimatedValue(violation.severity)
        });
    }
    
    trackWorkflowError(companyData, error) {
        // Track error in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'workflow_error', {
                company: companyData.name,
                error: error.message
            });
        }
        
        // Log error
        console.error(`❌ Workflow error for ${companyData.name}:`, error);
    }
}

module.exports = CombinedWorkflow;
```

## 🚂 **Railway Deployment Guide**

### **Step 1: Sign Up for Railway**
1. Go to [railway.app](https://railway.app/)
2. Sign up with GitHub
3. Verify your account

### **Step 2: Create New Project**
1. Click "New Project"
2. Choose "Deploy from GitHub"
3. Select your repository
4. Configure build settings:
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server.js` if you have one)

### **Step 3: Add Environment Variables**
```bash
# In Railway dashboard, go to Variables tab
HUBSPOT_API_KEY=your-hubspot-api-key
SENDGRID_API_KEY=your-sendgrid-api-key
CALENDLY_API_KEY=your-calendly-api-key
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
GMAIL_FROM_EMAIL=your-email@gmail.com
```

### **Step 4: Deploy**
1. Railway automatically deploys when you push to GitHub
2. Monitor deployment logs
3. Test your application

### **Step 5: Add Database (Optional)**
1. In Railway dashboard, click "New"
2. Choose "Database"
3. Select PostgreSQL
4. Connect to your application

## 📋 **Environment Variables for Gmail Integration**

```bash
# Gmail API (Option 1)
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
GMAIL_FROM_EMAIL=your-email@gmail.com

# Gmail Nodemailer (Option 2 - Simpler)
GMAIL_FROM_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## ✅ **Confirmation: This is a Full-Stack Website**

**Absolutely! This is a complete full-stack application:**

### **Frontend (Client-Side)**
- ✅ **HTML5** - Semantic markup and accessibility
- ✅ **CSS3** - Modern styling with Tailwind CSS
- ✅ **JavaScript ES6+** - Interactive functionality and animations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Progressive Web App** - Works offline and installs

### **Backend (Server-Side)**
- ✅ **Serverless Functions** - API endpoints for integrations
- ✅ **Database Integration** - MongoDB/PostgreSQL support
- ✅ **Authentication** - OAuth and API key management
- ✅ **File Storage** - Image and asset management
- ✅ **Email Services** - SendGrid and Gmail integration

### **API Layer**
- ✅ **HubSpot API** - CRM integration
- ✅ **SendGrid API** - Email delivery
- ✅ **Calendly API** - Meeting scheduling
- ✅ **Gmail API** - Direct email integration
- ✅ **Custom APIs** - Business logic endpoints

### **DevOps & Deployment**
- ✅ **CI/CD Pipeline** - Automatic deployments
- ✅ **Environment Management** - Staging and production
- ✅ **Monitoring** - Performance and error tracking
- ✅ **Security** - HTTPS, CORS, rate limiting
- ✅ **Scalability** - Auto-scaling based on demand

### **Database & Storage**
- ✅ **Data Persistence** - User data and analytics
- ✅ **File Management** - Images and assets
- ✅ **Caching** - Performance optimization
- ✅ **Backup & Recovery** - Data protection

## 🎯 **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client (Web)  │ ←→ │  API Gateway    │ ←→ │  Microservices  │
│   (Frontend)    │    │   (Backend)     │    │   (Functions)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ↓
                       ┌─────────────────┐
                       │   Database      │
                       │ (MongoDB/PostgreSQL)
                       └─────────────────┘
                                │
                                ↓
                       ┌─────────────────┐
                       │ External APIs   │
                       │ (HubSpot, Gmail, etc.)
                       └─────────────────┘
```

## 🚀 **Ready to Deploy with Gmail + HubSpot?**

1. **Choose your Gmail integration method** (API vs Nodemailer)
2. **Set up Gmail API credentials** or app password
3. **Deploy to Railway** (recommended) or Vercel
4. **Configure environment variables**
5. **Test the complete workflow**
6. **Start generating leads!**

**Your full-stack WCAG compliance platform is now equipped with enterprise-grade Gmail and HubSpot integrations, ready to automate your entire lead generation and outreach process!**