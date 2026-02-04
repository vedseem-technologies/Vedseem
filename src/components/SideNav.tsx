"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useSpring } from "framer-motion";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "achievements", label: "Stats" },
  { id: "capabilities", label: "Features" },
  { id: "gallery", label: "Projects" },
  { id: "technologies", label: "Technologies" },
  { id: "testimonials", label: "Testimonials" },
];

export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Offset slightly to trigger earlier
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;

      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate line height based on active index
  // Total gap steps = sections.length - 1
  const lineProgress = useMemo(() => {
    return activeIndex / (sections.length - 1);
  }, [activeIndex]);

  const scaleY = useSpring(lineProgress, {
    stiffness: 80,
    damping: 25,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center h-[320px] justify-between">
      {/* Background Track Line */}
      <div className="absolute top-2 bottom-2 w-[2px] bg-white/10 rounded-full">
        {/* Fill Line */}
        <motion.div 
          className="w-full bg-gradient-to-b from-green-400 to-blue-500 origin-top h-full rounded-full shadow-[0_0_10px_rgba(74,222,128,0.3)]"
          style={{ scaleY }}
        />
      </div>

      {/* Dots Container */}
      <div className="flex flex-col h-full justify-between items-center relative z-10 w-full">
        {sections.map((section, index) => {
          const isActive = activeIndex === index;
          const isPassed = index < activeIndex;
          const isCurrentOrPassed = index <= activeIndex;
          
          return (
            <div
              key={section.id}
              className="relative flex items-center group cursor-pointer w-full justify-center"
              onClick={() => scrollToSection(section.id)}
            >
              {/* The Dot */}
              <div 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-700 flex items-center justify-center relative
                  ${isCurrentOrPassed 
                    ? "border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]" 
                    : "border-white/20 bg-zinc-900 group-hover:border-white/40"
                  }
                  ${isActive ? "scale-125" : "scale-100"}
                `}
              >
                {/* Completed Fill */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isCurrentOrPassed ? 1 : 0,
                    opacity: isCurrentOrPassed ? 1 : 0
                  }}
                  className={`absolute inset-0.5 rounded-full ${isActive ? 'bg-green-400' : 'bg-green-400/60'}`}
                />

                {/* Pulsing ring for active dot */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border border-green-400"
                  />
                )}
              </div>

              {/* Label */}
              <span className={`absolute left-10 text-[10px] font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap
                ${isActive ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-2 text-white/40 group-hover:opacity-100 group-hover:translate-x-0"}
              `}>
                {section.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
