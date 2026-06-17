"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { stackLayers } from "@/lib/data/stack";
import { cn } from "@/lib/utils";

function StackAccordion() {
  const [open, setOpen] = useState("frontend");

  return (
    <div className="space-y-3 lg:hidden">
      {stackLayers.map((layer) => {
        const active = open === layer.id;
        return (
          <div
            key={layer.id}
            className="rounded-3xl border border-line bg-white/[0.02]"
          >
            <button
              type="button"
              onClick={() => setOpen(active ? "" : layer.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={active}
            >
              <span className="text-lg font-medium text-text">
                {layer.label}
              </span>
              <span className="text-muted">{active ? "–" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="mb-4 text-sm text-muted">
                      {layer.description}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {layer.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-line px-4 py-3 text-sm text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function StackDesktop() {
  const [active, setActive] = useState("frontend");
  const current = stackLayers.find((l) => l.id === active) ?? stackLayers[2];

  return (
    <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
      <div className="sticky top-32 self-start space-y-1">
        {stackLayers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => setActive(layer.id)}
            className={cn(
              "relative block w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors",
              active === layer.id
                ? "text-text"
                : "text-muted hover:text-white/70"
            )}
          >
            {active === layer.id && (
              <motion.span
                layoutId="stack-active"
                className="absolute inset-0 rounded-2xl border border-accent/20 bg-accent/5"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 font-medium">{layer.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-line bg-white/[0.02] p-8"
        >
          <h3 className="text-2xl font-semibold text-text">{current.label}</h3>
          <p className="mt-3 text-muted">{current.description}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.items.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-line px-4 py-3 text-sm text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StackExplorer() {
  return (
    <section id="stack" className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Stack Explorer"
          title="De estrategia a infraestructura"
          description="Operamos en todas las capas del stack digital. Cada decisión técnica está alineada con el objetivo de negocio."
        />

        <StackDesktop />
        <StackAccordion />
      </Container>
    </section>
  );
}
