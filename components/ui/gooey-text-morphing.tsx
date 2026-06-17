"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: readonly string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const reduceMotion = useReducedMotion();
  const filterId = React.useId().replace(/:/g, "");
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const [liveText, setLiveText] = React.useState(texts[0] ?? "");

  const longestText = React.useMemo(
    () =>
      texts.reduce((a, b) => (a.length > b.length ? a : b), texts[0] ?? ""),
    [texts],
  );

  React.useEffect(() => {
    if (reduceMotion || texts.length <= 1) {
      setLiveText(texts[0] ?? "");
      return;
    }

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let frameId = 0;

    const blurFor = (fraction: number) => {
      if (fraction <= 0.001) return 6;
      return Math.min(6, Math.max(0, 6 / fraction - 6));
    };

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${blurFor(fraction)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${blurFor(fraction)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      frameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          const nextIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[nextIndex];
          }
          setLiveText(texts[textIndex]);
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    if (text1Ref.current) {
      text1Ref.current.textContent = texts[0];
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = texts[1 % texts.length];
    }
    setLiveText(texts[0]);

    animate();

    return () => cancelAnimationFrame(frameId);
  }, [texts, morphTime, cooldownTime, reduceMotion]);

  if (reduceMotion || texts.length <= 1) {
    return (
      <div className={cn("relative w-full", className)}>
        <span
          className={cn(
            "block select-none text-center text-foreground",
            textClassName,
          )}
        >
          {texts[0]}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative isolate mx-auto w-full max-w-full", className)}>
      <span className="sr-only" aria-live="polite">
        {liveText}
      </span>

      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-40%"
            width="120%"
            height="180%"
            filterUnits="objectBoundingBox"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* In-flow sizer — reserves exact space so nothing overlaps */}
      <div
        className={cn(
          "invisible block w-full select-none text-center",
          textClassName,
        )}
        aria-hidden
      >
        {longestText}
      </div>

      {/* Morph layer clipped to sizer bounds */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: `url(#${filterId})` }}
        aria-hidden
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <span
            ref={text1Ref}
            className={cn(
              "absolute left-0 right-0 mx-auto block w-full max-w-full select-none text-center text-foreground",
              textClassName,
            )}
          />
          <span
            ref={text2Ref}
            className={cn(
              "absolute left-0 right-0 mx-auto block w-full max-w-full select-none text-center text-foreground",
              textClassName,
            )}
          />
        </div>
      </div>
    </div>
  );
}
