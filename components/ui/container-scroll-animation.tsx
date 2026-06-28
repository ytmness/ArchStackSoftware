"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [58, 4]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : isMobile ? [0.82, 0.96] : [1.08, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const deviceY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 24]);
  const deskOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0, 0.45, 0.85, 1]);

  if (reduce) {
    return (
      <div className={className}>
        <div className="mx-auto max-w-5xl text-center">{titleComponent}</div>
        <div className="mx-auto mt-6 max-w-5xl">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-[46rem] flex-col items-center justify-start overflow-visible pb-28 pt-2 md:min-h-[56rem] md:pb-36 md:pt-4 ${className ?? ""}`}
    >
      <div
        className="relative w-full max-w-5xl"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 12%" }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollDevice
          rotate={rotate}
          scale={scale}
          deviceY={deviceY}
          deskOpacity={deskOpacity}
        >
          {children}
        </ScrollDevice>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div style={{ y: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </motion.div>
  );
}

function ScrollDevice({
  rotate,
  scale,
  deviceY,
  deskOpacity,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  deviceY: MotionValue<number>;
  deskOpacity: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto mt-8 max-w-5xl pb-10 md:mt-10 md:pb-14">
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          y: deviceY,
          transformOrigin: "50% 96%",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 0 0 1px rgba(248,113,113,0.22), 0 30px 70px -12px rgba(0,0,0,0.65), 0 50px 100px -24px rgba(220,38,38,0.28)",
        }}
        className="relative z-10 h-[26rem] w-full overflow-hidden rounded-[26px] border border-[#3d4f66]/90 bg-[#0f141c] p-2 md:h-[34rem] md:rounded-[32px] md:p-3"
      >
        <div className="h-full w-full overflow-hidden rounded-[20px] bg-bg md:rounded-[26px]">
          {children}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 z-0 h-10 w-[78%] -translate-x-1/2 rounded-[100%] bg-primary/25 blur-2xl md:-bottom-8 md:h-14"
        style={{ opacity: deskOpacity }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-400/40 to-transparent md:-bottom-4"
      />
    </div>
  );
}
