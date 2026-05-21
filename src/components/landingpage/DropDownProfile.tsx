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
import { GiAstronautHelmet } from "react-icons/gi";

// Se usi lucide-react (già incluso di base con shadcn)
import { User, LogOut, ShieldAlert, ShoppingBag, Rocket } from "lucide-react";

export default function DropDownProfile() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  const isLogged = !!session;

  // Estraiamo il nome o l'email per personalizzare il menu
  const userName = session?.user?.name || session?.user?.email || "Astronauta";

  return (
    <div className="flex items-center gap-4 ">
      <DropdownMenu>
        {/* Il Grilletto (Trigger) del menu: il nostro bottone Astronauta */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "relative h-10 px-4 gap-2 border-purple-500/30 bg-purple-950/20 text-purple-200 hover:bg-purple-500/20 hover:text-white transition-all rounded-xl backdrop-blur-sm",
              "focus:outline-none! focus:ring-0! focus:ring-offset-0!",
              "focus-visible:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0!",
              "select-none!",
            )}
          >
            {/* Icona Astronauta (Stilizzata con un cerchietto o emoji/icona) */}
            <div
              className={cn(
                "relative flex flex-col justify-center items-center  border-2 border-cyan-500/50 rounded-xl",
                "focus:outline-none! focus:ring-0! focus-visible:ring-0",
              )}
            >
              <FaUserAstronaut className="w-14! h-14! text-cyan-400  " />
              <div className="w-full h-fit p-0 bg-cyan-900/90! absolute bottom-0 left-0 text-center text-white text-shadow-black text-sm ">
                {userName}
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        {/* Il Contenuto della tendina, stilizzato in linea con il tema scuro/cyber dello shop */}

        <DropdownMenuContent
          sideOffset={12}
          className={cn(
            "w-56 h-svh sm:h-auto text-[16px]! font-medium! border  border-cyan-700/70 text-white rounded shadow-[0_4px_30px_rgba(0,0,0,0.5)]",
            "focus:outline-none! focus:ring-0!",
            "p-5! space-y-5!",
            "bg-black/70! backdrop-blur-md!",
          )}
          align="end"
          forceMount
        >
        
            {/* Intestazione con il nome utente */}
            <DropdownMenuLabel className="font-normal py-2 px-3">
              <div className="flex flex-col space-y-1">
                <p className="text-[14px] text-purple-400 font-light font-pixel">
                  Menu
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-white/10" />

            {/* Voci del Menu */}
            {isHome && (
              <DropdownMenuItem
                asChild
                className={cn(
                  "focus:bg-purple-500/20 focus:text-white cursor-pointer py-2.5 rounded-lg focus:outline-none! focus:ring-0!",
                  "text-lg font-medium",
                )}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-2 w-full focus:outline-none! focus:ring-0!"
                >
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  <span>Shop</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              asChild
              className={cn(
                "focus:bg-purple-500/20  focus:text-white cursor-pointer py-2.5 rounded-lg focus:outline-none! focus:ring-0!",
                "text-lg font-medium",
              )}
            >
              <Link
                href="/dashboard"
                className="flex items-center gap-2 w-full focus:outline-none! focus:ring-0!"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="focus:bg-purple-500/20 focus:text-white cursor-pointer py-2.5 rounded-lg focus:outline-none! focus:ring-0!"
            >
              <Link
                href="/dashboard/orders"
                className="text-[16px] font-medium flex items-center gap-2 w-full focus:outline-none! focus:ring-0!"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10" />

            {/* Tasto Logout dentro la tendina, colorato di rosso */}
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="focus:bg-red-900/40 text-red-400 focus:text-red-200 cursor-pointer py-2.5 rounded-lg focus:outline-none! focus:ring-0!"
            >
              <div className="flex items-center gap-2 w-full">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
       
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
