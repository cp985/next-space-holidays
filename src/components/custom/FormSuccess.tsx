import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function FormSuccess() {
  // Container principale del Dialog (stile card spaziale centrata)
  const dialogClass = cn(
    "w-[95vw] sm:w-[80vw]! sm:max-w-3xl! max-h-[90vh]!",
    "overflow-y-auto! rounded-2xl! px-6! py-12!", // py aumentato a 12 per dare respiro al contenuto centrato
    "bg-[#050d1a]/95! backdrop-blur-xl!",
    "border! border-cyan-500/30!",
    "flex flex-col items-center justify-center text-center", // Allineamento centrato come nel secondo componente
    "[&>button]:hidden"
  );

  // Titolo dialog con il tuo gradiente
  const titleClass = cn(
    "text-2xl md:text-3xl font-light tracking-[0.15em] uppercase",
    "text-transparent bg-clip-text",
    "bg-gradient-to-r from-cyan-300 to-blue-400 text-center block"
  );

  // Descrizione dialog
  const descClass = cn("text-white/40 text-sm md:text-base tracking-wide text-center pt-2");

  // Effetto "Glow" per l'icona
  const iconWrapperClass = cn(
    "relative flex items-center justify-center",
    "w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30",
    "shadow-[0_0_30px_rgba(0,243,255,0.15)] mb-6 animate-in fade-in zoom-in duration-500"
  );

  return (
    <DialogContent 
      className={dialogClass}  
      onEscapeKeyDown={(e) => e.preventDefault()} 
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      {/* Icona Animata inserita dentro il Dialog prima dell'header */}
      <div className={iconWrapperClass}>
        <Rocket className="w-10 h-10 text-cyan-400 animate-bounce" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
      </div>

      <DialogHeader className="space-y-2 flex flex-col items-center justify-center">
        <DialogTitle className={titleClass}>
          🚀 Systems Online 🪐
        </DialogTitle>
        <DialogDescription className={descClass}>
          Authentication successful. Preparing for jump to <span className="text-cyan-300/60 font-mono">/SpaceShop</span>...
        </DialogDescription>
      </DialogHeader>

      {/* Progress Bar Minimalista inserita nel footer del dialog */}
      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-6">
      {/* Si riempie in 2 secondi e si blocca alla fine (forwards) */}
<div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-[fillUp_3s_ease-out_forwards] shadow-[0_0_10px_#00f3ff]" />
      </div>
    </DialogContent>
  );
}
