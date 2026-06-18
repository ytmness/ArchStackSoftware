"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LazySectionProps = {
  children: React.ReactNode;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
};

export function LazySection({
  children,
  className,
  placeholderClassName = "min-h-64",
  rootMargin = "180px",
}: LazySectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : <div className={cn(placeholderClassName, "bg-surface/30")} aria-hidden />}
    </div>
  );
}
