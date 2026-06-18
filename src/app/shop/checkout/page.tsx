"use client";

import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext"; // Assicurati che il percorso sia corretto
import { Button } from "@/components/ui/button";
import {
  Rocket,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import {
  type FormStateCheckout,
  actionFormCheckout,
} from "../../../../action/actionForm";
import { useRouter } from "next/navigation";
import DialogSuccessOrder from "@/components/shop/DialogSuccessOrder";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// ── COSTANTI STILI SCI-FI CHK ───────────────────────────────────────────────
const S_PAGE_WRAPPER = cn(
  "container max-w-6xl mx-auto! px-5! pt-5! pb-[70px]!  flex-1 flex flex-col  justify-center",
);
const S_GRID = cn("grid grid-cols-1 lg:grid-cols-12 gap-8! items-start");
const S_PANEL = cn(
  "rounded-[24px] border border-[var(--card-border)]! bg-[var(--card-bg)]! backdrop-blur-xl! p-6! md:p-8!",
);
const S_TITLE = cn(
  "text-2xl md:text-3xl font-black text-[var(--txt)] tracking-tight mb-2!",
);
const S_SUBTITLE = cn(
  "text-[0.85rem] text-[var(--txt3)] tracking-wider uppercase mb-8!",
);
const S_INPUT_GROUP = cn("flex flex-col gap-1.5! mb-4!");
const S_LABEL = cn(
  "text-[0.72rem] font-bold tracking-widest uppercase text-[var(--txt2)]",
);
const S_INPUT = cn(
  "bg-[var(--surface)]! border border-[var(--border)] rounded-xl px-4! py-3! text-sm text-[var(--txt)] placeholder:text-[var(--txt3)] focus:outline-none focus:ring-0 focus:border-[var(--border2)] transition-colors",
);
const S_ERROR = cn("text-red-500 text-xs mt-1");

const initialStateCheckout: FormStateCheckout = {
  success: false,
  errors: {},
  currentData: { email: "", firstName: "", lastName: "", cc: "" },
};
export default function CheckoutPage() {
  const { cart, totalPrice, addToCart, removeFromCart, clearCart, itemsCount } =
    useCart();
  const [data, action, isPending] = useActionState(
    actionFormCheckout.bind(null, cart, itemsCount, totalPrice),
    initialStateCheckout,
  );
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    if (data.success) {
      setDialogOpen(true);
      const timer = setTimeout(() => router.push("/shop/orders"), 3000);
      clearCart();
      return () => clearTimeout(timer);
    }
  }, [data.success, router]);

  if (cart.length === 0 && !data.success) {
    return (
      <main className={cn(S_PAGE_WRAPPER, "items-center text-center ")}>
        <header className="w-16 h-16 bg-muted/10! border border-[var(--border)]! rounded-full flex items-center justify-center mb-6! text-[var(--txt3)]!">
          <Rocket className="rotate-45!" size={24} />
        </header>
        <h2 className="text-xl! font-bold! mb-2!">Your manifest is empty</h2>
        <p className="text-sm text-[var(--txt2)]! max-w-sm mb-6!">
          No space expeditions selected. Head back to the launchpad to book your
          seat.
        </p>
        <Link href="/shop">
          <Button className="rounded-full bg-(--pill-bg)! border border-[var(--card-border)] text-[var(--accent)] hover:bg-[var(--border)] cursor-pointer">
            <ArrowLeft size={14} className="mr-2!" /> Back to Fleet Shop
          </Button>
        </Link>
      </main>
    );
  }
  return (
    <main className={S_PAGE_WRAPPER}>
      <DialogSuccessOrder isOpen={dialogOpen} onOpenChange={setDialogOpen} />
      <header className="mb-8!">
        <Link
          href="/shop"
          className="text-xs! tracking-widest uppercase text-[var(--txt3)] hover:text-[var(--accent)] inline-flex items-center gap-1.5! mb-4! transition-colors!"
        >
          <ArrowLeft size={12} /> Abort Launch & Return
        </Link>
        <h1 className={S_TITLE}>Secure Checkout</h1>
        <p className="text-sm text-[var(--txt2)]">
          Complete your clearance forms and biological telemetry to finalize the
          ticket allocation.
        </p>
      </header>

      <div className={S_GRID}>
        {/* ── MANIFESTO DI SINISTRA: FORM PASSEGGERI E PAGAMENTO (7 Colonne) ── */}
        <form
          action={action}
          className={cn(S_PANEL, "lg:col-span-7 space-y-6!")}
        >
          <div>
            <h2 className="text-lg font-bold text-[var(--txt)] flex items-center gap-2! mb-1!">
              <Rocket size={18} className="text-[var(--accent)]" /> 1. Commander
              Information
            </h2>
            <p className="text-xs! text-[var(--txt3)]">
              Enter the primary coordinator data for the orbital jump.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <div className={S_INPUT_GROUP}>
              <label className={S_LABEL} htmlFor="firstName">
                First Name
              </label>
              <input
                defaultValue={data.currentData?.firstName}
                required
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Neil"
                className={S_INPUT}
              />
              {data.errors.firstName && (
                <p className={S_ERROR}>{data.errors.firstName}</p>
              )}
            </div>
            <div className={S_INPUT_GROUP}>
              <label className={S_LABEL} htmlFor="lastName">
                Last Name
              </label>
              <input
                defaultValue={data.currentData?.lastName}
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Armstrong"
                className={S_INPUT}
              />
              {data.errors.lastName && (
                <p className={S_ERROR}>{data.errors.lastName}</p>
              )}
            </div>
          </div>

          <div className={S_INPUT_GROUP}>
            <label className={S_LABEL} htmlFor="email">
              Spaceflight Clearance Email
            </label>
            <input
              defaultValue={data.currentData?.email}
              required
              type="email"
              id="email"
              name="email"
              placeholder="commander@galactic.horizon"
              className={S_INPUT}
            />
            {data.errors.email && (
              <p className={S_ERROR}>{data.errors.email}</p>
            )}
          </div>

          <hr className="border-[var(--border)] my-6!" />

          {/* Sezione Pagamento Finta */}
          <div>
            <h2 className="text-lg font-bold text-[var(--txt)] flex items-center gap-2! mb-1!">
              <CreditCard size={18} className="text-[var(--accent)]" /> 2.
              Quantum Encryption Payment
            </h2>
            <p className="text-xs text-[var(--txt3)]">
              All transactions are fully safe-vaulted through terminal networks.
            </p>
          </div>

          <div className={S_INPUT_GROUP}>
            <label className={S_LABEL} htmlFor="cc">
              Credit Token Number
            </label>
            <input
              defaultValue={data.currentData?.cc}
              required
              type="text"
              id="cc"
              name="cc"
              placeholder="0000 0000 0000 0000"
              className={S_INPUT}
            />
            {data.errors.cc && <p className={S_ERROR}>{data.errors.cc}</p>}
          </div>

          <Button variant="ghost" className="w-full py-6! rounded-xl! bg-cyan-500! border border-cyan-400/30! text-white!  font-bold  uppercase hover:bg-cyan-500/40! transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]! cursor-pointer mt-4!">
            {isPending ? (
              <span className="flex items-center gap-3!">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-cyan-400"></span>
                <span className="text-sm! sm:text-lg!"> Authorizing... </span>
              </span>
            ) : (
              <span className="flex items-center gap-3 text-sm! sm:text-lg! ">Authorize Mission Launch {fmt(totalPrice)}</span>
            )}
          </Button>
        </form>

        {/* ── RIEPILOGO DI DESTRA: DETTAGLI VIAGGI (5 Colonne) ──────────────── */}
        <section className={cn(S_PANEL, "lg:col-span-5! flex flex-col gap-4!")}>
          <div className="flex items-center justify-between mb-2!">
            <h3 className="font-bold text-sm tracking-wider uppercase text-[var(--txt2)]">
              Mission Manifest
            </h3>
            <Button
              type="button"
              onClick={clearCart}
              className="text-xs text-red-400/70! hover:text-red-400! flex items-center gap-1! transition-colors cursor-pointer"
            >
              <Trash2 size={12} /> Clear all
            </Button>
          </div>

          {/* Lista dei Viaggi scelti */}
          <article className="divide-y divide-[var(--border)] max-h-[320px] overflow-y-auto! pr-1!">
            {cart.map(({ trip, passengers }) => (
              <div
                key={trip.id}
                className="flex gap-4 py-4! first:pt-0! last:pb-0! items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-12! h-12! rounded-xl overflow-hidden border border-[var(--border)] shrink-0">
                    <Image
                      src={trip.visual}
                      alt={trip.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--txt)] leading-tight">
                      {trip.name}
                    </h4>
                    <p className="text-[0.7rem] text-[var(--txt3)] uppercase tracking-wider mt-0.5!">
                      {trip.destination} · {passengers} ticket
                      {passengers > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--txt)]">
                    {fmt(trip.price * passengers)}
                  </p>
                  <p className="text-[0.62rem] text-[var(--txt3)]">
                    {fmt(trip.price)} each
                  </p>
                </div>
              </div>
            ))}
          </article>

          <div className="border-t border-[var(--border)] pt-4! mt-2! space-y-2!">
            <div className="flex justify-between text-xs text-[var(--txt2)]">
              <span>Subtotal Manifest</span>
              <span>{fmt(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--txt2)]">
              <span>Orbital Fuel Tax</span>
              <span className="text-emerald-400! uppercase tracking-widest font-bold text-[0.65rem]">
                Included
              </span>
            </div>
            <div className="flex justify-between items-end pt-2! border-t border-dashed border-[var(--border)]">
              <span className="text-sm font-bold">Total Credits</span>
              <span className="text-xl font-black text-[var(--txt)] tracking-tight">
                {fmt(totalPrice)}
              </span>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 flex gap-2.5 items-start mt-2">
            <ShieldCheck
              size={16}
              className="text-cyan-400! shrink-0 mt-0.5!"
            />
            <p className="text-[0.68rem] text-[var(--txt2)] leading-normal">
              Tickets are subject to Interstellar Protection Protocols. Full
              refund available if cosmic conditions force launch cancellation.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
