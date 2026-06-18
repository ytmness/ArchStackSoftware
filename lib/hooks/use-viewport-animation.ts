"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

type UseViewportAnimationOptions = {
  /** Load effects slightly before the element enters the viewport */
  rootMargin?: string;
  threshold?: number;
  /** Keep effects mounted briefly after leaving view (smoother scroll-back) */
  unloadDelayMs?: number;
};

export function useViewportAnimation({
  rootMargin = "100px",
  threshold = 0.08,
  unloadDelayMs = 1200,
}: UseViewportAnimationOptions = {}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const unloadTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unloadTimer.current) {
            clearTimeout(unloadTimer.current);
            unloadTimer.current = null;
          }
          setVisible(true);
          setActive(true);
          return;
        }

        setVisible(false);
        if (unloadTimer.current) clearTimeout(unloadTimer.current);
        unloadTimer.current = setTimeout(() => {
          setActive(false);
          unloadTimer.current = null;
        }, unloadDelayMs);
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (unloadTimer.current) clearTimeout(unloadTimer.current);
    };
  }, [reduce, rootMargin, threshold, unloadDelayMs]);

  const shouldAnimate = !reduce && active;
  const isPaused = !reduce && active && !visible;

  return { ref, visible, active, shouldAnimate, isPaused, reduce };
}

export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}
