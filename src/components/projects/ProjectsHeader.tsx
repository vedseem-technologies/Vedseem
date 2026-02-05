import { LayoutGrid, List } from 'lucide-react';
import { Reveal } from '../ui/RevealText';
import { motion } from 'framer-motion';

interface ProjectsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

export default function ProjectsHeader({ viewMode, onViewChange }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
      <div className="max-w-3xl">
        <Reveal width="100%">
          <h1 className="text-6xl py-4 md:text-8xl font-black mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
            Our Projects
          </h1>
        </Reveal>
        
        <div className="flex items-center gap-6 mb-8">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "80px" }}
             className="h-[2px] bg-blue-500 rounded-full" 
           />
           <Reveal delay={0.2}>
             <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.2em] font-bold">
               Selected Case Studies
             </span>
           </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">
            A curation of high-impact digital solutions, where strategic design meets cutting-edge technology.
          </p>
        </Reveal>
      </div>

      {/* Premium View Toggles */}
      <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl self-start md:self-auto shadow-2xl">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-3 rounded-xl transition-all duration-500 flex items-center gap-2 ${
            viewMode === 'grid' 
              ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
              : 'text-gray-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutGrid size={18} />
          {viewMode === 'grid' && <span className="text-xs font-bold uppercase tracking-wider">Grid</span>}
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`p-3 rounded-xl transition-all duration-500 flex items-center gap-2 ${
            viewMode === 'list' 
              ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
              : 'text-gray-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <List size={18} />
          {viewMode === 'list' && <span className="text-xs font-bold uppercase tracking-wider">List</span>}
        </button>
      </div>
    </div>
  );
}
