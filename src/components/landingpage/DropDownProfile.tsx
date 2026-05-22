"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import {useEffect, useState} from "react";
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

  const menuItemClass = cn(
    "group flex items-center gap-4! px-4! py-3.5! rounded-lg cursor-pointer",
    "transition-all duration-300 ease-out",
    "focus:bg-cyan-950/40! focus:text-white! focus:outline-none!",
    "text-[16px]! font-medium tracking-wide text-slate-200"
  );

  const menuIconClass = cn(
    "w-5! h-5! text-cyan-600 group-hover:text-cyan-400 group-focus:text-cyan-400",
    "transition-colors duration-300"
  );

  // Stato per forzare il controllo di apertura/chiusura
  const [isOpen, setIsOpen] = useState(false);

  //  Listener per la rotazione/ridimensionamento dello schermo
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) setIsOpen(false); // Chiude istantaneamente la tendina se ruoti il telefono
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
       
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "relative h-12! w-12! md:h-14! md:w-14! rounded-xl p-0 overflow-hidden",
              "border border-cyan-500/20 bg-[#050A14]/50 backdrop-blur-md",
              "hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all",
              "focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:ring-offset-0"
            )}
          >
            <div className="flex flex-col items-center justify-center w-full h-full pb-3 md:pb-3.5">
              <FaUserAstronaut className="w-5 h-5 md:w-6 md:h-6 text-cyan-400/80 transition-all" />
              
              <div className="absolute bottom-0 inset-x-0 h-3.5 md:h-4 bg-cyan-950/80 backdrop-blur-sm border-t border-cyan-500/20 flex items-center justify-center">
                <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-cyan-200/80 truncate px-1 transition-all">
                  {userName.substring(0, 8)}
                </span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>



        <DropdownMenuContent
          side="bottom" 
          align="end"
          sideOffset={14}
          // collisionPadding={10} 
          className={cn(
            "z-[110]!", 
            "w-[280px]! p-3!",
            " dark:bg-[#040814]/90! backdrop-blur-2xl!",
            "border! border-white/5! border-t-cyan-500/30! rounded-xl!",
            "shadow-[0_0_50px_-10px_rgba(0,243,255,0.2)]!",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4 duration-300 ease-out",
            "flex! flex-col! gap-2!",
            "max-h-[85vh]! overflow-y-auto! overscroll-contain" 
          )}
         
        >
          <DropdownMenuLabel className="flex items-center gap-4! px-3! py-4!">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-950/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.1)]">
              <FaUserAstronaut className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="flex flex-col overflow-hidden gap-1">
              <span className="text-slate-600 dark:text-slate-100 font-medium text-[16px]! truncate">
                {userName}
              </span>
              <span className="text-[11px]! font-mono tracking-widest text-cyan-400/70 uppercase">
                Explorer
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-white/10! my-2!" />

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

          <div className="mt-4! mb-2! px-2!">
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className={cn(
                "group flex items-center gap-4! px-4! py-3.5! rounded-lg cursor-pointer",
                "transition-all duration-300",
                "text-[15px]! font-medium tracking-wide text-rose-500/80!",
                "focus:bg-rose-950/40! focus:text-rose-400! focus:outline-none!"
              )}
            >
              <LogOut className="w-5! h-5! text-rose-500/60 group-hover:text-rose-400 transition-colors" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}