# Agentic WCAG Pipeline

**Industry-Agnostic Keyword Scanning & Outreach Automation Platform**

A Next.js 14 application with TypeScript, Tailwind CSS, Supabase authentication, and autonomous scanning capabilities for any industry vertical. Deploy seamlessly on Railway or Vercel for scalable outreach automation.

## 🚀 Core Features

- **Industry-Agnostic Scanning**: Works with ANY keyword (toy stores, dentists, lawyers, restaurants, etc.)
- **SerpAPI Integration**: Fetches top 100 search results for maximum coverage
- **Smart Deduplication**: Removes duplicate URLs while preserving result quality
- **Redis Queue Management**: Scalable background processing
- **Supabase Authentication**: Magic link + Google OAuth support
- **Glassmorphic UI**: Modern dark mode interface
- **One-Click Deployment**: Railway and Vercel ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Dark Mode
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Link + OAuth)
- **Search**: SerpAPI for web scraping
- **Queue**: Redis (ioredis) for job management
- **Deployment**: Railway / Vercel

## 📡 API Endpoint

### POST /api/scan

**Industry-agnostic keyword scanning endpoint**

```json
{
  "keyword": "any search term",
  "replyEmail": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scan completed successfully for \"toy store\"",
  "resultsCount": 87,
  "keyword": "toy store",
  "replyEmail": "user@example.com",
  "results": [...]
}
```

### GET /api/scan
Health check endpoint with API documentation

## 🔧 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/aaj441/Agentic.git
cd Agentic
npm install
```

### 2. Environment Configuration

Copy `.env.local.example` to `.env.local` and configure:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# SerpAPI Configuration (Required)
SERPAPI_KEY=your-serpapi-key-here

# Redis Configuration (Optional but recommended)
REDIS_URL=redis://default:password@host:port

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Test the Pipeline

**Local Testing:**
```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "toy store",
    "replyEmail": "test@example.com"
  }'
```

**Health Check:**
```bash
curl http://localhost:3000/api/scan
```

## 🚢 Deployment

### Railway Deployment

1. **Connect Repository**:
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Select the Agentic project

2. **Environment Variables**:
   - Add all variables from `.env.local.example`
   - Ensure SERPAPI_KEY is configured
   - Add Redis service if needed

3. **Deploy**: Railway auto-deploys on git push

### Vercel Deployment

1. **Connect Repository**:
   ```bash
   npx vercel
   # Follow prompts to connect repository
   ```

2. **Environment Variables**:
   - Configure in Vercel dashboard
   - Add SERPAPI_KEY and other required vars
   - Use Upstash Redis for REDIS_URL

3. **Deploy**: Auto-deploys on git push to main

## 🤖 Agentic Meta-Prompts for Evolution

*The following meta-prompts are designed to guide autonomous agents in expanding and improving this pipeline. Each prompt is crafted to achieve specific evolutionary goals while maintaining the industry-agnostic nature of the system.*

### Meta-Prompt 1: Autonomous Industry Detection
**Prompt**: "Analyze the provided keyword and automatically detect the industry vertical. Based on the industry (e.g., healthcare, legal, retail, food service), dynamically adjust search parameters, result filtering, and outreach templates. Create industry-specific scoring algorithms that prioritize the most relevant targets for each vertical."

**Intended Effect**: Transforms the pipeline from generic keyword matching to intelligent industry-aware processing, improving result quality and relevance without manual configuration.

**Implementation**: The pipeline should develop pattern recognition for industry indicators and adjust SerpAPI parameters, result ranking, and subsequent processing workflows accordingly.

---

### Meta-Prompt 2: Self-Optimizing Search Strategy
**Prompt**: "Continuously monitor scan success rates, result quality scores, and user feedback to automatically optimize search strategies. Implement A/B testing for different keyword variations, search engines, and parameter combinations. Learn which approaches yield the highest conversion rates for each industry type."

**Intended Effect**: Creates a self-improving system that becomes more effective over time, reducing manual optimization needs and increasing outreach success rates.

**Implementation**: Store performance metrics in Supabase, implement automated experimentation framework, and adjust search parameters based on historical success data.

---

### Meta-Prompt 3: Dynamic Configuration Discovery
**Prompt**: "Scan the current environment, detect available services (Redis, email providers, database connections), and automatically configure optimal settings. Generate configuration recommendations based on deployment platform (Railway vs. Vercel), scale requirements, and available resources."

**Intended Effect**: Eliminates manual configuration complexity, enables zero-config deployments, and automatically adapts to different hosting environments.

**Implementation**: Create environment detection middleware that probes for services and generates optimal configuration files dynamically.

---

### Meta-Prompt 4: Intelligent Content Generation
**Prompt**: "For each scanned business, generate personalized outreach content based on their industry, website content, services offered, and apparent pain points. Create industry-specific templates while maintaining personalization. Ensure WCAG compliance issues are identified and addressed in outreach messaging."

**Intended Effect**: Transforms generic scanning into intelligent, personalized outreach preparation with higher engagement potential.

**Implementation**: Integrate content analysis AI, template generation system, and WCAG audit capabilities into the scanning pipeline.

---

### Meta-Prompt 5: Autonomous Quality Assurance
**Prompt**: "Implement self-testing protocols that continuously validate pipeline functionality. Create synthetic test scenarios for different industries, monitor API response times, and automatically flag degraded performance. Generate health reports and self-healing recommendations."

**Intended Effect**: Ensures pipeline reliability without manual monitoring, prevents downtime, and maintains service quality across deployments.

**Implementation**: Build comprehensive testing framework with synthetic monitoring, performance benchmarks, and automated recovery procedures.

---

### Meta-Prompt 6: Adaptive Scaling Architecture
**Prompt**: "Monitor current system load, queue depths, and response times to automatically recommend and implement scaling decisions. Suggest when to upgrade Redis instances, optimize database queries, or distribute processing across multiple workers. Prepare deployment configurations for different scale scenarios."

**Intended Effect**: Creates a self-aware system that anticipates scaling needs and provides actionable recommendations for growth.

**Implementation**: Implement monitoring dashboards, predictive load analysis, and automated scaling configuration generation.

---

### Meta-Prompt 7: Cross-Platform Deployment Optimization
**Prompt**: "Analyze the target deployment platform (Railway, Vercel, AWS, etc.) and automatically optimize the application configuration, environment variables, and resource allocation for that specific platform. Generate platform-specific deployment guides and configuration files."

**Intended Effect**: Enables seamless deployment across different platforms without manual optimization, reducing deployment friction.

**Implementation**: Create platform detection and optimization modules that generate tailored deployment configurations.

---

### Meta-Prompt 8: Regulatory Compliance Automation
**Prompt**: "Automatically ensure all scanning activities comply with relevant regulations (GDPR, CCPA, industry-specific requirements). Implement consent management, data retention policies, and audit trails. Generate compliance reports and flag potential regulatory issues."

**Intended Effect**: Builds trust and legal safety into the pipeline, enabling global deployment without compliance concerns.

**Implementation**: Integrate compliance checking modules, audit logging, and automated policy enforcement throughout the pipeline.

---

### Meta-Prompt 9: Integration Ecosystem Expansion
**Prompt**: "Identify popular tools and platforms used in target industries (CRM systems, marketing automation, project management tools) and automatically generate integration connectors. Create webhook endpoints and API mappings that allow seamless data flow into existing business workflows."

**Intended Effect**: Transforms the pipeline from a standalone tool into a comprehensive ecosystem hub, increasing adoption and retention.

**Implementation**: Build dynamic integration framework with plugin architecture and automatic connector generation capabilities.

---

### Meta-Prompt 10: Autonomous Learning & Evolution
**Prompt**: "Continuously analyze successful outreach campaigns, user behavior patterns, and industry trends to evolve the pipeline's capabilities. Implement machine learning models that improve keyword expansion, result ranking, and success prediction. Generate and test new features based on user needs and market opportunities."

**Intended Effect**: Creates a truly autonomous system that grows and improves independently, staying ahead of market needs and user expectations.

**Implementation**: Build ML pipeline for pattern recognition, feature suggestion engine, and automated A/B testing framework for new capabilities.

---

## 🎯 Testing the Industry-Agnostic Pipeline

### Test Scenarios

**1. Retail/E-commerce (toy store):**
```json
{
  "keyword": "toy store near me",
  "replyEmail": "test@example.com"
}
```

**2. Professional Services (lawyers):**
```json
{
  "keyword": "personal injury lawyer",
  "replyEmail": "test@example.com"
}
```

**3. Healthcare (dentists):**
```json
{
  "keyword": "family dentist",
  "replyEmail": "test@example.com"
}
```

**4. Food Service (restaurants):**
```json
{
  "keyword": "italian restaurant",
  "replyEmail": "test@example.com"
}
```

**5. Home Services (plumbers):**
```json
{
  "keyword": "emergency plumber",
  "replyEmail": "test@example.com"
}
```

### Expected Results

Each test should return:
- ✅ 50-100 unique, relevant results
- ✅ Proper deduplication
- ✅ Industry-appropriate result ranking
- ✅ Queue storage confirmation
- ✅ Email notification setup

## 🔄 Continuous Improvement

The pipeline is designed to evolve through:

1. **Performance Monitoring**: Track success rates across industries
2. **User Feedback Integration**: Learn from outreach campaign results
3. **Automated A/B Testing**: Optimize search and ranking algorithms
4. **Industry Pattern Recognition**: Improve targeting over time
5. **Scaling Optimization**: Adapt to growing usage patterns

## 🚦 Status Dashboard

- ✅ Core scanning pipeline implemented
- ✅ Industry-agnostic keyword processing
- ✅ SerpAPI integration with top 100 results
- ✅ URL deduplication system
- ✅ Redis queue preparation
- ✅ Email notification framework
- ✅ Railway/Vercel deployment ready
- 🔄 Meta-prompt autonomous evolution system (in progress)
- 🔄 Advanced industry detection algorithms (planned)
- 🔄 ML-powered result optimization (roadmap)

## 📚 Additional Resources

- [SerpAPI Documentation](https://serpapi.com/search-api)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Deployment Guide](https://railway.app/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

This project embraces autonomous evolution through agentic meta-prompts. Contributions should focus on:

1. Implementing meta-prompt capabilities
2. Expanding industry detection algorithms
3. Improving autonomous configuration systems
4. Enhancing cross-platform deployment optimization
5. Building ML-powered optimization features

## 📄 License

MIT License - feel free to adapt for any industry vertical or use case.

---

**Ready for autonomous deployment and evolution!** 🚀
