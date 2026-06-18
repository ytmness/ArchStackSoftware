"use client";

import type { Dictionary } from "@/content/dictionaries/es";
import { FeatureShaderGrid } from "@/components/ui/feature-shader-cards";
import { RecargaLoader } from "@/components/ui/loader-12";
import { Reveal } from "@/components/motion/reveal";

type Skills3DShowcaseProps = {
  dict: Dictionary;
};

export function Skills3DShowcase({ dict }: Skills3DShowcaseProps) {
  return (
    <section className="border-b border-border py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-4 md:mb-6">
                <RecargaLoader className="shrink-0 scale-90 sm:scale-100" />
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
                  {dict.skills.eyebrow}
                </p>
              </div>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.05]">
                {dict.skills.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {dict.skills.description}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <FeatureShaderGrid dict={dict} />
        </div>
      </div>
    </section>
  );
}
