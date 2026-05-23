"use client";

/**
 * SpaceShop — Galactic Horizons
 *
 * Design system (CSS vars dark mode):
 *   --bg:          #020817
 *   --card-bg:     rgba(15,31,61,0.6)
 *   --card-border: rgba(34,211,238,0.2)
 *   --txt:         #e8eeff
 *   --txt2:        #a8b8e8
 *   --txt3:        #6878a8
 *   --accent:      #22d3ee   (cyan)
 *   --accent2:     #e879f9   (magenta)
 *   --accent3:     #84cc16   (lime)
 *   --border2:     rgba(34,211,238,0.35)
 *   --pill-bg:     rgba(34,211,238,0.12)
 * 
 * light mode design system:
 *     --bg: #f8f9fb;
      --bg2: #eef0f5;
      --bg3: #e4e8f0;
      --surface: #ffffff;
      --surface2: rgba(255, 255, 255, 0.8);
      --txt: #0d1526;
      --txt2: #3a4a6b;
      --txt3: #6b7a99;
      --accent: #1e3a8a;
      --accent2: #3b5fcf;
      --accent3: #7c93c8;
      --neon1: #1e3a8a;
      --neon2: #3b5fcf;
      --neon3: #6b7a99;
      --border: rgba(30, 58, 138, 0.12);
      --border2: rgba(30, 58, 138, 0.22);
      --card-bg: #ffffff;
      --card-border: rgba(59, 95, 207, 0.15);
      --pill-bg: rgba(30, 58, 138, 0.08);
 */

import { useState } from "react";
import CartDrawer from "@/components/shop/CartDrawer";
import TripCard from "@/components/shop/TripCard";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, ChevronRight, Rocket, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Trip, type CartItem, type Zone } from "@/types/shop/types";
import { useSession } from "next-auth/react";
import {TRIPS} from "@/lib/content"

const FILTERS: { label: string; value: Zone }[] = [
  { label: "All Routes", value: "all" },
  { label: "Inner System", value: "inner" },
  { label: "Outer Planets", value: "outer" },
  { label: "Deep Space", value: "deep" },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);


// ── LAYOUT ───────────────────────────────────────────────────────────────────
// Usa la variabile globale del background e del testo principale
const S_PAGE = cn(
  "min-h-dvh pb-19! sm:pb-6! pt-5! px-5! sm:px-8!",
  "bg-[var(--bg)] text-[var(--txt)] transition-colors duration-200"
);
const S_INNER = cn("max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16");

// ── HEADER ───────────────────────────────────────────────────────────────────
const S_LABEL = cn(
  "block text-[0.7rem] tracking-[0.3em] uppercase mb-3",
  "text-[var(--accent)]"
);
const S_NAME=cn("text-[#e6c000] animate-pulse ");
const S_TITLE = cn(
  "text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] font-bold mb-4",
  "text-[var(--txt)]"
);
const S_TITLE_EM = cn(
  "italic font-serif font-light",
  "text-[var(--accent2)]"
);
const S_SUB = cn(
  "text-[1.05rem] font-light max-w-[540px] leading-[1.7]",
  "text-[var(--txt2)]"
);

// ── FILTRI ───────────────────────────────────────────────────────────────────
const S_FILTER_WRAP = cn(
  "flex flex-col-reverse gap-2 overflow-x-auto pb-1 scrollbar-none mb-10",
  "border-b border-[var(--border)]"
);
const S_TAB_BASE = cn(
  "shrink-0 px-5 py-2 rounded-full text-[0.72rem] tracking-[0.12em] uppercase font-semibold",
  "border transition-all duration-200 cursor-pointer"
);
const S_TAB_ON = cn(
  S_TAB_BASE,
  "p-1! bg-[var(--pill-bg)]! text-[var(--accent)]! border-[var(--card-border)]!"
);
const S_TAB_OFF = cn(
  S_TAB_BASE,
  "p-1! bg-transparent text-[var(--txt3)]! border-[var(--border)]!",
  "hover:text-[var(--txt2)]! hover:border-[var(--border2)]!"
);

// ── CARDS GRID ───────────────────────────────────────────────────────────────
const S_GRID = cn(
  "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-40! sm:pb-20!"
);

// ── CART BAR ─────────────────────────────────────────────────────────────────
const S_CART_BAR = cn(
  "fixed bottom-0 left-0 right-0 z-50",
  "bg-[#6b7a99] dark:bg-[rgba(2,8,23,0.95)]",
  "backdrop-blur-xl",
  "border-t border-[var(--card-border)]",
  "pb-5! pt-2! px-4! sm:px-5! sm:px-10!  sm:py-4! ",
  "text-[var(--txt)]"
);
export default function SpaceShop() {

  const [filter, setFilter] = useState<Zone>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: session, status } = useSession();
  const name = session?.user.name
    ? session.user.name
    : "Cosmonaut";

 
  // ── Logica carrello ────────────────────────────────────────────────────────

  const addToCart = (trip: Trip) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.trip.id === trip.id);
      if (existing) {
        return prev.map((i) =>
          i.trip.id === trip.id ? { ...i, passengers: i.passengers + 1 } : i,
        );
      }
      return [...prev, { trip, passengers: 1 }];
    });
  };

  const removeFromCart = (tripId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.trip.id === tripId);
      if (!existing) return prev;
      if (existing.passengers === 1)
        return prev.filter((i) => i.trip.id !== tripId);
      return prev.map((i) =>
        i.trip.id === tripId ? { ...i, passengers: i.passengers - 1 } : i,
      );
    });
  };

  const clearCart = () => setCart([]);

  const getQty = (tripId: string) =>
    cart.find((i) => i.trip.id === tripId)?.passengers ?? 0;

  const totalItems = cart.reduce((s, i) => s + i.passengers, 0);
  const totalPrice = cart.reduce((s, i) => s + i.trip.price * i.passengers, 0);

  const visible =
    filter === "all" ? TRIPS : TRIPS.filter((t) => t.zone === filter);

  return (
    <main className={S_PAGE}>
      <header >
        <div className={cn(S_INNER, "flex flex-col gap-2 pt-16 pb-10")}>
          <span className={S_LABEL}>Destinations</span>
          <h2 className={cn("text-2xl md:text-3xl")}> Welcome <span className={S_NAME}>{name}</span>, </h2>
          <h1 className={S_TITLE}>
          Choose Your <em className={S_TITLE_EM}>Mission</em>
          </h1>
          <p className={cn(S_SUB, "mb-10")}>
            Every vessel is safety-certified, every route is meticulously
            planned. Select a destination, add passengers, and begin your
            journey beyond Earth.
          </p>

          <div className={S_FILTER_WRAP}>
            <ul className={cn("flex gap-4 flex-wrap")}>
              {FILTERS.map((f) => (
                <li key={f.value} className={cn("shrink-0")}>
                  <Button
                    type="button"
                    onClick={() => setFilter(f.value)}
                    className={filter === f.value ? S_TAB_ON : S_TAB_OFF}
                  >
                    {f.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "ml-auto shrink-0 flex  items-center gap-4 text-[0.72rem] text-[#6878a8]",
              )}
            >
              <span className={cn("flex items-center gap-1.5")}>
                <Star size={11} className={cn("text-[#fbbf24]")} />
                <span>4.98 avg rating</span>
              </span>
              <span className={cn("flex items-center gap-1.5")}>
                <Rocket size={11} className={cn("text-[#22d3ee]")} />
                <span>2,418 missions flown</span>
              </span>
            </div>
          </div>
        </div>
      </header>
<section>
  <div className={S_GRID}>
    <AnimatePresence mode="popLayout">
      {visible.map((trip) => (
     
          <TripCard
            key={trip.id}
            trip={trip}
            qty={getQty(trip.id)}
            onAdd={() => addToCart(trip)}
            onRemove={() => removeFromCart(trip.id)}
          />
        
      ))}
    </AnimatePresence>
  </div>
</section>

      <footer>
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={S_CART_BAR}
            >
              <div
                className={cn(
                  "max-w-[1280px] mx-auto flex items-center justify-between gap-6",
                )}
              >
                <div className={cn("flex items-center gap-4")}>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "bg-[rgba(34,211,238,0.12)] border border-[rgba(34,211,238,0.35)]",
                      "text-[#22d3ee] relative cursor-pointer",
                    )}
                    onClick={() => setDrawerOpen(true)}
                  >
                    <ShoppingCart size={16} />
                    <span
                      className={cn(
                        "absolute -top-1.5 -right-1.5",
                        "w-5 h-5 rounded-full flex items-center justify-center",
                        "bg-[#22d3ee] text-[#020817] text-[0.6rem] font-bold",
                      )}
                    >
                      {totalItems}
                    </span>
                  </div>

                  <div>
                    <p
                      className={cn(
                        "text-[0.68rem] tracking-[0.18em] uppercase text-[#a8b8e8] dark:text-[#6878a8]",
                      )}
                    >
                      Selected missions
                    </p>
                    <div
                      className={cn("flex flex-col sm:flex-row gap-2 text-[0.95rem] font-bold text-[#e8eeff]")}
                    >
                      <p>
                        {`${cart.length} ${cart.length === 1 ? "route" : "routes"}`}
                          
                      </p>

                      <p>
                        {`${totalItems} ${totalItems === 1 ? "passenger" : "passengers"}`}
                        
                      </p>
                    </div>
                  </div>
                </div>

                <div className={cn("flex flex-col sm:flex-row items-center gap-4 shrink-0")}>
                  <div className={cn("text-right  hidden block ")}>
                    <p
                      className={cn(
                        "text-[0.68rem] tracking-[0.18em] uppercase text-[#a8b8e8] dark:text-[#6878a8]",
                      )}
                    >
                      Total cost
                    </p>
                    <p
                      className={cn(
                        "text-[1.3rem] font-bold text-[#e8eeff] leading-none",
                      )}
                    >
                      {fmt(totalPrice)}
                    </p>
                  </div>

                  <Button
                    onClick={() => setDrawerOpen(true)}
                    className={cn(
                      "flex justify-center items-center gap-1",
                      "px-2! py-3 rounded-full",
                      "bg-[#22d3ee]! text-[#020817]!",
                      "font-bold text-[0.85rem] tracking-[0.06em] uppercase",
                      "hover:bg-[#67e8f9]! transition-all duration-200",
                      "cursor-pointer",
                    )}
                  >
                    Review Mission
                    <ChevronRight size={15} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {drawerOpen && (
            <CartDrawer
              items={cart}
              onClose={() => setDrawerOpen(false)}
              onAdd={(id) => {
                const t = TRIPS.find((t) => t.id === id);
                if (t) addToCart(t);
              }}
              onRemove={removeFromCart}
              onClear={() => {
                clearCart();
                setDrawerOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </footer>
    </main>
  );
}
