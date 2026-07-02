"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import {
  Cpu,
  Layers,
  Rocket,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { Dictionary } from "@/content/dictionaries/es";
import { cn } from "@/lib/utils";

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.Warp),
  { ssr: false, loading: () => <div className="h-full w-full bg-surface" /> },
);

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  colors: string[];
  shape: "checks" | "stripes" | "edge";
  glow: string;
  ring: string;
};

function buildFeatures(dict: Dictionary): Feature[] {
  const shapes: Array<"checks" | "stripes" | "edge"> = [
    "checks",
    "stripes",
    "checks",
    "stripes",
    "checks",
    "edge",
  ];
  const icons = [
    <Layers
      key="layers"
      className="h-10 w-10 text-yellow-300 drop-shadow-[0_0_14px_rgba(250,204,21,0.9)]"
    />,
    <Cpu
      key="cpu"
      className="h-10 w-10 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.9)]"
    />,
    <Sparkles
      key="sparkles"
      className="h-10 w-10 text-violet-300 drop-shadow-[0_0_16px_rgba(167,139,250,0.95)]"
    />,
    <Rocket
      key="rocket"
      className="h-10 w-10 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.9)]"
    />,
    <Shield
      key="shield"
      className="h-10 w-10 text-blue-300 drop-shadow-[0_0_14px_rgba(96,165,250,0.9)]"
    />,
    <Workflow
      key="workflow"
      className="h-10 w-10 text-teal-300 drop-shadow-[0_0_14px_rgba(45,212,191,0.9)]"
    />,
  ];
  const palettes = [
    {
      colors: [
        "hsl(48, 95%, 22%)",
        "hsl(48, 100%, 52%)",
        "hsl(45, 90%, 14%)",
        "hsl(48, 100%, 68%)",
      ],
      glow: "rgba(250, 204, 21, 0.45)",
      ring: "rgba(250, 204, 21, 0.35)",
    },
    {
      colors: [
        "hsl(195, 100%, 20%)",
        "hsl(185, 100%, 48%)",
        "hsl(205, 95%, 12%)",
        "hsl(175, 100%, 62%)",
      ],
      glow: "rgba(34, 211, 238, 0.42)",
      ring: "rgba(34, 211, 238, 0.32)",
    },
    {
      colors: [
        "hsl(270, 95%, 24%)",
        "hsl(285, 100%, 58%)",
        "hsl(255, 90%, 16%)",
        "hsl(300, 100%, 72%)",
      ],
      glow: "rgba(167, 139, 250, 0.5)",
      ring: "rgba(192, 132, 252, 0.4)",
    },
    {
      colors: [
        "hsl(32, 100%, 22%)",
        "hsl(42, 100%, 52%)",
        "hsl(25, 95%, 14%)",
        "hsl(48, 100%, 65%)",
      ],
      glow: "rgba(251, 191, 36, 0.4)",
      ring: "rgba(251, 191, 36, 0.32)",
    },
    {
      colors: [
        "hsl(220, 95%, 20%)",
        "hsl(210, 100%, 48%)",
        "hsl(235, 90%, 12%)",
        "hsl(200, 100%, 68%)",
      ],
      glow: "rgba(96, 165, 250, 0.42)",
      ring: "rgba(59, 130, 246, 0.35)",
    },
    {
      colors: [
        "hsl(185, 95%, 18%)",
        "hsl(175, 100%, 46%)",
        "hsl(195, 90%, 11%)",
        "hsl(165, 100%, 62%)",
      ],
      glow: "rgba(45, 212, 191, 0.4)",
      ring: "rgba(45, 212, 191, 0.32)",
    },
  ];

  return dict.featureCards.items.map((item, index) => ({
    title: item.title,
    description: item.description,
    icon: icons[index],
    shape: shapes[index],
    colors: palettes[index].colors,
    glow: palettes[index].glow,
    ring: palettes[index].ring,
  }));
}

function StaticShaderBackground({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(${135 + index * 28}deg, ${feature.colors[0]} 0%, ${feature.colors[1]} 45%, ${feature.colors[2]} 100%)`,
      }}
      aria-hidden
    />
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const reduce = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [enableShader, setEnableShader] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;

    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnableShader(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div
      ref={cardRef}
      className="feature-shader-card group relative h-80 rounded-3xl"
      style={{
        ["--feature-glow" as string]: feature.glow,
        ["--feature-ring" as string]: feature.ring,
        boxShadow: `0 0 0 1px ${feature.ring}, 0 0 48px -8px ${feature.glow}, 0 24px 48px -20px rgba(0,0,0,0.5)`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {enableShader ? (
          <Warp
            style={{ height: "100%", width: "100%" }}
            proportion={0.38 + (index % 3) * 0.05}
            softness={0.75 + (index % 2) * 0.1}
            distortion={0.18 + (index % 4) * 0.03}
            swirl={0.85 + (index % 3) * 0.12}
            swirlIterations={10 + (index % 4)}
            shape={feature.shape}
            shapeScale={0.12}
            scale={1.05}
            rotation={0}
            speed={0.85 + (index % 3) * 0.15}
            colors={feature.colors}
          />
        ) : (
          <StaticShaderBackground feature={feature} index={index} />
        )}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${feature.glow}, transparent 55%)`,
          }}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full flex-col rounded-3xl border p-7 backdrop-blur-[6px]",
          "border-white/15 bg-gradient-to-br from-bg/50 via-bg/35 to-bg/55",
          "transition-colors duration-500 group-hover:border-white/25 group-hover:from-bg/40",
        )}
        style={{
          boxShadow: `inset 0 0 40px -12px ${feature.glow}`,
        }}
      >
        <div className="mb-5">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-foreground">
          {feature.title}
        </h3>
        <p className="mt-3 flex-grow text-sm leading-relaxed text-foreground/75">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export function FeatureShaderGrid({ dict }: { dict: Dictionary }) {
  const features = buildFeatures(dict);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
}

export function FeatureShaderCards({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border pb-20 pt-0 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.services.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {dict.services.description}
          </p>
        </div>
        <FeatureShaderGrid dict={dict} />
      </div>
    </section>
  );
}
