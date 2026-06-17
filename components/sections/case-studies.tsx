"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealBlock } from "@/components/motion/reveal-block";
import { caseStudies } from "@/lib/data/cases";
import { cn } from "@/lib/utils";

function CaseCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <RevealBlock delay={index * 0.1}>
      <article
        className="group relative overflow-hidden rounded-3xl border border-line bg-white/[0.02] transition-colors hover:border-line-strong"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <div className="p-6 md:p-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {study.metric}
            </p>
            <h3 className="text-xl font-semibold text-text md:text-2xl">
              {study.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {study.problem}
            </p>

            <div
              className={cn(
                "mt-4 overflow-hidden transition-all duration-300 md:block",
                expanded ? "max-h-96" : "max-h-0 md:max-h-none"
              )}
            >
              <p className="text-sm leading-relaxed text-white/70">
                {study.result}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-2.5 py-0.5 text-xs text-white/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-4 text-sm text-accent md:hidden"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          <div
            className={cn(
              "relative hidden min-h-[200px] md:block",
              `bg-gradient-to-br ${study.gradient}`
            )}
          >
            <motion.div
              className="absolute inset-4 rounded-2xl border border-white/10 bg-bg-elev/80 backdrop-blur-sm"
              animate={{
                y: hovered ? -4 : 0,
                rotate: hovered ? -1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-full flex-col justify-end p-4">
                <div className="space-y-2">
                  <div className="h-2 w-16 rounded-full bg-accent/30" />
                  <div className="h-2 w-24 rounded-full bg-white/10" />
                  <div className="h-2 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </RevealBlock>
  );
}

export function CaseStudies() {
  return (
    <section id="cases" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="Sistemas que generan resultados"
          description="Proyectos donde la arquitectura correcta marcó la diferencia entre un producto frágil y uno que escala."
        />

        <div className="space-y-6">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
