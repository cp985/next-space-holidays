import { cn } from "@/lib/utils";
import Image from "next/image";

import SpaceParallaxHero from "./HeroSec";

export default function HeroPricingLanding() {
  // Hero Classes
  const heroPlaceholderClass = cn("hero-placeholder");
  const starsBgClass = cn("stars-bg");
  const orbitRing1Class = cn("orbit-ring");
  const orbitRing2Class = cn("orbit-ring");
  const heroInnerClass = cn("hero-placeholder-inner");
  const heroBadgeClass = cn("hero-badge");
  const heroDotClass = cn("hero-badge-dot");
  const heroLabelClass = cn("hero-label");
  const heroSubtitleClass = cn("hero-subtitle");
  const ctaGroupClass = cn("hero-cta-group");
  const btnPrimaryClass = cn("btn-primary");
  const btnOutlineClass = cn("btn-outline");
  const heroNoteClass = cn("hero-note");

  // Planets (Pricing) Classes
  const planetsSectionClass = cn("section", "planets-section");
  const containerClass = cn("container");
  const sectionLabelClass = cn("section-label");
  const sectionTitleClass = cn("section-title");
  const sectionSubClass = cn("section-sub");
  const planetsGridClass = cn("planets-grid");

  // Planet Cards Classes
  const planetCardClass = cn("planet-card");
  const planetImgClass = cn("planet-img");
  const planetBodyClass = cn("planet-body");
  const planetTagClass = cn("planet-tag");
  const planetNameClass = cn("planet-name");
  const planetDescClass = cn("planet-desc");
  const attractionsClass = cn("attractions");
  const attractionClass = cn("attraction");
  const attractionDotClass = cn("attraction-dot");
  const planetCtaClass = cn("planet-cta");

  return (
    <div>
      {/* SEZIONE HERO */}
      <section className={heroPlaceholderClass}>
        <SpaceParallaxHero />
      </section>

      {/* SEZIONE PIANETI (PRICING) */}
      <section className={planetsSectionClass} id="pianeti">
        <div className={containerClass}>
          <span className={sectionLabelClass}>Destinations</span>
          <h2 className={sectionTitleClass}>
            Explore the <em>Planets</em>
          </h2>
          <p className={sectionSubClass}>
            Choose your favorite planet and embark on a journey to the stars.
          </p>

          <div className={planetsGridClass}>
            {/* CARD 1 - MARS */}
            <div className={planetCardClass}>
              <div className={planetImgClass}>
                <Image src="/planets/mars.webp" alt="Mars" fill />
                
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Basic</span>
                <h3 className={planetNameClass}>Mars</h3>
                <p className={planetDescClass}>
                  The red planet is a dusty, cold, desert world with a very thin
                  atmosphere.
                </p>
                <div className={attractionsClass}>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Esplorazione
                    Canyon
                  </div>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Base Alpha Dome
                  </div>
                </div>
                <button className={planetCtaClass}>Discover Mars</button>
              </div>
            </div>

            {/* CARD 2 - JUPITER */}
            <div className={planetCardClass}>
              <div className={planetImgClass}>
                <Image src="/planets/jupiter.jpg" alt="Jupiter" fill />
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Premium</span>
                <h3 className={planetNameClass}>Jupiter</h3>
                <p className={planetDescClass}>
                  The largest planet in our solar system, Jupiter is a gas
                  giant.
                </p>
                <div className={attractionsClass}>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Orbita Spaziale
                  </div>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Crociere Lunari
                  </div>
                </div>
                <button className={planetCtaClass}>Discover Jupiter</button>
              </div>
            </div>

            {/* CARD 3 - SATURN */}
            <div className={planetCardClass}>
              <div className={planetImgClass}>
                <Image src="/planets/saturn.webp" alt="Saturn" fill />
                <div className={cn("saturn-ring")}></div>
              </div>
              <div className={planetBodyClass}>
                <span className={planetTagClass}>Exclusive</span>
                <h3 className={planetNameClass}>Saturn</h3>
                <p className={planetDescClass}>
                  Saturn is the sixth planet from the Sun and the second largest
                  in the Solar System.
                </p>
                <div className={attractionsClass}>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Safari negli
                    Anelli
                  </div>
                  <div className={attractionClass}>
                    <div className={attractionDotClass}></div>Hotel di Lusso
                    Orbitale
                  </div>
                </div>
                <button className={planetCtaClass}>Discover Saturn</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
