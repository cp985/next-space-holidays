import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import RiskBadge from "./RiskBadge";
import { motion } from "framer-motion";
import type { CartItem } from "@/types/shop/types";
import { X, Minus, Plus, Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function CartDrawer({
  items,
  onClose,
  onAdd,
  onRemove,
  onClear,
}: {
  items: CartItem[];
  onClose: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  // Cart drawer
  const S_DRAWER = cn(
    "fixed inset-y-0 right-0 z-[106] w-full max-w-[420px]",
    "bg-[#030d1e] border-l border-[rgba(34,211,238,0.2)]",
    "flex flex-col",
    "shadow-[-20px_0_60px_rgba(0,0,0,0.6)]",
  );
  const total = items.reduce((s, i) => s + i.trip.price * i.passengers, 0);
  const totalPax = items.reduce((s, i) => s + i.passengers, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-0 z-[105] bg-[rgba(2,8,23,0.7)] backdrop-blur-sm",
        )}
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={S_DRAWER}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            "px-6! py-5!",
            "border-b! border-[rgba(34,211,238,0.15)]!",
          )}
        >
          <div>
            <span
              className={cn(
                "block text-[0.65rem] tracking-[0.25em] uppercase text-[#22d3ee]! mb-1!",
              )}
            >
              Mission Cart
            </span>
            <h2 className={cn("text-[1.1rem] font-bold text-[#e8eeff]")}>
              {totalPax} {totalPax === 1 ? "passenger" : "passengers"} ·{" "}
              {items.length} {items.length === 1 ? "route" : "routes"}
            </h2>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center",
              "border border-[rgba(34,211,238,0.25)]! bg-[rgba(34,211,238,0.08)]!",
              "text-[#6878a8]! hover:text-[#e8eeff]!",
              "transition-all duration-150 cursor-pointer",
            )}
          >
            <X size={16} />
          </Button>
        </div>

        <div className={cn("flex-1 overflow-y-auto py-4! px-6! space-y-4!")}>
          {items.length === 0 ? (
            <div
              className={cn(
                "flex flex-col items-center justify-center h-full gap-4! py-20!",
              )}
            >
              <Rocket size={40} className={cn("text-[#6878a8]")} />
              <p
                className={cn("text-[#6878a8] text-sm text-center font-light")}
              >
                No missions selected yet.
                <br />
                Choose your destination above.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.trip.id}
                className={cn(
                  "rounded-[14px] p-4!",
                  "border border-[rgba(34,211,238,0.15)]!",
                  "bg-[rgba(15,31,61,0.5)]",
                  "backdrop-blur-sm",
                )}
              >
                <div
                  className={cn("flex items-start justify-between gap-3 mb-3!")}
                >
                  <div>
                    <p
                      className={cn(
                        "text-[0.9rem] font-semibold text-[#e8eeff] leading-tight",
                      )}
                    >
                      {item.trip.name}
                    </p>
                    <p
                      className={cn(
                        "text-[0.72rem] text-[#6878a8]! mt-0.5! tracking-wide uppercase",
                      )}
                    >
                      {item.trip.destination} · {item.trip.duration}
                    </p>
                  </div>
                  <RiskBadge risk={item.trip.risk} />
                </div>

                <div className={cn("flex items-center justify-between")}>
                  <div className={cn("flex items-center gap-2")}>
                    <Button
                      type="button"
                      onClick={() => onRemove(item.trip.id)}
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        "border border-[rgba(34,211,238,0.3)]! bg-[rgba(34,211,238,0.06)]!",
                        "text-[#22d3ee]! hover:bg-[rgba(34,211,238,0.18)]! transition-all cursor-pointer",
                      )}
                    >
                      <Minus size={11} />
                    </Button>
                    <span
                      className={cn(
                        "text-[#e8eeff] text-sm font-bold w-5 text-center",
                      )}
                    >
                      {item.passengers}
                    </span>
                    <Button
                      type="button"
                      onClick={() => onAdd(item.trip.id)}
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        "border border-[rgba(34,211,238,0.3)]! bg-[rgba(34,211,238,0.06)]!",
                        "text-[#22d3ee]! hover:bg-[rgba(34,211,238,0.18)]! transition-all cursor-pointer",
                      )}
                    >
                      <Plus size={11} />
                    </Button>
                    <span className={cn("text-[0.72rem] text-[#6878a8] ml-1!")}>
                      pax
                    </span>
                  </div>
                  <p className={cn("text-[0.95rem] font-bold text-[#e8eeff]")}>
                    {fmt(item.trip.price * item.passengers)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div
            className={cn(
              "px-6! py-5! space-y-4!",
              "border-t border-[rgba(34,211,238,0.15)]",
              "bg-[rgba(2,8,23,0.6)]",
            )}
          >
            <div className={cn("flex items-center justify-between")}>
              <span
                className={cn(
                  "text-[0.78rem] tracking-[0.15em] uppercase text-[#6878a8]",
                )}
              >
                Total Mission Cost
              </span>
              <span
                className={cn(
                  "text-[1.5rem] font-bold text-[#e8eeff] tracking-tight",
                )}
              >
                {fmt(total)}
              </span>
            </div>

            <Button
              type="button"
              className={cn(
                "w-full flex items-center justify-center gap-2",
                "py-3.5! rounded-full",
                "bg-[#22d3ee]! text-[#020817]!",
                "font-bold text-[0.9rem] tracking-[0.08em] uppercase",
                "hover:bg-[#67e8f9]! transition-all duration-200",
                "cursor-pointer",
              )}
              asChild
            >
              <Link href="/shop/checkout">    Proceed to Launch Checkout
              <ChevronRight size={16} /></Link>
          
            </Button>

            <Button
              type="button"
              onClick={onClear}
              className={cn(
                "w-full text-center text-[0.72rem] text-[#6878a8]",
                "hover:text-[#a8b8e8]! transition-colors duration-150 cursor-pointer",
                "tracking-wide",
              )}
            >
              Clear all missions
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
}
