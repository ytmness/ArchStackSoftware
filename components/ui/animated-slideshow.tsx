"use client";

import * as React from "react";
import {
  HTMLMotionProps,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { useLightMotion } from "@/lib/hooks/use-light-motion";
import { optimizeImageUrl } from "@/lib/utils/image-url";
import { cn } from "@/lib/utils";

interface TextStaggerHoverProps {
  text: string;
  index: number;
  characterGap?: boolean;
}

interface HoverSliderImageProps {
  index: number;
  imageUrl: string;
}

type HoverSliderContextValue = {
  activeSlide: number;
  changeSlide: (index: number) => void;
};

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "));
  const characters = words.map((word) => word.split("")).flat(1);
  return { words, characters };
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSlider provider",
    );
  }
  return context;
}

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [],
  );

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, characterGap = false, className, ...props }, ref) => {
  const reduce = useReducedMotion();
  const lightMotion = useLightMotion();
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;

  const activate = () => changeSlide(index);

  if (lightMotion) {
    return (
      <button
        type="button"
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={activate}
        className={cn(
          "block w-full text-left transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-40",
          className,
        )}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {text}
      </button>
    );
  }

  return (
    <span
      ref={ref}
      className={cn(
        "relative block w-full origin-bottom whitespace-nowrap",
        characterGap && "tracking-normal md:tracking-wide",
        className,
      )}
      onMouseEnter={activate}
      onFocus={activate}
      tabIndex={0}
      role="button"
      {...props}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className={cn(
            "relative inline-block overflow-hidden align-bottom",
            characterGap && "px-[0.05em] pb-[0.12em]",
          )}
        >
          {reduce || !isActive ? (
            <span
              className={cn(
                "inline-block transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-35",
              )}
            >
              {char}
              {char === " " && charIndex < characters.length - 1 && (
                <>&nbsp;</>
              )}
            </span>
          ) : (
            <MotionConfig
              transition={{
                delay: charIndex * 0.025,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "0%", opacity: 0.2 }}
                animate={{ y: "-110%", opacity: 0.2 }}
              >
                {char}
                {char === " " && charIndex < characters.length - 1 && (
                  <>&nbsp;</>
                )}
              </motion.span>
              <motion.span
                className="absolute left-0 top-0 inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                aria-hidden
              >
                {char}
              </motion.span>
            </MotionConfig>
          )}
        </span>
      ))}
    </span>
  );
});
TextStaggerHover.displayName = "TextStaggerHover";

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
      className,
    )}
    {...props}
  />
));
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, className, alt = "", ...props }, ref) => {
  const reduce = useReducedMotion();
  const lightMotion = useLightMotion();
  const { activeSlide } = useHoverSliderContext();
  const visible = activeSlide === index;
  const src = lightMotion ? optimizeImageUrl(imageUrl, 720) : imageUrl;

  if (lightMotion) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "size-full object-cover object-center transition-opacity duration-500",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={cn("size-full object-cover object-center", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: reduce ? 0 : 0.8 }}
      variants={clipPathVariants}
      animate={visible ? "visible" : "hidden"}
      {...props}
    />
  );
});
HoverSliderImage.displayName = "HoverSliderImage";
