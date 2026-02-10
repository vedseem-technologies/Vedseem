import { useState, useEffect, useRef } from "react";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  caseStudyLink: string;
}

export default function AnimatedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextProjectIndex, setNextProjectIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: "Where's The Fork",
      description:
        "A food truck franchise platform designed to manage multiple vendors, locations, and menus while enabling customers to discover nearby trucks and place orders easily.",
      image: "/projects/wtf.jpg.jpeg",
      tags: ["Python", "MQTT", "TimescaleDB"],
      caseStudyLink: "https://www.wtffoods.in/",
    },
    {
      title: "Knect Hotel",
      description:
        "A hotel management and booking solution that streamlines reservations, room availability, guest management, and day-to-day hotel operations.",
      image: "/projects/knect.jpg.jpeg",
      tags: ["React", "Node.js", "Cloud"],
      caseStudyLink: "https://www.knecthotel.com/",
    },
    {
      title: "Book My Party",
      description:
        "An all-in-one event management and venue booking platform that allows users to discover, compare, and book party venues and services seamlessly.",
      image: "/projects/bmp.jpg.jpeg",
      tags: ["Wordpress", "React", "PHP", "Tailwind CSS", "MongoDB"],
      caseStudyLink: "https://www.bookmyparty.co.in/",
    },
    {
      title: "Bundelkhand Chamber of Commerce",
      description:
        "An official digital platform for the regional chamber of commerce, enabling business registrations, event management, announcements, and member networking.",
      image: "/projects/bcci.jpg.jpeg",
      tags: ["Vue.js", "CMS", "WebSocket"],
      caseStudyLink: "https://bundelkhandchamberofcommerce.com/",
    },
    {
      title: "Gunno Media Productions",
      description:
        "A media and production company website showcasing portfolios, projects, and creative services with a strong emphasis on visual storytelling.",
      image: "/projects/wtf.jpg.jpeg",
      tags: ["Next.js", "Media", "PostgreSQL"],
      caseStudyLink: "https://www.wtffoods.in/",
    },
  ];

  const getNextQueue = () => {
    return [
      { project: projects[(currentIndex + 1) % projects.length], id: 2 },
      { project: projects[(currentIndex + 2) % projects.length], id: 3 },
      { project: projects[(currentIndex + 3) % projects.length], id: 4 },
    ];
  };

  const animateTransition = (targetIndex: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setNextProjectIndex(targetIndex);

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Wait for DOM update, then animate
    requestAnimationFrame(() => {
      const transitionEl = transitionRef.current;
      const heroEl = heroRef.current;

      if (!transitionEl || !heroEl) return;

      // GSAP animation sequence
      const tl = window.gsap.timeline({
        onComplete: () => {
          setCurrentIndex(targetIndex);
          setNextProjectIndex(null);
          setIsTransitioning(false);
        },
      });

      // Phase 1: Scale up from thumbnail (0 to 1s)
      tl.fromTo(
        transitionEl,
        {
          scale: 0.2,
          opacity: 0.5,
          x: window.innerWidth * 0.35,
          y: window.innerHeight * 0.2,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Phase 2: Fade merge (1s to 2s)
      tl.to(
        heroEl,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.5",
      );

      tl.to(
        transitionEl,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.5",
      );
    });
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    animateTransition(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    animateTransition(prevIndex);
  };

  const jumpToProject = (offset: number) => {
    const targetIndex = (currentIndex + offset) % projects.length;
    animateTransition(targetIndex);
  };

  useEffect(() => {
    // Load GSAP
    if (!window.gsap) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Set up timer only when not transitioning
    if (!isTransitioning) {
      timerRef.current = setTimeout(() => {
        goNext();
      }, 6000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isTransitioning]);

  return (
    <>
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-progress {
          animation: progress 6s linear;
        }

        .animate-progress-paused {
          animation: progress 6s linear paused;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .hero-card {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .transition-card {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          z-index: 10;
          pointer-events: none;
        }

        .thumb-card {
          width: 120px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          position: relative;
          transition: all 0.3s ease;
        }

        .thumb-card:hover {
          transform: scale(1.05);
          border-color: rgba(59, 130, 246, 0.6);
        }

        .thumb-desc {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7), transparent);
          padding: 8px 6px 4px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .thumb-card:hover .thumb-desc {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .thumb-card::after {
          content: attr(data-id);
          position: absolute;
          top: 4px;
          left: 4px;
          background: rgba(59, 130, 246, 0.9);
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 6px;
          z-index: 10;
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(59, 130, 246, 0.9);
          border: none;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 20;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .nav-btn:hover {
          background: rgba(59, 130, 246, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .hero-id-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(59, 130, 246, 0.95);
          color: white;
          font-size: 18px;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 12px;
          z-index: 30;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>

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

          <div className="relative h-[480px] sm:h-[520px] md:h-[650px] lg:h-[700px]">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/20 z-30 overflow-hidden rounded-t-8xl">
              <div
                key={`progress-${currentIndex}-${isTransitioning}`}
                className={`h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 ${
                  isTransitioning
                    ? "animate-progress-paused"
                    : "animate-progress"
                } rounded-t-full`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <div className="relative w-full h-full overflow-visible">
              {/* Hero Card - Always ID 1 */}
              <div
                ref={heroRef}
                key={`hero-${currentIndex}`}
                className="hero-card"
              >
                {/* ID Badge */}
                <div className="hero-id-badge">ID 1</div>

                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                <div className="absolute bottom-0 p-10 max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6">
                    {projects[currentIndex].description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[currentIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-600/20 text-blue-200 border border-blue-400/20 rounded-lg"
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

              {/* Transition Card - Animating next project */}
              {isTransitioning && nextProjectIndex !== null && (
                <div ref={transitionRef} className="transition-card">
                  <img
                    src={projects[nextProjectIndex].image}
                    alt={projects[nextProjectIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                  <div className="absolute bottom-0 p-10 max-w-3xl">
                    <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                      {projects[nextProjectIndex].title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      {projects[nextProjectIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[nextProjectIndex].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-600/20 text-blue-200 border border-blue-400/20 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails - IDs 2, 3, 4 */}
            <div className="absolute bottom-2 sm:bottom-6 right-1/2 sm:right-6 translate-x-1/2 sm:translate-x-0 flex gap-2 sm:gap-4">
              {getNextQueue().map(({ project, id }, i) => (
                <div
                  key={`thumb-${currentIndex}-${i}`}
                  data-id={`ID ${id}`}
                  onClick={() => !isTransitioning && jumpToProject(i + 1)}
                  className="thumb-card"
                  style={{
                    pointerEvents: isTransitioning ? "none" : "auto",
                    opacity: isTransitioning ? 0.5 : 1,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="thumb-img"
                  />
                  <div className="thumb-desc">
                    <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">
                      {project.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 -left-3 md:left-6
  flex items-center justify-center rounded-full
  bg-blue-600 text-white
  w-8 h-8        /* mobile */
  sm:w-12 sm:h-12   /* small tablets */
  md:w-14 md:h-14   /* tablets */
  shadow-lg transition-transform duration-300 active:scale-90"
              aria-label="Previous"
            >
              <ArrowLeft size={22} className="size-8" />
            </button>

            <button
              onClick={goNext}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 -right-3 md:right-6
  flex items-center justify-center rounded-full
  bg-blue-600 text-white
  w-8 h-8        /* mobile */
  sm:w-12 sm:h-12   /* small tablets */
  md:w-14 md:h-14   /* tablets */
  shadow-lg transition-transform duration-300 active:scale-90"
              aria-label="Next"
            >
              <ArrowRight size={22} className="size-8" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
