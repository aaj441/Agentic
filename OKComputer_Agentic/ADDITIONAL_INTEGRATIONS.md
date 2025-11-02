# Additional Integrations Guide

## 🚀 Recommended Additional Integrations

### 1. **CRM & Sales Platforms**

#### Salesforce Integration
```javascript
// Salesforce API Integration
const createSalesforceLead = async (leadData) => {
    const response = await fetch('https://your-instance.salesforce.com/services/data/v52.0/sobjects/Lead', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SALESFORCE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FirstName: leadData.firstname,
            LastName: leadData.lastname,
            Company: leadData.company,
            Title: leadData.jobtitle,
            Email: leadData.email,
            Phone: leadData.phone,
            Description: `WCAG Compliance Risk: ${leadData.risk}`,
            LeadSource: 'WCAG Pipeline'
        })
    });
    
    return response.json();
};
```

#### Pipedrive Integration
```javascript
// Pipedrive API Integration  
const createPipedrivePerson = async (personData) => {
    const response = await fetch('https://api.pipedrive.com/v1/persons', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PIPEDRIVE_API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${personData.firstname} ${personData.lastname}`,
            email: personData.email,
            phone: personData.phone,
            org_id: personData.org_id,
            add_time: new Date().toISOString()
        })
    });
    
    return response.json();
};
```

### 2. **Email Marketing Platforms**

#### Mailchimp Integration
```javascript
// Mailchimp API Integration
const addMailchimpSubscriber = async (subscriberData) => {
    const response = await fetch(`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: subscriberData.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: subscriberData.firstname,
                LNAME: subscriberData.lastname,
                COMPANY: subscriberData.company,
                RISK: subscriberData.risk
            },
            tags: ['wcag-pipeline', 'compliance-lead']
        })
    });
    
    return response.json();
};
```

#### ActiveCampaign Integration
```javascript
// ActiveCampaign API Integration
const createActiveCampaignContact = async (contactData) => {
    const response = await fetch('https://your-account.api-us1.com/contacts', {
        method: 'POST',
        headers: {
            'Api-Token': ACTIVECAMPAIGN_API_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: {
                email: contactData.email,
                firstName: contactData.firstname,
                lastName: contactData.lastname,
                phone: contactData.phone
            }
        })
    });
    
    return response.json();
};
```

### 3. **Analytics & Tracking**

#### Google Analytics 4 Integration
```javascript
// Google Analytics 4 Event Tracking
const trackGA4Event = (eventName, eventParams) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            ...eventParams,
            custom_parameters: {
                risk_level: eventParams.riskLevel,
                violations_count: eventParams.violationsCount,
                company_size: eventParams.companySize
            }
        });
    }
};

// Usage examples:
trackGA4Event('violation_discovered', {
    riskLevel: 'High',
    violationsCount: 15,
    companySize: '50-100'
});

trackGA4Event('email_sent', {
    emailType: 'compliance_alert',
    recipientTitle: 'CEO'
});

trackGA4Event('meeting_scheduled', {
    meetingType: 'compliance_consultation',
    estimatedDealValue: 25000
});
```

#### Mixpanel Integration
```javascript
// Mixpanel Event Tracking
const trackMixpanelEvent = (eventName, properties) => {
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, {
            ...properties,
            'Risk Level': properties.riskLevel,
            'Violations Count': properties.violationsCount,
            'Company Domain': properties.domain,
            'Industry': properties.industry,
            'Lead Source': 'WCAG Pipeline'
        });
    }
};
```

#### Hotjar Integration
```html
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### 4. **Communication Tools**

#### Slack Integration
```javascript
// Slack Webhook Integration
const sendSlackNotification = async (message, channel = '#compliance-alerts') => {
    const payload = {
        text: `🚨 WCAG Compliance Alert`,
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Critical Accessibility Violation Found'
                }
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*Company:*\n${message.company}`
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Risk Level:*\n${message.riskLevel}`
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Violations:*\n${message.violationsCount}`
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Estimated Exposure:*\n$${message.estimatedExposure}`
                    }
                ]
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'View Details'
                        },
                        url: message.dashboardUrl
                    }
                ]
            }
        ]
    };
    
    const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    return response;
};
```

#### Microsoft Teams Integration
```javascript
// Microsoft Teams Webhook Integration
const sendTeamsNotification = async (message) => {
    const payload = {
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        summary: 'WCAG Compliance Alert',
        themeColor: 'E74C3C',
        title: 'Critical Accessibility Violation Detected',
        text: `**${message.company}** has ${message.violationsCount} critical accessibility violations with an estimated legal exposure of $${message.estimatedExposure}.`,
        sections: [
            {
                facts: [
                    {
                        name: 'Company',
                        value: message.company
                    },
                    {
                        name: 'Risk Level',
                        value: message.riskLevel
                    },
                    {
                        name: 'Violations Count',
                        value: message.violationsCount
                    },
                    {
                        name: 'Estimated Exposure',
                        value: `$${message.estimatedExposure}`
                    }
                ]
            }
        ],
        potentialAction: [
            {
                '@type': 'OpenUri',
                name: 'View in Dashboard',
                targets: [
                    {
                        os: 'default',
                        uri: message.dashboardUrl
                    }
                ]
            }
        ]
    };
    
    const response = await fetch(MICROSOFT_TEAMS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    return response;
};
```

### 5. **Database & Storage**

#### MongoDB Integration
```javascript
// MongoDB Integration for Advanced Analytics
const MongoClient = require('mongodb').MongoClient;

class WCAGAnalytics {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI);
        this.db = null;
    }
    
    async connect() {
        await this.client.connect();
        this.db = this.client.db('wcag_pipeline');
    }
    
    async saveScanResults(scanData) {
        const collection = this.db.collection('scan_results');
        return await collection.insertOne({
            ...scanData,
            timestamp: new Date(),
            scanId: generateScanId()
        });
    }
    
    async getScanHistory(companyDomain) {
        const collection = this.db.collection('scan_results');
        return await collection
            .find({ 'company.domain': companyDomain })
            .sort({ timestamp: -1 })
            .limit(10)
            .toArray();
    }
    
    async getViolationTrends(timeRange = '30d') {
        const collection = this.db.collection('scan_results');
        const cutoffDate = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
        
        return await collection.aggregate([
            {
                $match: {
                    timestamp: { $gte: cutoffDate }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                        severity: '$violations.severity'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.date': 1 }
            }
        ]).toArray();
    }
}
```

#### PostgreSQL Integration
```javascript
// PostgreSQL Integration for Structured Data
const { Pool } = require('pg');

class WCAGDatabase {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    
    async createTables() {
        const client = await this.pool.connect();
        
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS companies (
                    id SERIAL PRIMARY KEY,
                    domain VARCHAR(255) UNIQUE NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    industry VARCHAR(100),
                    company_size VARCHAR(50),
                    created_at TIMESTAMP DEFAULT NOW()
                );
                
                CREATE TABLE IF NOT EXISTS contacts (
                    id SERIAL PRIMARY KEY,
                    company_id INTEGER REFERENCES companies(id),
                    email VARCHAR(255) UNIQUE NOT NULL,
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    title VARCHAR(255),
                    phone VARCHAR(50),
                    linkedin_url VARCHAR(500),
                    risk_level VARCHAR(20),
                    status VARCHAR(50) DEFAULT 'new',
                    created_at TIMESTAMP DEFAULT NOW()
                );
                
                CREATE TABLE IF NOT EXISTS scans (
                    id SERIAL PRIMARY KEY,
                    company_id INTEGER REFERENCES companies(id),
                    scan_date TIMESTAMP DEFAULT NOW(),
                    total_violations INTEGER,
                    critical_violations INTEGER,
                    high_violations INTEGER,
                    medium_violations INTEGER,
                    low_violations INTEGER,
                    compliance_score DECIMAL(5,2),
                    scan_duration INTEGER
                );
                
                CREATE TABLE IF NOT EXISTS violations (
                    id SERIAL PRIMARY KEY,
                    scan_id INTEGER REFERENCES scans(id),
                    wcag_guideline VARCHAR(20),
                    violation_type VARCHAR(255),
                    severity VARCHAR(20),
                    element_selector VARCHAR(500),
                    description TEXT,
                    remediation TEXT
                );
            `);
        } finally {
            client.release();
        }
    }
    
    async saveCompany(companyData) {
        const client = await this.pool.connect();
        
        try {
            const result = await client.query(
                'INSERT INTO companies (domain, name, industry, company_size) VALUES ($1, $2, $3, $4) ON CONFLICT (domain) DO UPDATE SET name = $2, industry = $3, company_size = $4 RETURNING id',
                [companyData.domain, companyData.name, companyData.industry, companyData.companySize]
            );
            
            return result.rows[0].id;
        } finally {
            client.release();
        }
    }
}
```

### 6. **Monitoring & Alerting**

#### Sentry Integration
```javascript
// Sentry Error Monitoring
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
    beforeSend(event) {
        // Filter out sensitive data
        if (event.request?.headers?.authorization) {
            delete event.request.headers.authorization;
        }
        return event;
    }
});

// Usage in API endpoints
const sentryMiddleware = (handler) => {
    return async (req, res) => {
        try {
            return await handler(req, res);
        } catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    };
};
```

#### LogRocket Integration
```html
<!-- LogRocket User Session Recording -->
<script src="https://cdn.lr-ingest.io/LogRocket.min.js"></script>
<script>
    LogRocket.init('your-app/LogRocket-app-id');
    
    // Identify user for better debugging
    LogRocket.identify(userId, {
        name: userName,
        email: userEmail,
        company: userCompany,
        subscriptionType: subscriptionType
    });
</script>
```

## 🔧 Setup Instructions

### 1. Environment Variables
Add these to your `.env.local` file:

```bash
# Additional CRM Integrations
SALESFORCE_ACCESS_TOKEN=your-salesforce-token
PIPEDRIVE_API_TOKEN=your-pipedrive-token

# Email Marketing
MAILCHIMP_API_KEY=your-mailchimp-key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your-list-id
ACTIVECAMPAIGN_API_TOKEN=your-ac-token

# Analytics
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
MIXPANEL_PROJECT_TOKEN=your-mixpanel-token
HOTJAR_ID=your-hotjar-id

# Communication
SLACK_WEBHOOK_URL=your-slack-webhook
MICROSOFT_TEAMS_WEBHOOK_URL=your-teams-webhook

# Database
MONGODB_URI=mongodb://your-connection-string
DATABASE_URL=postgresql://your-connection-string

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOGROCKET_APP_ID=your-logrocket-id
```

### 2. API Implementation
Create new API endpoints for each integration:

```javascript
// api/salesforce-lead.js
const createSalesforceLead = require('../integrations/salesforce');

module.exports = async (req, res) => {
    try {
        const result = await createSalesforceLead(req.body.leadData);
        res.json({ success: true, leadId: result.id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
```

### 3. Frontend Integration
Update your main application to use these integrations:

```javascript
// In your main.js file
class EnhancedWCAGScanner extends WCAGScanner {
    constructor() {
        super();
        this.salesforce = new SalesforceIntegration();
        this.mailchimp = new MailchimpIntegration();
        this.analytics = new AnalyticsIntegration();
    }
    
    async processViolationWithIntegrations(violation, companyData) {
        // HubSpot integration (existing)
        const hubspotResult = await this.hubSpot.createContactFromViolation(violation, companyData);
        
        // Salesforce integration
        const salesforceResult = await this.salesforce.createLeadFromViolation(violation, companyData);
        
        // Mailchimp integration
        const mailchimpResult = await this.mailchimp.addSubscriberFromViolation(violation, companyData);
        
        // Analytics tracking
        this.analytics.trackViolationDiscovered(violation, companyData);
        
        return {
            hubspot: hubspotResult,
            salesforce: salesforceResult,
            mailchimp: mailchimpResult
        };
    }
}
```

## 📊 Benefits of Additional Integrations

### Enhanced Lead Management
- **Multi-CRM Support**: Sync leads to multiple platforms simultaneously
- **Advanced Segmentation**: Use different CRMs for different industries or company sizes
- **Backup Systems**: Ensure no leads are lost if one CRM has issues

### Improved Marketing Automation
- **Email Marketing**: Add contacts to nurturing campaigns automatically
- **Advanced Analytics**: Track user behavior and campaign performance
- **Personalization**: Use behavioral data to personalize outreach

### Better Team Collaboration
- **Slack/Teams Notifications**: Real-time alerts for high-risk violations
- **Shared Dashboards**: Keep entire team informed of compliance issues
- **Automated Workflows**: Trigger actions across multiple platforms

### Advanced Analytics & Reporting
- **Database Storage**: Historical data for trend analysis
- **Custom Reporting**: Generate detailed compliance reports
- **Performance Monitoring**: Track system performance and user behavior

## 🎯 Best Practices

1. **Gradual Implementation**: Start with one or two integrations and add more as needed
2. **Error Handling**: Always implement robust error handling and fallback systems
3. **Rate Limiting**: Respect API rate limits to avoid service interruptions
4. **Data Privacy**: Ensure compliance with GDPR and other data protection regulations
5. **Testing**: Thoroughly test all integrations before production deployment

## 📞 Support

For help with integrations:
- Check the integration-specific documentation
- Test using the provided API testing utilities
- Monitor error logs for troubleshooting
- Contact support for platform-specific issues

These additional integrations will significantly enhance your WCAG Pipeline's capabilities and provide a more comprehensive solution for compliance monitoring and lead generation.