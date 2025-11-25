// ...existing code...
"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  letterClass?: string;
}

const AnimatedText = ({
  text,
  letterClass = "arpit-letter",
}: AnimatedTextProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={containerRef}
      className="inline-block leading-relaxed font-extrabold text-6xl tracking-wide"
    >
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i}> </span>;
        return (
          <span
            key={i}
            className={`${letterClass} transition-all lobster-two-bold-italic duration-700 ease-in-out inline-block ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{
              color: "#ffffff",
              transitionDelay: `${i * 80}ms`,
              letterSpacing: "",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedText;
// ...existing code...
