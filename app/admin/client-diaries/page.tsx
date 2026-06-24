export const dynamic = 'force-dynamic'

import { verifyAdminSession } from '@/app/lib/dal'
import { getClientDiaries } from '@/app/actions/client-diaries'
import ClientDiaryManager from '@/app/admin/_components/ClientDiaryManager'

export default async function ClientDiariesAdminPage() {
  await verifyAdminSession()
  const entries = await getClientDiaries()

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Admin Panel</p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Client Diaries</h1>
        <p className="text-xs text-muted-foreground mt-1">Add, edit and manage client testimonials and stories</p>
      </div>

      <div className="px-8 py-6 max-w-4xl">
        <ClientDiaryManager initialEntries={entries} />
      </div>
    </div>
  )
}
