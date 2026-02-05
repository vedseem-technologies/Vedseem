"use client";

import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

const cardVariants = cva("absolute will-change-transform", {
  variants: {
    variant: {
      dark: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl",
      light:
        "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-6 shadow-xl",
    },
  },
  defaultVariants: {
    variant: "dark",
  },
});

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  maxRating?: number;
}

interface CardStickyProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  arrayLength: number;
  index: number;
  incrementY?: number;
  incrementZ?: number;
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollContextProvider"
    );
  }
  return context;
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress: smoothProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative w-full", className)}
        style={{ perspective: "1500px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-visible", className)}
      style={{ perspective: "1500px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
};
CardsContainer.displayName = "CardsContainer";

export const CardTransformed = React.forwardRef<
  HTMLDivElement,
  CardStickyProps
>(
  (
    {
      arrayLength,
      index,
      incrementY = 0,
      incrementZ = 24,
      className,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();

    // Normalized progress for this specific card
    const start = index / arrayLength;
    const end = (index + 1) / arrayLength;
    const range = [start, end];

    // Card movements: flies up and scales down as it exits
    const y = useTransform(scrollYProgress, range, ["0vh", "-80vh"]);
    const opacity = useTransform(scrollYProgress, [start, start + (end - start) * 0.5, end], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, range, [1, 0.9]);
    
    // Initial staggered rotation that straightens out
    const initialRotate = (index - (arrayLength - 1) / 2) * 5;
    const rotate = useTransform(scrollYProgress, range, [initialRotate, initialRotate - 10]);

    const transform = useMotionTemplate`translate3d(-50%, -50%, 0) translateZ(${
      (arrayLength - index) * incrementZ
    }px) translateY(${y}) rotate(${rotate}deg) scale(${scale})`;

    const cardStyle = {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform,
      opacity,
      backfaceVisibility: "hidden" as const,
      zIndex: arrayLength - index,
      ...style,
    };

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
CardTransformed.displayName = "CardTransformed";

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating);
    const fractionalPart = rating - filledStars;
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0);

    return (
      <div
        className={cn("flex items-center gap-2", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, index) => (
            <svg
              key={`filled-${index}`}
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          {fractionalPart > 0 && (
            <svg
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <defs>
                <linearGradient id="half">
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="currentColor"
                  />
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="rgb(209 213 219)"
                  />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
                fill="url(#half)"
              />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <svg
              key={`empty-${index}`}
              className="size-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
        <p className="sr-only">{rating}</p>
      </div>
    );
  }
);
ReviewStars.displayName = "ReviewStars";
