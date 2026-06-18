"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Slot } from "@radix-ui/react-slot";
import { useReducedMotion } from "motion/react";
import * as React from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

type LiquidMetalSize = "sm" | "default" | "lg" | "icon";

const SIZE_CONFIG: Record<
  LiquidMetalSize,
  { height: number; fontSize: number; paddingX: number; iconSize: number }
> = {
  sm: { height: 40, fontSize: 13, paddingX: 18, iconSize: 15 },
  default: { height: 46, fontSize: 14, paddingX: 22, iconSize: 16 },
  lg: { height: 52, fontSize: 15, paddingX: 26, iconSize: 17 },
  icon: { height: 46, fontSize: 14, paddingX: 0, iconSize: 16 },
};

let shaderStylesInjected = false;

function injectShaderStyles() {
  if (shaderStylesInjected || typeof document === "undefined") return;
  const styleId = "shader-canvas-style-liquid-metal";
  if (document.getElementById(styleId)) {
    shaderStylesInjected = true;
    return;
  }
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .shader-container-liquid-metal canvas {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      border-radius: 100px !important;
    }
    @keyframes liquid-metal-ripple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  shaderStylesInjected = true;
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getNodeText(element.props.children);
  }
  return "";
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
    const reduce = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const isIcon = viewMode === "icon" || size === "icon";

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [shaderActive, setShaderActive] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; id: number }>
    >([]);

    const shaderRef = useRef<HTMLDivElement>(null);
    const shaderMount = useRef<ShaderMount | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const rippleId = useRef(0);

    const sizeConfig = SIZE_CONFIG[size];
    const enableShader = isDesktop && !reduce && !disabled;

    const child = asChild
      ? (React.Children.only(children) as React.ReactElement<{
          children?: React.ReactNode;
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

    useEffect(() => {
      injectShaderStyles();
    }, []);

    useEffect(() => {
      if (!shaderActive || !enableShader || !shaderRef.current) return;

      try {
        if (shaderMount.current) {
          shaderMount.current.dispose();
        }

        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          isHovered ? 1 : 0.6,
        );
      } catch (error) {
        console.error("LiquidMetalButton shader failed:", error);
      }

      return () => {
        shaderMount.current?.dispose();
        shaderMount.current = null;
      };
    }, [shaderActive, enableShader, isHovered]);

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
      if (enableShader) setShaderActive(true);
      shaderMount.current?.setSpeed?.(1);
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      setIsHovered(false);
      setIsPressed(false);
      shaderMount.current?.setSpeed?.(0.6);
      onMouseLeave?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (shaderMount.current?.setSpeed) {
        shaderMount.current.setSpeed(2.4);
        window.setTimeout(() => {
          shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
        }, 300);
      }

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
      className: cn(
        "absolute inset-0 z-40 rounded-[100px] border-0 bg-transparent p-0 outline-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      ),
      "aria-label": props["aria-label"] ?? (label || undefined),
      ...props,
    };

    return (
      <div
        className={cn(
          "relative inline-flex max-w-full",
          isFullWidth && "w-full",
          disabled && "pointer-events-none opacity-50",
          className,
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
          className={isFullWidth ? "w-full" : undefined}
          style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            style={{
              position: "relative",
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
                color: "#a8a8a8",
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
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
                  width: dimensions.innerWidth,
                  height: dimensions.innerHeight,
                  background:
                    "linear-gradient(180deg, #202020 0%, #000000 100%)",
                  boxShadow: isPressed
                    ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4)"
                    : undefined,
                }}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
              }}
            >
              <div
                className="rounded-[100px]"
                style={{
                  width: isFullWidth ? "100%" : dimensions.width,
                  height: dimensions.height,
                  boxShadow: isPressed
                    ? "0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.3)"
                    : isHovered
                      ? "0px 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 12px 6px rgba(0, 0, 0, 0.05), 0px 8px 5px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.15)"
                      : "0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px rgba(0, 0, 0, 0.02), 0px 20px 12px rgba(0, 0, 0, 0.08), 0px 9px 9px rgba(0, 0, 0, 0.12), 0px 2px 5px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div
                  ref={shaderRef}
                  className="shader-container-liquid-metal relative overflow-hidden rounded-[100px]"
                  style={{
                    width: isFullWidth ? "100%" : dimensions.width,
                    height: dimensions.height,
                    background:
                      shaderActive && enableShader
                        ? "transparent"
                        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 55%, #151515 100%)",
                  }}
                />
              </div>
            </div>

            {asChild && child ? (
              <Comp {...interactiveProps}>{child}</Comp>
            ) : (
              <Comp {...interactiveProps}>
                <span className="sr-only">{visibleContent}</span>
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
                        "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
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
