"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { loadRazorpayScript } from "@/lib/loadRazorpayScript";

interface AddressInfo {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CheckoutFormProps {
  userEmail: string;
  defaultAddress?: AddressInfo;
}

export default function CheckoutForm({ userEmail, defaultAddress }: CheckoutFormProps) {
  const { items, subtotal, isLoading, refresh } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveAddress, setSaveAddress] = useState(!defaultAddress);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const shippingAddress: AddressInfo = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      line1: String(formData.get("line1") ?? ""),
      line2: String(formData.get("line2") ?? "") || undefined,
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      country: String(formData.get("country") ?? "IN"),
    };

    try {
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress, saveAddress }),
      });
      const createData = await createRes.json();

      if (!createRes.ok) {
        setError(createData.error ?? "Unable to start checkout. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (!createData.keyId) {
        setError("Online payments are not configured yet. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        setError("Unable to load the payment gateway. Please check your connection and try again.");
        setIsSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: createData.keyId,
        amount: createData.amount,
        currency: createData.currency,
        name: "Bora Honeys",
        description: "Order Payment",
        order_id: createData.razorpayOrderId,
        prefill: {
          name: shippingAddress.fullName,
          email: userEmail,
          contact: shippingAddress.phone,
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: createData.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            await refresh();
            router.push(`/orders/${verifyData.orderId}`);
          } else {
            setError(
              verifyData.error ??
                "We couldn't confirm your payment. If the amount was deducted, please contact support."
            );
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });

      razorpay.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your bag…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-muted-foreground text-sm">Your bag is empty.</p>
        <Button asChild className="rounded-none">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-sm font-light tracking-widest uppercase text-foreground mb-4">
          Shipping Address
        </h2>

        <div>
          <label htmlFor="fullName" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            defaultValue={defaultAddress?.fullName}
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={defaultAddress?.phone}
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="line1" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
            Address Line 1
          </label>
          <input
            id="line1"
            name="line1"
            required
            defaultValue={defaultAddress?.line1}
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="line2" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
            Address Line 2 (optional)
          </label>
          <input
            id="line2"
            name="line2"
            defaultValue={defaultAddress?.line2}
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              City
            </label>
            <input
              id="city"
              name="city"
              required
              defaultValue={defaultAddress?.city}
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              State
            </label>
            <input
              id="state"
              name="state"
              required
              defaultValue={defaultAddress?.state}
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="postalCode" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              required
              defaultValue={defaultAddress?.postalCode}
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">
              Country
            </label>
            <input
              id="country"
              name="country"
              required
              defaultValue={defaultAddress?.country ?? "IN"}
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="h-4 w-4"
          />
          Save this address to my account
        </label>

        {error && (
          <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-none disabled:opacity-50"
        >
          {isSubmitting ? "Processing…" : `Pay ₹${subtotal.toLocaleString("en-IN")}`}
        </Button>
      </form>

      <div>
        <h2 className="text-sm font-light tracking-widest uppercase text-foreground mb-4">
          Order Summary
        </h2>
        <div className="space-y-4 border-b border-border pb-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex gap-4">
              <div className="w-16 h-16 bg-muted/10 rounded overflow-hidden shrink-0">
                <img
                  src={item.product.images?.[0]?.url ?? "/placeholder-image.png"}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex justify-between">
                <div>
                  <p className="text-sm text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="text-sm text-foreground">
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm font-light text-foreground">Subtotal</span>
          <span className="text-sm font-medium text-foreground">
            ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Shipping and taxes calculated at checkout
        </p>
      </div>
    </div>
  );
}
