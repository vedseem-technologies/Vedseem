import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Hero3D from "./ui/Hero3D";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center 
      overflow-hidden bg-black animate-hero-enter"
    >
      <Hero3D />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-pulse">
          <Sparkles size={16} className="text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">
            Future-Ready IT Solutions
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Transforming Ideas Into
          <br />
          <span className="text- bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-shimmer">
            Future-Ready Solutions
          </span>
        </h1>

        <p
          className="text-md md:text-lg lg:text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Vedseem delivers cutting-edge IT services, innovative software
          development, and strategic technology consultation to help your
          business thrive in the digital age.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-modal"))}
            className="px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 font-semibold 
            rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            BOOK A FREE DEMO
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
