"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Elena Vasquez",
    role: "Astrophysicist — NASA",
    initials: "EV",
    color: "#22d3ee",
    rating: 5,
    text: "Floating above Jupiter's cloud bands, watching the Great Red Spot churn below me — no simulation could have prepared me for that. Galactic Horizons transformed my career's greatest aspiration into a two-week reality.",
  },
  {
    name: "Marco & Lucia Ferri",
    role: "Newlyweds from Milan",
    initials: "ML",
    color: "#e879f9",
    rating: 5,
    text: "Our honeymoon in orbit around Saturn was simply indescribable. The crew treated us like royalty. Waking up to the rings filling our viewport every morning — we still can't believe this was real life.",
  },
  {
    name: "James O'Sullivan",
    role: "Entrepreneur & Investor",
    initials: "JO",
    color: "#84cc16",
    rating: 5,
    text: "I've stayed in the world's finest hotels. Nothing — absolutely nothing — compares to a zero-gravity suite with Earth hanging below you. The pre-flight academy made me feel genuinely safe the whole way.",
  },
  {
    name: "Prof. Yuki Tanaka",
    role: "Materials Engineer — JAXA",
    initials: "YT",
    color: "#f59e0b",
    rating: 5,
    text: "From a technical standpoint the spacecraft is extraordinary. From a human standpoint it was the most moving experience of my sixty-two years. I came back a different person. Galactic Horizons deserves every star.",
  },
  {
    name: "King El Barbassi II of the Cayman Islands ",
    role: "Investors and Advisors — SISMI",
    initials: "MB89",
    color: "#e22e22",
    rating: 5,
    text: "The crew's attention to detail and the quality of the food were outstanding.I seemed to be in the coldwar era, when i worked at the Kgb .",
  },
];

// --- COSTANTI CLASSI PULITE ---
const sectionTestimonials = cn(`${"testimonials-section"}`);
const containerTestimonials = cn(`${"container"} px-5!`);
const labelTestimonials = cn("section-label ");
const h2Testimonials = cn("section-title");
const pSubTestimonials = cn("section-sub");
const gridTestimonials = cn("t-grid");
const navTestimonials = cn("t-nav ");
const btnTestimonials = cn("t-btn");

export default function TestimonialsCarousel() {
  //motion framer

  const secVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const contVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const [current, setCurrent] = useState(0);
  const autoInterval = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((n: number) => {
    setCurrent((n + testimonials.length) % testimonials.length);
  }, []);

  const startAuto = useCallback(() => {
    if (autoInterval.current) clearInterval(autoInterval.current);
    autoInterval.current = setInterval(() => {
      goTo(current + 1);
    }, 6000);
  }, [current, goTo]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoInterval.current) clearInterval(autoInterval.current);
    };
  }, [startAuto]);

  const handleManualGoTo = (n: number) => {
    goTo(n);
    startAuto();
  };

  return (
    <motion.section
      variants={secVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={sectionTestimonials}
      id="astronauts"
    >
      <motion.div variants={contVariants} className={containerTestimonials}>
        {/* HEADER - Assicurati che questi tag siano popolati */}
        <span className={labelTestimonials}>Satisfied Astronauts</span>
        <h2 className={h2Testimonials}>
          Voices from
          <em className="italic text-[var(--accent)] not-italic">Beyond</em>
          <br />
          the Atmosphere
        </h2>
        <p className={pSubTestimonials}>
          Over 2,400 passengers have trusted Galactic Horizons. Here is what
          they say when they return to Earth.
        </p>

        {/* GRID - Mostra due card */}
        <div className={gridTestimonials}>
          {testimonials.map((t, i) => {
            // Logica per mostrare due card consecutive
            const isVisible =
              i === current || i === (current + 1) % testimonials.length;

            return (
              <motion.div 
                variants={cardVariants}
                key={i}
                className={cn(
                  "t-card",
                  "p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-md flex flex-col transition-all duration-1000", // Rallentata a 1000ms
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none absolute",
                )}
                style={{
                  display: isVisible ? "flex" : "none",
                  boxShadow: `0 10px 30px -10px ${t.color}22`,
                }}
              >
                <div className="text-[var(--star)] mb-4 text-xl">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-[var(--txt)] text-lg mb-8 italic leading-relaxed flex-grow">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      background: `${t.color}22`,
                      color: t.color,
                      border: `1.5px solid ${t.color}44`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--txt)]">{t.name}</div>
                    <div className="text-xs text-[var(--txt3)] uppercase tracking-widest">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NAVIGATION */}
        <div className={navTestimonials}>
          <button
            className={btnTestimonials}
            onClick={() => handleManualGoTo(current - 1)}
          >
            ←
          </button>

          <div className="t-dots">
            {testimonials.map((_, i) => (
              <button
                type="button"
                key={i}
                className={cn("t-dot", i === current && "t-dot-active")}
                onClick={() => handleManualGoTo(i)}
              ></button>
            ))}
          </div>

          <button
            className={btnTestimonials}
            onClick={() => handleManualGoTo(current + 1)}
          >
            →
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}
