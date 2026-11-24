import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <Suspense>
          <SignupForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
