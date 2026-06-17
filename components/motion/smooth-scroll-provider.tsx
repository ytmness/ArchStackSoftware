"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
