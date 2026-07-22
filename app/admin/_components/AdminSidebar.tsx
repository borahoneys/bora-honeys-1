'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { LayoutDashboard, ImageIcon, Package, Users, LogOut, Tag, Layers, Sparkles, BookOpen, GalleryVertical } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/settings', label: 'Homepage', icon: ImageIcon, exact: false },
  { href: '/admin/products', label: 'Products', icon: Package, exact: false },
  { href: '/admin/categories', label: 'Categories', icon: Tag, exact: false },
  { href: '/admin/collections', label: 'Collections', icon: Layers, exact: false },
  { href: '/admin/customers', label: 'Customers', icon: Users, exact: false, disabled: true },
]

const pageItems = [
  { href: '/admin/timeless-classics', label: 'Timeless Classics', icon: Sparkles, exact: false },
  { href: '/admin/capsule-collection', label: 'Capsule Collection', icon: GalleryVertical, exact: false },
  { href: '/admin/client-diaries', label: 'Client Diaries', icon: BookOpen, exact: false },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-56 shrink-0 min-h-screen border-r border-border bg-background flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="BORA HONEY'S"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <div>
            <p className="text-[10px] font-light tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition-colors">
              BORA HONEY&apos;S
            </p>
            <p className="text-[8px] tracking-widest uppercase text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        <div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-muted-foreground/60 px-3 mb-3">
            Navigation
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, exact, disabled }) => {
              const active = !disabled && isActive(href, exact ?? false)
              return (
                <li key={href}>
                  {disabled ? (
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded text-[10px] tracking-[0.2em] uppercase text-muted-foreground/30 cursor-not-allowed select-none">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded text-[10px] tracking-[0.2em] uppercase transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-muted-foreground/60 px-3 mb-3">
            Pages
          </p>
          <ul className="space-y-0.5">
            {pageItems.map(({ href, label, icon: Icon, exact }) => {
              const active = isActive(href, exact)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded text-[10px] tracking-[0.2em] uppercase transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors border border-transparent"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
