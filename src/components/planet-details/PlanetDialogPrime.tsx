'use client'


import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";




// ── Costanti parallax ─────────────────────────────────────────
const LERP     = 0.055;
const S_BG     = 20;
const S_PLANET = 12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface Props {
  slug:         string;
  description?: string;
}
interface Props {
  slug:         string;
  description?: string;
    
    
}

export default function PlanetDetailPage( {slug,description }: Props ) {
  const router  = useRouter();
    const { data: session } = useSession();
  const isLogged = !!session;
  let path = isLogged ? "/shop" : "/login";
  
  const imgPath = slug.toLowerCase()
  

  const sceneRef  = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let idleT   = 0;
    let isActive = false;
    let timeout: ReturnType<typeof setTimeout>;
    let rafId:   number;

    const applyTransforms = (nx: number, ny: number) => {
      if (bgRef.current)
        bgRef.current.style.transform =
          `translate(${-nx * S_BG}px, ${-ny * S_BG}px)`;

      if (planetRef.current)
        planetRef.current.style.transform =
          `translate(${nx * S_PLANET}px, ${ny * S_PLANET}px)`;
    };

    const animate = () => {
      if (isActive) {
        targetX = lerp(targetX, mouseX, LERP);
        targetY = lerp(targetY, mouseY, LERP);
      } else {
        idleT  += 0.003;
        targetX = lerp(targetX, Math.sin(idleT * 0.6) * 0.12, 0.012);
        targetY = lerp(targetY, Math.cos(idleT * 0.5) * 0.08, 0.012);
      }
      applyTransforms(targetX, targetY);
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;

      const inScene =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top  &&
        e.clientY <= rect.bottom;

      if (!inScene) {
        isActive = false;
        return;
      }

      mouseX   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      isActive = true;

      clearTimeout(timeout);
      timeout = setTimeout(() => { isActive = false; }, 2500);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Classi ────────────────────────────────────────────────────

  const pageWrapper = cn(
    "min-h-dvh w-full bg-[#020617] flex items-center justify-center p-4 overflow-hidden"
  );

  const sceneContainer = cn(
    "relative overflow-hidden  md:rounded-[4rem]", // Oblò più tondo su mobile
    "w-[min(95vw,90vh)] aspect-square",
    "border-4 border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]",
    "bg-black"
  );

  const titleClass = cn(
    "absolute top-0 left-0 w-full z-40 pt-12 px-6 pb-16",
    "text-center text-white uppercase tracking-[0.4em]",
    "text-4xl  font-black pointer-events-none",
    "bg-gradient-to-b from-black/80 via-black/40 to-transparent",
    "drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
  );

  const footerClass = cn(
   "absolute bottom-0 left-1/2 -translate-x-1/2 z-40",
    "w-[85%]",
    "px-6 pt-3 pb-4",
    "flex flex-col gap-3",
    "rounded-2xl",
    "bg-black/25 backdrop-blur-md",
    "border border-white/8",
    "shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
  );

  return (
    <main className={pageWrapper}>
      {/* Contenitore Scena (l'oblò della nave) */}
      <div ref={sceneRef} className={sceneContainer}>
        
        {/* Titolo Pianeta */}
        <h1 className={titleClass}>{slug}</h1>

        {/* LAYER 1: Spazio Profondo */}
        <div
          ref={bgRef}
          className="absolute will-change-transform"
          style={{
            top:    "-10%",
            left:   "-10%",
            width:  "120%",
            height: "120%",
            transformOrigin: "center center",
            zIndex: 10,
          }}
        >
          <Image
            src="/planets-detail/bg-space.png"
            fill priority alt="deep space"
            className="object-cover opacity-80"
          />
        </div>

        {/* LAYER 2: Il Pianeta */}
        <div
          ref={planetRef}
          className="absolute will-change-transform"
          style={{
            top:    "15%",
            left:   "15%",
            width:  "70%",
            height: "70%",
            transformOrigin: "center center",
            zIndex: 20,
          }}
        >
          <Image
          
            src={`/planets-detail/${imgPath}.png`}
            fill 
            priority 
            alt={`planet ${slug}`}
            className="object-contain drop-shadow-[0_0_80px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* LAYER 3: Frame dell'Oblò (Fisso sopra tutto) */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{ zIndex: 30 }}
        >
          <Image
            src="/planets-detail/oblò.png"
            fill priority alt="ship porthole frame"
            className="object-cover"
          />
        </div>

        {/* Footer Info (Didascalia aumentata) */}
        <div className={footerClass}>
          <p className="text-white/70 text-sm -base font-light leading-relaxed text-center tracking-wide">
           
            Prepare for an unprecedented journey to the heart of ${slug}. Witness breathtaking cosmic landscapes and experience the luxury of space travel in our tiered orbital suites.
          </p>
          
          <div className="flex justify-center items-center gap-3">
            <Button
              variant="outline"
              className={cn(
                  "!bg-transparent !border !border-white/15",
                  "!text-white/60 hover:!text-white hover:!bg-white/5",
                  "!rounded-xl !tracking-wider !uppercase !text-xs !px-5",
                  "!transition-all !duration-200"
                )}
              onClick={() => router.back()}
            >
              <ArrowLeft size={14} className="mr-2" /> Return to Map
            </Button>
            
            <Button
              className={cn(
                  "!bg-gradient-to-r !from-cyan-500 !to-blue-600",
                  "hover:!from-cyan-400 hover:!to-blue-500",
                  "!text-white font-semibold !tracking-wider !uppercase !text-xs !px-5",
                  "!border-0 !rounded-xl",
                  "!shadow-[0_0_20px_rgba(0,200,255,0.2)]",
                  "!transition-all !duration-200"
                )}
              onClick={() => router.push(path)}
            >
              Book your holiday
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}