"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { pricingBands } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

function SlidingNumber({ value }: { value: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-2xl font-semibold text-accent md:text-3xl"
    >
      {value}
    </motion.span>
  );
}

export function Pricing() {
  const [active, setActive] = useState("build");
  const current = pricingBands.find((b) => b.id === active) ?? pricingBands[1];

  return (
    <section id="pricing" className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Inversión"
          title="Bandas de entrega, no tiers genéricos"
          description="Cada proyecto tiene un alcance distinto. Estas bandas orientan la conversación, no reemplazan un discovery call."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {pricingBands.map((band) => (
            <button
              key={band.id}
              type="button"
              onClick={() => setActive(band.id)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-sm transition-colors",
                active === band.id
                  ? "border-accent/30 text-text"
                  : "border-line text-muted hover:text-white/70"
              )}
            >
              {active === band.id && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-accent/30"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              )}
              <span className="relative z-10">{band.name}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "rounded-3xl border p-8 md:p-10",
            current.highlighted
              ? "border-accent/25 bg-accent/[0.04] glow-border"
              : "border-line bg-white/[0.02]"
          )}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-text">
                {current.name}
              </h3>
              <p className="mt-2 text-muted">{current.description}</p>
            </div>
            <div className="text-right">
              <SlidingNumber value={current.range} />
              <p className="mt-1 text-sm text-muted">{current.duration}</p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {current.outputs.map((output) => (
              <li
                key={output}
                className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white/70"
              >
                <span className="mt-0.5 text-accent">✓</span>
                {output}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild>
              <Link href="#contact">Agendar discovery call</Link>
            </Button>
          </div>
        </motion.div>

        <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">
          {pricingBands.map((band) => (
            <article
              key={band.id}
              className={cn(
                "rounded-3xl border p-6",
                band.highlighted
                  ? "border-accent/20 bg-accent/[0.03]"
                  : "border-line bg-white/[0.02]"
              )}
            >
              <h3 className="text-lg font-semibold text-text">{band.name}</h3>
              <p className="mt-1 text-sm text-accent">{band.range}</p>
              <p className="mt-3 text-sm text-muted">{band.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
