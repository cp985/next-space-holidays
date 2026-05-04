import cn from 'clsx';

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
            <span>LogoBrand</span>
          </div>
          <p className={footerDescClass}>
            La prima agenzia di viaggi spaziali per civili nel mondo. Esplora nuove dimensioni con noi.
          </p>
          <div className={footerSocialsClass}>
            <a href="#" className={socialBtnClass}>FB</a>
            <a href="#" className={socialBtnClass}>X</a>
            <a href="#" className={socialBtnClass}>IG</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Link Utili</h5>
          <div className={footerLinksClass}>
            <a href="#pianeti">Destinazioni</a>
            <a href="#sicurezza">La Sicurezza</a>
            <a href="#perche-noi">Vantaggi</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Azienda</h5>
          <div className={footerLinksClass}>
            <a href="#about">Chi Siamo</a>
            <a href="#careers">Lavora con Noi</a>
            <a href="#press">Press Kit</a>
          </div>
        </div>

        <div className={footerColClass}>
          <h5>Contatti</h5>
          <div className={footerContactClass}>
            <div className={footerContactItemClass}>📧 info@logobrand.com</div>
            <div className={footerContactItemClass}>📞 +123 456 789</div>
            <div className={footerContactItemClass}>📍 Terminal Spaziale, 01</div>
          </div>
        </div>
      </div>

      <div className={footerBottomClass}>
        <p>&copy; {new Date().getFullYear()} LogoBrand Space. Tutti i diritti riservati.</p>
        <div className={footerLegalClass}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Termini e Condizioni</a>
        </div>
      </div>
    </footer>
  );
}