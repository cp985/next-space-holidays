import { Variants } from "framer-motion";
export interface PlanetType {
 
    id: number;
    type: string;
    name: string;
    image: string;
    description: string;
    activities: string[];
    variants?: Variants;
  
}

export const planets : PlanetType[] = [{
    id: 1,
    name: "Mars",
    type: "Basic",
    image: "/planets/mars.webp",
    description: "The red planet is a dusty, cold, desert world with a very thin atmosphere.",
    activities: ["Exploration Canyon", "Base Alpha Dome"],
},
{
    id: 2,
    type:"Premium",
    name: "Jupiter",
    image: "/planets/jupiter.webp",
    description: "The largest planet in our solar system, Jupiter is a gas giant.",
    activities: ["Space Outpost","Moon Cruises"],
},
{
    id: 3,
    name: "Saturn",
    type: "Exclusive",
    image: "/planets/saturn.webp",
    description: "Saturn is the sixth planet from the Sun and the second largest in the Solar System.",
    activities: ["Space Outpost","Moon Cruises"],
},
{
    id: 4,
    name: "Mercury",
    type: "Premium",
    image: "/planets/mercury.webp",
    description: "The closest world to our Sun. A land of extreme contrasts, where you can watch the sunrise twice in one day.",
    activities: ["Solar Flare Observation", "Magma Trekking"],
  },
  {
    id: 5,
    name: "Venus",
    type: "Luxury",
    image: "/planets/venus.webp",
    description: "Hidden beneath thick golden clouds, our sister planet offers high-altitude floating resorts.",
    activities: ["Cloud-City Dining", "Sulfuric Sunset Photography"],
  },
  {
    id: 6,
    name: "Uranus",
    type: "Premium",
    image: "/planets/uranus.webp",
    description: "The tilted ice giant. A cyan-hued world where diamonds may rain from the sky.",
    activities: ["Deep-Core Sound Harvesting", "Vertical Ring-Gliding"],
  },
  {
    id: 7,
    name: "Neptune",
    type: "Exclusive",
    image: "/planets/neptune.webp",
    description: "The furthest sentinel of our system. A deep cobalt sphere whipped by the fastest winds in the galaxy.",
    activities: ["Supersonic Wind-Surfing", "Triton Cryo-Geyser Tours"],
  },
  {
    id: 8,
    name: "The Moon",
    type: "Basic",
    image: "/planets/moon.webp",
    description: "Our closest celestial neighbor. Walk where legends first left their footprints and experience the breathtaking of the Moon.",
    activities: ["Low-Gravity Lunar Hikes", "Apollo Site Pilgrimages"],
}

]

