"use client";
import { useState, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  caseStudyLink: string;
}

export default function AnimatedProjectsMobile({
  projects,
}: {
  projects: Project[];
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const duration = 6000; // 6 sec timer

  // Auto-progress bar + slide
  useEffect(() => {
    setProgress(0);
    const step = 50; // ms per step

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + 100 / (duration / step);
      });
    }, step);

    return () => clearInterval(interval);
  }, [index]);

  const next = () => setIndex((index + 1) % projects.length);
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);

  const p = projects[index];

  return (
    <section className="bg-black py-10 px-4 sm:hidden overflow-hidden">
      <h2 className="text-3xl font-black text-white mb-6 text-center">
        Featured{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Projects
        </span>
      </h2>

      <div className="relative rounded-2xl overflow-hidden bg-blue-900/20 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative w-full h-[560px] rounded-2xl overflow-hidden shadow-xl flex flex-col"
          >
            {/* Image section */}
            <div className="relative w-full h-[240px] flex-shrink-0">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient at bottom of image for smooth transition */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a1628] to-transparent" />
            </div>

            {/* Content section below image */}
            <div className="relative bg-gradient-to-b from-[#0a1628] to-[#0d1f3c] p-5 pb-6 flex-1 flex flex-col">
              {/* Title row with navigation arrows */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <button
                  onClick={prev}
                  className="flex-shrink-0 bg-blue-600/60 hover:bg-blue-600/90 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <h3 className="text-xl font-bold text-white text-center flex-1 leading-tight">
                  {p.title}
                </h3>

                <button
                  onClick={next}
                  className="flex-shrink-0 bg-blue-600/60 hover:bg-blue-600/90 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <p className="text-gray-300/90 text-sm leading-relaxed mb-4">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium bg-blue-500/15 border border-blue-400/25 text-blue-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={p.caseStudyLink}
                className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
                View Case Study <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bars */}
      <div className="flex justify-center gap-2 mt-5 w-full">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 bg-blue-900/60 rounded-full overflow-hidden ${
              i === index ? "w-10" : "w-1.5"
            } transition-all duration-300`}
          >
            <div
              className={`h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-75 ${
                i === index ? "" : "w-0"
              }`}
              style={{
                width: i === index ? `${progress}%` : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
