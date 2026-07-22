export const dynamic = 'force-dynamic'

import { verifyAdminSession } from '@/app/lib/dal'
import { getEditorialPage } from '@/app/actions/editorial-pages'
import EditorialPageEditor from '@/app/admin/_components/EditorialPageEditor'

export default async function TimelessClassicsAdminPage() {
  await verifyAdminSession()
  const data = await getEditorialPage('timeless-classics')

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Admin Panel</p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Timeless Classics</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage the BORA HONEY&apos;S Timeless Classics page</p>
      </div>

      <div className="px-8 py-6 max-w-4xl">
        <EditorialPageEditor
          pageType="timeless-classics"
          pageLabel="Timeless Classics"
          initialData={data}
        />
      </div>
    </div>
  )
}
