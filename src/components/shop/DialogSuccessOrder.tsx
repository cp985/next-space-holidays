"use client";

import { Rocket, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MissionSuccessDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export default function DialogSuccessOrder({
  isOpen,
  onOpenChange,
  className,
}: MissionSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={cn(
          "sm:max-w-[450px] bg-slate-950! border-cyan-500/50! text-slate-100! z-160!",
          "shadow-[0_0_30px_rgba(6,182,212,0.2)]!",
          "[&>button]:hidden",
        )}
      >
        <DialogHeader className="items-center text-center">
          <div className="mb-4! relative">
            <div className="absolute inset-0! animate-ping rounded-full bg-cyan-500/20!" />
            <div
              className={cn(
                "relative bg-slate-900! p-4! rounded-full border",
                "border-cyan-400!",
              )}
            >
              <CheckCircle2 className="w-12! h-12! text-cyan-400!" />
            </div>
          </div>

          <DialogTitle
            className={cn(
              "text-2xl font-bold tracking-wider uppercase",
              "text-cyan-400! font-mono",
            )}
          >
            Missione Compiuta
          </DialogTitle>

          <DialogDescription className="text-slate-400! text-base mt-2!">
            La tua prenotazione è stata sigillata nel registro galattico. I
            protocolli di volo sono pronti.
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            "mt-6! space-y-4! p-4! bg-slate-900/50!",
            "border border-slate-800! rounded-lg",
          )}
        >
          <div className="flex items-center gap-3! text-sm text-slate-300!">
            <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
            <span>Transazione verificata via Sub-space Link</span>
          </div>
          <div className="flex items-center gap-3! text-sm text-slate-300!">
            <Rocket className="w-5! h-5! text-cyan-400! animate-bounce shrink-0" />
            <span>Preparazione salto iperspaziale in corso...</span>
          </div>
        </div>

        <div className="mt-4! !pt-2!">
          <div className="h-1! w-full bg-slate-800! rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500! w-full animate-[fillUp_3s_ease-in-out]" />
          </div>
          <p
            className={cn(
              "text-[10px] uppercase tracking-wider text-slate-500!",
              "mt-2! text-center font-mono",
            )}
          >
            Redirecting to Mission Manifest: Profile/Orders
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
