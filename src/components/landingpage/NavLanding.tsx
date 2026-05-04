import { cn } from "@/lib/utils";
import Image from "next/image";



export default function NavLanding() {
  const navClass = cn('nav');
  const logoClass = cn('logo');
  const imgLogoClass = cn('img-logo');
  const logoIconClass = cn('logo-icon');
  const navLinksClass = cn('nav-links');
  const navCtaClass = cn('nav-cta');
  const darkToggleClass = cn('dark-toggle');

  return (
    <nav className={navClass}>
      <div className={logoClass}>
        <div className={logoIconClass}>
<Image className={imgLogoClass} src="/logo/logo.png" alt="Logo" fill  />
        </div>
        <span>Galactic Horizons</span>
      </div>
      <div className={navLinksClass}>
        <a href="#pianeti">Planets</a>
        <a href="#sicurezza">Security</a>
        <a href="#perche-noi">Why Us</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className={darkToggleClass}>🌙</button>
        <button className={navCtaClass}>Book Now</button>
      </div>
    </nav>
  );
}