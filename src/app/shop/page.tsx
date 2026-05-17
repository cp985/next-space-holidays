// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// const  container=cn("min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12 font-sans selection:bg-cyan-500 selection:text-black")
// const   headerTitle=cn("text-3xl md:text-5xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600")

// const   headerDesc = cn("text-slate-400 text-sm md:text-base mt-2 max-w-xl font-light tracking-wide")
// const   filterContainer= cn( "flex gap-3 overflow-x-auto pb-4 my-8 border-b border-slate-800/60 scrollbar-none")
// const   filterTabActive= cn("bg-cyan-950/40 text-cyan-400 border border-cyan-500/50 px-4 py-2 rounded-md text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300")
// const   filterTabInactive= cn("bg-slate-900/40 text-slate-400 border border-slate-800/80 px-4 py-2 rounded-md text-xs font-mono uppercase tracking-widest hover:text-slate-200 hover:border-slate-700 transition-all duration-300")
// const   grid=cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6")

// const   card=cn("group relative bg-slate-900/30 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 flex flex-col justify-between")
// const   cardImageWrapper=cn("relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800/50")

//  const  cardImage =cn( "w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out")
//  const  cardBadge =cn( "absolute top-3 right-3 bg-slate-950/80 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider")

//   const cardBody=cn( "p-5 flex-1 flex flex-col justify-between")
//   const cardTitle=cn( "text-xl font-bold tracking-wide text-slate-100 group-hover:text-cyan-400 transition-colors duration-300")
//  const  cardStats=cn( "grid grid-cols-2 gap-2 my-4 p-3 bg-slate-950/40 rounded-lg border border-slate-900 text-[11px] font-mono text-slate-400")

//  const  cardFooter=cn( "mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between")
//  const  cardPrice=cn( "text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300")

//  const  buyButton=cn( "px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider hover:from-blue-500 hover:to-cyan-500 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)]")

// export default function SpaceShop() {
//   const spaceTrips = [
//     { id: "1", name: "Neo-Tokyo Orbit", zone: "Orbita", price: "4,200 α", duration: "3 Earth Days", danger: "LOW" },
//     { id: "2", name: "Titan Ice Canyons", zone: "Deep Space", price: "24,500 α", duration: "1.2 Years", danger: "MEDIUM" },
//   ];

//   return (
//     <div className={container}>
//       <header>
//         <h1 className={headerTitle}>Galaxy Horizon</h1>
//         <p className={headerDesc}>
//           Seleziona la tua prossima destinazione interstellare. Tutti i vettori di lancio sono certificati per salti quantici.
//         </p>
//       </header>

//       <div className={filterContainer}>
//         <Button type="button" className={filterTabActive}>Tutte le rotte</Button>
//         <Button type="button" className={filterTabInactive}>Sistema Interno</Button>
//         <Button type="button" className={filterTabInactive}>Spazio Profondo</Button>
//       </div>

//       <main className={grid}>
//         {spaceTrips.map((trip) => (
//           <div key={trip.id} className={card}>
//             <div className={cardImageWrapper}>
//               <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center text-slate-700 font-mono text-xs">
//                 [ RENDER SPAZIALE O PIXEL ART ]
//               </div>
//               <span className={cardBadge}>{trip.zone}</span>
//             </div>

//             <div className={cardBody}>
//               <div>
//                 <h3 className={cardTitle}>{trip.name}</h3>

//                 <div className={cardStats}>
//                   <div>DURATA: {trip.duration}</div>
//                   <div>PERICOLO: <span className={trip.danger === 'LOW' ? 'text-green-400' : 'text-amber-400'}>{trip.danger}</span></div>
//                 </div>
//               </div>

//               <div className={cardFooter}>
//                 <div>
//                   <span className="text-[10px] text-slate-500 block font-mono">TARIFFA</span>
//                   <span className={cardPrice}>{trip.price}</span>
//                 </div>
//                 <Button type="button" className={buyButton}>
//                   Prenota
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }

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
 */

import { useState } from "react";
import CartDrawer from "@/components/shop/CartDrawer";
import TripCard from "@/components/shop/TripCard";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, ChevronRight, Rocket, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Trip, type CartItem, type Zone } from "@/types/shop/types";

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

// ─── Costanti di stile ────────────────────────────────────────────────────────

// Layout
const S_PAGE = cn("min-h-screen bg-[#020817] pb-17! sm:pb-6! pt-5! px-5!");
const S_INNER = cn("max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16");

// Header
const S_LABEL = cn(
  "block text-[0.7rem] tracking-[0.3em] uppercase text-[#22d3ee] mb-3",
);
const S_TITLE = cn(
  "text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] text-[#e8eeff] font-bold mb-4",
);
const S_TITLE_EM = cn("italic font-serif font-light text-[#e879f9]");
const S_SUB = cn(
  "text-[1.05rem] text-[#6878a8] font-light max-w-[540px] leading-[1.7]",
);

// Filtri
const S_FILTER_WRAP = cn(
  "flex flex-col-reverse gap-2 overflow-x-auto pb-1 scrollbar-none",
  "border-b border-[rgba(34,211,238,0.1)]",
  "mb-10",
);
const S_TAB_BASE = cn(
  "shrink-0 px-5 py-2 rounded-full text-[0.72rem] tracking-[0.12em] uppercase font-semibold",
  "border transition-all duration-200 cursor-pointer",
);
const S_TAB_ON = cn(
  S_TAB_BASE,
  "p-1! bg-[rgba(34,211,238,0.12)]! text-[#22d3ee]! border-[rgba(34,211,238,0.4)]!",
);
const S_TAB_OFF = cn(
  S_TAB_BASE,
  "p-1! bg-transparent text-[#6878a8]! border-[rgba(34,211,238,0.12)]!",
  "hover:text-[#a8b8e8]! hover:border-[rgba(34,211,238,0.25)]!",
);

// Cards
const S_GRID = cn(
  "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-6! ",
);

// Cart bar
const S_CART_BAR = cn(
  "fixed bottom-0 left-0 right-0 z-50",
  "bg-[rgba(2,8,23,0.95)] backdrop-blur-xl",
  "border-t border-[rgba(34,211,238,0.2)]",
  "px-6 md:px-12 py-4",
);

export default function SpaceShop() {
  const [filter, setFilter] = useState<Zone>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <motion.div layout className={S_GRID}>
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
        </motion.div>
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
                        "text-[0.68rem] tracking-[0.18em] uppercase text-[#6878a8]",
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
                        "text-[0.68rem] tracking-[0.18em] uppercase text-[#6878a8]",
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
