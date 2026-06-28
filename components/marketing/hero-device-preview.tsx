"use client";

import { Activity, Layers, Shield, Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const SCREEN_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop";

const COPY = {
  es: {
    url: "archstack.software",
    headline: "Panel ArchStack",
    sub: "Métricas · deploys · observabilidad",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "APIs", value: "24" },
      { label: "p95", value: "48ms" },
    ],
  },
  en: {
    url: "archstack.software",
    headline: "ArchStack panel",
    sub: "Metrics · deploys · observability",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "APIs", value: "24" },
      { label: "p95", value: "48ms" },
    ],
  },
} as const;

export function HeroDevicePreview({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className="relative flex h-full min-h-full flex-col items-center justify-center bg-gradient-to-b from-[#05080f] via-[#070b14] to-[#0a101a] px-3 py-4 md:px-6 md:py-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(248,113,113,0.14), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-3xl">
        <div className="overflow-hidden rounded-[18px] border border-white/12 bg-[#0c1018] shadow-inner md:rounded-[22px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span className="font-mono text-[10px] text-muted-foreground md:text-xs">
              {t.url}
            </span>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#04060a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SCREEN_IMG}
              alt=""
              className="h-full w-full object-cover object-[center_22%]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary md:text-xs">
                ArchStack Software
              </p>
              <p className="mt-1 text-base font-semibold text-foreground md:text-lg">
                {t.headline}
              </p>
              <p className="text-xs text-muted-foreground">{t.sub}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-md border border-primary/25 bg-bg/70 px-2 py-0.5 text-[10px] backdrop-blur-sm md:text-xs"
                  >
                    <span className="text-primary">{m.value}</span> {m.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute right-3 top-3 hidden gap-1.5 md:flex">
              {[Layers, Zap, Shield, Activity].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-bg/50 text-primary"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-[#2a3344]"
          aria-hidden
        />
      </div>
    </div>
  );
}
