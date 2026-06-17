"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

function ServiceCardDesktop({
  service,
}: {
  service: (typeof services)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <article
        tabIndex={0}
        className="relative h-full rounded-3xl border border-line bg-white/[0.02] p-6 transition-colors duration-[180ms] hover:border-accent/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-[180ms] group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent" />
        </div>

        <h3 className="relative text-lg font-semibold text-text">
          {service.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted">
          {service.summary}
        </p>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-0.5 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              className="relative mt-4 text-sm leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {service.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </article>
    </li>
  );
}

function ServiceAccordionMobile({
  service,
}: {
  service: (typeof services)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <h3 className="text-base font-semibold text-text">{service.title}</h3>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-5 pb-5">
              <p className="text-sm text-muted">{service.summary}</p>
              <p className="text-sm text-white/70">{service.detail}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-0.5 text-xs text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Capas de un sistema digital completo"
          description="Cada servicio es una capa del stack. Trabajamos de forma integral o en módulos según tu etapa."
        />

        <ul className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCardDesktop key={service.id} service={service} />
          ))}
        </ul>

        <div className="space-y-3 md:hidden">
          {services.map((service) => (
            <ServiceAccordionMobile key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
