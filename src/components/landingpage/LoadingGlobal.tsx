'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Rocket } from 'lucide-react';

export default function LoadingGlobal() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gestisce il tempo di visibilità del loader all'ingresso
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Puoi regolare i millisecondi in base alle tue esigenze

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
       <div
      className={cn(
        "fixed inset-0 z-160 flex flex-col items-center justify-center",
        "bg-gradient-to-b from-[#0b0f19] via-[#05070c] to-[#010204] text-foreground select-none pointer-events-auto"
      )}
    >
      <div className="flex text-cyan-600 flex-col items-center gap-4">
        <div className="text-6xl! text-cyan-600! animate-bounce">
          <Rocket className={cn("text-cyan-600 w-30 h-30")}/>
        </div>
        <div className="text-4xl! font-mono text-cyan-600 tracking-widest uppercase animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}