import { cn } from "@/lib/utils";

export default function FooterLanding() {
  const footerClass = cn('footer');
  const footerGridClass = cn('footer-grid');
  const footerBrandClass = cn('footer-brand');
  const footerDescClass = cn('footer-desc');
  const footerSocialsClass = cn('footer-socials');
  const socialBtnClass = cn('social-btn');
  const footerColClass = cn('footer-col');
  const footerLinksClass = cn('footer-links');
  const footerContactClass = cn('footer-contact');
  const footerContactItemClass = cn('footer-contact-item');
  const footerBottomClass = cn('footer-bottom');
  const footerLegalClass = cn('footer-legal');

  return (
    <footer className={footerClass}>
      <div className={footerGridClass}>
        <div className={footerBrandClass}>
          <div className={cn('logo')}>
            <span>Galactic Horizons</span>
          </div>
          <p className={footerDescClass}>
            The firs space-travel agency for the Solar System. We are dedicated to making your travel experience unforgettable.
          </p>
          <div className={footerSocialsClass}>
            <a href="#" className={socialBtnClass}>FB</a>
            <a href="#" className={socialBtnClass}>X</a>
            <a href="#" className={socialBtnClass}>IG</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Links</h5>
          <div className={footerLinksClass}>
            <a href="#planets">Destinations</a>
            <a href="#safety">Safety</a>
            <a href="#why-us">Why Us</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Info</h5>
          <div className={footerLinksClass}>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Contacts</h5>
          <div className={footerContactClass}>
            <div className={footerContactItemClass}>📧 info@logobrand.com</div>
            <div className={footerContactItemClass}>📞 +123 456 789</div>
            <div className={footerContactItemClass}>📍 Terminal Spaziale, 01</div>
          </div>
        </div>
      </div>

      <div className={footerBottomClass}>
        <p>&copy; {new Date().getFullYear()} Galaxic Horizons. All rights reserved.</p>
        <div className={footerLegalClass}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}