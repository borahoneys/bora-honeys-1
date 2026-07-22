"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface CartProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
  stock: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface AddItemResult {
  ok: boolean;
  unauthorized?: boolean;
  error?: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  addItem: (productId: string, quantity?: number) => Promise<AddItemResult>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") {
      setItems([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items ?? []);
      }
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    let cancelled = false;
    if (status !== "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting cart when auth status changes
      setItems([]);
      return;
    }
    setIsLoading(true);
    fetch("/api/cart")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setItems(data.items ?? []);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status]);

  const addItem = useCallback(async (productId: string, quantity = 1): Promise<AddItemResult> => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (res.status === 401) return { ok: false, unauthorized: true };
    const data = await res.json();
    if (res.ok) {
      setItems(data.items ?? []);
      return { ok: true };
    }
    return { ok: false, error: data.error ?? "Unable to add item to your bag." };
  }, []);

  const updateItem = useCallback(async (productId: string, quantity: number) => {
    const res = await fetch(`/api/cart/items/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items ?? []);
    }
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    const res = await fetch(`/api/cart/items/${productId}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items ?? []);
    }
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, subtotal, isLoading, addItem, updateItem, removeItem, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
