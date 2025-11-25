import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import AnimatedProjects from "../components/AnimatedProjects";
import AnimatedProjectsMobile from "../components/AnimatedProjectsMobile";
import { TrendingUp, Users, Award, Zap, ArrowRight } from "lucide-react";
import Loader from "../components/Loader";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [pageReady, setPageReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
const projects = [
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

  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const [countedStats, setCountedStats] = useState({
    clients: 0,
    projects: 0,
    countries: 0,
    support: "0/0",
  });

  const hasAnimatedRef = useRef(false);

  // PAGE LOADED
  useEffect(() => {
    setPageReady(true);

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");

          if (entry.target === statsRef.current && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            animateStats();
          }
        }
      });
    }, observerOptions);

    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  function animateStats() {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targetValues = {
      clients: 100,
      projects: 200,
      countries: 15,
      support: "24/7",
    };

    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCountedStats({
        clients: Math.floor(targetValues.clients * easeOutQuart),
        projects: Math.floor(targetValues.projects * easeOutQuart),
        countries: Math.floor(targetValues.countries * easeOutQuart),
        support:
          currentStep === steps
            ? targetValues.support
            : `${Math.floor(24 * easeOutQuart)}/${Math.floor(
                7 * easeOutQuart
              )}`,
      });

      if (currentStep < steps) {
        setTimeout(animate, stepDuration);
      } else {
        setCountedStats({
          clients: 100,
          projects: 200,
          countries: 15,
          support: "24/7",
        });
      }
    };

    animate();
  }

  const stats = [
    {
      icon: Users,
      value: `${countedStats.clients}+`,
      label: "Happy Clients",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Award,
      value: `${countedStats.projects}+`,
      label: "Projects Delivered",
      color: "from-cyan-400 to-blue-400",
    },
    {
      icon: TrendingUp,
      value: `${countedStats.countries}+`,
      label: "Countries Served",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Zap,
      value: countedStats.support,
      label: "Support Available",
      color: "from-purple-400 to-pink-400",
    },
  ];

  const features = [
    {
      title: "Cutting-Edge Technology",
      description: "We leverage the latest technologies.",
      icon: "🚀",
    },
    {
      title: "Expert Team",
      description: "Experienced developers and designers.",
      icon: "👥",
    },
    {
      title: "Agile Methodology",
      description: "Fast delivery with continuous improvement.",
      icon: "⚡",
    },
    {
      title: "Scalable Solutions",
      description: "Apps that grow with your business.",
      icon: "📈",
    },
    {
      title: "Security First",
      description: "Enterprise-grade protection.",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      description: "Always available assistance.",
      icon: "🛡️",
    },
  ];

  return (
    <>
      {/* Loader always on top until done */}
      {!loaderDone && (
        <Loader pageReady={pageReady} onComplete={() => setLoaderDone(true)} />
      )}

      {/* Full page is PRE-RENDERED behind loader */}
      <div
        className={
          loaderDone
            ? "opacity-100"
            : "opacity-0 transition-opacity duration-300"
        }
      >
        <Hero onNavigate={onNavigate} />

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="bg-gradient-to-b from-black via-blue-950 to-black py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Achievements
                </span>
              </h2>
              <p className="text-gray-400">
                Numbers that speak for our excellence
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center group bg-gradient-to-br from-blue-900/10 to-cyan-900/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 hover:border-blue-500/60 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                    <div
                      className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 tabular-nums`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Vedseem
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine innovation, expertise, and dedication to deliver
                exceptional results for your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop & tablet */}
        <div className="hidden sm:block">
          <AnimatedProjects />
        </div>

        {/* Mobile */}
        <AnimatedProjectsMobile projects={projects} />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 py-20 border-y border-blue-500/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your goals with
              innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("contact")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
