import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    title: string;
    clientName?: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    status: "completed" | "in-progress";
    progress: number;
  };
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  const isDesignCategory = project.category === "Graphics Designing";

  if (isDesignCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl ${
          project.category === "Thumbnail Designing"
            ? "aspect-[3/2]"
            : "aspect-[4/4] md:aspect-[4/4]"
        }`}
      >
        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300" />

        {/* Content Over Gradient */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-bold text-blue-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col h-full shadow-xl"
    >
      {/* Image */}
      {project.image && (
        <div className="relative overflow-hidden h-64 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title and Description area - Fixed height */}
        <div className="flex flex-col h-24">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1 h-7">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 h-10 overflow-hidden">
            {project.description}
          </p>
        </div>

        {/* Action/Details Area - Compact Spacing */}
        <div className="mt-auto flex flex-col">
          {/* Progress Bar - Now perfectly aligned horizontally */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>Progress</span>
              <span className="text-blue-400">{project.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
              />
            </div>
          </div>

          {/* Tags - Fixed height to prevent Progress Bar from shifting */}
          <div className="flex flex-wrap gap-2 h-[4.5rem] content-start overflow-hidden">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-[10px] font-medium text-gray-300 hover:bg-white/5 hover:border-blue-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
