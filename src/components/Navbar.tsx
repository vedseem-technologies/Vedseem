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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
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
                    <span className="mx-2 text-white/20 text-lg font-light select-none">|</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={26} />
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

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {navItems.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-white hover:bg-white/5 hover:translate-x-1"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
