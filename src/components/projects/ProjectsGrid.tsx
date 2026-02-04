import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectListItem from './ProjectListItem';
import ProjectModal from './ProjectModal';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: 'completed' | 'in-progress';
  progress: number;
  caseStudyLink: string;
}

interface ProjectsGridProps {
  viewMode: 'grid' | 'list';
  projects: Project[];
}

export default function ProjectsGrid({ viewMode, projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {projects.map((project, index) => (
          viewMode === 'grid' ? (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ) : (
            <ProjectListItem
              key={index}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          )
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
