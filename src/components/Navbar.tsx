import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

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
    { label: "Home", page: "home", path: "/" },
    { label: "About", page: "about", path: "/about" },
    { label: "Services", page: "services", path: "/services" },
    { label: "Projects", page: "projects", path: "/projects" },
    { label: "Contact", page: "contact", path: "/contact" },
  ];

  // Close with exit animation
  const closeMenu = useCallback(() => {
    if (isClosing || !mobileMenuOpen) return;
    setIsClosing(true);
    // Wait for exit animations to finish, then close drawer
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 450);
  }, [isClosing, mobileMenuOpen]);

  const openMenu = () => {
    setMobileMenuOpen(true);
    setIsClosing(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md py-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[90%] mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-white cursor-pointer tracking-wide hover:text-blue-400 transition-colors"
          >
            Vedseem
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const active = currentPage === item.page;
              return (
                <div key={item.page} className="flex items-center">
                  <Link
                    to={item.path}
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
                  </Link>

                  {/* Separator - only show if not the last item */}
                  {index < navItems.length - 1 && (
                    <span className="mx-4 text-white/50 text-lg font-light select-none">
                      |
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => (mobileMenuOpen ? closeMenu() : openMenu())}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          mobileMenuOpen && !isClosing
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE DRAWER - Slides from Top */}
      <aside
        className={`fixed top-0 left-0 right-0 z-50 w-full transform transition-transform duration-500 ease-out ${
          mobileMenuOpen && !isClosing ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto">
          {/* Header bar — solid background, buttons emerge from behind this */}
          <div className="relative z-20 flex items-center justify-between px-6 h-16 bg-[#0a0a0f] border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Vedseem
            </h2>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="text-white" size={22} />
            </button>
          </div>

          {/* Navigation Items — emerge from behind header */}
          <div className="relative z-10 bg-[#0a0a0f]/95 backdrop-blur-xl">
            <div className="flex flex-col py-2">
              {navItems.map((item, index) => {
                const active = currentPage === item.page;
                // Enter: stagger forward. Exit: last button goes first (reverse stagger)
                const enterDelay = index * 100 + 150;
                const exitDelay = (navItems.length - 1 - index) * 70;
                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      navigate(item.path);
                      closeMenu();
                    }}
                    style={{
                      animationDelay: isClosing
                        ? `${exitDelay}ms`
                        : `${enterDelay}ms`,
                    }}
                    className={`group relative text-left w-full ${
                      isClosing
                        ? "animate-[cascadeOut_0.25s_ease-in_forwards]"
                        : mobileMenuOpen
                        ? "animate-[cascadeIn_0.4s_ease-out_forwards] opacity-0"
                        : "opacity-0"
                    }`}
                  >
                    <div
                      className={`relative flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
                        active ? "bg-blue-500/10" : "hover:bg-white/5"
                      }`}
                    >
                      {/* Active indicator bar — left edge */}
                      {active && (
                        <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full" />
                      )}

                      {/* Number index */}
                      <span
                        className={`text-xs font-mono w-5 transition-colors ${
                          active
                            ? "text-blue-400"
                            : "text-white/20 group-hover:text-white/40"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Label */}
                      <span
                        className={`text-lg font-semibold tracking-wide transition-colors ${
                          active
                            ? "text-blue-400"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Arrow on hover */}
                      <span
                        className={`ml-auto text-sm transition-all duration-300 ${
                          active
                            ? "text-blue-400 opacity-100 translate-x-0"
                            : "text-white/30 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        →
                      </span>
                    </div>

                    {/* Separator line */}
                    {index < navItems.length - 1 && (
                      <div className="mx-6 border-b border-white/5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes cascadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cascadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
}
