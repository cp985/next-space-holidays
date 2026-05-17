import { cn } from "@/lib/utils";

export default function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-[0.78rem] text-[#6878a8]")}>
      <span className={cn("text-[#22d3ee] w-3.5 h-3.5 shrink-0")}>{icon}</span>
      <span className={cn("text-[#a8b8e8]")}>{value}</span>
      <span className={cn("text-[#6878a8] ml-auto text-[0.68rem] tracking-wide uppercase")}>{label}</span>
    </div>
  );
}