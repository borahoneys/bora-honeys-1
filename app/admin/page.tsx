import { verifyAdminSession } from '@/app/lib/dal'
import Link from 'next/link'
import { ImageIcon, Package, Users, BarChart3 } from 'lucide-react'

const quickLinks = [
  {
    href: '/admin/settings',
    label: 'Homepage',
    description: 'Manage hero sections and CTA buttons',
    icon: ImageIcon,
    available: true,
  },
  {
    href: '/admin/products',
    label: 'Products',
    description: 'Add, edit, and organise your catalogue',
    icon: Package,
    available: true,
  },
  {
    href: '#',
    label: 'Customers',
    description: 'View accounts and order history',
    icon: Users,
    available: false,
  },
  {
    href: '#',
    label: 'Analytics',
    description: 'Traffic, conversions, and revenue',
    icon: BarChart3,
    available: false,
  },
]

export default async function AdminDashboardPage() {
  const session = await verifyAdminSession()
  const name = (session?.user as { name?: string } | undefined)?.name ?? 'Admin'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
          Welcome back, {name}
        </p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Dashboard</h1>
      </div>

      {/* Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickLinks.map(({ href, label, description, icon: Icon, available }) =>
            available ? (
              <Link
                key={label}
                href={href}
                className="group border border-border rounded-lg p-6 hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-1.5">
                  {label}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
              </Link>
            ) : (
              <div
                key={label}
                className="border border-border/30 rounded-lg p-6 opacity-40 cursor-not-allowed"
              >
                <Icon className="w-7 h-7 text-muted-foreground mb-4" />
                <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-1.5">
                  {label}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
                <span className="inline-block mt-3 text-[9px] tracking-widest uppercase text-muted-foreground/50 border border-border/40 rounded px-1.5 py-0.5">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
