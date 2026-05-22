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

const TRIPS: Trip[] = [
  {
    id: "lunar-alpha",
    name: "Lunar Base Alpha",
    destination: "Moon",
    zone: "inner",
    duration: "3 days",
    departure: "Jun 2027",
    seats: 12,
    risk: "LOW",
    price: 1_200,
    description:
      "The classic gateway mission. Land on Mare Tranquillitatis and spend two nights in our pressurised habitat.",
    highlights: ["Moonwalk EVA", "Earth-rise viewing", "Crater rover tour"],
    visual: "from-slate-700 via-slate-500 to-slate-800",
    accent: "#a8b8e8",
  },
  {
    id: "mars-red",
    name: "Red Planet Odyssey",
    destination: "Mars",
    zone: "inner",
    duration: "89 days",
    departure: "Mar 2027",
    seats: 6,
    risk: "MEDIUM",
    price: 4_200,
    description:
      "Traverse Valles Marineris, summit Olympus Mons base camp and witness the alien beauty of the Martian sunset.",
    highlights: [
      "Olympus Mons base",
      "Valles Marineris trek",
      "Polar ice cap fly-over",
    ],
    visual: "from-red-900 via-red-700 to-orange-950",
    accent: "#f97316",
  },
  {
    id: "venus-flyby",
    name: "Venus Cloud Dive",
    destination: "Venus",
    zone: "inner",
    duration: "45 days",
    departure: "Sep 2027",
    seats: 8,
    risk: "HIGH",
    price: 8_500,
    description:
      "Skim through the sulfuric cloud deck of Venus aboard our reinforced atmospheric skimmer. Breathtaking and extreme.",
    highlights: [
      "Cloud-deck entry",
      "Atmospheric balloon ride",
      "Acid-rain photography",
    ],
    visual: "from-yellow-800 via-amber-600 to-orange-900",
    accent: "#fbbf24",
  },
  {
    id: "jupiter-orbit",
    name: "Jupiter Grand Tour",
    destination: "Jupiter",
    zone: "outer",
    duration: "2.1 years",
    departure: "Jan 2028",
    seats: 4,
    risk: "MEDIUM",
    price: 24_500,
    description:
      "Orbit the gas giant for three months. Watch the Great Red Spot from above the clouds and visit the Galilean moons.",
    highlights: [
      "Great Red Spot view",
      "Europa close flyby",
      "Io volcanic fields",
    ],
    visual: "from-amber-900 via-orange-700 to-yellow-900",
    accent: "#f59e0b",
  },
  {
    id: "europa-dive",
    name: "Europa Ocean Probe",
    destination: "Europa",
    zone: "outer",
    duration: "2.3 years",
    departure: "Apr 2028",
    seats: 3,
    risk: "HIGH",
    price: 29_000,
    description:
      "Witness the deployment of our subsurface ocean drone beneath Europa's ice shell. The most anticipated mission of the decade.",
    highlights: [
      "Ice-shell landing",
      "Ocean probe deployment",
      "Potential biosignature search",
    ],
    visual: "from-blue-900 via-cyan-800 to-blue-950",
    accent: "#22d3ee",
  },
  {
    id: "saturn-rings",
    name: "Saturn Ring Drifter",
    destination: "Saturn",
    zone: "outer",
    duration: "3.4 years",
    departure: "Jul 2028",
    seats: 4,
    risk: "MEDIUM",
    price: 38_000,
    description:
      "Drift through the Cassini Division aboard our ring-skipper vessel and overnight in the orbital luxury station above Titan.",
    highlights: [
      "Cassini Division transit",
      "Ring-ice sampling",
      "Titan colony tour",
    ],
    visual: "from-yellow-700 via-amber-500 to-yellow-900",
    accent: "#e879f9",
  },
  {
    id: "titan-colony",
    name: "Titan Colony Expedition",
    destination: "Titan",
    zone: "outer",
    duration: "3.8 years",
    departure: "Nov 2028",
    seats: 6,
    risk: "HIGH",
    price: 41_000,
    description:
      "Live for four months in Titan Colony — humanity's furthest permanent settlement. Kayak on methane lakes under a hazy orange sky.",
    highlights: [
      "Methane lake kayaking",
      "Cryovolcano trek",
      "Colony life immersion",
    ],
    visual: "from-orange-900 via-amber-700 to-orange-950",
    accent: "#84cc16",
  },
  {
    id: "neptune-deep",
    name: "Neptune Deep Passage",
    destination: "Neptune",
    zone: "deep",
    duration: "11 years",
    departure: "2026 TBD",
    seats: 2,
    risk: "EXTREME",
    price: 98_000,
    description:
      "The ultimate frontier. A round-trip to Neptune and Triton for those who define adventure in decades, not days. Strictly limited.",
    highlights: [
      "Triton geyser fields",
      "Dark spot observation",
      "Kuiper Belt preview",
    ],
    visual: "from-blue-950 via-indigo-800 to-blue-900",
    accent: "#e879f9",
  },
];

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
  "min-h-dvh pb-17! sm:pb-6! pt-5! px-5!",
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
  "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-13!"
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
