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
      title: 'Camperz - A Camping App',
      description: 'A comprehensive camping app that helps users find campsites, plan trips, and share experiences with a community of outdoor enthusiasts.',
      image: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['NextJs', 'TypeScript', 'Tailwind CSS', '+1 more'],
      caseStudyLink: '#',
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: 'Arpit\'s Portfolio',
      description: 'A personal portfolio site crafted with animations, smooth transitions, and responsive design to highlight experience, skills, and project showcases.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Next Js', 'Typescript', 'Tailwind', '+1 more'],
      caseStudyLink: '#',
      status: 'in-progress' as const,
      progress: 90,
    },
    {
      title: 'Surpriselly',
      description: 'Your one stop gifting destination - surprises delivered with love.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Javascript', 'Tailwind CSS', '+1 more'],
      caseStudyLink: '#',
      status: 'in-progress' as const,
      progress: 70,
    },
    {
      title: 'Gunno Media Production',
      description: 'A sleek portfolio website built for a media production team to showcase projects, services, and client collaborations with responsive layouts.',
      image: 'https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Javascript', 'Tailwind', '+1 more'],
      caseStudyLink: '#',
      status: 'completed' as const,
      progress: 100
    },
    {
      title: 'FinTech Platform',
      description: 'A comprehensive financial management platform with real-time analytics and AI-powered insights.',
      image: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'AI/ML', 'Cloud'],
      caseStudyLink: '#',
      status: 'completed' as const,
      progress: 100,
    },
    {
      title: 'Healthcare App',
      description: 'HIPAA-compliant telemedicine application connecting patients with healthcare providers.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'HIPAA', 'WebRTC'],
      caseStudyLink: '#',
      status: 'in-progress' as const,
      progress: 85,
    },
  ];

  // Use cylindrical gallery view
  if (viewMode === 'cylindrical') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <CylindricalPortfolio3D projects={projects} />
        
        {/* View toggle buttons */}
        <div className="fixed top-20 right-8 z-50 flex flex-col gap-2">
          <button
            onClick={() => setViewMode('cylinder')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm"
          >
            Cylinder View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm"
          >
            Grid View
          </button>
        </div>
      </div>
    );
  }

  // Use cylinder view
  if (viewMode === 'cylinder') {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <CylinderPortfolio3D projects={projects} />
        
        {/* View toggle buttons */}
        <div className="fixed top-20 right-8 z-50 flex flex-col gap-2">
          <button
            onClick={() => setViewMode('cylindrical')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm"
          >
            Gallery View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm"
          >
            Grid View
          </button>
        </div>
      </div>
    );
  }

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
