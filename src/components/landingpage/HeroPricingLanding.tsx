import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

import SpaceParallaxHero from "./HeroSec";

export default function HeroPricingLanding() {
  // Hero Classes
  const heroPlaceholderClass = cn("hero-placeholder");


  // Planets (Pricing) Classes
  const planetsSectionClass = cn("section", "planets-section");
  const containerClass = cn(`${'container'} text-left flex flex-col items-center  justify-center`);
  const sectionLabelClass = cn(`${'section-label'} text-left w-full`);
  const sectionTitleClass = cn(`${"section-title"} text-left w-full`);
  const sectionSubClass = cn(`${"section-sub"}  text-left w-full!`);
  const planetsGridClass = cn(`${"planets-grid"} w-full flex flex-wrap justify-center  items-center gap-4!`);

  // Planet Cards Classes
  const planetCardClass = cn(`${'planet-card'} max-w-110  sm:min-h-130 sm:min-w-5/11 sm:max-w-5/12 sm:max-h-125 `);
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
                <Image src="/planets/jupiter.webp" alt="Jupiter" fill />
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
