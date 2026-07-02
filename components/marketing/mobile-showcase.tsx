"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/content/dictionaries/es";
import { Reveal } from "@/components/motion/reveal";

const SCREENSHOTS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop",
];

type MobileShowcaseProps = {
  dict: Dictionary;
};

export function MobileShowcase({ dict }: MobileShowcaseProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(false);
  const [paused, setPaused] = useState(false);

  const cards = useMemo(
    () =>
      [...SCREENSHOTS, ...SCREENSHOTS].map((src, i) => ({
        id: i,
        src,
        label: ["Analytics", "Dashboard", "Code", "Mobile"][i % 4],
      })),
    []
  );

  const updateScan = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scannerX = window.innerWidth / 2;
    let active = false;
    track.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.left < scannerX && rect.right > scannerX) active = true;
    });
    setScanning(active);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf = 0;
    const speed = window.innerWidth < 768 ? 0.35 : 0.55;

    const tick = () => {
      x -= speed;
      const width = track.scrollWidth / 2;
      if (Math.abs(x) >= width) x = 0;
      track.style.transform = `translateX(${x}px)`;
      updateScan();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, paused, updateScan]);

  return (
    <section className="relative overflow-hidden border-y border-border py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Product surfaces
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">
            {dict.projects.title}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {dict.projects.description}
          </p>
        </Reveal>
      </div>

      <div
        className="relative h-[280px] md:h-[320px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className={`pointer-events-none absolute left-1/2 top-0 z-20 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary to-transparent transition-opacity duration-300 ${
            scanning ? "opacity-100" : "opacity-40"
          }`}
          style={{
            boxShadow: scanning
              ? "0 0 18px rgba(250,204,21,0.65)"
              : "0 0 8px rgba(250,204,21,0.25)",
          }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-28" />

        <div ref={trackRef} className="flex h-full items-center gap-5 will-change-transform">
          {cards.map((card) => (
            <motion.article
              key={card.id}
              data-card
              className="group relative h-[220px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface md:h-[250px] md:w-[360px]"
              whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.src}
                alt={card.label}
                className="h-full w-full object-cover brightness-110 contrast-105 transition duration-300 group-hover:brightness-125"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 rounded-full border border-primary/25 bg-bg/70 px-3 py-1 text-xs text-primary backdrop-blur-sm">
                {card.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
