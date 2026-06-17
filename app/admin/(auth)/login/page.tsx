'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="w-full max-w-md">
      {/* Brand mark */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
          Admin Portal
        </p>
        <h1 className="text-2xl font-light tracking-[0.15em] text-foreground uppercase">
          Bora Honeys
        </h1>
        <div className="mt-3 h-px w-16 mx-auto bg-primary/60" />
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-lg font-light tracking-widest text-foreground uppercase mb-1">
          Sign In
        </h2>
        <p className="text-xs text-muted-foreground mb-8">
          Access the administration panel
        </p>

        <form action={action} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs tracking-widest text-muted-foreground uppercase mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@borahoneys.in"
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
            {state?.errors?.email && (
              <p className="mt-1.5 text-xs text-destructive">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs tracking-widest text-muted-foreground uppercase mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
            {state?.errors?.password && (
              <p className="mt-1.5 text-xs text-destructive">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {state?.message && (
            <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3">
              <p className="text-xs text-destructive">{state.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-primary-foreground py-3 rounded text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Need an account?{' '}
          <Link
            href="/admin/signup"
            className="text-primary hover:underline underline-offset-2"
          >
            Create admin account
          </Link>
        </p>
      </div>
    </div>
  )
}
