"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { FaUserAstronaut } from "react-icons/fa6";
import { User, LogOut, ShoppingBag, Rocket } from "lucide-react";

export default function DropDownProfile() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  const isLogged = !!session;

  const userName = session?.user?.name || session?.user?.email || "Astronaut";

  // Stili condivisi per gli item per garantire coerenza e gestire i micro-hover (Punto 6 e 11)
  const menuItemClass = cn(
    "group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
    "transition-all duration-300 ease-out",
    "focus:bg-cyan-950/30 focus:text-white focus:outline-none",
    "text-sm font-medium tracking-wide text-slate-300"
  );

  const menuIconClass = cn(
    "w-4 h-4 text-cyan-600 group-hover:text-cyan-400 group-focus:text-cyan-400",
    "transition-colors duration-300"
  );

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        {/* TRIGGER - Reso più elegante e meno "pesante" */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "relative h-12 w-12 rounded-xl p-0 overflow-hidden",
              "border border-cyan-500/20 bg-[#050A14]/50 backdrop-blur-md",
              "hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all",
              "focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:ring-offset-0"
            )}
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <FaUserAstronaut className="w-6 h-6 text-cyan-400/80 mb-2" />
              {/* Piccola label fusa nel bordo inferiore */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-cyan-950/80 backdrop-blur-sm border-t border-cyan-500/20 flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-cyan-200/80 truncate px-1">
                  {userName.substring(0, 8)}
                </span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={14} // Punto 12: Stacco netto dalla navbar
          className={cn(
            // Punto 1, 2 e 9: Dimensioni compatte, niente h-svh per mobile, bg navy trasparente
            "w-[240px] sm:w-[220px] p-2",
            "bg-[#040814]/85 backdrop-blur-2xl",
            // Punto 4: Bordo morbidissimo, solo il top è leggermente accentato
            "border border-white/5 border-t-cyan-500/30 rounded-xl",
            // Punto 3: Soft glow diffuso (non neon accecante)
            "shadow-[0_0_40px_-10px_rgba(0,243,255,0.15)]",
            // Punto 10: Motion cinematica
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4 duration-300 ease-out",
            "flex flex-col gap-1"
          )}
          align="end"
          forceMount
        >
          {/* Punto 5: Header personalizzato e immersivo */}
          <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-950/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.1)]">
              <FaUserAstronaut className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-slate-100 font-medium text-sm truncate">
                {userName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
                Explorer
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-white/5 my-1" />

          {/* VOCI DEL MENU */}
          {isHome && (
            <DropdownMenuItem asChild className={menuItemClass}>
              <Link href="/shop" className="w-full">
                <Rocket className={menuIconClass} />
                <span>Shop</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild className={menuItemClass}>
            <Link href="/dashboard" className="w-full">
              <User className={menuIconClass} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className={menuItemClass}>
            <Link href="/dashboard/orders" className="w-full">
              <ShoppingBag className={menuIconClass} />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>

          {/* Punto 8: Logout semanticamente isolato */}
          <div className="mt-3 mb-1 px-2">
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                "transition-all duration-300",
                "text-xs font-medium tracking-wide text-rose-500/70",
                "focus:bg-rose-950/30 focus:text-rose-400 focus:outline-none"
              )}
            >
              <LogOut className="w-4 h-4 text-rose-500/50 group-hover:text-rose-400 transition-colors" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}