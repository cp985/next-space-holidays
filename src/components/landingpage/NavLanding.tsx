"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function NavLanding() {
  const pathname = usePathname();

  const logoClass = cn("logo");
  const imgLogoClass = cn(`${"img-logo"} w-full!`);
  const logoIconClass = cn(
    `${"logo-icon"} min-w-11 min-h-11  sm:w-13! sm:h-13!`,
  );
  const navLinksClass = cn("nav-links");
  const navCtaClass = cn("nav-cta");
  const darkToggleClass = cn("dark-toggle");
  const buttonDiv = cn("flex items-center gap-1");
  const spanLogo = cn("text-lg sm:text-xl");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: session, status, update } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }

  const noShowPath = ["/login", "/planets-details"];
  const noNav = noShowPath.some((path) => pathname.startsWith(path));
  if (noNav) {
    return null;
  }
  const isFixed = "/";
  const isBlock = "/shop";

  const navClass = cn("nav", {
    "fixed! left-0 right-0  top-0": pathname === isFixed,
    "flex!": pathname === isBlock,
  });

  const isLogged = !!session || pathname.startsWith("/shop");
  return (
    <nav className={navClass}>
      <div className={logoClass}>
        <div className={logoIconClass}>
          <Image
            className={imgLogoClass}
            src="/logo/logo.png"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span className={spanLogo}>Galactic Horizons</span>
      </div>
     {pathname === isFixed && <ul className={navLinksClass}>
        <li>
          <a href="#planets">Planets</a>
        </li>
        <li>
          <a href="#safety">Safety</a>
        </li>
        <li>
          <a href="#why-us">Why Us</a>
        </li>
      </ul>}
      <div className={buttonDiv}>
        <Button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={darkToggleClass}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </Button>

        {isLogged ? (
          <Button
            type="button"
            onClick={() => signOut()}
            className={navCtaClass}
          >
            Logout
          </Button>
        ) : (
          <Button type="button" className={navCtaClass} asChild>
            <Link href="/login"> Book Now</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
