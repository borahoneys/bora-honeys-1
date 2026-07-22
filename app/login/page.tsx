import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
