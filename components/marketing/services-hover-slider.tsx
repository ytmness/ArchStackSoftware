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
  paired?: boolean;
};

export function ServicesHoverSlider({
  dict,
  paired = true,
}: ServicesHoverSliderProps) {
  const slides = dict.hoverSlider.slides;

  return (
    <section className="border-b border-border py-20 md:py-32 lg:py-36">
      <Reveal>
        <HoverSlider className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.22em] text-primary/90 md:mb-14">
            / {dict.hoverSlider.eyebrow}
          </p>

          <div
            className={cn(
              "flex flex-col gap-8 sm:gap-10",
              paired &&
                "lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12",
            )}
          >
            <div
              className={cn(
                "flex min-w-0 flex-col gap-2 sm:gap-3 md:gap-4",
                paired && "lg:max-w-[48%] xl:max-w-[50%]",
              )}
            >
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  text={slide.title}
                  characterGap
                  className="cursor-pointer text-left text-[2rem] font-bold uppercase leading-[1.1] tracking-tight text-foreground sm:text-4xl sm:leading-[1.08] md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.1] xl:text-[3.5rem] xl:leading-[1.08]"
                />
              ))}
            </div>

            <HoverSliderImageWrap
              className={cn(
                "mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(125,211,252,0.12),0_0_42px_-12px_rgba(37,99,235,0.2)] sm:rounded-3xl",
                "aspect-[16/10]",
                paired &&
                  "lg:mx-0 lg:aspect-[16/10] lg:w-[min(46%,40rem)] lg:max-w-none xl:w-[min(44%,42rem)]",
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
