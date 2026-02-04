import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProjectListItemProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    status: 'completed' | 'in-progress';
    progress: number;
  };
  index: number;
  onClick: () => void;
}

export default function ProjectListItem({ project, index, onClick }: ProjectListItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300 flex md:flex-row h-32 md:h-48 lg:h-64"
    >
      {/* Image */}
      <div className="relative overflow-hidden w-1/3 lg:w-1/3 h-32 md:h-48 lg:h-64">
        <img 
          src={project.image} 
          alt={project.title} 
          className="lg:w-full w-44 md:w-72 h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        {/* <div className="absolute top-4 right-4 z-10">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            project.status === 'completed' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {project.status}
          </div>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-2 md:p-4 lg:p-6 flex flex-col justify-between w-3/4 md:w-3/4 lg:w-2/3">
        <div>
          <h3 className="text-md md:text-lg lg:text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
          <p className="text-[0.65rem] md:text-xs lg:text-sm text-gray-400 mb-2 md:mb-4 lg:mb-6 line-clamp-3">{project.description}</p>
        </div>

        <div className="mt-auto">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-0.5 md:h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
              style={{ width: `${project.progress}%` }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
