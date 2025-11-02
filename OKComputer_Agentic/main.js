// AGENTIC-BROWSER WCAG Pipeline - Main JavaScript
class WCAGScanner {
    constructor() {
        this.isScanning = false;
        this.scanProgress = 0;
        this.sitesScanned = 0;
        this.violationsFound = 0;
        this.highRiskSites = 0;
        this.ceosContacted = 0;
        this.currentSiteIndex = 0;
        this.scanQueue = [];
        this.violations = [];
        this.alerts = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeParticles();
        this.initializeChart();
        this.loadMockData();
        this.startDemoScan();
    }
    
    setupEventListeners() {
        document.getElementById('start-scan').addEventListener('click', () => {
            this.startScan();
        });
        
        document.getElementById('keyword-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startScan();
            }
        });
    }
    
    initializeAnimations() {
        // Initialize Typed.js for hero text
        new Typed('#typed-text', {
            strings: [
                'WCAG Compliance Scanner',
                'ADA Lawsuit Prevention',
                'CEO Outreach Automation',
                'Accessibility Risk Monitor'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
        
        // Initialize Splitting.js for text animations
        Splitting();
        
        // Animate metric cards on load
        anime({
            targets: '.metric-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuart'
        });
    }
    
    initializeParticles() {
        // P5.js particle system for background
        new p5((p) => {
            let particles = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.id('particles-canvas');
                canvas.parent(document.body);
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        opacity: p.random(0.1, 0.3)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(30, 41, 59, particle.opacity * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }
    
    initializeChart() {
        const chartDom = document.getElementById('violation-chart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: 'Violations',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '50%'],
                    data: [
                        { value: 0, name: 'Critical', itemStyle: { color: '#ef4444' } },
                        { value: 0, name: 'High', itemStyle: { color: '#f59e0b' } },
                        { value: 0, name: 'Medium', itemStyle: { color: '#eab308' } },
                        { value: 0, name: 'Low', itemStyle: { color: '#22c55e' } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        myChart.setOption(option);
        this.violationChart = myChart;
    }
    
    loadMockData() {
        // Mock scan queue
        this.scanQueue = [
            'https://petfurniture.com',
            'https://cozy-pet-beds.com',
            'https://luxury-pet-products.com',
            'https://pet-supplies-plus.com',
            'https://happy-pet-store.com',
            'https://premium-pet-gear.com',
            'https://pet-comfort-solutions.com',
            'https://best-pet-products.com',
            'https://pet-lifestyle-store.com',
            'https://modern-pet-furniture.com'
        ];
        
        // Mock violation types
        this.violationTypes = [
            { type: 'Missing Alt Text', severity: 'Critical', wcag: '1.1.1' },
            { type: 'Low Color Contrast', severity: 'High', wcag: '1.4.3' },
            { type: 'No Keyboard Navigation', severity: 'Critical', wcag: '2.1.1' },
            { type: 'Missing Form Labels', severity: 'High', wcag: '3.3.2' },
            { type: 'No Video Captions', severity: 'Medium', wcag: '1.2.2' },
            { type: 'Empty Links', severity: 'Medium', wcag: '2.4.4' },
            { type: 'Missing Language Tag', severity: 'Low', wcag: '3.1.1' },
            { type: 'No Focus Indicators', severity: 'High', wcag: '2.4.7' }
        ];
        
        // Mock companies for outreach
        this.companies = [
            { name: 'Pet Furniture Co', ceo: 'Sarah Johnson', email: 'sarah@petfurniture.com', risk: 'High' },
            { name: 'Cozy Pet Beds', ceo: 'Michael Chen', email: 'michael@cozypetbeds.com', risk: 'Medium' },
            { name: 'Luxury Pet Products', ceo: 'Emily Rodriguez', email: 'emily@luxurypet.com', risk: 'High' },
            { name: 'Pet Supplies Plus', ceo: 'David Wilson', email: 'david@petsupplies.com', risk: 'Critical' }
        ];
    }
    
    startDemoScan() {
        // Start a demo scanning process on page load
        setTimeout(() => {
            this.simulateScanning();
        }, 2000);
    }
    
    startScan() {
        const keyword = document.getElementById('keyword-input').value;
        if (!keyword) {
            alert('Please enter an industry keyword');
            return;
        }
        
        this.isScanning = true;
        this.resetMetrics();
        this.simulateScanning();
    }
    
    resetMetrics() {
        this.sitesScanned = 0;
        this.violationsFound = 0;
        this.highRiskSites = 0;
        this.ceosContacted = 0;
        this.scanProgress = 0;
        this.currentSiteIndex = 0;
        
        this.updateMetrics();
    }
    
    simulateScanning() {
        if (!this.isScanning) return;
        
        const interval = setInterval(() => {
            if (this.scanProgress >= 100) {
                this.isScanning = false;
                clearInterval(interval);
                this.completeScan();
                return;
            }
            
            this.scanProgress += Math.random() * 5;
            this.scanProgress = Math.min(this.scanProgress, 100);
            
            // Update current site
            if (this.currentSiteIndex < this.scanQueue.length) {
                document.getElementById('current-site').textContent = this.scanQueue[this.currentSiteIndex];
            }
            
            // Randomly find violations
            if (Math.random() > 0.7) {
                this.findViolation();
            }
            
            // Update progress
            this.updateProgress();
            
            // Move to next site occasionally
            if (Math.random() > 0.8) {
                this.currentSiteIndex++;
                this.sitesScanned++;
                this.updateMetrics();
            }
            
            // Update UI elements
            this.updateScanQueue();
            this.updateAlerts();
            this.updateHighRiskSites();
            this.updateRecentViolations();
            
        }, 500);
    }
    
    findViolation() {
        const violation = this.violationTypes[Math.floor(Math.random() * this.violationTypes.length)];
        const site = this.scanQueue[this.currentSiteIndex] || 'unknown-site.com';
        
        this.violations.push({
            ...violation,
            site: site,
            timestamp: new Date()
        });
        
        this.violationsFound++;
        
        if (violation.severity === 'Critical' || violation.severity === 'High') {
            this.highRiskSites++;
        }
        
        this.updateMetrics();
        this.updateViolationChart();
    }
    
    updateProgress() {
        document.getElementById('progress-percent').textContent = Math.round(this.scanProgress) + '%';
        document.getElementById('progress-bar').style.width = this.scanProgress + '%';
    }
    
    updateMetrics() {
        this.animateCounter('sites-scanned', this.sitesScanned);
        this.animateCounter('violations-found', this.violationsFound);
        this.animateCounter('high-risk', this.highRiskSites);
        this.animateCounter('ceos-contacted', this.ceosContacted);
    }
    
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        
        anime({
            targets: { value: currentValue },
            value: targetValue,
            duration: 1000,
            easing: 'easeOutQuart',
            update: function(anim) {
                element.textContent = Math.round(anim.animatables[0].target.value);
            }
        });
    }
    
    updateViolationChart() {
        const severityCounts = {
            'Critical': 0,
            'High': 0,
            'Medium': 0,
            'Low': 0
        };
        
        this.violations.forEach(violation => {
            severityCounts[violation.severity]++;
        });
        
        const option = {
            series: [
                {
                    data: [
                        { value: severityCounts['Critical'], name: 'Critical' },
                        { value: severityCounts['High'], name: 'High' },
                        { value: severityCounts['Medium'], name: 'Medium' },
                        { value: severityCounts['Low'], name: 'Low' }
                    ]
                }
            ]
        };
        
        this.violationChart.setOption(option);
    }
    
    updateScanQueue() {
        const container = document.getElementById('scan-queue');
        const queueItems = this.scanQueue.slice(this.currentSiteIndex, this.currentSiteIndex + 5);
        
        container.innerHTML = queueItems.map(site => `
            <div class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <span class="font-mono text-xs text-slate-600">${site}</span>
                <span class="text-xs text-slate-400">Pending</span>
            </div>
        `).join('');
    }
    
    updateAlerts() {
        const container = document.getElementById('alerts-container');
        
        if (this.violations.length > 0 && Math.random() > 0.8) {
            const recentViolation = this.violations[this.violations.length - 1];
            const alertClass = recentViolation.severity === 'Critical' ? 'border-red-200 bg-red-50 text-red-700' :
                              recentViolation.severity === 'High' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                              'border-blue-200 bg-blue-50 text-blue-700';
            
            const alertHTML = `
                <div class="p-3 border rounded-lg ${alertClass}">
                    <div class="font-medium text-sm">${recentViolation.type}</div>
                    <div class="text-xs mt-1">WCAG ${recentViolation.wcag} violation found</div>
                    <div class="text-xs mt-1 opacity-75">${recentViolation.site}</div>
                </div>
            `;
            
            container.innerHTML = alertHTML + container.innerHTML;
            
            // Keep only last 3 alerts
            const alerts = container.children;
            while (alerts.length > 3) {
                container.removeChild(alerts[alerts.length - 1]);
            }
        }
    }
    
    updateHighRiskSites() {
        const container = document.getElementById('high-risk-sites');
        const highRiskViolations = this.violations.filter(v => v.severity === 'Critical' || v.severity === 'High');
        
        if (highRiskViolations.length > 0) {
            const sites = [...new Set(highRiskViolations.map(v => v.site))].slice(0, 3);
            
            container.innerHTML = sites.map(site => `
                <div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                        <div class="font-medium text-sm text-red-800">${site}</div>
                        <div class="text-xs text-red-600">Critical violations detected</div>
                    </div>
                    <button class="text-red-600 hover:text-red-800 text-xs font-medium">Contact CEO</button>
                </div>
            `).join('');
        }
    }
    
    updateRecentViolations() {
        const container = document.getElementById('recent-violations');
        const recentViolations = this.violations.slice(-5);
        
        container.innerHTML = recentViolations.map(violation => {
            const severityColor = violation.severity === 'Critical' ? 'text-red-600' :
                                 violation.severity === 'High' ? 'text-amber-600' :
                                 violation.severity === 'Medium' ? 'text-yellow-600' :
                                 'text-green-600';
            
            return `
                <div class="p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-sm text-slate-800">${violation.type}</span>
                        <span class="text-xs ${severityColor} font-medium">${violation.severity}</span>
                    </div>
                    <div class="text-xs text-slate-600 mt-1">WCAG ${violation.wcag}</div>
                    <div class="text-xs text-slate-500 mt-1">${violation.site}</div>
                </div>
            `;
        }).join('');
    }
    
    completeScan() {
        // Simulate CEO outreach for high-risk sites
        if (this.highRiskSites > 0) {
            setTimeout(() => {
                this.ceosContacted = Math.min(this.highRiskSites, 3);
                this.animateCounter('ceos-contacted', this.ceosContacted);
            }, 1000);
        }
        
        // Show completion message
        const alertsContainer = document.getElementById('alerts-container');
        const completionAlert = `
            <div class="p-3 border border-green-200 bg-green-50 text-green-700 rounded-lg">
                <div class="font-medium text-sm">Scan Complete!</div>
                <div class="text-xs mt-1">Found ${this.violationsFound} violations across ${this.sitesScanned} sites</div>
            </div>
        `;
        alertsContainer.innerHTML = completionAlert + alertsContainer.innerHTML;
    }
}

// HubSpot Integration Functions
class HubSpotIntegration {
    constructor() {
        this.apiEndpoint = '/api/hubspot-contact';
        this.isEnabled = this.checkHubSpotAvailability();
    }
    
    checkHubSpotAvailability() {
        // Check if HubSpot API is configured
        return true; // Will be determined by environment variables
    }
    
    async createContact(contactData) {
        if (!this.isEnabled) {
            console.log('HubSpot integration not enabled');
            return { success: false, error: 'HubSpot not configured' };
        }
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contactData })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ HubSpot contact created:', result.contactId);
                return result;
            } else {
                console.log('❌ HubSpot contact creation failed:', result.error);
                return result;
            }
            
        } catch (error) {
            console.log('❌ HubSpot API error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async createContactFromViolation(violation, companyData) {
        const contactData = {
            email: companyData.ceoEmail || `contact@${companyData.domain}`,
            firstname: companyData.ceoName?.split(' ')[0] || 'Contact',
            lastname: companyData.ceoName?.split(' ')[1] || 'Person',
            company: companyData.name,
            jobtitle: companyData.ceoTitle || 'CEO',
            phone: companyData.phone || '',
            risk: violation.severity,
            violationsCount: 1,
            lastContact: new Date().toISOString().split('T')[0],
            notes: `WCAG ${violation.wcag} violation: ${violation.type}`
        };
        
        return await this.createContact(contactData);
    }
}

// Email Integration Functions
class EmailIntegration {
    constructor() {
        this.apiEndpoint = '/api/send-email';
        this.isEnabled = this.checkEmailAvailability();
    }
    
    checkEmailAvailability() {
        return true; // Will be determined by environment variables
    }
    
    async sendComplianceAlert(contactData, violationData) {
        if (!this.isEnabled) {
            console.log('Email integration not enabled');
            return { success: false, error: 'Email not configured' };
        }
        
        const emailData = {
            to: contactData.email,
            subject: `Critical ADA Compliance Risk - ${contactData.company}`,
            templateId: 'd-your-template-id', // Replace with your SendGrid template ID
            templateData: {
                firstname: contactData.firstname,
                company: contactData.company,
                risk: contactData.risk,
                violationsCount: violationData.length,
                meetingLink: 'https://calendly.com/your-meeting-link'
            }
        };
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Compliance alert sent to:', contactData.email);
                return result;
            } else {
                console.log('❌ Email sending failed:', result.error);
                return result;
            }
            
        } catch (error) {
            console.log('❌ Email API error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Enhanced Keyword Scanner for better industry targeting
class EnhancedKeywordScanner {
    constructor() {
        this.industryDatabases = {
            'music': {
                sites: [
                    'https://spotify.com',
                    'https://apple.com/music', 
                    'https://soundcloud.com',
                    'https://bandcamp.com',
                    'https://pandora.com',
                    'https://tidal.com',
                    'https://deezer.com',
                    'https://music.youtube.com',
                    'https://bandlab.com',
                    'https://audiomack.com'
                ],
                keywords: ['music', 'streaming', 'audio', 'band', 'artist', 'album', 'song'],
                violationTypes: [
                    'Missing Audio Descriptions',
                    'No Keyboard Controls for Media Player',
                    'Inaccessible Media Player Controls',
                    'Missing Video Captions',
                    'No Transcripts for Audio Content'
                ]
            },
            'pet': {
                sites: [
                    'https://petfurniture.com',
                    'https://cozy-pet-beds.com',
                    'https://luxury-pet-products.com',
                    'https://pet-supplies-plus.com',
                    'https://happy-pet-store.com',
                    'https://premium-pet-gear.com',
                    'https://pet-comfort-solutions.com',
                    'https://best-pet-products.com',
                    'https://pet-lifestyle-store.com',
                    'https://modern-pet-furniture.com'
                ],
                keywords: ['pet', 'dog', 'cat', 'furniture', 'bed', 'toy', 'food', 'supply'],
                violationTypes: [
                    'Missing Alt Text for Product Images',
                    'Low Color Contrast on Product Pages',
                    'Inaccessible Shopping Cart',
                    'Missing Form Labels on Checkout',
                    'No Keyboard Navigation in Store'
                ]
            },
            'healthcare': {
                sites: [
                    'https://webmd.com',
                    'https://mayoclinic.org',
                    'https://clevelandclinic.org',
                    'https://healthline.com',
                    'https://medicalnewstoday.com',
                    'https://verywellhealth.com',
                    'https://medicinenet.com',
                    'https://rxlist.com',
                    'https://drugs.com',
                    'https://healthgrades.com'
                ],
                keywords: ['health', 'medical', 'doctor', 'hospital', 'clinic', 'medicine', 'treatment'],
                violationTypes: [
                    'Missing Alt Text for Medical Images',
                    'Inaccessible Appointment Booking System',
                    'No Screen Reader Support for Forms',
                    'Missing Error Messages for Validation',
                    'Poor Color Contrast on Medical Information'
                ]
            }
        };
    }
    
    getIndustryData(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        
        // Find matching industry
        for (const [industry, data] of Object.entries(this.industryDatabases)) {
            if (data.keywords.some(k => lowerKeyword.includes(k))) {
                return data;
            }
        }
        
        // Default to general business sites if no match
        return this.getDefaultIndustryData(keyword);
    }
    
    getDefaultIndustryData(keyword) {
        return {
            sites: [
                `https://example-${keyword.replace(/\s+/g, '-')}-1.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-2.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-3.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-4.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-5.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-6.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-7.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-8.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-9.com`,
                `https://example-${keyword.replace(/\s+/g, '-')}-10.com`
            ],
            keywords: [keyword],
            violationTypes: [
                'Missing Alt Text',
                'Low Color Contrast',
                'No Keyboard Navigation',
                'Missing Form Labels',
                'Empty Links'
            ]
        };
    }
    
    generateIndustrySpecificViolations(industry, count = 10) {
        const violations = [];
        const violationTypes = industry.violationTypes;
        
        for (let i = 0; i < count; i++) {
            const violationType = violationTypes[i % violationTypes.length];
            const severity = this.getSeverityForViolation(violationType);
            const wcag = this.getWCAGForViolation(violationType);
            
            violations.push({
                id: i + 1,
                type: violationType,
                severity: severity,
                wcag: wcag,
                site: industry.sites[i % industry.sites.length],
                description: this.generateViolationDescription(violationType),
                remediation: this.generateRemediationAdvice(violationType),
                timestamp: new Date()
            });
        }
        
        return violations;
    }
    
    getSeverityForViolation(violationType) {
        if (violationType.includes('Critical') || violationType.includes('Alt Text')) {
            return 'Critical';
        } else if (violationType.includes('Keyboard') || violationType.includes('Contrast')) {
            return 'High';
        } else if (violationType.includes('Form') || violationType.includes('Labels')) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }
    
    getWCAGForViolation(violationType) {
        const wcagMap = {
            'Missing Alt Text': '1.1.1',
            'Low Color Contrast': '1.4.3',
            'No Keyboard Navigation': '2.1.1',
            'Missing Form Labels': '3.3.2',
            'Empty Links': '2.4.4',
            'Missing Audio Descriptions': '1.2.3',
            'Inaccessible Media Player': '2.1.1',
            'No Captions for Videos': '1.2.2'
        };
        
        return wcagMap[violationType] || '2.1.1';
    }
    
    generateViolationDescription(violationType) {
        const descriptions = {
            'Missing Alt Text': 'Images do not have descriptive alternative text for screen readers',
            'Low Color Contrast': 'Text does not meet minimum color contrast requirements',
            'No Keyboard Navigation': 'Interactive elements cannot be accessed using keyboard only',
            'Missing Form Labels': 'Form inputs lack proper labels for screen reader users',
            'Empty Links': 'Links contain no descriptive text for screen readers'
        };
        
        return descriptions[violationType] || 'Accessibility violation detected';
    }
    
    generateRemediationAdvice(violationType) {
        const advice = {
            'Missing Alt Text': 'Add descriptive alt attributes to all images',
            'Low Color Contrast': 'Increase color contrast to meet WCAG standards',
            'No Keyboard Navigation': 'Ensure all interactive elements are keyboard accessible',
            'Missing Form Labels': 'Add proper labels to all form inputs',
            'Empty Links': 'Add descriptive text to all links'
        };
        
        return advice[violationType] || 'Follow WCAG guidelines for remediation';
    }
}

// Enhanced WCAG Scanner with Integrations
class EnhancedWCAGScanner extends WCAGScanner {
    constructor() {
        super();
        this.hubSpot = new HubSpotIntegration();
        this.email = new EmailIntegration();
        this.autoSyncEnabled = true;
        this.keywordScanner = new EnhancedKeywordScanner();
        this.scannedSites = new Set();
    }
    
    async processHighRiskViolation(violation, companyData) {
        // Create HubSpot contact for high-risk violations
        if (violation.severity === 'Critical' || violation.severity === 'High') {
            if (this.autoSyncEnabled) {
                const hubspotResult = await this.hubSpot.createContactFromViolation(violation, companyData);
                
                if (hubspotResult.success) {
                    // Send compliance alert email
                    const emailResult = await this.email.sendComplianceAlert({
                        email: companyData.ceoEmail,
                        firstname: companyData.ceoName?.split(' ')[0] || 'Sir/Madam',
                        company: companyData.name
                    }, [violation]);
                    
                    return {
                        hubspot: hubspotResult,
                        email: emailResult
                    };
                }
            }
        }
        
        return null;
    }
    
    // Override the violation finding method to include integrations
    findViolation() {
        const violation = super.findViolation();
        
        // Simulate company data for integration
        const companyData = {
            name: 'Example Company',
            domain: 'example.com',
            ceoName: 'John Doe',
            ceoEmail: 'john@example.com',
            ceoTitle: 'CEO'
        };
        
        // Process violation with integrations
        this.processHighRiskViolation(violation, companyData);
        
        return violation;
    }
    
    // Enhanced scan method with keyword targeting
    async startScan(keyword) {
        this.isScanning = true;
        this.resetMetrics();
        
        // Get industry-specific data
        const industryData = this.keywordScanner.getIndustryData(keyword);
        
        // Generate industry-specific violations
        const violations = this.keywordScanner.generateIndustrySpecificViolations(industryData, 25);
        
        // Simulate scanning process with industry data
        this.simulateIndustryScan(industryData, violations);
    }
    
    simulateIndustryScan(industryData, violations) {
        let violationIndex = 0;
        const totalViolations = violations.length;
        
        const scanInterval = setInterval(() => {
            if (violationIndex >= totalViolations || this.scanProgress >= 100) {
                this.isScanning = false;
                clearInterval(scanInterval);
                this.completeScan();
                return;
            }
            
            // Add violation to scan results
            const violation = violations[violationIndex];
            this.violations.push(violation);
            this.violationsFound++;
            
            // Update site counter
            if (!this.scannedSites.has(violation.site)) {
                this.scannedSites.add(violation.site);
                this.sitesScanned++;
            }
            
            // Update risk counter
            if (violation.severity === 'Critical' || violation.severity === 'High') {
                this.highRiskSites++;
            }
            
            // Update progress
            this.scanProgress = (violationIndex / totalViolations) * 100;
            this.updateProgress();
            
            // Update current site
            document.getElementById('current-site').textContent = violation.site;
            
            // Update UI elements
            this.updateMetrics();
            this.updateViolationChart();
            this.updateAlerts();
            this.updateHighRiskSites();
            this.updateRecentViolations();
            
            violationIndex++;
            
        }, 200); // Faster scanning for demo
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scanner = new EnhancedWCAGScanner();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.violation-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Add click handlers for quick action buttons
    document.querySelectorAll('.bg-amber-50, .bg-teal-50, .bg-blue-50').forEach(button => {
        button.addEventListener('click', () => {
            const text = button.textContent.trim();
            if (text.includes('Outreach')) {
                window.location.href = 'outreach.html';
            } else if (text.includes('Report')) {
                window.location.href = 'reports.html';
            } else if (text.includes('Legal')) {
                alert('Legal Risk Assessment feature coming soon!');
            }
        });
    });
    
    // Add integration test button
    const testIntegrationsButton = document.createElement('button');
    testIntegrationsButton.textContent = '🧪 Test Integrations';
    testIntegrationsButton.className = 'fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors z-50';
    testIntegrationsButton.onclick = async () => {
        if (typeof IntegrationTester !== 'undefined') {
            const tester = new IntegrationTester();
            await tester.runAllTests();
        } else {
            alert('Integration Tester not loaded. Please ensure test-integration.js is included.');
        }
    };
    
    document.body.appendChild(testIntegrationsButton);
});