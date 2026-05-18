"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// CONFIGURAZIONI PARALLAX
// ─────────────────────────────────────────────
const LERP = 0.04;
const MOBILE_PAN_REDUCER = 0.4; // Riduce la corsa del pan su mobile per non uscire dai bordi

const ZOOM_MAX = {
  bg: 0.08,
  east: 0.35,
  west: 0.35,
  mid: 2.20,
};

const PAN_BASE = {
  bg: 14,
  east: 50,
  west: 50,
  mid: 90,
};

const PAN_ZOOM_MULT = 3.0;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function zoomCurve(raw: number): number {
  return raw * raw;
}

export default function SpaceParallaxHero2() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eastRef = useRef<HTMLDivElement>(null);
  const westRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Gestione Responsive e Montaggio
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Logica Parallax Animata
  useEffect(() => {
    if (!mounted) return;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let idleT = 0;
    let isActive = false;
    let timeout: ReturnType<typeof setTimeout>;
    let rafId: number;

    // Calcoliamo i Pan Base adattati per il dispositivo corrente
    const adjustedPanBase = isMobile 
      ? {
          bg: PAN_BASE.bg * MOBILE_PAN_REDUCER,
          east: PAN_BASE.east * MOBILE_PAN_REDUCER,
          west: PAN_BASE.west * MOBILE_PAN_REDUCER,
          mid: PAN_BASE.mid * MOBILE_PAN_REDUCER,
        }
      : PAN_BASE;

    const applyTransforms = (nx: number, ny: number) => {
      const zoomRaw = Math.max(0, -(ny - 0.5));
      const zoom = zoomCurve(zoomRaw);
      const panBoost = 1 + zoom * (PAN_ZOOM_MULT - 1);

      const t = (layer: keyof typeof ZOOM_MAX) => {
        const scale = 1 + zoom * ZOOM_MAX[layer];
        // Usiamo adjustedPanBase per evitare tagli su schermi stretti
        const tx = -nx * adjustedPanBase[layer] * panBoost;
        // Ridotto leggermente il ty su mobile per evitare tagli verticali
        const tyMult = isMobile ? 4 : 6;
        const ty = ny * tyMult * (1 - zoom * 0.8);
        return `scale(${scale}) translate(${tx}px, ${ty}px)`;
      };

      if (bgRef.current) bgRef.current.style.transform = t("bg");
      if (eastRef.current) eastRef.current.style.transform = t("east");
      if (westRef.current) westRef.current.style.transform = t("west");
      if (midRef.current) midRef.current.style.transform = t("mid");
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

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }

      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      isActive = true;

      clearTimeout(timeout);
      timeout = setTimeout(() => { isActive = false; }, 2500);
    };

    const onTouchMove = (e: TouchEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = e.touches[0];
      mouseX = ((t.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((t.clientY - rect.top) / rect.height - 0.5) * 2;
      isActive = true;
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const scene = sceneRef.current;
    if (!scene) return;

    scene.addEventListener("mousemove", onMouseMove);
    scene.addEventListener("mouseleave", onLeave);
    scene.addEventListener("mouseenter", onEnter);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      scene.removeEventListener("mousemove", onMouseMove);
      scene.removeEventListener("mouseleave", onLeave);
      scene.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("touchmove", onTouchMove);
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, isMobile]);
 
  // 3. Calcolo Matematico Inset (Centramento Perfetto)
  // Su mobile usiamo 200% di larghezza per avere un buffer totale del 50% per lato
  const currentSizeNum = !mounted ? 130 : (isMobile ? 160 : 130);
  const currentInsetNum = (100 - currentSizeNum) / 2; // Centra l'immagine matematicamente

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    top: `${currentInsetNum}%`,
    left: `${currentInsetNum}%`,
    width: `${currentSizeNum}%`,
    height: `${currentSizeNum}%`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    transformOrigin: "center center",
    willChange: "transform",
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

      {/* Cursore custom (Solo Desktop) */}
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
        {/* LAYER 0: Sfondo stellato */}
        <div
          ref={bgRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/bg.png')",
            zIndex: 0,
          }}
        />

        {/* LAYER 1: Saturno */}
        <div
          ref={eastRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/far-east.png')",
            zIndex: 1,
          }}
        />

        {/* LAYER 2: Marte */}
        <div
          ref={westRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/far-west.png')",
            zIndex: 2,
          }}
        />

        {/* LAYER 3: Giove (Fly-through) */}
        <div
          ref={midRef}
          style={{
            ...layerStyle,
            backgroundImage: "url('/parallax/near-mid.png')",
            zIndex: 3,
          }}
        />

        {/* Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 4,
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Interfaccia UI */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <h1
            className="anim-title font-serif font-light text-white text-center uppercase px-6 md:px-0"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 5rem)",
              letterSpacing: "0.22em",
              textShadow: "0 0 80px rgba(120,160,255,0.35), 0 2px 24px rgba(0,0,0,0.9)",
            }}
          >
            Travel in the Solar System
          </h1>

          <p className="anim-subtitle mt-4 font-serif font-light text-white/40 text-center uppercase tracking-[0.4em] text-sm">
            Take a break in the space
          </p>

          <div className="anim-hint absolute bottom-10 flex items-center gap-3 text-[0.6rem] text-white/25 tracking-[0.3em] uppercase">
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