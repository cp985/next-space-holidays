"use client";

import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext"; // Assicurati che il percorso sia corretto
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, CreditCard, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// ── COSTANTI STILI SCI-FI CHK ───────────────────────────────────────────────
const S_PAGE_WRAPPER = cn("container max-w-6xl mx-auto px-4 py-8 md:py-16 flex-1 flex flex-col justify-center");
const S_GRID         = cn("grid grid-cols-1 lg:grid-cols-12 gap-8 items-start");
const S_PANEL        = cn("rounded-[24px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl p-6 md:p-8");
const S_TITLE        = cn("text-2xl md:text-3xl font-black text-[var(--txt)] tracking-tight mb-2");
const S_SUBTITLE     = cn("text-[0.85rem] text-[var(--txt3)] tracking-wider uppercase mb-8");
const S_INPUT_GROUP  = cn("flex flex-col gap-1.5 mb-4");
const S_LABEL        = cn("text-[0.72rem] font-bold tracking-widest uppercase text-[var(--txt2)]");
const S_INPUT        = cn("bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--txt)] placeholder:text-[var(--txt3)] focus:outline-none focus:border-[var(--border2)] transition-colors");

export default function CheckoutPage() {
  const { cart, totalPrice, addToCart, removeFromCart, clearCart } = useCart();

  // Stato di emergenza: Carrello Vuoto
  if (cart.length === 0) {
    return (
      <div className={cn(S_PAGE_WRAPPER, "items-center text-center py-24")}>
        <div className="w-16 h-16 bg-muted/10 border border-[var(--border)] rounded-full flex items-center justify-center mb-6 text-[var(--txt3)]">
          <Rocket className="rotate-45" size={24} />
        </div>
        <h2 className="text-xl font-bold mb-2">Your manifest is empty</h2>
        <p className="text-sm text-[var(--txt2)] max-w-sm mb-6">No space expeditions selected. Head back to the launchpad to book your seat.</p>
        <Link href="/shop">
          <Button className="rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--accent)] hover:bg-[var(--border)] cursor-pointer">
            <ArrowLeft size={14} className="mr-2" /> Back to Fleet Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={S_PAGE_WRAPPER}>
      {/* Intestazione */}
      <div className="mb-8">
        <Link href="/shop" className="text-xs tracking-widest uppercase text-[var(--txt3)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 mb-4 transition-colors">
          <ArrowLeft size={12} /> Abort Launch & Return
        </Link>
        <h1 className={S_TITLE}>Secure Checkout</h1>
        <p className="text-sm text-[var(--txt2)]">Complete your clearance forms and biological telemetry to finalize the ticket allocation.</p>
      </div>

      <div className={S_GRID}>
        {/* ── MANIFESTO DI SINISTRA: FORM PASSEGGERI E PAGAMENTO (7 Colonne) ── */}
        <div className={cn(S_PANEL, "lg:col-span-7 space-y-6")}>
          <div>
            <h2 className="text-lg font-bold text-[var(--txt)] flex items-center gap-2 mb-1">
              <Rocket size={18} className="text-[var(--accent)]" /> 1. Commander Information
            </h2>
            <p className="text-xs text-[var(--txt3)]">Enter the primary coordinator data for the orbital jump.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={S_INPUT_GROUP}>
              <label className={S_LABEL}>First Name</label>
              <input type="text" placeholder="Neil" className={S_INPUT} />
            </div>
            <div className={S_INPUT_GROUP}>
              <label className={S_LABEL}>Last Name</label>
              <input type="text" placeholder="Armstrong" className={S_INPUT} />
            </div>
          </div>

          <div className={S_INPUT_GROUP}>
            <label className={S_LABEL}>Spaceflight Clearance Email</label>
            <input type="email" placeholder="commander@galactic.horizon" className={S_INPUT} />
          </div>

          <hr className="border-[var(--border)] my-6" />

          {/* Sezione Pagamento Finta */}
          <div>
            <h2 className="text-lg font-bold text-[var(--txt)] flex items-center gap-2 mb-1">
              <CreditCard size={18} className="text-[var(--accent)]" /> 2. Quantum Encryption Payment
            </h2>
            <p className="text-xs text-[var(--txt3)]">All transactions are fully safe-vaulted through terminal networks.</p>
          </div>

          <div className={S_INPUT_GROUP}>
            <label className={S_LABEL}>Credit Token Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" className={S_INPUT} />
          </div>

          <Button className="w-full py-6 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-bold tracking-widest uppercase hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] cursor-pointer mt-4">
            Authorize Mission Launch ({fmt(totalPrice)})
          </Button>
        </div>

        {/* ── RIEPILOGO DI DESTRA: DETTAGLI VIAGGI (5 Colonne) ──────────────── */}
        <div className={cn(S_PANEL, "lg:col-span-5 flex flex-col gap-4")}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm tracking-wider uppercase text-[var(--txt2)]">Mission Manifest</h3>
            <button onClick={clearCart} className="text-xs text-red-400/70 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer">
              <Trash2 size={12} /> Clear all
            </button>
          </div>

          {/* Lista dei Viaggi scelti */}
          <div className="divide-y divide-[var(--border)] max-h-[320px] overflow-y-auto pr-1">
            {cart.map(({ trip, passengers}) => (
              <div key={trip.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[var(--border)] shrink-0">
                    <Image src={trip.visual} alt={trip.name} fill    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--txt)] leading-tight">{trip.name}</h4>
                    <p className="text-[0.7rem] text-[var(--txt3)] uppercase tracking-wider mt-0.5">{trip.destination} · {passengers} ticket{passengers > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--txt)]">{fmt(trip.price * passengers)}</p>
                  <p className="text-[0.62rem] text-[var(--txt3)]">{fmt(trip.price)} each</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-4 mt-2 space-y-2">
            <div className="flex justify-between text-xs text-[var(--txt2)]">
              <span>Subtotal Manifest</span>
              <span>{fmt(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--txt2)]">
              <span>Orbital Fuel Tax</span>
              <span className="text-emerald-400 uppercase tracking-widest font-bold text-[0.65rem]">Included</span>
            </div>
            <div className="flex justify-between items-end pt-2 border-t border-dashed border-[var(--border)]">
              <span className="text-sm font-bold">Total Credits</span>
              <span className="text-xl font-black text-[var(--txt)] tracking-tight">{fmt(totalPrice)}</span>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 flex gap-2.5 items-start mt-2">
            <ShieldCheck size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[0.68rem] text-[var(--txt2)] leading-normal">
              Tickets are subject to Interstellar Protection Protocols. Full refund available if cosmic conditions force launch cancellation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}