"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
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
          />
        </div>
        <span className={spanLogo}>Galactic Horizons</span>
      </div>
      <ul className={navLinksClass}>
        <li>
          <a href="#pianeti">Planets</a>
        </li>
        <li>
          <a href="#sicurezza">Security</a>
        </li>
        <li>
          <a href="#perche-noi">Why Us</a>
        </li>
      </ul>
      <div className={buttonDiv}>
        <Button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={darkToggleClass}>
          {theme === "dark" ? "🌞" : "🌙"}
        </Button>
        <Button type="button" className={navCtaClass}>
          Book Now
        </Button>
      </div>
    </nav>
  );
}
