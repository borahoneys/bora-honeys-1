"use client"

import { customerLogout } from "@/app/actions/shop-auth";

export default function SignOutButton() {
  return (
    <form action={customerLogout}>
      <button
        type="submit"
        className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
