import { useState, useEffect } from "react";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "../types";

export default function AnimatedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const projects: Project[] = [
    {
      title: "FinTech Platform",
      description:
        "A comprehensive financial management platform with real-time analytics and AI-powered insights.",
      image:
        "https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "AI/ML", "Cloud"],
      caseStudyLink: "#",
    },
    {
      title: "E-Commerce Solution",
      description:
        "Modern UX-driven shopping experience with personalization and seamless payments.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      caseStudyLink: "#",
    },
    {
      title: "Healthcare App",
      description:
        "HIPAA-compliant telemedicine app connecting patients with verified doctors.",
      image:
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React Native", "WebRTC", "HIPAA"],
      caseStudyLink: "#",
    },
    {
      title: "SaaS Dashboard",
      description:
        "Real-time visual analytics and AI-enhanced forecasting for enterprises.",
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Vue.js", "D3.js", "WebSocket"],
      caseStudyLink: "#",
    },
    {
      title: "IoT Platform",
      description:
        "Monitor and control industrial devices processing millions of events daily.",
      image:
        "https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "MQTT", "TimescaleDB"],
      caseStudyLink: "#",
    },
  ];

  const getNextQueue = () => {
    return [
      projects[(currentIndex + 1) % projects.length],
      projects[(currentIndex + 2) % projects.length],
      projects[(currentIndex + 3) % projects.length],
    ];
  };

  const goNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setAnimating(false);
    }, 650);
  };

  const goPrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + projects.length) % projects.length
      );
      setAnimating(false);
    }, 650);
  };

  useEffect(() => {
    const timer = setTimeout(goNext, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="bg-gradient-to-b from-black via-blue-950 to-black py-24 relative overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Projects
            </span>
          </h2>
        </div>

        <div className="relative h-[560px] md:h-[680px]">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/20 z-30 
                          overflow-hidden rounded-t-8xl">
            <div
              key={currentIndex}
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 
                         animate-progress rounded-t-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>


          {/* Hero Project Card */}
          <div
            key={currentIndex}
            className={`absolute inset-0 rounded-3xl overflow-hidden border border-blue-400/40 bg-blue-900/30 shadow-2xl backdrop-blur-sm transition-all duration-700 ${
              animating ? "animate-slide-down" : "animate-slide-up"
            }`}
          >
            <img
              src={projects[currentIndex].image}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="absolute bottom-0 p-10 max-w-3xl">
              <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                {projects[currentIndex].title}
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                {projects[currentIndex].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {projects[currentIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-600/20 text-blue-200 border border-blue-400/20 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={projects[currentIndex].caseStudyLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-all"
              >
                View Case Study <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            {getNextQueue().map((project, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex((currentIndex + 1 + i) % projects.length)}
                className="thumb-card"
              >
                <img src={project.image} className="thumb-img" />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={goPrev}
            className="nav-btn left-6"
            aria-label="Previous"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="nav-btn right-6"
            aria-label="Next"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
