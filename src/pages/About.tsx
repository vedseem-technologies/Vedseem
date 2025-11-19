import { Linkedin, Target, Eye, TrendingUp } from 'lucide-react';
import type { TeamMember } from '../types';

export default function About() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Michael Torres',
      role: 'Head of Development',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Emily Watson',
      role: 'Design Lead',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkedin: 'https://linkedin.com',
    },
  ];

  const timeline = [
    { year: '2020', event: 'Founded Vedseem with a vision to revolutionize IT solutions' },
    { year: '2021', event: 'Expanded team to 20+ developers and launched first major product' },
    { year: '2022', event: 'Opened second office and reached 100+ satisfied clients' },
    { year: '2023', event: 'Won Best IT Startup Award and launched AI-powered solutions' },
    { year: '2024', event: 'Global expansion with clients across 15 countries' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Vedseem</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            We are a forward-thinking technology company dedicated to transforming businesses through innovative IT solutions and cutting-edge software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <Target className="text-blue-400 mb-4" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <Eye className="text-blue-400 mb-4" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To become the global leader in IT consulting and software development, known for excellence and innovation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="text-blue-400 mb-4" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Growth</h3>
            <p className="text-gray-300 leading-relaxed">
              From a startup to serving 100+ clients worldwide, we continue to expand our impact in the tech industry.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Innovation', desc: 'Pushing boundaries with cutting-edge solutions', icon: '💡' },
              { title: 'Excellence', desc: 'Delivering quality that exceeds expectations', icon: '⭐' },
              { title: 'Integrity', desc: 'Building trust through transparency and honesty', icon: '🤝' },
              { title: 'Collaboration', desc: 'Working together to achieve shared success', icon: '🚀' },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                      <h3 className="text-2xl font-bold text-blue-400 mb-2">{item.year}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black animate-pulse"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors group-hover:translate-x-1"
                >
                  <Linkedin size={18} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '100+', label: 'Clients Served' },
              { number: '200+', label: 'Projects Completed' },
              { number: '15+', label: 'Countries' },
              { number: '50+', label: 'Team Members' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
