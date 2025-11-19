import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AnimatedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  const projects: Project[] = [
    {
      title: 'FinTech Platform',
      description: 'A comprehensive financial management platform with real-time analytics and AI-powered insights that revolutionized how businesses manage their finances.',
      image: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'AI/ML', 'Cloud'],
      caseStudyLink: '#',
    },
    {
      title: 'E-Commerce Solution',
      description: 'Modern e-commerce platform with personalized shopping experience and seamless checkout, driving 300% increase in conversion rates.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      caseStudyLink: '#',
    },
    {
      title: 'Healthcare App',
      description: 'HIPAA-compliant telemedicine application connecting patients with healthcare providers, serving over 50,000 active users.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'HIPAA', 'WebRTC'],
      caseStudyLink: '#',
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with real-time data visualization and customizable widgets, empowering data-driven decision making.',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Vue.js', 'D3.js', 'WebSocket'],
      caseStudyLink: '#',
    },
    {
      title: 'IoT Platform',
      description: 'Industrial IoT platform for monitoring and managing connected devices at scale, processing millions of data points daily.',
      image: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'MQTT', 'TimescaleDB'],
      caseStudyLink: '#',
    },
    {
      title: 'AI Chatbot',
      description: 'Intelligent customer service chatbot with natural language processing capabilities, reducing support tickets by 60%.',
      image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['NLP', 'TensorFlow', 'FastAPI'],
      caseStudyLink: '#',
    },
  ];

  useEffect(() => {
    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Reset progress and start time when project changes
    setProgress(0);
    startTimeRef.current = Date.now();

    const duration = 6000; // 6 seconds per project

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Move to next project
        setCurrentIndex((prev) => (prev + 1) % projects.length);
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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="bg-gradient-to-b from-black via-blue-950 to-black py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of innovative solutions that drive business success and transform industries.
          </p>
        </div>

        {/* Main Featured Project */}
        <div className="relative mb-16">
          <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 shadow-2xl shadow-blue-500/20">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/20 z-30">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-100 ease-linear relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Featured Project Image with smooth transition */}
            <div className="absolute inset-0">
              <img
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/70 hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/70 hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ArrowRight size={24} />
            </button>

            {/* Project Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              <div className="max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-sm font-medium rounded-full border border-blue-500/50">
                    Project {currentIndex + 1} of {projects.length}
                  </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-2xl">
                  {projects[currentIndex].description}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {projects[currentIndex].tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-sm font-medium rounded-full border border-blue-500/50 hover:bg-blue-500/30 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={projects[currentIndex].caseStudyLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  View Case Study
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Project Thumbnails */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {projects.map((project, index) => {
              const isActive = index === currentIndex;
              const distance = Math.abs(index - currentIndex);
              const isNearby = distance <= 2;

              return (
                <div
                  key={index}
                  className={`flex-shrink-0 transition-all duration-700 ease-out snap-center ${
                    isActive
                      ? 'w-full md:w-[350px] scale-100 opacity-100'
                      : isNearby
                      ? 'w-[180px] md:w-[220px] scale-95 opacity-70'
                      : 'w-[120px] md:w-[150px] scale-90 opacity-40'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setProgress(0);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className={`relative h-28 md:h-36 rounded-xl overflow-hidden border-2 transition-all duration-700 ${
                      isActive
                        ? 'border-blue-500 shadow-xl shadow-blue-500/50 ring-2 ring-blue-500/50'
                        : 'border-blue-500/30 hover:border-blue-500/60'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-white font-semibold text-sm md:text-base truncate">
                        {project.title}
                      </h4>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse ring-2 ring-blue-400/50"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-10 shadow-lg shadow-blue-500/50'
                  : 'bg-blue-500/30 w-2 hover:bg-blue-500/50 hover:w-6'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
