import { ExternalLink } from 'lucide-react';
import type { Project } from '../types';

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'FinTech Platform',
      description: 'A comprehensive financial management platform with real-time analytics and AI-powered insights.',
      image: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'AI/ML', 'Cloud'],
      caseStudyLink: '#',
    },
    {
      title: 'E-Commerce Solution',
      description: 'Modern e-commerce platform with personalized shopping experience and seamless checkout.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      caseStudyLink: '#',
    },
    {
      title: 'Healthcare App',
      description: 'HIPAA-compliant telemedicine application connecting patients with healthcare providers.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'HIPAA', 'WebRTC'],
      caseStudyLink: '#',
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with real-time data visualization and customizable widgets.',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Vue.js', 'D3.js', 'WebSocket'],
      caseStudyLink: '#',
    },
    {
      title: 'IoT Platform',
      description: 'Industrial IoT platform for monitoring and managing connected devices at scale.',
      image: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'MQTT', 'TimescaleDB'],
      caseStudyLink: '#',
    },
    {
      title: 'AI Chatbot',
      description: 'Intelligent customer service chatbot with natural language processing capabilities.',
      image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['NLP', 'TensorFlow', 'FastAPI'],
      caseStudyLink: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful projects that showcase our expertise and commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-500/60 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.caseStudyLink}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    View Case Study
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
