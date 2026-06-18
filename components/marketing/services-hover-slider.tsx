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
    <section className="border-b border-border py-16 md:py-32 lg:py-36">
      <Reveal>
        <HoverSlider className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-primary/90 md:mb-14">
            / {dict.hoverSlider.eyebrow}
          </p>

          <div
            className={cn(
              "flex flex-row items-start gap-3 sm:gap-5",
              paired &&
                "lg:items-center lg:justify-between lg:gap-8 xl:gap-12",
            )}
          >
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2.5 md:gap-4",
                paired && "lg:max-w-[48%] xl:max-w-[50%]",
              )}
            >
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  text={slide.title}
                  characterGap
                  className="cursor-pointer text-left text-[1.35rem] font-bold uppercase leading-[1.15] tracking-tight text-foreground sm:text-3xl md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.1] xl:text-[3.5rem] xl:leading-[1.08]"
                />
              ))}
            </div>

            <HoverSliderImageWrap
              className={cn(
                "shrink-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)] sm:rounded-3xl",
                "aspect-[4/5] w-[46%] max-w-[11.5rem]",
                "sm:max-w-[14rem]",
                "md:aspect-[5/6] md:max-w-[18rem]",
                paired &&
                  "lg:aspect-[16/10] lg:w-[min(46%,40rem)] lg:max-w-none xl:w-[min(44%,42rem)]",
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
