import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number>();

  const testimonials: Testimonial[] = [
    {
      name: 'David Martinez',
      role: 'CEO',
      company: 'TechCorp Solutions',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Vedseem transformed our digital infrastructure completely. Their expertise in cloud solutions and DevOps helped us scale our operations efficiently. Highly recommended!',
    },
    {
      name: 'Jennifer Lee',
      role: 'Product Manager',
      company: 'InnovateLabs',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Working with Vedseem was a game-changer for our startup. They delivered a beautiful, functional app ahead of schedule and within budget. True professionals!',
    },
    {
      name: 'Robert Thompson',
      role: 'CTO',
      company: 'FinanceFlow',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'The team at Vedseem is exceptional. Their attention to detail and commitment to quality is unmatched. They built us a secure, scalable platform that exceeded expectations.',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  useEffect(() => {
    // Cancel existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Reset progress when testimonial changes
    setProgress(0);

    const duration = 5000; // 5 seconds
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        nextTestimonial();
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="bg-black py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300">
            Don't just take our word for it - hear from our satisfied clients.
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/20 z-20">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 relative overflow-hidden"
                style={{ width: `${progress}%`, transition: 'none' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <Quote className="text-blue-400 mb-6" size={48} />

            <p className="text-xl text-white mb-8 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
                <p className="text-blue-400">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setProgress(0);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-8' : 'bg-blue-500/30 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
