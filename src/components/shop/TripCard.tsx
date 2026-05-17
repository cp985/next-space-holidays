import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {motion} from "framer-motion"
import { Plus, Minus, Clock, Shield, Users } from "lucide-react";
import { type Trip} from "@/types/shop/types"
import RiskBadge from "./RiskBadge";
import StatRow from "./StatRow";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);


const S_CARD = cn(
  "group relative flex flex-col",
  "rounded-[20px] overflow-hidden",
  "border border-[rgba(34,211,238,0.15)]",
  "bg-[rgba(15,31,61,0.55)]",
  "backdrop-blur-xl",
  "transition-all duration-300",
  "hover:border-[rgba(34,211,238,0.35)]",
  "hover:-translate-y-1",
);
const S_CARD_VISUAL = cn("relative h-[160px] w-full overflow-hidden");
const S_CARD_BODY   = cn("flex flex-col flex-1 p-6!");
const S_CARD_NAME   = cn("text-[1.1rem] font-bold text-[#e8eeff] leading-tight mb-1!");
const S_CARD_DEST   = cn("text-[0.78rem] text-[#6878a8] mb-3! tracking-[0.08em] uppercase");
const S_CARD_DESC   = cn("text-[0.85rem] text-[#a8b8e8] font-light leading-[1.6] mb-4! flex-1");
const S_DIVIDER     = cn("border-t border-[rgba(34,211,238,0.1)] mt-auto! pt-4!");

export default function TripCard({
  trip,
  qty,
  onAdd,
  onRemove,
}: {
  trip: Trip;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const inCart = qty > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(S_CARD, inCart && "border-[rgba(34,211,238,0.45)]")}
    >
      {/* ── Visual pianeta ─────────────────────────────────────────────── */}
      <div className={S_CARD_VISUAL}>
        {/* Gradiente base del pianeta */}
        <div className={cn("absolute inset-0 bg-gradient-to-br", trip.visual)} />

        {/* Cerchio pianeta */}
        <div
          className={cn(
            "absolute bottom-[-30%] right-[-10%]",
            "w-[160px] h-[160px] rounded-full",
            "bg-gradient-to-br opacity-40",
            trip.visual,
          )}
          style={{ filter: "blur(24px)" }}
        />
        <div
          className={cn(
            "absolute bottom-[-20%] right-[-5%]",
            "w-[130px] h-[130px] rounded-full",
            "bg-gradient-to-tl opacity-70",
            trip.visual,
          )}
        />

        <div className={cn("absolute inset-0 bg-gradient-to-t from-[rgba(2,8,23,0.85)] via-transparent to-transparent")} />

        <div className={cn("absolute top-3 left-3 flex items-center gap-2")}>
          <span
            className={cn(
              "text-[0.65rem] font-semibold tracking-[0.15em] uppercase",
              "px-2.5 py-0.5 rounded-full",
              "bg-[rgba(2,8,23,0.7)] border border-[rgba(255,255,255,0.12)]",
              "text-[#a8b8e8]",
            )}
          >
            {trip.destination}
          </span>
          <RiskBadge risk={trip.risk} />
        </div>

        {trip.seats <= 4 && (
          <span
            className={cn(
              "absolute top-3 right-3",
              "text-[0.65rem] font-bold tracking-wide uppercase",
              "px-2 py-0.5 rounded-full",
              "bg-[rgba(232,121,249,0.15)] border border-[rgba(232,121,249,0.3)] text-[#e879f9]",
            )}
          >
            {trip.seats} seats left
          </span>
        )}

        <div className={cn("absolute bottom-3 left-3")}>
          <p className={cn("text-[0.68rem] tracking-[0.2em] uppercase text-[#6878a8]")}>
            {trip.departure}
          </p>
        </div>
      </div>

      <div className={S_CARD_BODY}>
        <h3 className={S_CARD_NAME}>{trip.name}</h3>
        <p className={S_CARD_DEST}>{trip.destination} · {trip.zone === "deep" ? "Deep Space" : trip.zone === "inner" ? "Inner System" : "Outer Planets"}</p>

        <p className={S_CARD_DESC}>{trip.description}</p>

        <div className={cn("flex flex-col gap-1.5 mb-4")}>
          <StatRow icon={<Clock size={13} />} label="Duration"   value={trip.duration} />
          <StatRow icon={<Users size={13} />} label="Seats left" value={`${trip.seats} remaining`} />
          <StatRow icon={<Shield size={13} />} label="Risk" value={trip.risk} />
        </div>

        <div className={cn("flex flex-col gap-1 mb-5")}>
          {trip.highlights.map((h) => (
            <div key={h} className={cn("flex items-start gap-2 text-[0.78rem] text-[#6878a8]")}>
              <span className={cn("mt-[3px] shrink-0")} style={{ color: trip.accent }}>✦</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className={cn(S_DIVIDER, "flex items-end justify-between gap-3")}>
          <div>
            <p className={cn("text-[0.65rem] tracking-[0.15em] uppercase text-[#6878a8] mb-0.5")}>
              Per person
            </p>
            <p className={cn("text-[1.3rem] font-bold text-[#e8eeff] leading-none tracking-tight")}>
              {fmt(trip.price)}
            </p>
          </div>

          {inCart ? (
            <div className={cn("flex items-center gap-2")}>
              <Button
                type="button"
                onClick={onRemove}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "border border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.08)]",
                  "text-[#22d3ee] hover:bg-[rgba(34,211,238,0.2)]",
                  "transition-all duration-150 cursor-pointer",
                )}
              >
                <Minus size={13} />
              </Button>
              <span className={cn("text-[#e8eeff] font-bold text-sm w-4 text-center")}>{qty}</span>
              <Button
                type="button"
                onClick={onAdd}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "border border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.08)]",
                  "text-[#22d3ee] hover:bg-[rgba(34,211,238,0.2)]",
                  "transition-all duration-150 cursor-pointer",
                )}
              >
                <Plus size={13} />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={onAdd}
              className={cn(
                "flex items-center gap-2",
                "px-4! py-2! rounded-full",
                "bg-[rgba(34,211,238,0.12)]! border border-[rgba(34,211,238,0.35)]!",
                "text-[#22d3ee] text-[0.78rem] font-semibold tracking-wide",
                "hover:bg-[rgba(34,211,238,0.22)]! hover:border-[rgba(34,211,238,0.6)]!",
                "transition-all duration-200 cursor-pointer",
              )}
            >
              <Plus size={13} /> Book
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}