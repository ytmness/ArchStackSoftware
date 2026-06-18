"use client";

import type { Dictionary } from "@/content/dictionaries/es";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type ServicesHoverSliderProps = {
  dict: Dictionary;
  /** Side-by-side titles + preview image on desktop. */
  paired?: boolean;
};

export function ServicesHoverSlider({
  dict,
  paired = true,
}: ServicesHoverSliderProps) {
  const slides = dict.hoverSlider.slides;

  return (
    <section className="border-b border-border py-24 md:py-32 lg:py-36">
      <Reveal>
        <HoverSlider className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.22em] text-primary/90 md:mb-14">
            / {dict.hoverSlider.eyebrow}
          </p>

          <div
            className={cn(
              "flex flex-col items-stretch gap-10 md:gap-12",
              paired &&
                "lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12",
            )}
          >
            <div
              className={cn(
                "flex w-full flex-col gap-3 md:gap-4",
                paired && "min-w-0 shrink lg:max-w-[48%] xl:max-w-[50%]",
              )}
            >
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  text={slide.title}
                  characterGap
                  className="cursor-pointer text-left text-4xl font-bold uppercase text-foreground transition-colors sm:text-5xl md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.1] xl:text-[3.5rem] xl:leading-[1.08]"
                />
              ))}
            </div>

            <HoverSliderImageWrap
              className={cn(
                "aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]",
                paired
                  ? "shrink-0 lg:w-[min(46%,40rem)] lg:max-w-none xl:w-[min(44%,42rem)]"
                  : "max-w-2xl self-end lg:max-w-3xl",
              )}
            >
              {slides.map((slide, index) => (
                <HoverSliderImage
                  key={slide.id}
                  index={index}
                  imageUrl={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </HoverSliderImageWrap>
          </div>
        </HoverSlider>
      </Reveal>
    </section>
  );
}
