"use client";

import { useMemo, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { getProcessSteps } from "@/lib/data/process";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import {
  SCANNER_CARD_SIZES,
  ScannerCard,
  updateScannerClips,
} from "@/components/ui/scanner-card";

const CARD_H = SCANNER_CARD_SIZES.large.h;
const CARD_H_MOBILE = SCANNER_CARD_SIZES.default.h;
const CARD_GAP = 40;
const CAROUSEL_SPEED = 52;

function useIsLgDesktop() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
}

function measureLoopWidth(track: HTMLElement, itemCount: number, gap: number) {
  let width = 0;
  for (let i = 0; i < itemCount; i++) {
    const child = track.children[i] as HTMLElement | undefined;
    if (!child) break;
    width += child.offsetWidth;
    if (i < itemCount - 1) width += gap;
  }
  return width;
}

function setActiveCaption(captions: HTMLElement, stepIndex: number) {
  const els = captions.querySelectorAll<HTMLElement>(".process-step-caption");
  els.forEach((el, i) => {
    const active = i === stepIndex;
    el.style.opacity = active ? "1" : "0";
    el.style.visibility = active ? "visible" : "hidden";
    el.setAttribute("aria-hidden", active ? "false" : "true");
  });
}

function syncCaptionToCenter(
  root: HTMLElement,
  captions: HTMLElement,
  steps: ReturnType<typeof getProcessSteps>
) {
  const scannerX = window.innerWidth / 2;
  let closestIdx = 0;
  let minDist = Number.POSITIVE_INFINITY;

  root.querySelectorAll<HTMLElement>("[data-scanner-card]").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(center - scannerX);
    if (dist < minDist) {
      minDist = dist;
      const stepId = card.dataset.cardId?.split("-")[0];
      const idx = steps.findIndex((s) => s.id === stepId);
      if (idx >= 0) closestIdx = idx;
    }
  });

  setActiveCaption(captions, closestIdx);
}

type ProcessScannerSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export function ProcessScannerSection({
  locale,
  dict,
}: ProcessScannerSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);
  const isLgDesktop = useIsLgDesktop();
  const steps = getProcessSteps(locale);

  const cards = useMemo(
    () =>
      steps.flatMap((step) =>
        step.deliverables.map((d, i) => ({
          ...d,
          cardId: `${step.id}-${i}`,
          stepId: step.id,
        }))
      ),
    [steps]
  );

  const loopCards = useMemo(() => [...cards, ...cards], [cards]);
  const cardSize = isLgDesktop ? "large" : "default";
  const laneHeight = isLgDesktop ? CARD_H : CARD_H_MOBILE;

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const captions = captionsRef.current;
      if (!root || !track || !captions) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let tween: gsap.core.Tween | null = null;
      let raf = 0;

      const tick = () => {
        updateScannerClips(root);
        syncCaptionToCenter(root, captions, steps);
        raf = requestAnimationFrame(tick);
      };

      const startCarousel = () => {
        tween?.kill();
        const loopWidth = measureLoopWidth(track, cards.length, CARD_GAP);
        if (loopWidth <= 0) return;

        gsap.set(track, { x: 0 });
        tween = gsap.to(track, {
          x: -loopWidth,
          duration: loopWidth / CAROUSEL_SPEED,
          ease: "none",
          repeat: -1,
        });
      };

      if (prefersReduced) {
        updateScannerClips(root);
        setActiveCaption(captions, 0);
        raf = requestAnimationFrame(tick);
      } else {
        startCarousel();
        raf = requestAnimationFrame(tick);

        const ro = new ResizeObserver(() => startCarousel());
        ro.observe(track);

        return () => {
          tween?.kill();
          cancelAnimationFrame(raf);
          ro.disconnect();
        };
      }

      return () => cancelAnimationFrame(raf);
    },
    {
      scope: rootRef,
      dependencies: [cards.length, steps, isLgDesktop],
      revertOnUpdate: true,
    }
  );

  return (
    <section id="process" className="relative border-t border-border">
      <Container className="pt-14 pb-4 md:pt-16 md:pb-6">
        <SectionHeading
          className="mb-0"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          description={dict.process.description}
        />
      </Container>

      <div
        ref={rootRef}
        data-process-scanner
        className="relative overflow-hidden pb-6 md:pb-8"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-bg to-transparent md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-bg to-transparent md:w-24"
          aria-hidden
        />

        <div
          className="relative -translate-y-4 md:-translate-y-8"
          style={{ minHeight: laneHeight }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-40 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent to-transparent"
            style={{
              height: laneHeight,
              boxShadow: "0 0 28px rgba(248,113,113,0.7)",
            }}
            aria-hidden
          />

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div
              ref={trackRef}
              className="process-carousel-track flex w-max items-center will-change-transform"
              style={{ gap: CARD_GAP }}
            >
              {loopCards.map((card, i) => (
                <ScannerCard
                  key={`${card.cardId}-${i}`}
                  cardId={card.cardId}
                  src={card.src}
                  label={card.label}
                  size={cardSize}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={captionsRef}
          className="relative z-20 mx-auto min-h-[130px] w-full max-w-7xl px-5 pt-2 md:px-8 md:pt-0"
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                "process-step-caption absolute max-w-xl transition-opacity duration-500",
                "bottom-0 left-5 md:left-8",
                step.id === "launch" &&
                  "left-2 max-w-2xl md:left-5"
              )}
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
              }}
              aria-hidden={i !== 0}
            >
              <p className="mb-2 text-sm uppercase tracking-[0.22em] text-muted-foreground">
                {dict.process.eyebrow}
              </p>
              <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
