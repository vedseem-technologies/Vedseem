import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", page: "home" },
    { label: "About", page: "about" },
    { label: "Services", page: "services" },
    { label: "Projects", page: "projects" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all  duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md py-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[90%] mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => onNavigate("home")}
            className="text-2xl font-bold text-white cursor-pointer tracking-wide hover:text-blue-400 transition-colors"
          >
            Vedseem
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const active = currentPage === item.page;
              return (
                <div key={item.page} className="flex items-center">
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="group relative px-3 py-2 overflow-hidden"
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Visible Text (slides up on hover) */}
                      <span 
                        className={`text-sm font-medium transition-transform duration-300 group-hover:-translate-y-[150%] ${
                          active ? "text-blue-400" : "text-gray-300"
                        }`}
                      >
                        {item.label}
                      </span>
                      
                      {/* Hidden Text (slides up from bottom) */}
                      <span 
                        className={`absolute top-0 left-0 w-full text-center text-sm font-medium transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0 ${
                          active ? "text-blue-400" : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Active Indicator Dot */}
                    {/* {active && (
                       <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )} */}
                  </button>
                  
                  {/* Separator - only show if not the last item */}
                  {index < navItems.length - 1 && (
                    <span className="mx-4 text-white/50 text-lg font-light select-none">|</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE DRAWER - Slides from Top */}
      <aside
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">Vedseem</h2>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
            {navItems.map((item, index) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    animationDelay: `${index * 80}ms`
                  }}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                    mobileMenuOpen ? 'animate-[slideDown_0.5s_ease-out_forwards]' : ''
                  } ${
                    active ? "scale-[1.02]" : "hover:scale-[1.02]"
                  }`}
                >
                  {/* Glassmorphism Card */}
                  <div className={`relative p-3 backdrop-blur-xl border transition-all duration-300 ${
                    active 
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30 shadow-lg shadow-blue-500/20" 
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}>
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative">
                      <span className={`text-base font-semibold transition-colors ${
                        active ? "text-blue-400" : "text-white"
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Active Indicator Bar */}
                    {active && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-t-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
