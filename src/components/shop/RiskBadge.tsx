import { cn } from "@/lib/utils";
import {type Risk} from "@/types/shop/types";
const RISK_CONFIG: Record<Risk, { label: string; color: string; bg: string }> = {
  LOW:     { label: "LOW",     color: "#84cc16", bg: "rgba(132,204,22,0.12)"  },
  MEDIUM:  { label: "MED",     color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  HIGH:    { label: "HIGH",    color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  EXTREME: { label: "EXTREME", color: "#e879f9", bg: "rgba(232,121,249,0.12)"},
};

export default function RiskBadge({ risk }: { risk: Risk }) {
  const cfg = RISK_CONFIG[risk];
  return (
    <span
      className={cn("text-[0.65rem] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full")}
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}33` }}
    >
      {cfg.label}
    </span>
  );
}