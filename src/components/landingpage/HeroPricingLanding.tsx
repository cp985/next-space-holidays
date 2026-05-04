import { cn } from "@/lib/utils";

import SpaceParallaxHero from "./HeroSec";


export default function HeroPricingLanding() {
  // Hero Classes
  const heroPlaceholderClass = cn('hero-placeholder');
  const starsBgClass = cn('stars-bg');
  const orbitRing1Class = cn('orbit-ring');
  const orbitRing2Class = cn('orbit-ring');
  const heroInnerClass = cn('hero-placeholder-inner');
  const heroBadgeClass = cn('hero-badge');
  const heroDotClass = cn('hero-badge-dot');
  const heroLabelClass = cn('hero-label');
  const heroSubtitleClass = cn('hero-subtitle');
  const ctaGroupClass = cn('hero-cta-group');
  const btnPrimaryClass = cn('btn-primary');
  const btnOutlineClass = cn('btn-outline');
  const heroNoteClass = cn('hero-note');

  // Planets (Pricing) Classes
  const planetsSectionClass = cn('section', 'planets-section');
  const containerClass = cn('container');
  const sectionLabelClass = cn('section-label');
  const sectionTitleClass = cn('section-title');
  const sectionSubClass = cn('section-sub');
  const planetsGridClass = cn('planets-grid');
  
  // Planet Cards Classes
  const planetCardClass = cn('planet-card');
  const planetImgClass = cn('planet-img');
  const planetBodyClass = cn('planet-body');
  const planetTagClass = cn('planet-tag');
  const planetNameClass = cn('planet-name');
  const planetDescClass = cn('planet-desc');
  const attractionsClass = cn('attractions');
  const attractionClass = cn('attraction');
  const attractionDotClass = cn('attraction-dot');
  const planetCtaClass = cn('planet-cta');

  return (
    <div>
      {/* SEZIONE HERO */}
      <section className={heroPlaceholderClass}>
 <SpaceParallaxHero />
      </section>

      {/* SEZIONE PIANETI (PRICING) */}
      <section className={planetsSectionClass} id="pianeti">
        <div className={containerClass}>
          <span className={sectionLabelClass}>Le Destinazioni</span>
          <h2 className={sectionTitleClass}>Esplora i <em>Pianeti</em></h2>
          <p className={sectionSubClass}>
            Scegli il livello di avventura adatto a te, da Marte fino ai giganti gassosi.
          </p>

          <div className={planetsGridClass}>
            {/* CARD 1 - MARS */}
            <div className={planetCardClass}>
              <div className={cn(planetImgClass, 'planet-mars')}>
                <div className={cn('planet-orb')}></div>
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Avventura Base</span>
                <h3 className={planetNameClass}>Marte</h3>
                <p className={planetDescClass}>Il pianeta rosso ti aspetta per un'esperienza di colonizzazione unica.</p>
                <div className={attractionsClass}>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Esplorazione Canyon</div>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Base Alpha Dome</div>
                </div>
                <button className={planetCtaClass}>Scopri i dettagli</button>
              </div>
            </div>

            {/* CARD 2 - JUPITER */}
            <div className={planetCardClass}>
              <div className={cn(planetImgClass, 'planet-jupiter')}>
                <div className={cn('planet-orb')}></div>
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Premium</span>
                <h3 className={planetNameClass}>Giove</h3>
                <p className={planetDescClass}>Un tour orbitale spettacolare sopra la Grande Macchia Rossa.</p>
                <div className={attractionsClass}>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Orbita Spaziale</div>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Crociere Lunari</div>
                </div>
                <button className={planetCtaClass}>Scegli Giove</button>
              </div>
            </div>

            {/* CARD 3 - SATURN */}
            <div className={planetCardClass}>
              <div className={cn(planetImgClass, 'planet-saturn')}>
                <div className={cn('planet-orb')}></div>
                <div className={cn('saturn-ring')}></div>
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Lusso Estremo</span>
                <h3 className={planetNameClass}>Saturno</h3>
                <p className={planetDescClass}>Vivi l'esperienza più esclusiva del sistema solare tra gli anelli.</p>
                <div className={attractionsClass}>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Safari negli Anelli</div>
                  <div className={attractionClass}><div className={attractionDotClass}></div>Hotel di Lusso Orbitale</div>
                </div>
                <button className={planetCtaClass}>Vivi il lusso</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}