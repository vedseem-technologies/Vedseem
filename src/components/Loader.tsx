"use client";
import { useEffect, useState } from "react";
import AnimatedText from "./ui/AnimatedText";

interface LoaderProps {
  pageReady: boolean;
  onComplete: () => void;
}

export default function Loader({ pageReady, onComplete }: LoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  // minimum time loader must stay
  const MIN_TIME = 2200;
  const [minDone, setMinDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinDone(true), MIN_TIME);
    return () => clearTimeout(t);
  }, []);

  // when both ready → fade loader
  useEffect(() => {
    if (pageReady && minDone) {
      setFadeOut(true);
      const timeout = setTimeout(onComplete, 700);
      return () => clearTimeout(timeout);
    }
  }, [pageReady, minDone, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center
      bg-gradient-to-br from-black via-blue-950 to-black

      transition-opacity duration-700 
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Animated Text */}
      <div className="fadeText flex items-end gap-1">
        <AnimatedText text="V" letterClass="loader-letter text-6xl" />
        <AnimatedText text="EDSEEM" letterClass="loader-letter text-5xl" />
      </div>

      <style jsx>{`
        .fadeText {
          display: inline-block;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeInText 1s ease-out forwards;
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loader-letter {
          display: inline-block;
          animation: float 1.8s ease-in-out infinite alternate;
        }

        .loader-letter:nth-child(odd) {
          animation-delay: 0.2s;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
