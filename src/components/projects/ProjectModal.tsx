import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, LayoutGrid } from 'lucide-react';

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    caseStudyLink: string;
  } | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 p-1.5 md:p-2.5 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors z-20"
          >
            <X size={18} className="md:w-6 md:h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Modal Image */}
            <div className="h-48 md:h-full relative min-h-[200px] md:min-h-[350px]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-10 flex flex-col">
              <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">{project.title}</h2>
              <div className="flex flex-wrap gap-1.5 md:gap-2.5 mb-4 md:mb-8">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-500/10 text-blue-400 text-[0.65rem] md:text-sm rounded border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-gray-300 mb-4 md:mb-10 max-w-none flex-1 text-sm md:text-base">
                <p className="mb-3 md:mb-5 leading-relaxed">{project.description}</p>
                <p className="text-xs md:text-base leading-relaxed">
                  This project showcases advanced development techniques including responsive design, 
                  state management, and seamless API integrations. It was built with a focus on performance and user experience.
                </p>
              </div>

              <div className="pt-3 md:pt-8 border-t border-white/10 flex flex-col gap-3 md:gap-5">
                <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500">Links</h4>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                  <a 
                    href={project.caseStudyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 md:py-4 px-3 md:px-6 bg-white/5 border border-white/10 rounded-lg md:rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm md:text-base font-medium"
                  >
                    <LayoutGrid size={16} className="md:w-5 md:h-5" />
                    <span>Case Study</span>
                  </a>
                  <a 
                    href={project.caseStudyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 md:py-4 px-3 md:px-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg md:rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm md:text-base"
                  > 
                    <Globe size={16} className="md:w-5 md:h-5" />
                    <span>Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
