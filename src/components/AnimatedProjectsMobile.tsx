"use client";
import { useState, useEffect } from "react";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
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
    <section className="bg-black py-12 px-4 sm:hidden overflow-hidden">
      <h2 className="text-3xl font-black text-white mb-6 text-center">
        Featured{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Projects
        </span>
      </h2>

      <div className="relative rounded-2xl overflow-hidden bg-blue-900/20 border border-blue-500/20 shadow-xl transition-all duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Image fills whole card */}
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Content on top of image */}
            <div className="absolute bottom-0 p-5 w-full">
              <h3 className="text-2xl font-bold text-white">{p.title}</h3>

              <p className="text-gray-300 text-sm mt-1">{p.description}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-white/10 border border-white/20 text-white rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={p.caseStudyLink}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium"
              >
                View Case Study <ExternalLink size={16} />
              </a>
            </div>

            {/* Navigation Buttons Over Image */}
            <button
              onClick={prev}
              className="absolute top-1/2 -translate-y-1/2 left-3 bg-blue-600/80 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-90"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={next}
              className="absolute top-1/2 -translate-y-1/2 right-3 bg-blue-600/80 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-90"
            >
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bars */}
      <div className="flex justify-center gap-2 mt-4 w-full">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 bg-blue-900 rounded-full overflow-hidden ${
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


