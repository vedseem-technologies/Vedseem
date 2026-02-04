import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const lastScrollY = useRef(0);
  const isInitialMount = useRef(true);

  // Intersection Observer to detect when footer enters viewport
  useEffect(() => {
    // Set initial scroll position
    lastScrollY.current = window.scrollY;
    
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      // Mark that user has started scrolling (not initial mount)
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          
          // Simplified logic: trigger when footer enters viewport
          if (entry.isIntersecting && !hasAnimated) {
            // Small delay to ensure we're not on initial page load at bottom
            if (currentScrollY > 50 || !isInitialMount.current) {
              setIsInView(true);
              setHasAnimated(true);
              isInitialMount.current = false;
            }
          } else if (!entry.isIntersecting && hasAnimated) {
            // Reset when completely out of view (allows re-animation if user scrolls back)
            const rect = entry.boundingClientRect;
            if (rect.bottom < -100) {
              setIsInView(false);
              setHasAnimated(false);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger when footer is in viewport
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className={cn("select-none uppercase cursor-pointer", className)}
        style={{ padding: "10px" }}
      >
      <defs>
        {/* Primary blue gradient for stroke animation */}
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="1" />
          <stop offset="20%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="40%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="60%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="80%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="1" />
        </linearGradient>

        {/* Hover gradient with different blue tones */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="15%" stopColor="#2563eb" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="45%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#06b6d4" />
              <stop offset="75%" stopColor="#3b82f6" />
              <stop offset="90%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </>
          )}
        </linearGradient>

        {/* Animated gradient for progressive reveal */}
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="25%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      {/* Base text for shadow/glow effect */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fontSize="65"
        fontFamily="helvetica, Arial, sans-serif"
        fontWeight="bold"
        className="fill-transparent stroke-neutral-200 dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.3 : 0 }}
      >
        {text}
      </text>
      
      {/* Progressive stroke animation - draws the text outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        fontSize="65"
        fontFamily="helvetica, Arial, sans-serif"
        fontWeight="bold"
        fill="none"
        stroke="url(#strokeGradient)"
        initial={{ 
          strokeDashoffset: 1200,
          strokeDasharray: 1200,
          opacity: 0 
        }}
        animate={
          isInView
            ? {
                strokeDashoffset: 0,
                strokeDasharray: 1200,
                opacity: 1,
              }
            : {
                strokeDashoffset: 1200,
                strokeDasharray: 1200,
                opacity: 0,
              }
        }
        transition={{
          strokeDashoffset: {
            duration: 3.5,
            ease: "easeInOut",
            delay: 0.3,
          },
          opacity: {
            duration: 0.5,
            delay: 0.3,
          },
        }}
      >
        {text}
      </motion.text>

      {/* Hover gradient reveal effect */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.4"
        fontSize="65"
        fontFamily="helvetica, Arial, sans-serif"
        fontWeight="bold"
        fill="none"
        mask="url(#textMask)"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.text>
      
      {/* Additional animated gradient overlay */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#animatedGradient)"
        strokeWidth="0.35"
        fontSize="65"
        fontFamily="helvetica, Arial, sans-serif"
        fontWeight="bold"
        fill="none"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: 0.6,
              }
            : {
                opacity: 0,
              }
        }
        transition={{
          duration: 2,
          delay: 1.5,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
    </svg>
    </div>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3b82f633 100%)",
      }}
    />
  );
};
