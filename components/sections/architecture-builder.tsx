"use client";

import {
  BarChart3,
  Brain,
  CreditCard,
  Globe,
  LayoutDashboard,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/es";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  buildLayers,
  getArchitectureModules,
  type ArchitectureModule,
} from "@/lib/data/modules";
import { cn } from "@/lib/utils";

const moduleIcons: Record<string, ReactNode> = {
  web: <Globe className="size-5" aria-hidden />,
  mobile: <Smartphone className="size-5" aria-hidden />,
  admin: <LayoutDashboard className="size-5" aria-hidden />,
  ai: <Brain className="size-5" aria-hidden />,
  payments: <CreditCard className="size-5" aria-hidden />,
  analytics: <BarChart3 className="size-5" aria-hidden />,
};

function ModuleCard({
  module,
  selected,
  onToggle,
  includedLabel,
  addLabel,
}: {
  module: ArchitectureModule;
  selected: boolean;
  onToggle: () => void;
  includedLabel: string;
  addLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 md:p-5",
        selected
          ? "border-primary/40 bg-primary/10 shadow-[0_0_0_1px_rgba(var(--primary-rgb,56,189,248),0.15)]"
          : "border-border bg-surface/40 hover:border-border/80 hover:bg-surface/70",
      )}
    >
      {selected && (
        <motion.span
          layoutId="builder-module-highlight"
          className="absolute inset-0 rounded-2xl bg-primary/5"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      )}
      <span
        className={cn(
          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
          selected
            ? "border-primary/30 bg-primary/15 text-primary"
            : "border-border bg-bg/60 text-muted-foreground group-hover:text-foreground",
        )}
      >
        {moduleIcons[module.id]}
      </span>
      <span className="relative z-10 min-w-0">
        <span className="block text-sm font-semibold text-foreground md:text-base">
          {module.label}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground md:text-sm">
          {selected ? includedLabel : addLabel}
        </span>
      </span>
    </button>
  );
}

function LayerDiagram({ layers }: { layers: string[] }) {
  return (
    <div className="relative flex flex-col gap-0">
      {layers.map((layer, i) => (
        <div key={`${layer}-${i}`} className="relative flex flex-col items-center">
          {i > 0 && (
            <div
              className="h-5 w-px bg-gradient-to-b from-primary/50 to-primary/10"
              aria-hidden="true"
            />
          )}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-xl border border-border/80 bg-bg/80 px-4 py-3 text-center text-sm font-medium text-foreground backdrop-blur-sm md:text-base"
          >
            {layer}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

type ArchitectureBuilderProps = {
  dict: Dictionary;
};

export function ArchitectureBuilder({ dict }: ArchitectureBuilderProps) {
  const [active, setActive] = useState<string[]>(["web", "admin"]);
  const modules = getArchitectureModules(dict);
  const layers = useMemo(
    () => buildLayers(active, dict.builder.layers),
    [active, dict.builder.layers],
  );

  const toggle = (id: string) => {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section
      id="builder"
      className="scroll-mt-24 border-y border-border bg-gradient-to-b from-bg via-surface/20 to-bg py-24 md:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={dict.builder.eyebrow}
          title={dict.builder.title}
          description={dict.builder.description}
          className="md:mb-20"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-14 xl:gap-20">
          <div className="rounded-3xl border border-border bg-surface/30 p-6 md:p-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {dict.builder.modulesLabel}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  selected={active.includes(module.id)}
                  onToggle={() => toggle(module.id)}
                  includedLabel={dict.builder.moduleIncluded}
                  addLabel={dict.builder.moduleAdd}
                />
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{active.length}</span>{" "}
              {dict.builder.activeModules} ·{" "}
              <span className="font-medium text-foreground">{layers.length}</span>{" "}
              {dict.builder.layersInStack}
            </p>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-surface via-bg to-surface p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] md:p-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                {dict.builder.previewLabel}
              </p>
              <LayerDiagram layers={layers} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
