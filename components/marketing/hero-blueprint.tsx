"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function HeroBlueprint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mouseX = useSpring(0, { stiffness: 100, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 22 });
  const parallaxX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduce) return;
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduce]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-bg">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <motion.div className="absolute inset-0" style={{ x: parallaxX, y: parallaxY }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <radialGradient id="bpGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.2)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bpGlow)" />
          {[
            [18, 28],
            [38, 52],
            [58, 30],
            [72, 58],
            [28, 72],
            [82, 38],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="5"
                fill="rgba(56,189,248,0.6)"
              />
              <circle
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="14"
                fill="none"
                stroke="rgba(56,189,248,0.2)"
                strokeWidth="1"
              />
            </g>
          ))}
          {[
            ["18% 28%", "38% 52%"],
            ["38% 52%", "58% 30%"],
            ["58% 30%", "72% 58%"],
            ["38% 52%", "28% 72%"],
            ["72% 58%", "82% 38%"],
            ["28% 72%", "72% 58%"],
          ].map(([a, b], i) => (
            <line
              key={i}
              x1={a.split(" ")[0]}
              y1={a.split(" ")[1]}
              x2={b.split(" ")[0]}
              y2={b.split(" ")[1]}
              stroke="rgba(125,211,252,0.22)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 w-[72%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur-sm md:p-5"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
        </div>
        <div className="space-y-2 font-mono text-[11px] text-primary/80 md:text-xs">
          <p>{"// architecture.preview"}</p>
          <p className="text-muted-foreground">deploy pipeline · observability · scale</p>
        </div>
      </motion.div>
    </div>
  );
}
