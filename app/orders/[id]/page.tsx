import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { verifyCustomerSession } from "@/app/lib/dal";
import { connectDB } from "@/lib/db/mongoose";
import Order from "@/lib/models/Order";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusLabel: Record<string, string> = {
  pending: "Payment Pending",
  paid: "Confirmed",
  failed: "Payment Failed",
  cancelled: "Cancelled",
};

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  const session = await verifyCustomerSession(`/orders/${id}`);

  await connectDB();
  const order = await Order.findOne({ _id: id, user: session.user!.id }).lean();

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-10">
          {order.status === "paid" ? (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-light tracking-widest uppercase text-foreground">
                Thank You For Your Order
              </h1>
            </>
          ) : (
            <h1 className="text-2xl font-light tracking-widest uppercase text-foreground">
              {statusLabel[order.status] ?? order.status}
            </h1>
          )}
          <p className="text-xs text-muted-foreground mt-2">Order #{order._id.toString().slice(-8).toUpperCase()}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-muted/10 rounded overflow-hidden shrink-0">
                  <img
                    src={item.image ?? "/placeholder-image.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex justify-between">
                  <div>
                    <p className="text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm text-foreground">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 flex justify-between">
            <span className="text-sm font-light text-foreground">Total</span>
            <span className="text-sm font-medium text-foreground">
              ₹{order.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Shipping To
            </h2>
            <p className="text-sm text-foreground">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button asChild variant="outline" className="rounded-none">
            <Link href="/account">View All Orders</Link>
          </Button>
          <Button asChild className="rounded-none">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
