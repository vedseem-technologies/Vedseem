import { Code, Cloud, Palette, Settings, Database, Shield } from 'lucide-react';
import type { Service } from '../types';

export default function Services() {
  const services: Service[] = [
    {
      icon: 'Settings',
      title: 'IT Consulting',
      description: 'Strategic technology guidance to optimize your business operations and digital transformation journey.',
    },
    {
      icon: 'Code',
      title: 'Web & App Development',
      description: 'Custom web and mobile applications built with cutting-edge technologies and best practices.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud & DevOps Solutions',
      description: 'Scalable cloud infrastructure and automated deployment pipelines for modern applications.',
    },
    {
      icon: 'Palette',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces that deliver exceptional user experiences and drive engagement.',
    },
    {
      icon: 'Database',
      title: 'Database Management',
      description: 'Robust database architecture, optimization, and management for your data-driven applications.',
    },
    {
      icon: 'Shield',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure data privacy.',
    },
  ];

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Settings: <Settings size={40} />,
      Code: <Code size={40} />,
      Cloud: <Cloud size={40} />,
      Palette: <Palette size={40} />,
      Database: <Database size={40} />,
      Shield: <Shield size={40} />,
    };
    return icons[iconName];
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your business needs, delivered by experts who care about your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden hover:shadow-lg hover:shadow-blue-500/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="text-blue-400 mb-6 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110 transform">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>

                <div className="mt-6 inline-flex items-center text-blue-400 font-medium group-hover:text-cyan-400 transition-colors duration-300">
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and goals' },
              { step: '02', title: 'Planning', desc: 'Designing the perfect solution' },
              { step: '03', title: 'Development', desc: 'Building with precision and care' },
              { step: '04', title: 'Launch', desc: 'Deploying and supporting your success' },
            ].map((process, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl font-bold text-blue-400 mb-3">{process.step}</div>
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-gray-300 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-12 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              We specialize in creating tailored solutions that perfectly fit your unique business requirements.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
