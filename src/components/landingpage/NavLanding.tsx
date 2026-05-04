import { cn } from "@/lib/utils";


export default function NavLanding() {
  const navClass = cn('nav');
  const logoClass = cn('logo');
  const logoIconClass = cn('logo-icon');
  const navLinksClass = cn('nav-links');
  const navCtaClass = cn('nav-cta');
  const darkToggleClass = cn('dark-toggle');

  return (
    <nav className={navClass}>
      <div className={logoClass}>
        <div className={logoIconClass}>★</div>
        <span>LogoBrand</span>
      </div>
      <div className={navLinksClass}>
        <a href="#pianeti">Pianeti</a>
        <a href="#sicurezza">Sicurezza</a>
        <a href="#perche-noi">Perché Noi</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className={darkToggleClass}>🌙</button>
        <button className={navCtaClass}>Prenota Ora</button>
      </div>
    </nav>
  );
}