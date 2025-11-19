import type { Tech } from '../types';

export default function TechStack() {
  const technologies: Tech[] = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Next.js', icon: '▲' },
  ];

  return (
    <section className="bg-gradient-to-b from-black to-blue-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We leverage the latest technologies to build robust, scalable, and innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col items-center justify-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">
                {tech.icon}
              </div>
              <span className="text-white font-medium text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
