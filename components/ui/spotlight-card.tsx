"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type GlowColor = "yellow" | "blue" | "purple" | "green" | "cyan";

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  yellow: { base: 48, spread: 36 },
  blue: { base: 220, spread: 120 },
  cyan: { base: 195, spread: 100 },
  purple: { base: 280, spread: 200 },
  green: { base: 120, spread: 160 },
};

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  width?: string | number;
  height?: string | number;
};

export function GlowCard({
  children,
  className,
  glowColor = "yellow",
  width,
  height,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--x", `${e.clientX}`);
      cardRef.current.style.setProperty("--xp", `${e.clientX / window.innerWidth}`);
      cardRef.current.style.setProperty("--y", `${e.clientY}`);
      cardRef.current.style.setProperty("--yp", `${e.clientY / window.innerHeight}`);
    };

    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const style: CSSProperties = {
    ["--base" as string]: base,
    ["--spread" as string]: spread,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={style}
      className={cn(
        "glow-card card-shell-ui relative rounded-2xl border border-primary/20 bg-surface/80 p-5 backdrop-blur-sm",
        className
      )}
    >
      <div data-glow aria-hidden className="pointer-events-none" />
      {children}
    </div>
  );
}
