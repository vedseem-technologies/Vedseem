"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "David Martinez",
      role: "CEO",
      company: "TechCorp Solutions",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Vedseem transformed our digital infrastructure completely. Their expertise in cloud solutions and DevOps helped us scale our operations efficiently. Highly recommended!",
    },
    {
      name: "Jennifer Lee",
      role: "Product Manager",
      company: "InnovateLabs",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Working with Vedseem was a game-changer for our startup. They delivered a beautiful, functional app ahead of schedule and within budget. True professionals!",
    },
    {
      name: "Robert Thompson",
      role: "CTO",
      company: "FinanceFlow",
      image:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "The team at Vedseem is exceptional. Their attention to detail and commitment to quality is unmatched. They built us a secure, scalable platform that exceeded expectations.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setProgress(0);
  };

  // AUTOPLAY + PROGRESS BAR
  useEffect(() => {
    const duration = 6000;
    const step = 40;

    let interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextSlide();
          return 0;
        }
        return p + 100 / (duration / step);
      });
    }, step);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="bg-black py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-300 text-lg">
            Trusted by global leaders, proven by results.
          </p>
        </div>

        <div className="relative">
          {/* CARD */}
          <div
            className="relative bg-gradient-to-br from-blue-900/30 to-cyan-900/20 
          backdrop-blur-xl border border-blue-500/20 rounded-3xl
          p-6 sm:p-10 md:p-14 shadow-xl overflow-hidden"
          >
            {/* PROGRESS BAR */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Quote Icon */}
                <Quote size={48} className="text-blue-400 mb-6" />

                {/* TEXT */}
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-10">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* PROFILE */}
                <motion.div className="flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover 
                    border-2 border-blue-500 shadow-lg shadow-blue-500/30"
                  />

                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-blue-300">
                      {testimonials[currentIndex].role} •{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NAV BUTTONS */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 
            bg-blue-600/80 hover:bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 
            bg-blue-600/80 hover:bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-xl"
          >
            <ChevronRight size={24} />
          </button>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setProgress(0);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i ? "w-8 bg-blue-500" : "w-3 bg-blue-500/40"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
