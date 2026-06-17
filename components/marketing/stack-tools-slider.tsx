"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { stackTools } from "@/lib/data/stack-tools";

export function StackToolsSlider({
  label,
  embedded = false,
}: {
  label: string;
  embedded?: boolean;
}) {
  const Tag = embedded ? "div" : "section";

  return (
    <Tag
      className={embedded ? "py-8 md:py-10" : "border-b border-border py-10 md:py-12"}
      aria-label={label}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="mb-6 text-center text-sm uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>

        <div className="relative h-[88px] w-full overflow-hidden rounded-2xl border border-border bg-surface/40 md:h-[100px]">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={32}
            gap={40}
            durationOnHover={55}
          >
            {stackTools.map((tool) => (
              <div
                key={tool.id}
                className="flex w-36 items-center justify-center gap-2.5 md:w-40"
              >
                <tool.Icon
                  className="h-6 w-6 shrink-0 text-primary/90"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="text-sm font-medium tracking-wide text-foreground/90">
                  {tool.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 md:w-[200px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 md:w-[200px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>
    </Tag>
  );
}
