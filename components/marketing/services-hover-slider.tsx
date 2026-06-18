"use client";

import type { Dictionary } from "@/content/dictionaries/es";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { Reveal } from "@/components/motion/reveal";

export function ServicesHoverSlider({ dict }: { dict: Dictionary }) {
  const slides = dict.hoverSlider.slides;

  return (
    <section className="border-b border-border py-24 md:py-32 lg:py-36">
      <Reveal>
        <HoverSlider className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.22em] text-primary/90 md:mb-14">
            / {dict.hoverSlider.eyebrow}
          </p>

          <div className="flex flex-col items-stretch gap-12 lg:gap-16">
            <div className="flex w-full flex-col gap-3 md:gap-4">
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  text={slide.title}
                  className="cursor-pointer text-left text-4xl font-bold uppercase tracking-tighter text-foreground transition-colors sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05] xl:text-[4.25rem]"
                />
              ))}
            </div>

            <HoverSliderImageWrap className="aspect-[16/10] w-full max-w-2xl self-end overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)] lg:max-w-3xl">
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
