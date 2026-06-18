"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

const PARTICLE_COLOR = "rgba(56, 189, 248, 0.75)";
const BG_COLOR = "#050505";

type Particle = {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
};

function createParticle(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): Particle {
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

export function AetherFlowBackground() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduce || isMobile) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    const init = (width: number, height: number) => {
      particles = [];
      const density = Math.floor((height * width) / 12000);
      const count = Math.min(48, Math.max(16, density));
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(canvas, width, height));
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(rect.width, rect.height);
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

      if (mouse.x !== null && mouse.y !== null) {
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
            const dxMouse = particles[a].x - (mouse.x ?? -9999);
            const dyMouse = particles[a].y - (mouse.y ?? -9999);
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            ctx.strokeStyle =
              mouse.x !== null && distMouse < mouse.radius
                ? `rgba(125, 211, 252, ${opacity})`
                : `rgba(37, 99, 235, ${opacity * 0.9})`;
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
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseOut);

    return () => {
      ro.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduce, isMobile]);

  if (reduce || isMobile) {
    return (
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 bg-bg"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(56,189,248,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(37,99,235,0.08),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,transparent_40%,rgba(5,5,5,0.85)_100%)]" />
    </div>
  );
}
