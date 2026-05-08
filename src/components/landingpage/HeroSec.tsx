"use client";

import { useEffect, useRef,useState } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// /public/parallax/bg.png
// /public/parallax/far-east.png   ← Saturno  (destra)
// /public/parallax/far-west.png   ← Marte    (sinistra)
// /public/parallax/near-mid.png   ← Giove    (centro)
// ─────────────────────────────────────────────

const LERP = 0.04;

// Zoom massimo per layer quando mouseY = top (-1)
// Curva quadratica → lento all'inizio, poi "vola dentro"
const ZOOM_MAX = {
  bg:   0.08,  // sfondo quasi fermo
  east: 0.35,  // Saturno zoom moderato
  west: 0.35,  // Marte zoom moderato
  mid:  2.20,  // Giove — vola attraverso (scale arriva a 3.2)
};

// Pan orizzontale base (px per unità di mouseX normalizzato)
const PAN_BASE = {
  bg:   14,
  east: 50,
  west: 50,
  mid:  90,
};

// Quanto cresce il pan quando sei zoomato (rivela pianeti ai lati)
const PAN_ZOOM_MULT = 3.0;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Curva ease-in quadratica per lo zoom → sensazione di accelerazione
function zoomCurve(raw: number): number {
  return raw * raw;
}

export default function SpaceParallaxHero() {
  const sceneRef  = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const eastRef   = useRef<HTMLDivElement>(null);
  const westRef   = useRef<HTMLDivElement>(null);
  const midRef    = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

useEffect(() => {
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let idleT = 0;
  let isActive = false;
  let timeout: ReturnType<typeof setTimeout>;
  let rafId: number;

  const applyTransforms = (nx: number, ny: number) => {
    const zoomRaw  = Math.max(0, -(ny - 0.5));
    const zoom     = zoomCurve(zoomRaw);
    const panBoost = 1 + zoom * (PAN_ZOOM_MULT - 1);

    const t = (layer: keyof typeof ZOOM_MAX) => {
      const scale = 1 + zoom * ZOOM_MAX[layer];
      const tx    = -nx * PAN_BASE[layer] * panBoost;
      const ty    = ny * 6 * (1 - zoom * 0.8);
      return `scale(${scale}) translate(${tx}px, ${ty}px)`;
    };

    if (bgRef.current)   bgRef.current.style.transform   = t("bg");
    if (eastRef.current) eastRef.current.style.transform = t("east");
    if (westRef.current) westRef.current.style.transform = t("west");
    if (midRef.current)  midRef.current.style.transform  = t("mid");
  };

  const animate = () => {
    if (isActive) {
      targetX = lerp(targetX, mouseX, LERP);
      targetY = lerp(targetY, mouseY, LERP);
    } else {
      idleT += 0.003;
      targetX = lerp(targetX, Math.sin(idleT * 0.6) * 0.10, 0.012);
      targetY = lerp(targetY, Math.cos(idleT * 0.4) * 0.06 + 0.90, 0.012);
    }
    applyTransforms(targetX, targetY);
    rafId = requestAnimationFrame(animate);
  };

  const onMouseMove = (e: MouseEvent) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Cursore custom — fixed, usa clientX/Y diretto
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    }
    if (ringRef.current) {
      ringRef.current.style.left = `${e.clientX}px`;
      ringRef.current.style.top  = `${e.clientY}px`;
    }

    // Normalizza posizione per parallax
    mouseX   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    isActive = true;

    // Torna all'idle dopo 2.5s senza movimento
    clearTimeout(timeout);
    timeout = setTimeout(() => { isActive = false; }, 2500);
  };

  const onTouchMove = (e: TouchEvent) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t  = e.touches[0];
    mouseX   = ((t.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY   = ((t.clientY - rect.top)  / rect.height - 0.5) * 2;
    isActive = true;
  };

  // ✅ onLeave nasconde SOLO il cursore — non tocca isActive
  const onLeave = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
    if (ringRef.current)   ringRef.current.style.opacity   = "0";
  };

  const onEnter = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "1";
    if (ringRef.current)   ringRef.current.style.opacity   = "1";
  };

  // ✅ mousemove/leave/enter sulla section → cursore resta dentro
  // ✅ touchmove sul document → mobile funziona comunque
  const scene = sceneRef.current;
  if (!scene) return;

  scene.addEventListener("mousemove",  onMouseMove);
  scene.addEventListener("mouseleave", onLeave);
  scene.addEventListener("mouseenter", onEnter);
  document.addEventListener("touchmove", onTouchMove, { passive: true });
  rafId = requestAnimationFrame(animate);

  return () => {
    scene.removeEventListener("mousemove",  onMouseMove);
    scene.removeEventListener("mouseleave", onLeave);
    scene.removeEventListener("mouseenter", onEnter);
    document.removeEventListener("touchmove", onTouchMove);
    clearTimeout(timeout);
    cancelAnimationFrame(rafId);
  };
}, []);

  // Layer condiviso: inset largo per dare margine al pan senza vedere bordi
 const [mounted, setMounted] = useState(false);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setMounted(true);
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

const currentInset = !mounted ? "-15%" : (isMobile ? "-30%" : "-15%");
const currentSize = !mounted ? "130%" : (isMobile ? "170%" : "130%");

const layerStyle: React.CSSProperties = {
  position: "absolute",
  top: currentInset,
  left: currentInset,
  right: currentInset,
  bottom: currentInset,
  width: currentSize,
  height: currentSize,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  transformOrigin: "center center",
  willChange: "transform",
  zIndex: 0 
};
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseHint {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.5; }
        }
        .anim-title    { animation: fadeInUp 1.8s ease-out 0.4s both; }
        .anim-subtitle { animation: fadeInUp 1.8s ease-out 0.9s both; }
        .anim-hint     { animation: pulseHint 3s ease-in-out infinite 1.8s; }
      `}</style>

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed z-[9999] pointer-events-none",
          "w-2 h-2 rounded-full bg-white/90",
          "-translate-x-1/2 -translate-y-1/2",
          "mix-blend-difference transition-opacity duration-300",
          "hidden md:block"
        )}
         style={{ opacity: 0 }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className={cn(
          "fixed z-[9998] pointer-events-none",
          "w-9 h-9 rounded-full border border-white/30",
          "-translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-300",
          "hidden md:block"
        )}
         style={{ opacity: 0 }}
      />

      <section
        ref={sceneRef}
        className={cn(
          "relative w-full h-screen overflow-hidden",
          "bg-black cursor-none select-none"
        )}
      >
        {/* ── LAYER 0: sfondo stellato */}
        <div
          ref={bgRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/bg.png')",
            zIndex: 0,
          }}
        />

        {/* ── LAYER 1: Saturno (destra) */}
        <div
          ref={eastRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/far-east.png')",
            zIndex: 1,
          }}
        />

        {/* ── LAYER 2: Marte (sinistra) */}
        <div
          ref={westRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/far-west.png')",
            zIndex: 2,
          }}
        />

        {/* ── LAYER 3: Giove (centro) — fly-through */}
        <div
          ref={midRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/near-mid.png')",
            zIndex: 3,
          }}
        />

        {/* Vignette — si alleggerisce quando si zoom in */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 4,
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* ── UI */}
        <div
          className={cn(
            "absolute inset-0 z-10",
            "flex flex-col items-center justify-center",
            "pointer-events-none"
          )}
        >
          <h1
            className={cn("anim-title", "font-serif font-light text-white text-center uppercase px-6! md:px-0!")}
            style={{
               fontSize: "clamp(1.6rem, 5vw, 5rem)",
              letterSpacing: "0.22em",
              textShadow: "0 0 80px rgba(120,160,255,0.35), 0 2px 24px rgba(0,0,0,0.9)",
            }}
          >
           Travel in the Solar System
          </h1>

          <p
            className={cn(
              "anim-subtitle",
              "mt-4 font-serif font-light text-white/40",
              "text-center uppercase tracking-[0.4em] text-sm"
            )}
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
          >
            Take a break in the space
          </p>

          <div
            className={cn(
              "anim-hint",
              "absolute bottom-10",
              "flex items-center gap-3",
              "text-[0.6rem] text-white/25 tracking-[0.3em] uppercase"
            )}
          >
            <span>↑ fly in</span>
            <span className="w-px h-3 bg-white/20" />
            <span>↓ pull back</span>
            <span className="w-px h-3 bg-white/20" />
            <span>↔ pan</span>
          </div>
        </div>
      </section>
    </>
  );
}