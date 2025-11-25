"use client";
import React, { useRef, useEffect } from "react";
import AnimatedText from "./AnimatedText";
import { gsap } from "gsap";

export default function LoadingSpinner() {
  const containerRef = useRef(null);

  useEffect(() => {
    // alphabet ke fixed direction (tera diya hua data)
    const movements = [
      { x: -100, y: -100 }, // A
      { x: -150, y: 70 }, // R
      { x: 0, y: -80 }, // P
      { x: 100, y: 100 }, // I
      { x: 250, y: -100 }, // T
    ];

    // 3 sec ke baad letters move krenge
    const moveTimeout = setTimeout(() => {
      const letters = containerRef.current?.querySelectorAll(".arpit-letter");
      if (!letters || letters.length === 0) return;

      const allLetters = Array.from(letters);

      gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.5 } }).to(
        allLetters,
        {
          x: (i) => movements[i]?.x ?? 0,
          y: (i) => movements[i]?.y ?? 0,
          rotation: () => 360 * (Math.random() > 0.5 ? 1 : -1),
          opacity: 0,
          scale: 0.6,
          stagger: 0,
        },
        0
      );
    }, 2000);

    // 3 sec ke baad pura loader fade out ho jaye
    const hideTimeout = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      });
    }, 3000);

    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,1)",
        zIndex: 99999,
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <AnimatedText text="VEDSEEM" letterClass="arpit-letter" />
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          border: 0,
        }}
      >
        Loading...
      </span>
    </div>
  );
}
