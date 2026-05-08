"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function NavLanding() {
  const navClass = cn("nav");
  const logoClass = cn("logo");
  const imgLogoClass = cn(`${'img-logo'} w-full!`);
  const logoIconClass = cn(`${'logo-icon'} min-w-11 min-h-11  sm:w-13! sm:h-13!`);
  const navLinksClass = cn("nav-links");
  const navCtaClass = cn("nav-cta");
  const darkToggleClass = cn("dark-toggle");
  const buttonDiv = cn("flex items-center gap-1");
  const spanLogo = cn("text-lg sm:text-xl");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);



  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
      <ul className={navLinksClass}>
        <li>
          <a href="#planets">Planets</a>
        </li>
        <li>
          <a href="#safety">Safety</a>
        </li>
        <li>
          <a href="#why-us">Why Us</a>
        </li>
      </ul>
      <div className={buttonDiv}>
        <Button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={darkToggleClass}>
          {theme === "dark" ? "🌞" : "🌙"}
        </Button>
     
        <Button type="button"   className={navCtaClass} asChild>
           <Link href="/login"> Book Now</Link>
        </Button>
      </div>
    </nav>
  );
}
