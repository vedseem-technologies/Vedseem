import { useEffect, useRef, useState, Suspense } from "react";
import Hero from "../components/Hero";
import AnimatedProjectsMobile from "../components/AnimatedProjectsMobile";
import TechStack from "../components/TechStack";
import Testimonials from "../components/Testimonials";
import { ArrowRight } from "lucide-react";
import Loader from "../components/Loader";
import ParticleLineScrollFeatures from "../components/ui/ParticleLineScrollFeatures";
import CylindricalPortfolio3D from "../components/CylindricalPortfolio3D";
import SideNav from "../components/SideNav";
import StatsVisualization3D from "../components/about/StatsVisualization3D";

export default function Home() {
  const [pageReady, setPageReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const projects = [
    {
      title: "Where's The Fork",
      description:
        "A food truck franchise platform designed to manage multiple vendors, locations, and menus while enabling customers to discover nearby trucks and place orders easily.",
      image:
        "https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
    },
    {
      title: "Knect Hotel",
      description:
        "A hotel management and booking solution that streamlines reservations, room availability, guest management, and day-to-day hotel operations.",
      image:
        "https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
    },
    {
      title: "Dhanush Digital",
      description:
        "A scalable e-commerce platform built to support online product listings, secure payments, order management, and a seamless shopping experience for customers.",
      image:
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
    },
    {
      title: "Bundelkhand Chamber of Commerce",
      description:
        "An official digital platform for the regional chamber of commerce, enabling business registrations, event management, announcements, and member networking.",
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
    },
    {
      title: "Gunno Media Productions",
      description:
        "A media and production company website showcasing portfolios, projects, and creative services with a strong emphasis on visual storytelling.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Javascript", "Tailwind CSS", "Framer-Motion", "Nodemailer"],
      caseStudyLink: "#",
    },
  ];

  useEffect(() => {
    setPageReady(true);
  }, []);

  const stats = [
    {
      number: "100+",
      label: "Happy Clients",
    },
    {
      number: "200+",
      label: "Projects Delivered",
    },
    {
      number: "15+",
      label: "Countries Served",
    },
    {
      number: "24/7",
      label: "Support Available",
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
        <SideNav />
        <div id="hero">
          <Hero />
        </div>

        {/* Stats Section */}
        <div>
          <StatsVisualization3D stats={stats} />
        </div>

        {/* Features Section */}
        <div id="capabilities">
          <ParticleLineScrollFeatures />
        </div>

        {/* Desktop & tablet 3D Gallery */}
        <div id="gallery" className="hidden sm:block">
          <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white">Loading 3D Gallery...</div>}>
            <CylindricalPortfolio3D projects={projects} />
          </Suspense>
        </div>

        {/* Mobile */}
        <AnimatedProjectsMobile projects={projects} />

        {/* Tech Stack Section */}
        <TechStack />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        {/* <section id="cta" className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 py-20 border-y border-blue-500/20">
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
        </section> */}
      </div>
    </>
  );
}
