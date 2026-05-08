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
    description: "The closest world to our Sun. A land of extreme contrasts, where you can watch the sunrise twice in one day from the edge of vast iron craters.",
    activities: ["Solar Flare Observation", "Magma Trekking"],
  },
  {
    id: 5,
    name: "Venus",
    type: "Luxury",
    image: "/planets/venus.webp",
    description: "Hidden beneath thick golden clouds, our sister planet offers high-altitude floating resorts far above its crushing surface pressures.",
    activities: ["Cloud-City Dining", "Sulfuric Sunset Photography"],
  },
  {
    id: 5,
    name: "Uranus",
    type: "Premium",
    image: "/planets/uranus.webp",
    description: "The tilted ice giant. A cyan-hued world where diamonds may rain from the sky and the rings glow with a ghostly, pale light.",
    activities: ["Deep-Core Sound Harvesting", "Vertical Ring-Gliding"],
  },
  {
    id: 6,
    name: "Neptune",
    type: "Exclusive",
    image: "/planets/neptune.webp",
    description: "The furthest sentinel of our system. A deep cobalt sphere whipped by the fastest winds in the galaxy, orbiting in eternal twilight.",
    activities: ["Supersonic Wind-Surfing", "Triton Cryo-Geyser Tours"],
  },
  {
    id: 7,
    name: "The Moon",
    type: "Basic",
    image: "/planets/moon.webp",
    description: "Our closest celestial neighbor. Walk where legends first left their footprints and experience the breathtaking 'Earthrise' from the desolate beauty of the Sea of Tranquility.",
    activities: ["Low-Gravity Lunar Hikes", "Apollo Site Pilgrimages"],
}

]

export const systemCard : PlanetType ={
      
    id: 7,
    name: "The Solar System",
    type: "Adventure",
    image: "/planets/system.jpg",
    description: "Explore the planets of our solar system and discover the wonders of the universe whit us .",
    activities: ["Adventures in the space", "The lower price for the best experience"],

}