import { cn } from "@/lib/utils";

import { planets, systemCard, type PlanetType } from "@/lib/content";
import Planet from "../custom/Planet";

import SpaceParallaxHero from "./HeroSec";

export default function HeroPricingLanding() {
  // Hero Classes
  const heroPlaceholderClass = cn("hero-placeholder");

  // Planets (Pricing) Classes
  const planetsSectionClass = cn("section", "planets-section");
  const containerClass = cn(
    `${"container"} text-left flex flex-col items-center  justify-center`,
  );
  const sectionLabelClass = cn(`${"section-label"} text-left w-full`);
  const sectionTitleClass = cn(`${"section-title"} text-left w-full`);
  const sectionSubClass = cn(`${"section-sub"}  text-left w-full!`);
  const planetsGridClass = cn(
    `${"planets-grid"} w-full flex flex-wrap justify-center  items-center gap-4!`,
  );

  const previewPlanets = planets.slice(0, 3);

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
            {previewPlanets.map((planet: PlanetType) => (
              <Planet key={planet.id} {...planet} />
            ))}
            <Planet {...systemCard} />
          </div>
        </div>
      </section>
    </div>
  );
}
