import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProjectCardProps {
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

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            project.status === 'completed' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {project.status}
          </div>
        </div>

        {/* Star Icon */}
        <div className="absolute top-4 left-4 z-10">
          <Star className="text-yellow-400 fill-yellow-400 drop-shadow-lg" size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-6 line-clamp-2">{project.description}</p>
        </div>

        <div className="mt-auto">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
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
