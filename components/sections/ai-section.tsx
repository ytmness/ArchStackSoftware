"use client";

import { useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealBlock } from "@/components/motion/reveal-block";
import { aiCapabilities } from "@/lib/data/ai";
import { cn } from "@/lib/utils";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/sections/particles-background").then(
      (m) => m.ParticlesBackground
    ),
  { ssr: false }
);

function LampHeader() {
  return (
    <div className="relative mx-auto mb-16 flex w-full flex-col items-center justify-center">
      <motion.div
        initial={{ width: "8rem" }}
        whileInView={{ width: "16rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-auto z-0 h-36 w-64 -translate-y-[6rem] rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative z-10">
        <SectionHeading
          eyebrow="AI Integration"
          title="IA como capa del sistema"
          description="No vendemos hype. Integramos inteligencia artificial donde genera valor real en tu operación."
          align="center"
          className="mb-0"
        />
      </div>
    </div>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof aiCapabilities)[number];
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <RevealBlock delay={index * 0.1}>
      <article
        className="group relative overflow-hidden rounded-3xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-accent/20"
        onMouseEnter={() => setRevealed(true)}
        onFocus={() => setRevealed(true)}
        tabIndex={0}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500",
            revealed ? "opacity-100" : "opacity-0"
          )}
        />

        <h3 className="relative text-lg font-semibold text-text">
          {capability.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted">
          {capability.description}
        </p>

        <motion.div
          className="relative mt-4 rounded-2xl border border-line bg-bg-elev/80 p-4 font-mono text-xs text-accent/80"
          initial={{ opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/30">{"> "}</span>
          {capability.example}
        </motion.div>
      </article>
    </RevealBlock>
  );
}

export function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden py-20 md:py-28">
      <ParticlesBackground />
      <Container className="relative z-10">
        <LampHeader />

        <div className="grid gap-5 md:grid-cols-2">
          {aiCapabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} capability={cap} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
