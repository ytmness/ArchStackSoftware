"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  generateAsciiBlock,
  getAsciiGrid,
  mutateTerminalFrame,
  scrambleAsciiBlock,
} from "@/lib/scanner/generate-code";

type ScannerCardProps = {
  src: string;
  label: string;
  cardId: string;
  size?: "default" | "large";
};

export const SCANNER_CARD_SIZES = {
  large: { w: 720, h: 512 },
  default: { w: 540, h: 384 },
} as const;

const SHELL_CLASS = {
  large: "card-shell-lg",
  default: "card-shell-md",
} as const;

export function ScannerCard({
  src,
  label,
  cardId,
  size = "large",
}: ScannerCardProps) {
  const [mounted, setMounted] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const reduce = useReducedMotion();
  const dims = SCANNER_CARD_SIZES[size];
  const metrics = useMemo(
    () => getAsciiGrid(dims.w, dims.h),
    [dims.w, dims.h]
  );
  const seedAscii = useMemo(
    () => generateAsciiBlock(metrics.cols, metrics.rows, cardId),
    [cardId, metrics.cols, metrics.rows]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const pre = preRef.current;
    const wrapper = pre?.closest<HTMLElement>("[data-scanner-card]");
    if (!pre || !wrapper) return;

    if (reduce) {
      pre.textContent = seedAscii;
      return;
    }

    pre.textContent = seedAscii;
    let lastTick = 0;
    let frameId = 0;

    const tick = (now: number) => {
      const scanning = wrapper.dataset.scanning === "true";
      const interval = scanning ? 36 : 90;

      if (now - lastTick >= interval) {
        lastTick = now;
        const cols = Number(wrapper.dataset.cols) || metrics.cols;
        const rows = Number(wrapper.dataset.rows) || metrics.rows;
        const current = pre.textContent ?? seedAscii;

        pre.textContent = scanning
          ? scrambleAsciiBlock(cols, rows)
          : mutateTerminalFrame(current, cols, rows, scanning ? 2 : 0.6);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [mounted, reduce, seedAscii, metrics.cols, metrics.rows]);

  return (
    <div
      className={cn(
        "card-perspective relative shrink-0 rounded-2xl",
        SHELL_CLASS[size]
      )}
      style={{ width: dims.w, height: dims.h }}
    >
      <div
        data-scanner-card
        data-card-id={cardId}
        data-cols={metrics.cols}
        data-rows={metrics.rows}
        className="card-wrapper relative h-full w-full overflow-hidden rounded-2xl"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-950/40 to-yellow-950/30"
          aria-hidden
        />

        <div
          className="card-ascii absolute inset-0 z-[1] overflow-hidden rounded-2xl border border-yellow-500/25 bg-[#020408]"
          style={{
            clipPath: "inset(0 calc(100% - var(--clip-left, 0%)) 0 0)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,204,21,0.35) 2px, rgba(250,204,21,0.35) 3px)",
            }}
            aria-hidden
          />
          <pre
            ref={preRef}
            className="ascii-content absolute inset-0 m-0 h-full w-full overflow-hidden whitespace-pre p-0 font-mono text-yellow-300/85"
            style={{
              fontSize: `${metrics.fontSize}px`,
              lineHeight: `${metrics.lineHeight}px`,
              letterSpacing: "-0.03em",
            }}
            suppressHydrationWarning
          >
            {mounted ? "" : ""}
          </pre>
        </div>

        <div
          className="card-normal absolute inset-0 z-[2] overflow-hidden rounded-2xl border border-white/10 bg-surface"
          style={{
            clipPath: "inset(0 0 0 var(--clip-right, 0%))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            className="h-full w-full object-cover object-center brightness-110 contrast-105"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-full border border-yellow-400/35 bg-bg/75 px-3 py-1 text-xs text-yellow-200 backdrop-blur-sm">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function updateScannerClips(
  scopeRoot?: HTMLElement | null,
  scannerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0
) {
  if (!scopeRoot) return;

  const scannerWidth = 20;
  const scannerLeft = scannerX - scannerWidth / 2;
  const scannerRight = scannerX + scannerWidth / 2;

  scopeRoot.querySelectorAll<HTMLElement>("[data-scanner-card]").forEach((wrapper) => {
    const normal = wrapper.querySelector<HTMLElement>(".card-normal");
    const ascii = wrapper.querySelector<HTMLElement>(".card-ascii");
    if (!normal || !ascii) return;

    const rect = wrapper.getBoundingClientRect();

    if (rect.left < scannerRight && rect.right > scannerLeft) {
      const intersectLeft = Math.max(scannerLeft - rect.left, 0);
      const intersectRight = Math.min(scannerRight - rect.left, rect.width);
      const rightPct = (intersectLeft / rect.width) * 100;
      const leftPct = (intersectRight / rect.width) * 100;
      normal.style.setProperty("--clip-right", `${rightPct}%`);
      ascii.style.setProperty("--clip-left", `${leftPct}%`);

      const scanMid = (rightPct + leftPct) / 2;
      wrapper.dataset.scanning = scanMid > 2 && scanMid < 98 ? "true" : "false";
    } else if (rect.right <= scannerLeft) {
      normal.style.setProperty("--clip-right", "100%");
      ascii.style.setProperty("--clip-left", "100%");
      wrapper.dataset.scanning = "true";
    } else {
      normal.style.setProperty("--clip-right", "0%");
      ascii.style.setProperty("--clip-left", "0%");
      wrapper.dataset.scanning = "false";
    }
  });
}
