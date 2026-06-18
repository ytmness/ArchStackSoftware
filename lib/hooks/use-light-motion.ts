"use client";

import { useReducedMotion } from "motion/react";

/**
 * True when expensive effects should use the lightweight fallback.
 * Pass `viewportActive` from `useViewportAnimation().shouldAnimate`.
 */
export function useLightMotion(viewportActive = true) {
  const reduce = useReducedMotion();
  return Boolean(reduce || !viewportActive);
}
