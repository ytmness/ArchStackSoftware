import type { Dictionary } from "@/content/dictionaries/es";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.testimonials.eyebrow}
          </p>
          <h2 className="mb-10 max-w-2xl text-4xl font-semibold md:mb-12 md:text-4xl">
            {dict.testimonials.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ScrollReelTestimonials testimonials={[...dict.testimonials.items]} />
        </Reveal>
      </div>
    </section>
  );
}
