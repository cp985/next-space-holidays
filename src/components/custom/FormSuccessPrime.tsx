"use client";

import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react"; // Aggiungiamo un tocco spaziale

export default function FormSuccessPrime() {
  // Container che riprende lo stile della card ma centrato per il feedback
  const containerClass = cn(
    "flex flex-col items-center justify-center text-center",
    "py-12 px-4 space-y-6 animate-in fade-in zoom-in duration-500"
  );

  // Titolo — manteniamo il tuo gradiente e tracking
  const titleClass = cn(
    "text-2xl md:text-3xl font-light tracking-[0.15em] uppercase",
    "text-transparent bg-clip-text",
    "bg-gradient-to-r from-cyan-300 to-blue-400"
  );

  // Descrizione
  const descClass = cn("text-white/40 text-sm md:text-base tracking-wide");

  // Effetto "Glow" per l'icona
  const iconWrapperClass = cn(
    "relative flex items-center justify-center",
    "w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30",
    "shadow-[0_0_30px_rgba(0,243,255,0.15)] mb-4"
  );

  return (
    <div className={containerClass}>
      {/* Icona Animata */}
      <div className={iconWrapperClass}>
        <Rocket className="w-10 h-10 text-cyan-400 animate-bounce" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
      </div>

      <header className="space-y-2">
        <h2 className={titleClass}>
          🚀 Systems Online 🪐
        </h2>
        <p className={descClass}>
          Authentication successful. Preparing for jump to <span className="text-cyan-300/60 font-mono">/SpaceShop</span>...
        </p>
      </header>

      {/* Progress Bar Minimalista */}
      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-[fillUp_3s_ease-out_forwards] shadow-[0_0_10px_#00f3ff]" />
      </div>
    </div>
  );
}