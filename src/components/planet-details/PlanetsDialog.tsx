"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

// ── Costanti parallax ─────────────────────────────────────────
const LERP = 0.055;
const S_BG = 20;
const S_PLANET = 12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface Props {
  slug: string;
  description?: string;
  key: string;
}

export default function PlanetsDialog({ slug, description }: Props) {
  const { data: session } = useSession();
  const isLogged = !!session;
  let path = isLogged ? "/shop" : "/login";
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();
  const imgPath = slug.toLowerCase();

  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let targetX = 0,
      targetY = 0;
    let idleT = 0;
    let isActive = false;
    let timeout: ReturnType<typeof setTimeout>;
    let rafId: number;

    const applyTransforms = (nx: number, ny: number) => {
      if (bgRef.current)
        bgRef.current.style.transform = `translate(${-nx * S_BG}px, ${-ny * S_BG}px)`;

      if (planetRef.current)
        planetRef.current.style.transform = `translate(${nx * S_PLANET}px, ${ny * S_PLANET}px)`;
    };

    const animate = () => {
      if (isActive) {
        targetX = lerp(targetX, mouseX, LERP);
        targetY = lerp(targetY, mouseY, LERP);
      } else {
        idleT += 0.003;
        targetX = lerp(targetX, Math.sin(idleT * 0.6) * 0.12, 0.012);
        targetY = lerp(targetY, Math.cos(idleT * 0.5) * 0.08, 0.012);
      }
      applyTransforms(targetX, targetY);
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Se il mouse è fuori dalla scene, torna all'idle
      const inScene =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inScene) {
        isActive = false;
        return;
      }

      // Normalizza -1 → +1 relativo alla scene
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      isActive = true;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isActive = false;
      }, 2500);
    };

    // ✅ Ascolta su document — bypassa l'overlay di Radix
    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Classi ────────────────────────────────────────────────────

  const contentClass = cn(
    "!p-0 !overflow-hidden",
    "!bg-transparent !border-none !shadow-none",
    "!w-[min(98vw,92vh)] !max-w-[min(98vw,92vh)]",
    "!h-[min(98vw,92vh)]",
    "!rounded-3xl",
  );

  const titleClass = cn(
    "absolute top-0 left-0 w-full z-40 pt-6 px-6 pb-10",
    "text-center text-white uppercase tracking-[0.25em]",
    "text-2xl md:text-4xl font-bold pointer-events-none",
    "bg-gradient-to-b from-black/70 to-transparent",
  );

  const footerClass = cn(
    "absolute bottom-5 left-1/2 -translate-x-1/2 z-40",
    "w-[70%]",
    "px-6 pt-3 pb-4",
    "flex flex-col gap-3",
    "rounded-2xl",
    "bg-black/25 backdrop-blur-md",
    "border border-white/8",
    "shadow-[0_4px_30px_rgba(0,0,0,0.25)]",
  );
const handleClose = () => {
  if (!isOpen) return;

  setIsOpen(false);

  setTimeout(() => {
    router.back();
  }, 150);
};
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {  if (!open) handleClose()}}>
      <DialogContent className={contentClass}>
        <div
          ref={sceneRef}
          className="relative w-full h-full overflow-hidden rounded-3xl"
        >
          <DialogTitle className={titleClass}>{slug}</DialogTitle>

          <div
            ref={bgRef}
            className="absolute will-change-transform"
            style={{
              top: "-8%",
              left: "-8%",
              width: "116%",
              height: "116%",
              transformOrigin: "center center",
              zIndex: 10,
            }}
          >
            <Image
              src="/planets-detail/bg-space.png"
              fill
              priority
              alt="space background"
              className="object-cover"
            />
          </div>

          {/* ── LAYER 2: Pianeta — centrato con top/left 17.5%
              NO translate(-50%,-50%) → JS scrive transform libero  */}
          <div
            ref={planetRef}
            className="absolute will-change-transform"
            style={{
              top: "17.5%",
              left: "17.5%",
              width: "65%",
              height: "65%",
              transformOrigin: "center center",
              zIndex: 20,
            }}
          >
            <Image
              src={`/planets-detail/${imgPath}.png`}
              fill
              priority
              alt={`planet ${slug}`}
              className="object-contain drop-shadow-[0_0_60px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* ── LAYER 3: Oblò — FISSO, nessun ref, nessun transform  */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 30 }}
          >
            <Image
              src="/planets-detail/oblò.png"
              fill
              priority
              alt="ship porthole"
              className="object-cover"
            />
          </div>

          {/* ── Footer glass ──────────────────────────────────── */}
          <div className={footerClass}>
            <p className="text-white/45 text-xs font-light leading-relaxed text-center tracking-wide line-clamp-2">
              {description ??
                `Explore the wonders of ${slug} — one of the most fascinating destinations in our solar system.`}
            </p>
            <div className="flex justify-center items-center gap-3">
              <Button
                variant="outline"
                className={cn(
                  "!bg-transparent !border !border-white/15",
                  "!text-white/60 hover:!text-white hover:!bg-white/5",
                  "!rounded-xl !tracking-wider !uppercase !text-xs !px-5",
                  "!transition-all !duration-200",
                )}
                onClick={ handleClose}
              >
                Cancel
              </Button>
              <Button
                className={cn(
                  "!bg-gradient-to-r !from-cyan-500 !to-blue-600",
                  "hover:!from-cyan-400 hover:!to-blue-500",
                  "!text-white font-semibold !tracking-wider !uppercase !text-xs !px-5",
                  "!border-0 !rounded-xl",
                  "!shadow-[0_0_20px_rgba(0,200,255,0.2)]",
                  "!transition-all !duration-200",
                )}
                onClick={() => {
                  setIsOpen(false);
                  router.push(path);
                }}
              >
                Book now a unic holiday
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
