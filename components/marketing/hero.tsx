import Link from 'next/link'

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          WCAG Compliance Platform
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Automated accessibility scanning powered by axe-core.
          Ensure your websites meet WCAG standards instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors"
          >
            View Dashboard
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Scanning</h3>
            <p className="text-slate-400">
              Powered by Puppeteer and axe-core for comprehensive accessibility analysis
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Detailed Reports</h3>
            <p className="text-slate-400">
              Get actionable insights with PDF exports and violation breakdowns
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast & Secure</h3>
            <p className="text-slate-400">
              Built with Next.js 14 and Supabase for speed and security
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
