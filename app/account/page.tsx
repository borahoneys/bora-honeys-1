import Link from "next/link";
import type { Metadata } from "next";
import { verifyCustomerSession } from "@/app/lib/dal";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import SignOutButton from "@/components/auth/SignOutButton";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "My Account",
};

const statusLabel: Record<string, string> = {
  pending: "Payment Pending",
  paid: "Confirmed",
  failed: "Payment Failed",
  cancelled: "Cancelled",
};

export default async function AccountPage() {
  const session = await verifyCustomerSession("/account");

  await connectDB();
  const [user, orders] = await Promise.all([
    User.findById(session.user!.id).lean(),
    Order.find({ user: session.user!.id }).sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-24 w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-light tracking-widest uppercase text-foreground">My Account</h1>
            <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <SignOutButton />
        </div>

        <h2 className="text-sm font-light tracking-widest uppercase text-foreground mb-4">
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/products" className="text-primary hover:underline underline-offset-2 text-sm">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id.toString()}
                href={`/orders/${order._id.toString()}`}
                className="block bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">
                      Order #{order._id.toString().slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">
                      ₹{order.total.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {statusLabel[order.status] ?? order.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
