"use client"

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { customerSignup } from "@/app/actions/shop-auth";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";
  const [state, action, pending] = useActionState(customerSignup, undefined);

  const loginHref = redirectTo !== "/" ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";

  if (state?.success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-light tracking-widest text-foreground uppercase mb-2">
            Account Created
          </h2>
          <p className="text-xs text-muted-foreground mb-6">{state.message}</p>
          <Link
            href={loginHref}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
          Join Us
        </p>
        <h1 className="text-2xl font-light tracking-[0.15em] text-foreground uppercase">
          Bora Honeys
        </h1>
        <div className="mt-3 h-px w-16 mx-auto bg-primary/60" />
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-lg font-light tracking-widest text-foreground uppercase mb-1">
          Create Account
        </h2>
        <p className="text-xs text-muted-foreground mb-8">
          Sign up to shop and manage your orders
        </p>

        <form action={action} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Jane Doe"
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
            {state?.errors?.name && (
              <p className="mt-1.5 text-xs text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
            {state?.errors?.email && (
              <p className="mt-1.5 text-xs text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
            {state?.errors?.password ? (
              <ul className="mt-1.5 space-y-0.5">
                {state.errors.password.map((err) => (
                  <li key={err} className="text-xs text-destructive">
                    {err}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground/60">
                Min 8 chars with letters, numbers & special character
              </p>
            )}
          </div>

          {state?.message && !state.success && (
            <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3">
              <p className="text-xs text-destructive">{state.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-primary-foreground py-3 rounded text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
          >
            {pending ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href={loginHref} className="text-primary hover:underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
