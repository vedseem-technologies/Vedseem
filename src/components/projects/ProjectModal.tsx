import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  project: {
    title: string;
    clientName?: string;
    category: string;
    description: string;
    image: string;
    images?: string[];
    tags: string[];
    caseStudyLink: string;
  } | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // Reset index when opening new project
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Handle image navigation
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + project.images!.length) % project.images!.length,
      );
    }
  };

  const isDesignCategory = project?.category === "Graphics Designing";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-2 md:p-6 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.02);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #3b82f6, #06b6d4);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #3b82f6;
            }
          `}</style>

          <motion.div
            key="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#080808] border border-white/10 w-full max-w-6xl h-[85vh] rounded-[24px] md:rounded-[40px] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col ${
              isDesignCategory ? "" : "md:flex-row"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-black/50 text-white rounded-full hover:bg-white/10 transition-all z-[100] border border-white/10 backdrop-blur-xl group"
            >
              <X
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            {isDesignCategory ? (
              /* Specialized Design Layout */
              <div className="flex-1 flex flex-col relative h-full">
                {/* Image Gallery */}
                <div className="flex-1 relative overflow-hidden group/gallery">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={
                        project.images
                          ? project.images[currentImageIndex]
                          : project.image
                      }
                      alt={project.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Gallery Controls */}
                  {project.images && project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {project.images.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === currentImageIndex
                                ? "bg-blue-500 w-4"
                                : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Gradient and Info */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full text-xs font-bold text-blue-300 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="hidden md:block">
                      <p className="text-gray-400 text-sm max-w-sm line-clamp-2 italic">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Web Dev Layout (Existing) */
              <>
                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-[30%] md:h-full relative overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] via-transparent md:from-transparent md:to-[#080808]" />
                </div>

                {/* Right Side: Content Area */}
                <div className="flex-1 h-[70%] md:h-full flex flex-col min-h-0 bg-gradient-to-br from-white/[0.01] to-transparent">
                  {/* Fixed Header */}
                  <div className="p-6 md:p-12 pb-4 md:pb-8 border-b border-white/5 flex-shrink-0">
                    <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 md:px-4 py-1 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-widest rounded-full border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Description */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-12 py-4 md:py-8 custom-scrollbar scroll-smooth">
                    <div className="text-gray-400 text-sm md:text-lg leading-relaxed space-y-4 md:space-y-8">
                      <p className="font-semibold text-gray-200">
                        {project.description}
                      </p>
                      <div className="space-y-4">
                        <p>
                          Built with a relentless focus on digital excellence
                          and user-centric architecture.
                        </p>
                        <div className="p-6 md:p-8 rounded-2xl md:rounded-[32px] bg-white/[0.02] border border-white/5 italic text-gray-300 relative group/quote overflow-hidden">
                          <div className="relative z-10 text-sm md:text-xl leading-relaxed">
                            "Innovation is not just about new tech, but about
                            creating meaningful interactions that resonate with
                            the user's journey."
                          </div>
                          <div className="absolute top-0 left-0 w-1 md:w-1.5 h-full bg-gradient-to-b from-blue-600 to-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Links */}
                  <div className="p-6 md:p-12 pt-4 md:pt-8 border-t border-white/5 flex-shrink-0 bg-[#080808]/80 backdrop-blur-xl">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
                      <a
                        href={project.caseStudyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 md:py-5 px-6 bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 hover:bg-white/[0.08] transition-all text-[10px] md:text-sm lg:text-md uppercase tracking-[0.2em] text-white group"
                      >
                        <LayoutGrid
                          size={16}
                          className="text-blue-500 group-hover:rotate-45 transition-transform duration-500"
                        />
                        <span>Case Study</span>
                      </a>
                      <a
                        href={project.caseStudyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 md:py-5 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl md:rounded-2xl text-white lg:text-md uppercase tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all text-[10px] md:text-sm"
                      >
                        <Globe size={16} className="animate-pulse" />
                        <span>Live Project</span>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
