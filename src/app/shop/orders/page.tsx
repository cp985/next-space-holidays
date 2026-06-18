import { auth } from "../../../auth/auth"; 
import { createClient } from "@/lib/supabase/server"; 
import { redirect } from "next/navigation";
import { Rocket, Calendar, CreditCard, PackageCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";



// ── UTILS & FORMATTERS ──────────────────────────────────────────────────────
const formatDateStellar = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// ── SCI-FI MANIFEST STYLES ──────────────────────────────────────────────────
const S_PAGE_WRAPPER = cn(
  "container max-w-5xl mx-auto px-6! py-12! flex-1 flex flex-col justify-center"
);
const S_HEADER_PILL = cn(
  "bg-cyan-500/10! p-2! rounded-lg border border-cyan-500/30!"
);
const S_SUBTITLE = cn(
  "text-xs uppercase tracking-[0.3em] text-cyan-400! font-mono font-bold"
);
const S_TITLE = cn(
  "text-3xl md:text-4xl font-black text-slate-100 tracking-tight mt-3! mb-2!"
);
const S_CARD = cn(
  "rounded-[24px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl overflow-hidden"
);
const S_CARD_HEADER = cn(
  "p-6! border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-4! bg-slate-900/40!"
);
const S_LABEL_MINI = cn(
  "text-[10px] uppercase tracking-[0.15em] text-slate-500! mb-1! font-mono font-bold"
);
const S_STATUS_PILL = cn(
  "inline-flex items-center gap-1.5! px-2.5! py-0.5! rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10! text-emerald-400! border border-emerald-500/20!"
);
const S_ITEM_BOX = cn(
  "flex gap-4! p-4! rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
);

interface OrderItem {
  trip: {
    id: string;
    name: string;
    visual: string;
    destination: string;
    price: number;
  };
  passengers: number;
}

export default async function OrdersPage() {
  const session = await auth();
  const supabase = await createClient();

  // 1. Terminal Route Guard
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Fetch User ID from local database mapping
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();


  if (!user) redirect("/");

  // 3. Fetch Mission Manifest logs
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className={S_PAGE_WRAPPER}>
      <header className="mb-12!">
        <div className="flex items-center gap-3!">
          <div className={S_HEADER_PILL}>
            <Rocket className="text-cyan-400! w-5! h-5!" />
          </div>
          <span className={S_SUBTITLE}>Mission Manifest</span>
        </div>
        <h1 className={S_TITLE}>Pilot's Logbook</h1>
        <p className="text-sm text-[var(--txt2)] max-w-xl">
          Historical archive of all your deep-space orbital jumps, verified telemetry clearance, and active boarding passes.
        </p>
           
      </header>

      {error || !orders || orders.length === 0 ? (
        <div className="bg-slate-900/20! border border-dashed border-[var(--border)] rounded-[24px] p-24! text-center">
          <p className="text-[var(--txt3)] font-mono text-sm uppercase tracking-widest">
            No flight data records found in the telemetry database.
          </p>
        </div>
      ) : (
        <div className="space-y-8!">
          {orders.map((order) => (
            <div key={order.id} className={S_CARD}>
              {/* Manifest Metadata Header */}
              <div className={S_CARD_HEADER}>
                <div className="flex flex-wrap items-center gap-6! md:gap-10!">
                  <div>
                    <p className={S_LABEL_MINI}>Mission ID</p>
                    <p className="font-mono text-cyan-400! text-sm font-bold uppercase">
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <div>
                    <p className={S_LABEL_MINI}>Launch Window</p>
                    <div className="flex items-center gap-2! text-[var(--txt)] text-sm">
                      <Calendar size={14} className="text-slate-500!" />
                      {formatDateStellar(order.created_at)}
                    </div>
                  </div>
                  <div>
                    <p className={S_LABEL_MINI}>Clearance Status</p>
                    <span className={S_STATUS_PILL}>
                      <PackageCheck size={10} /> {order.status || "Approved"}
                    </span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className={S_LABEL_MINI}>Total Credits Settled</p>
                  <p className="text-xl font-black text-[var(--txt)] tracking-tight">
                    {fmt(order.price_paid)}
                  </p>
                </div>
              </div>

              {/* Allocated Seat Tickets */}
              <div className="p-6!">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
                  {order.items?.map((item: OrderItem) => (
                    <div key={item.trip.id} className={S_ITEM_BOX}>
                      <div className="relative w-16! h-16! rounded-xl overflow-hidden shrink-0 border border-[var(--border)] bg-slate-950!">
                        <Image
                          src={item.trip.visual}
                          alt={item.trip.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[var(--txt)] leading-tight truncate">
                          {item.trip.name}
                        </h4>
                        <div className="flex items-center gap-1! text-[10px] text-[var(--txt3)] uppercase tracking-widest mt-1! mb-2! font-mono">
                          <MapPin size={10} className="text-cyan-400/70" /> {item.trip.destination}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-[var(--txt3)] font-mono">
                            {item.passengers} × {fmt(item.trip.price)}
                          </p>
                          <p className="text-sm font-bold text-cyan-400!">
                            {fmt(item.trip.price * item.passengers)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Sub-space Footer */}
              <div className="px-6! py-4! bg-slate-950/40! border-t border-[var(--border)] flex flex-wrap justify-between items-center gap-2! text-[10px] text-[var(--txt3)] uppercase tracking-[0.2em] font-mono">
                <div className="flex items-center gap-2!">
                  <CreditCard size={12} className="text-slate-500!" />
                  Quantum Token Signature: {order.cc_snapshot ? `***${order.cc_snapshot.slice(-4)}` : "Encrypted Vault"}
                </div>
                <div>
                  Secure Transmission Link: {order.checkout_email}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}