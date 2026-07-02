"use client";

import Link from "next/link";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export type Floating3DCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export function Floating3DCard({
  title,
  description,
  image,
  imageAlt,
  tags = [],
  href,
  ctaLabel = "Explorar",
  className,
}: Floating3DCardProps) {
  return (
    <div className={cn("w-full", className)}>
      <GlowCard glowColor="yellow" className="h-full min-h-[480px] border-primary/20 p-0">
        <div className="group relative flex h-full min-h-[480px] flex-col rounded-2xl bg-transparent p-6 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-accent-2/5"
            aria-hidden
          />

          <div className="relative mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="relative text-xl font-semibold text-foreground md:text-2xl">
            {title}
          </h3>

          <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-primary/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              className="h-56 w-full object-cover md:h-64"
              loading="lazy"
              draggable={false}
            />
          </div>

          {href && (
            <div className="relative mt-6 flex justify-end">
              <Link
                href={href}
                className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/20 md:text-sm"
              >
                {ctaLabel} →
              </Link>
            </div>
          )}
        </div>
      </GlowCard>
    </div>
  );
}
