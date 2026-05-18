import { cn } from "@/lib/utils";
import { type PlanetType } from "@/lib/content";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Planet({
  id,
  name,
  type,
  image,
  description,
  activities,
  variants,
}: PlanetType) {
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


  return (
    <motion.div
      variants={variants}
      className={planetCardClass}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={planetImgClass}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={planetBodyClass}>
        <span className={planetTagClass}>{type}</span>
        <h3 className={planetNameClass}>{name}</h3>
        <p className={planetDescClass}>{description}</p>
        <div className={attractionsClass}>
          <div className={attractionClass}>
            <div className={attractionDotClass}></div>
            {activities[0]}
          </div>
          <div className={attractionClass}>
            <div className={attractionDotClass}></div>
            {activities[1]}
          </div>
        </div>

          <Button asChild>
            <Link href={`/planets-details/${name}`} className={planetCtaClass}>Discover {name}</Link>
          </Button>
        
      </div>
    </motion.div>
  );
}
