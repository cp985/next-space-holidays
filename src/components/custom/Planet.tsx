import { cn } from "@/lib/utils";
import { type PlanetType } from "@/lib/content";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Planet(planets: PlanetType) {
  const planetCardClass = cn(
    `${"planet-card"} max-w-110  sm:min-h-130 sm:min-w-5/11 sm:max-w-5/12 sm:max-h-125 `,
  );
  const planetImgClass = cn("planet-img");
  const planetBodyClass = cn("planet-body");
  const planetTagClass = cn("planet-tag");
  const planetNameClass = cn("planet-name");
  const planetDescClass = cn("planet-desc");
  const attractionsClass = cn("attractions");
  const attractionClass = cn("attraction");
  const attractionDotClass = cn("attraction-dot");
  const planetCtaClass = cn("planet-cta");
  const linkBook= cn("w-full text-xl! sm:text-xl! animate-pulse border-2! border-blue-400");

  return (
    <div className={planetCardClass}>
      <div className={planetImgClass}>
        <Image
          src={planets.image}
          alt={planets.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={planetBodyClass}>
        <span className={planetTagClass}>{planets.type}</span>
        <h3 className={planetNameClass}>{planets.name}</h3>
        <p className={planetDescClass}>{planets.description}</p>
        <div className={attractionsClass}>
          <div className={attractionClass}>
            <div className={attractionDotClass}></div>
            {planets.activities[0]}
          </div>
          <div className={attractionClass}>
            <div className={attractionDotClass}></div>
            {planets.activities[1]}
          </div>
        </div>
        {planets.id === 7 ? (
          <Button asChild>
            <Link  href="/login" className={`${planetCtaClass} ${linkBook}`}>Book Now </Link>
          </Button>
        ) : (
          <Button asChild>
       
            <button className={planetCtaClass}>Discover {planets.name}</button>
          </Button>
        )}
      </div>
    </div>
  );
}
