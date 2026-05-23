"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Plus, Minus, Clock, Shield, Users } from "lucide-react";
import { type Trip } from "@/types/shop/types";
import RiskBadge from "./RiskBadge";
import StatRow from "./StatRow";
import Image from "next/image";
import {TRIPS} from "@/lib/content"


const lastTwoPlanets=TRIPS.slice(-2);
const id1=lastTwoPlanets[0].id;
const id2=lastTwoPlanets[1].id;



const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// ── COSTANTI STILI ADATTIVE ──────────────────────────────────────────────────
const S_CARD = cn(
  "group relative flex flex-col",
  "rounded-[20px] overflow-hidden",
  "border border-[var(--card-border)]",
  "bg-[var(--card-bg)] backdrop-blur-xl",
  "transition-colors duration-200"
);
// Mantenuto relative per permettere il fill dell'immagine interna
const S_CARD_VISUAL = cn("relative h-[160px] w-full overflow-hidden");
const S_CARD_BODY   = cn("flex flex-col flex-1 p-6!");
const S_CARD_NAME   = cn("text-[1.1rem] font-bold text-[var(--txt)] leading-tight mb-1!");
const S_CARD_DEST   = cn("text-[0.78rem] text-[var(--txt3)] mb-3! tracking-[0.08em] uppercase");
const S_CARD_DESC   = cn("text-[0.85rem] text-[var(--txt2)] font-light leading-[1.6] mb-4! flex-1");
const S_DIVIDER     = cn("border-t border-[var(--border)] mt-auto! pt-4!");

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
      layout="position"
      initial={{ opacity: 0, y: 6 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }} 
      
      whileHover={{ 
        y: -4, 
        borderColor: inCart ? "var(--border2)" : "var(--card-border)" 
      }}
      
      transition={{
        type: "tween",
        ease: [0.25, 1, 0.5, 1], 
        duration: 0.2
      }}
      className={cn(S_CARD, inCart && "border-[var(--border2)]")}
    >
      {/* ── Visual pianeta (Contenitore Relative) ───────────────────────── */}
      <div className={S_CARD_VISUAL}>
        
        <Image
          src={trip.visual}
          alt={trip.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={trip.seats <= 4} // Opzionale: dà priorità se i posti scarseggiano (o puoi toglierlo)
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay sfumato: scurisce la base dell'immagine per staccare i testi */}
        <div className={cn("absolute inset-0 bg-gradient-to-t from-[rgba(2,8,23,0.85)] dark:from-[rgba(2,8,23,0.95)] via-transparent to-transparent pointer-events-none")} />

        {/* Badge di Destinazione e Rischio */}
        <div className={cn("absolute top-3 left-3 flex items-center gap-2")}>
          <span
            className={cn(
              "text-[0.65rem] font-semibold tracking-[0.15em] uppercase",
              "px-2.5 py-0.5 rounded-full",
              "bg-[var(--surface)] border border-[var(--border)]",
              "text-[var(--txt)]",
            )}
          >
            {trip.destination}
          </span>
          <RiskBadge risk={trip.risk} />

{(trip.id === id1 || trip.id === id2) && (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "text-[0.95rem] font-black tracking-widest uppercase",
        "px-2 py-0.5 rounded-md",
        // Stile neon ciano/purple spaziale per attirare l'occhio
        "bg-cyan-700/60 border border-cyan-400/40 text-cyan-400 animate-pulse",
        "shadow-[0_0_10px_rgba(34,211,238,0.2)]"
      )}
    >
      New
    </motion.span>
  )}

        </div>

        {/* Posti rimasti */}
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

        {/* Data/Punto di partenza */}
        <div className={cn("absolute bottom-3 left-3")}>
          <p className={cn("text-[0.68rem] tracking-[0.2em] uppercase text-[#a8b8e8] dark:text-[var(--txt3)]")}>
            {trip.departure}
          </p>
        </div>
      </div>

      {/* ── Card Body ──────────────────────────────────────────────────── */}
      <div className={S_CARD_BODY}>
        <h3 className={S_CARD_NAME}>{trip.name}</h3>
        <p className={S_CARD_DEST}>
          {trip.destination} · {trip.zone === "deep" ? "Deep Space" : trip.zone === "inner" ? "Inner System" : "Outer Planets"}
        </p>

        <p className={S_CARD_DESC}>{trip.description}</p>

        <div className={cn("flex flex-col gap-1.5 mb-4")}>
          <StatRow icon={<Clock size={13} />} label="Duration"   value={trip.duration} />
          <StatRow icon={<Users size={13} />} label="Seats left" value={`${trip.seats} remaining`} />
          <StatRow icon={<Shield size={13} />} label="Risk"      value={trip.risk} />
        </div>

        <div className={cn("flex flex-col gap-1 mb-5")}>
          {trip.highlights.map((h) => (
            <div key={h} className={cn("flex items-start gap-2 text-[0.78rem] text-[var(--txt2)]")}>
              <span className={cn("mt-[3px] shrink-0")} style={{ color: trip.accent }}>✦</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* ── Prezzo e CTA Action ───────────────────────────────────────── */}
        <div className={cn(S_DIVIDER, "flex items-end justify-between gap-3")}>
          <div>
            <p className={cn("text-[0.65rem] tracking-[0.15em] uppercase text-[var(--txt3)] mb-0.5")}>
              Per person
            </p>
            <p className={cn("text-[1.3rem] font-bold text-[var(--txt)] leading-none tracking-tight")}>
              {fmt(trip.price)}
            </p>
          </div>

          {inCart ? (
            <div className={cn("flex items-center gap-2")}>
              <Button
                type="button"
                onClick={onRemove}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center p-0!",
                  "border border-[var(--card-border)] bg-[var(--pill-bg)]",
                  "text-[var(--accent)] hover:bg-[var(--border)]",
                  "transition-all duration-150 cursor-pointer",
                )}
              >
                <Minus size={13} />
              </Button>
              <span className={cn("text-[var(--txt)] font-bold text-sm w-4 text-center")}>{qty}</span>
              <Button
                type="button"
                onClick={onAdd}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center p-0!",
                  "border border-[var(--card-border)] bg-[var(--pill-bg)]",
                  "text-[var(--accent)] hover:bg-[var(--border)]",
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
                "bg-[var(--pill-bg)]! border border-[var(--card-border)]!",
                "text-[var(--accent)] text-[0.78rem] font-semibold tracking-wide",
                "hover:bg-[var(--border)]! hover:border-[var(--border2)]!",
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