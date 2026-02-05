import { useState } from 'react';
import type { Project } from '../types';
import CylinderPortfolio3D from '../components/CylinderPortfolio3D';
import CylindricalPortfolio3D from '../components/CylindricalPortfolio3D';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectsGrid from '../components/projects/ProjectsGrid';

export default function Projects() {
  const [viewMode, setViewMode] = useState<'cylindrical' | 'cylinder' | '3d' | 'grid' | 'list'>('grid');
  
  const projects = [
    {
      title: "Where's The Fork",
      description: "A food truck franchise platform designed to manage multiple vendors, locations, and menus while enabling customers to discover nearby trucks and place orders easily.",
      image: "https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: "Knect Hotel",
      description: "A hotel management and booking solution that streamlines reservations, room availability, guest management, and day-to-day hotel operations.",
      image: "https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: "Dhanush Digital",
      description: "A scalable e-commerce platform built to support online product listings, secure payments, order management, and a seamless shopping experience for customers.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: "Bundelkhand Chamber of Commerce",
      description: "An official digital platform for the regional chamber of commerce, enabling business registrations, event management, announcements, and member networking.",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next Js", "Node Js", "Javascript", "Tailwind CSS", "MongoDB", "Express"],
      caseStudyLink: "#",
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: "Gunno Media Productions",
      description: "A media and production company website showcasing portfolios, projects, and creative services with a strong emphasis on visual storytelling.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Javascript", "Tailwind CSS", "Framer-Motion", "Nodemailer"],
      caseStudyLink: "#",
      status: 'completed' as const,
      progress: 100,
    },
  ];

  // Grid/List view (default)
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ProjectsHeader 
          viewMode={viewMode === 'list' ? 'list' : 'grid'} 
          onViewChange={(mode) => setViewMode(mode)} 
        />
        
        <ProjectsGrid 
          viewMode={viewMode === 'list' ? 'list' : 'grid'} 
          projects={projects} 
        />
      </div>

      {/* 3D View Toggle Button */}
      <div className="fixed bottom-8 right-8 z-40">
        {/* <button
          onClick={() => setViewMode('cylindrical')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          View 3D Gallery
        </button> */}
      </div>
    </div>
  );
}
