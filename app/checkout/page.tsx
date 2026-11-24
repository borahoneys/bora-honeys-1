import type { Metadata } from "next";
import { verifyCustomerSession } from "@/app/lib/dal";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import CheckoutHeader from "@/components/header/CheckoutHeader";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await verifyCustomerSession("/checkout");

  await connectDB();
  const user = await User.findById(session.user!.id).lean();

  const defaultAddress = user?.addresses?.find((a) => a.isDefault) ?? user?.addresses?.[0];

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-light tracking-widest uppercase text-foreground mb-8">
          Checkout
        </h1>
        <CheckoutForm
          userEmail={user?.email ?? session.user!.email ?? ""}
          defaultAddress={
            defaultAddress
              ? {
                  fullName: defaultAddress.fullName,
                  phone: defaultAddress.phone,
                  line1: defaultAddress.line1,
                  line2: defaultAddress.line2,
                  city: defaultAddress.city,
                  state: defaultAddress.state,
                  postalCode: defaultAddress.postalCode,
                  country: defaultAddress.country,
                }
              : undefined
          }
        />
      </main>
    </div>
  );
}
