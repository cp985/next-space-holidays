import { cn } from "@/lib/utils";

import {

  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
} from "../ui/dialog";



export default function FormSuccess() {




  const dialogClass = cn(
    "w-[95vw] sm:w-[80vw]! sm:max-w-3xl! max-h-[90vh]!",
    "overflow-y-auto! rounded-2xl! px-6! py-3!",
    "bg-[#050d1a]/95! backdrop-blur-xl!",
    "border! border-cyan-500/30!",
    "flex flex-col justify-start",
    "[&>button]:hidden"
  );

  // Titolo dialog — da aggiungere al DialogTitle
  const titleClass = cn(
    "text-2xl font-light tracking-[0.15em] uppercase",
    "text-transparent bg-clip-text",
    "bg-gradient-to-r from-cyan-300 to-blue-400",
  );

  // Descrizione dialog
  const descClass = cn("text-white/40 text-sm tracking-wide");

  return (
    <DialogContent className={dialogClass}  onEscapeKeyDown={(e) => {
    e.preventDefault(); 
  }} onPointerDownOutside={(e) => {
    e.preventDefault(); 
  }}>
      <DialogHeader>
        <DialogTitle className={titleClass}>
       {'🚀You are correctly signed in🪐'}
        </DialogTitle>
        <DialogDescription className={descClass}>
          You will be redirected in a few seconds
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
