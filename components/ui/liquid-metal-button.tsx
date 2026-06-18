"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type LiquidMetalSize = "sm" | "default" | "lg" | "icon";

const SIZE_CONFIG: Record<
  LiquidMetalSize,
  { height: number; fontSize: number; paddingX: number }
> = {
  sm: { height: 40, fontSize: 13, paddingX: 18 },
  default: { height: 46, fontSize: 14, paddingX: 22 },
  lg: { height: 52, fontSize: 15, paddingX: 26 },
  icon: { height: 46, fontSize: 14, paddingX: 0 },
};

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getNodeText(element.props.children);
  }
  return "";
}

/** Strip layout classes that belong on classic buttons, not the metal shell. */
function shellClassName(className?: string) {
  if (!className) return undefined;
  return className
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        !token.startsWith("gap-") &&
        !token.startsWith("shadow-") &&
        !token.startsWith("bg-") &&
        !token.startsWith("hover:") &&
        !token.startsWith("text-"),
    )
    .join(" ");
}

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: LiquidMetalSize;
  viewMode?: "text" | "icon";
}

export const LiquidMetalButton = React.forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(
  (
    {
      asChild = false,
      size = "default",
      viewMode,
      className,
      children,
      disabled,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref,
  ) => {
    const isIcon = viewMode === "icon" || size === "icon";

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; id: number }>
    >([]);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const rippleId = useRef(0);

    const sizeConfig = SIZE_CONFIG[size];

    const child = asChild
      ? (React.Children.only(children) as React.ReactElement<{
          children?: React.ReactNode;
          className?: string;
        }>)
      : null;
    const visibleContent = asChild ? child?.props.children : children;
    const label = getNodeText(visibleContent);

    const isFullWidth = typeof className === "string" && className.includes("w-full");

    const dimensions = useMemo(() => {
      if (isIcon) {
        const side = sizeConfig.height;
        return {
          width: side,
          height: side,
          innerWidth: side - 4,
          innerHeight: side - 4,
        };
      }

      const width = Math.max(
        sizeConfig.height + 24,
        contentWidth + sizeConfig.paddingX * 2,
      );

      return {
        width,
        height: sizeConfig.height,
        innerWidth: width - 4,
        innerHeight: sizeConfig.height - 4,
      };
    }, [contentWidth, isIcon, sizeConfig]);

    const outerWidth = isFullWidth ? "100%" : dimensions.width;

    useLayoutEffect(() => {
      if (isIcon) return;
      const node = measureRef.current;
      if (!node) return;
      setContentWidth(node.offsetWidth);
    }, [visibleContent, isIcon]);

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const handleMouseEnter = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (disabled) return;
      setIsHovered(true);
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      setIsHovered(false);
      setIsPressed(false);
      onMouseLeave?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const target = buttonRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const ripple = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          id: rippleId.current++,
        };
        setRipples((prev) => [...prev, ripple]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 600);
      }

      onClick?.(event);
    };

    const Comp = asChild ? Slot : "button";

    const interactiveClassName = cn(
      "absolute inset-0 z-40 overflow-hidden rounded-[100px] border-0 bg-transparent p-0 outline-none",
      "focus:outline-none focus-visible:outline-none",
      disabled ? "cursor-not-allowed" : "cursor-pointer",
    );

    const interactiveProps = {
      ref: setRefs,
      disabled,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) setIsPressed(true);
        onMouseDown?.(event);
      },
      onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        onMouseUp?.(event);
      },
      className: interactiveClassName,
      "aria-label": props["aria-label"] ?? (label || undefined),
      ...props,
    };

    const shell = shellClassName(className);

    return (
      <div
        className={cn(
          "relative isolate inline-flex max-w-full overflow-hidden",
          isFullWidth && "w-full",
          disabled && "pointer-events-none opacity-50",
          shell,
        )}
        style={{ width: outerWidth, height: dimensions.height }}
      >
        {!isIcon && (
          <span
            ref={measureRef}
            aria-hidden
            className="pointer-events-none invisible absolute flex items-center gap-2 whitespace-nowrap"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            {visibleContent}
          </span>
        )}

        <div
          className={cn(isFullWidth && "w-full")}
          style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            className="relative"
            style={{
              width: isFullWidth ? "100%" : dimensions.width,
              height: dimensions.height,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center gap-2"
              style={{
                transform: "translateZ(20px)",
                fontSize: sizeConfig.fontSize,
                color: "#b8b8b8",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.55)",
              }}
              aria-hidden
            >
              {visibleContent}
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
              }}
            >
              <div
                className="m-0.5 rounded-[100px]"
                style={{
                  width: isFullWidth ? "calc(100% - 4px)" : dimensions.innerWidth,
                  height: dimensions.innerHeight,
                  background:
                    "linear-gradient(180deg, #242424 0%, #080808 100%)",
                  boxShadow: isPressed
                    ? "inset 0 2px 4px rgba(0, 0, 0, 0.45)"
                    : undefined,
                }}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[100px]"
              style={{
                transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
                width: isFullWidth ? "100%" : dimensions.width,
                height: dimensions.height,
                background:
                  "linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 50%, #141414 100%)",
                boxShadow: isPressed
                  ? "0 0 0 1px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(0, 0, 0, 0.35)"
                  : isHovered
                    ? "0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 24px rgba(0, 0, 0, 0.35)"
                    : "0 0 0 1px rgba(255, 255, 255, 0.05), 0 8px 20px rgba(0, 0, 0, 0.28)",
              }}
            />

            {asChild && child ? (
              <Comp {...interactiveProps}>
                {React.cloneElement(child, {
                  className: cn(interactiveClassName, child.props.className),
                  children: <span className="sr-only">{label}</span>,
                })}
              </Comp>
            ) : (
              <Comp {...interactiveProps}>
                <span className="sr-only">{label}</span>
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 20,
                      height: 20,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                      animation: "liquid-metal-ripple 0.6s ease-out",
                    }}
                  />
                ))}
              </Comp>
            )}
          </div>
        </div>
      </div>
    );
  },
);

LiquidMetalButton.displayName = "LiquidMetalButton";
