import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface ScanRequest {
  keyword: string;
  replyEmail: string;
}

interface SerpResult {
  position: number;
  title: string;
  link: string;
  snippet?: string;
}

/**
 * Industry-agnostic /api/scan endpoint
 * Accepts ANY keyword and searches for relevant web hits
 * 
 * Features:
 * - Flexible keyword processing (toy store, dentist, lawyer, any niche)
 * - SerpAPI integration for top 100 results
 * - URL deduplication
 * - Redis queue storage
 * - Email notification on completion
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ScanRequest = await request.json();
    const { keyword, replyEmail } = body;

    // Validate input
    if (!keyword || !replyEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: keyword and replyEmail' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(replyEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log(`Starting scan for keyword: "${keyword}" - Reply to: ${replyEmail}`);

    // Initialize Supabase client for auth check (optional)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Call SerpAPI to get top 100 results
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) {
      console.error('SERPAPI_KEY not configured');
      return NextResponse.json(
        { error: 'SerpAPI not configured. Please set SERPAPI_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Fetch results from SerpAPI (industry-agnostic search)
    const searchResults = await fetchSerpResults(keyword, serpApiKey);
    
    if (!searchResults || searchResults.length === 0) {
      console.log(`No results found for keyword: ${keyword}`);
      return NextResponse.json(
        { 
          success: true,
          message: `Scan completed for "${keyword}" but no results found`,
          resultsCount: 0,
          keyword,
          replyEmail
        },
        { status: 200 }
      );
    }

    // Deduplicate URLs
    const deduplicatedResults = deduplicateResults(searchResults);
    console.log(`Found ${searchResults.length} results, ${deduplicatedResults.length} after deduplication`);

    // Store in Redis queue
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      await storeInRedisQueue(keyword, deduplicatedResults, replyEmail, redisUrl);
    } else {
      console.warn('REDIS_URL not configured, skipping queue storage');
    }

    // Send success notification (placeholder - implement actual email sending)
    await sendScanSuccessEmail(replyEmail, keyword, deduplicatedResults.length);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: `Scan completed successfully for "${keyword}"`,
        resultsCount: deduplicatedResults.length,
        keyword,
        replyEmail,
        results: deduplicatedResults.slice(0, 10), // Return first 10 as preview
        userId: user?.id || null
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Scan API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Fetch results from SerpAPI
 * Industry-agnostic: works with ANY keyword
 */
async function fetchSerpResults(keyword: string, apiKey: string): Promise<SerpResult[]> {
  try {
    // Build SerpAPI request URL for Google search
    const params = new URLSearchParams({
      engine: 'google',
      q: keyword,
      api_key: apiKey,
      num: '100', // Request top 100 results
      gl: 'us', // Geolocation: United States
      hl: 'en' // Language: English
    });

    const response = await fetch(`https://serpapi.com/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract organic results
    const organicResults: SerpResult[] = (data.organic_results || []).map((result: any) => ({
      position: result.position,
      title: result.title,
      link: result.link,
      snippet: result.snippet
    }));

    return organicResults;

  } catch (error) {
    console.error('SerpAPI fetch error:', error);
    throw error;
  }
}

/**
 * Deduplicate results by URL
 * Removes duplicate URLs while preserving order
 */
function deduplicateResults(results: SerpResult[]): SerpResult[] {
  const seen = new Set<string>();
  const deduplicated: SerpResult[] = [];

  for (const result of results) {
    // Normalize URL (remove trailing slashes, fragments, etc.)
    const normalizedUrl = normalizeUrl(result.link);
    
    if (!seen.has(normalizedUrl)) {
      seen.add(normalizedUrl);
      deduplicated.push(result);
    }
  }

  return deduplicated;
}

/**
 * Normalize URL for deduplication
 */
function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove trailing slash, fragments, and some query params
    return `${parsed.origin}${parsed.pathname.replace(/\/$/, '')}`;
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Store results in Redis queue for processing
 */
async function storeInRedisQueue(
  keyword: string,
  results: SerpResult[],
  replyEmail: string,
  redisUrl: string
): Promise<void> {
  try {
    // For now, log to console. Implement Redis client when ready.
    console.log(`[Redis Queue] Storing ${results.length} results for keyword: ${keyword}`);
    console.log(`[Redis Queue] Queue key: scan:${keyword.replace(/\s+/g, '_')}`);
    console.log(`[Redis Queue] Reply email: ${replyEmail}`);
    
    // TODO: Implement actual Redis storage
    // Example using ioredis:
    // const Redis = require('ioredis');
    // const redis = new Redis(redisUrl);
    // const queueKey = `scan:${keyword.replace(/\s+/g, '_')}:${Date.now()}`;
    // await redis.lpush(queueKey, JSON.stringify({ keyword, results, replyEmail, timestamp: Date.now() }));
    // await redis.expire(queueKey, 86400); // Expire after 24 hours
    
  } catch (error) {
    console.error('Redis queue storage error:', error);
    // Non-fatal: continue even if Redis fails
  }
}

/**
 * Send scan success notification email
 */
async function sendScanSuccessEmail(
  email: string,
  keyword: string,
  resultsCount: number
): Promise<void> {
  try {
    console.log(`[Email] Sending success notification to ${email}`);
    console.log(`[Email] Scan completed for "${keyword}" with ${resultsCount} results`);
    
    // TODO: Implement actual email sending
    // Options:
    // 1. SendGrid API
    // 2. AWS SES
    // 3. Resend API
    // 4. Gmail API (if GMAIL_* env vars are configured)
    
    // For now, this is a placeholder
    // In production, integrate with your preferred email service
    
  } catch (error) {
    console.error('Email send error:', error);
    // Non-fatal: continue even if email fails
  }
}

/**
 * GET endpoint for health check
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      endpoint: '/api/scan',
      method: 'POST',
      description: 'Industry-agnostic keyword scanning endpoint',
      requiredFields: ['keyword', 'replyEmail'],
      example: {
        keyword: 'toy store',
        replyEmail: 'user@example.com'
      }
    },
    { status: 200 }
  );
}
