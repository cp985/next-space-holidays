import { cn } from "@/lib/utils";

export default function SkeletonNav ()  {


  return (
    <div 
      className={cn(
        "h-10 w-[145px] hidden md:block", // Stesse dimensioni medie del tasto "Mission Control"
        "rounded-xl border border-purple-500/10 bg-purple-950/10",
        "animate-pulse backdrop-blur-sm"
      )}
    />
  );
}
