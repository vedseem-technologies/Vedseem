import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  clientName?: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  status: "completed" | "in-progress";
  progress: number;
  caseStudyLink: string;
}

interface ProjectsGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export default function ProjectsGrid({
  projects,
  onProjectSelect,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          onClick={() => onProjectSelect(project)}
        />
      ))}
    </div>
  );
}
