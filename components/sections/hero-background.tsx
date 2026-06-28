"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 20 });

  const parallaxX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-12, 12]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReduced) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />

      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="rgba(248,113,113,0.12)" />
              <stop offset="100%" stopColor="rgba(248,113,113,0)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGlow)" />
          {[
            { cx: "20%", cy: "30%", r: 3 },
            { cx: "45%", cy: "55%", r: 4 },
            { cx: "70%", cy: "25%", r: 3 },
            { cx: "85%", cy: "60%", r: 2 },
            { cx: "30%", cy: "75%", r: 3 },
            { cx: "60%", cy: "80%", r: 2 },
          ].map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="rgba(248,113,113,0.5)"
            />
          ))}
          {[
            ["20% 30%", "45% 55%"],
            ["45% 55%", "70% 25%"],
            ["45% 55%", "30% 75%"],
            ["70% 25%", "85% 60%"],
            ["30% 75%", "60% 80%"],
            ["60% 80%", "85% 60%"],
          ].map(([from, to], i) => (
            <line
              key={i}
              x1={from.split(" ")[0]}
              y1={from.split(" ")[1]}
              x2={to.split(" ")[0]}
              y2={to.split(" ")[1]}
              stroke="rgba(248,113,113,0.15)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
