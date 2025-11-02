// Test Integration Functions
// Use these to verify your HubSpot, SendGrid, and Calendly integrations

class IntegrationTester {
    constructor() {
        this.baseUrl = window.location.origin;
        this.testResults = [];
    }
    
    async testHubSpotIntegration() {
        console.log('🧪 Testing HubSpot Integration...');
        
        const testContact = {
            email: `test-${Date.now()}@example.com`,
            firstname: 'Test',
            lastname: 'User',
            company: 'Test Company',
            jobtitle: 'CEO',
            phone: '+1 (555) 123-4567',
            risk: 'High',
            lastContact: new Date().toISOString().split('T')[0],
            notes: 'Test contact from WCAG Pipeline'
        };
        
        try {
            const response = await fetch(`${this.baseUrl}/api/hubspot-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contactData: testContact })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ HubSpot Integration: SUCCESS');
                console.log('   Contact ID:', result.contactId);
                this.testResults.push({ service: 'HubSpot', status: 'PASS', details: result });
            } else {
                console.log('❌ HubSpot Integration: FAILED');
                console.log('   Error:', result.error);
                this.testResults.push({ service: 'HubSpot', status: 'FAIL', error: result.error });
            }
            
            return result;
            
        } catch (error) {
            console.log('❌ HubSpot Integration: ERROR');
            console.log('   Error:', error.message);
            this.testResults.push({ service: 'HubSpot', status: 'ERROR', error: error.message });
            return { success: false, error: error.message };
        }
    }
    
    async testSendGridIntegration() {
        console.log('🧪 Testing SendGrid Integration...');
        
        const testEmail = {
            to: 'test@example.com',
            subject: 'WCAG Compliance Test Email',
            templateData: {
                firstname: 'Test',
                company: 'Test Company',
                risk: 'High',
                violationsCount: 15,
                meetingLink: 'https://calendly.com/your-meeting-link'
            },
            templateId: 'd-your-template-id' // Replace with your SendGrid template ID
        };
        
        try {
            const response = await fetch(`${this.baseUrl}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testEmail)
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ SendGrid Integration: SUCCESS');
                console.log('   Message:', result.message);
                this.testResults.push({ service: 'SendGrid', status: 'PASS', details: result });
            } else {
                console.log('❌ SendGrid Integration: FAILED');
                console.log('   Error:', result.error);
                this.testResults.push({ service: 'SendGrid', status: 'FAIL', error: result.error });
            }
            
            return result;
            
        } catch (error) {
            console.log('❌ SendGrid Integration: ERROR');
            console.log('   Error:', error.message);
            this.testResults.push({ service: 'SendGrid', status: 'ERROR', error: error.message });
            return { success: false, error: error.message };
        }
    }
    
    async testCalendlyIntegration() {
        console.log('🧪 Testing Calendly Integration...');
        
        const testMeeting = {
            contactData: {
                email: 'test@example.com',
                name: 'Test User',
                website: 'testcompany.com',
                riskLevel: 'High'
            }
        };
        
        try {
            const response = await fetch(`${this.baseUrl}/api/calendly-meeting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testMeeting)
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Calendly Integration: SUCCESS');
                console.log('   Meeting URL:', result.meetingUrl);
                this.testResults.push({ service: 'Calendly', status: 'PASS', details: result });
            } else {
                console.log('❌ Calendly Integration: FAILED');
                console.log('   Error:', result.error);
                this.testResults.push({ service: 'Calendly', status: 'FAIL', error: result.error });
            }
            
            return result;
            
        } catch (error) {
            console.log('❌ Calendly Integration: ERROR');
            console.log('   Error:', error.message);
            this.testResults.push({ service: 'Calendly', status: 'ERROR', error: error.message });
            return { success: false, error: error.message };
        }
    }
    
    async runAllTests() {
        console.log('🚀 Starting Integration Tests...\n');
        
        this.testResults = [];
        
        // Test HubSpot
        await this.testHubSpotIntegration();
        console.log('');
        
        // Test SendGrid
        await this.testSendGridIntegration();
        console.log('');
        
        // Test Calendly
        await this.testCalendlyIntegration();
        console.log('');
        
        // Display summary
        this.displayTestSummary();
        
        return this.testResults;
    }
    
    displayTestSummary() {
        console.log('📊 Integration Test Summary');
        console.log('==========================');
        
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        const errors = this.testResults.filter(r => r.status === 'ERROR').length;
        
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⚠️  Errors: ${errors}`);
        console.log('');
        
        this.testResults.forEach(result => {
            const statusIcon = result.status === 'PASS' ? '✅' : 
                              result.status === 'FAIL' ? '❌' : '⚠️';
            console.log(`${statusIcon} ${result.service}: ${result.status}`);
            
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            }
            
            if (result.details && result.details.message) {
                console.log(`   Message: ${result.details.message}`);
            }
            
            console.log('');
        });
        
        if (passed === this.testResults.length) {
            console.log('🎉 All integrations are working correctly!');
            console.log('✨ Your WCAG Pipeline is ready for production!');
        } else {
            console.log('⚠️  Some integrations need attention. Check the errors above.');
            console.log('📖 Refer to INTEGRATION_GUIDE.md for troubleshooting steps.');
        }
    }
    
    // Utility function to check environment variables
    checkEnvironmentVariables() {
        console.log('🔍 Checking Environment Variables...');
        
        const requiredVars = [
            'HUBSPOT_API_KEY',
            'SENDGRID_API_KEY',
            'SENDGRID_FROM_EMAIL',
            'CALENDLY_API_KEY',
            'CALENDLY_EVENT_TYPE'
        ];
        
        const missingVars = [];
        
        requiredVars.forEach(varName => {
            if (!process.env[varName]) {
                missingVars.push(varName);
            }
        });
        
        if (missingVars.length > 0) {
            console.log('❌ Missing Environment Variables:');
            missingVars.forEach(varName => {
                console.log(`   - ${varName}`);
            });
            console.log('');
            console.log('💡 Please add these variables to your .env.local file');
            return false;
        } else {
            console.log('✅ All required environment variables are set!');
            return true;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegrationTester;
}

// Auto-run tests if this file is loaded directly
if (typeof window !== 'undefined') {
    // Add test button to the page
    document.addEventListener('DOMContentLoaded', () => {
        // Create test button
        const testButton = document.createElement('button');
        testButton.textContent = '🧪 Test Integrations';
        testButton.className = 'fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors z-50';
        testButton.onclick = async () => {
            const tester = new IntegrationTester();
            await tester.runAllTests();
        };
        
        // Add to page
        document.body.appendChild(testButton);
        
        // Also add environment check
        const envButton = document.createElement('button');
        envButton.textContent = '🔍 Check Environment';
        envButton.className = 'fixed bottom-4 right-40 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors z-50';
        envButton.onclick = () => {
            const tester = new IntegrationTester();
            tester.checkEnvironmentVariables();
        };
        
        document.body.appendChild(envButton);
    });
}