import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-slate-400 mb-6">Welcome, {user.email}</p>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <p className="text-slate-300">Scan history will appear here</p>
        </div>
      </div>
    </div>
  )
}
