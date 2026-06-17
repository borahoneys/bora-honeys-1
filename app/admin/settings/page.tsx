export const dynamic = 'force-dynamic'

import { verifyAdminSession } from '@/app/lib/dal'
import { getHomepageConfig } from '@/app/actions/homepage'
import HomepageEditor from './_components/HomepageEditor'

export default async function SettingsPage() {
  await verifyAdminSession()
  const config = await getHomepageConfig()

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Admin Panel</p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Settings</h1>
      </div>

      <div className="px-8 py-6 max-w-4xl">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-border">
          <button
            className="px-5 py-2.5 text-xs tracking-widest uppercase border-b-2 border-primary text-primary -mb-px transition-colors"
          >
            Homepage
          </button>
          <button
            className="px-5 py-2.5 text-xs tracking-widest uppercase border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
            disabled
          >
            General
          </button>
          <button
            className="px-5 py-2.5 text-xs tracking-widest uppercase border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
            disabled
          >
            SEO
          </button>
        </div>

        {/* Tab Content */}
        <div>
          <div className="mb-6">
            <h2 className="text-sm font-medium tracking-widest uppercase text-foreground mb-1">
              Homepage Customization
            </h2>
            <p className="text-xs text-muted-foreground">
              Add, remove, and reorder the sections that appear on the storefront homepage.
              Each section supports a desktop image, a mobile image, and an optional CTA button.
            </p>
          </div>

          <HomepageEditor initialConfig={config} />
        </div>
      </div>
    </div>
  )
}
