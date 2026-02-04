import { LayoutGrid, List } from 'lucide-react';
import { Reveal, RevealText } from '../ui/RevealText';

interface ProjectsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

export default function ProjectsHeader({ viewMode, onViewChange }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <RevealText>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
        </RevealText>
        <Reveal delay={0.1}>
          <p className="text-gray-400 max-w-xl">
            Explore a curation of my latest work, featuring web applications, design systems, and digital experiences.
          </p>
        </Reveal>
      </div>

      {/* View Toggles */}
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm self-start md:self-auto">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 rounded-md transition-all ${
            viewMode === 'grid' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`p-2 rounded-md transition-all ${
            viewMode === 'list' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );
}
