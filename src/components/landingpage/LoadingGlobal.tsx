'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export default function LoadingGlobal() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gestisce il tempo di visibilità del loader all'ingresso
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Puoi regolare i millisecondi in base alle tue esigenze

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-110 flex flex-col items-center justify-center",
        "bg-background text-foreground select-none pointer-events-auto"
      )}
    >
      <div className="font-mono text-sm tracking-widest uppercase animate-pulse">
        Loading...
      </div>
    </div>
  );
}