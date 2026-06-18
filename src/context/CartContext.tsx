"use client";

import { createContext, useEffect, useContext, useState } from "react";
import { type CartItem } from "@/types/shop/types";
import { TRIPS } from "@/lib/content";

type CartContextType = {
  cart: CartItem[];
  itemsCount: number;
  totalPrice: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export default function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("gh-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Errore nel recupero del carrello", e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("gh-cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (id: string) => {
    const originalTrip = TRIPS.find((t) => t.id === id);
    if (!originalTrip) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.trip.id === id);

      if (existingItem) {
        if (existingItem.passengers >= originalTrip.seats) return prev;

        return prev.map((item) =>
          item.trip.id === id
            ? { ...item, passengers: item.passengers + 1 }
            : item,
        );
      }

      return [...prev, { trip: originalTrip, passengers: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.trip.id === id);

      if (!existingItem) return prev;

      if (existingItem.passengers <= 1) {
        return prev.filter((item) => item.trip.id !== id);
      }

      return prev.map((item) =>
        item.trip.id === id
          ? { ...item, passengers: item.passengers - 1 }
          : item,
      );
    });
  };

  const clearCart = () => setCart([]);

  const itemsCount = cart.reduce((total, item) => total + item.passengers, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.trip.price * item.passengers,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemsCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve essere usato dentro un CartProvider");
  return context;
}
