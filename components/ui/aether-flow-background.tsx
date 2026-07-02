"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { useViewportAnimation } from "@/lib/hooks/use-viewport-animation";
import { cn } from "@/lib/utils";

const PARTICLE_COLOR = "rgba(250, 204, 21, 0.75)";
const BG_COLOR = "#050505";

type Particle = {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
};

function createParticle(width: number, height: number): Particle {
  const size = Math.random() * 2 + 1;
  return {
    x: Math.random() * (width - size * 4) + size * 2,
    y: Math.random() * (height - size * 4) + size * 2,
    directionX: Math.random() * 0.4 - 0.2,
    directionY: Math.random() * 0.4 - 0.2,
    size,
    color: PARTICLE_COLOR,
  };
}

function StaticBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(250,204,21,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(234,179,8,0.08),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </>
  );
}

export function AetherFlowBackground() {
  const reduce = useReducedMotion();
  const { ref, shouldAnimate, isPaused } = useViewportAnimation({
    rootMargin: "0px",
    unloadDelayMs: 2000,
  });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pausedRef = React.useRef(isPaused);
  const [canvasReady, setCanvasReady] = React.useState(false);

  pausedRef.current = isPaused;

  React.useEffect(() => {
    if (reduce || !shouldAnimate) {
      setCanvasReady(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = ref.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const maxParticles = isMobile ? 22 : 48;
    const densityDivisor = isMobile ? 18000 : 12000;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: isMobile ? 0 : 180,
    };

    const init = (width: number, height: number) => {
      particles = [];
      const density = Math.floor((height * width) / densityDivisor);
      const count = Math.min(maxParticles, Math.max(12, density));
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(width, height));
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(rect.width, rect.height);
      setCanvasReady(true);
    };

    const drawParticle = (p: Particle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    };

    const updateParticle = (p: Particle, width: number, height: number) => {
      if (p.x > width || p.x < 0) p.directionX = -p.directionX;
      if (p.y > height || p.y < 0) p.directionY = -p.directionY;

      if (!isCoarsePointer && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + p.size) {
          const forceX = dx / distance;
          const forceY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= forceX * force * 5;
          p.y -= forceY * force * 5;
        }
      }

      p.x += p.directionX;
      p.y += p.directionY;
      drawParticle(p);
    };

    const connect = (width: number, height: number) => {
      const threshold = (width / 7) * (height / 7);

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < threshold) {
            const opacity = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(234, 179, 8, ${opacity * 0.9})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (pausedRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      for (const particle of particles) {
        updateParticle(particle, width, height);
      }
      connect(width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isCoarsePointer) return;
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    if (!isCoarsePointer) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseOut);
    }

    return () => {
      ro.disconnect();
      if (!isCoarsePointer) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseOut);
      }
      cancelAnimationFrame(animationFrameId);
      setCanvasReady(false);
    };
  }, [reduce, shouldAnimate, ref]);

  if (reduce) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="pointer-events-none absolute inset-0 bg-bg"
        aria-hidden
      >
        <StaticBackdrop />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,transparent_40%,rgba(5,5,5,0.85)_100%)]" />
      </div>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <div className="absolute inset-0 bg-bg">
        <StaticBackdrop />
      </div>
      {shouldAnimate && (
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            canvasReady ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,transparent_40%,rgba(5,5,5,0.85)_100%)]" />
    </div>
  );
}
