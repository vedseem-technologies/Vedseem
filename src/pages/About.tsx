import { Target, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense, lazy, memo } from 'react';
import { Reveal, RevealText } from '../components/ui/RevealText';

// Lazy load heavy 3D components
const StatsVisualization3D = lazy(() => import('../components/about/StatsVisualization3D').then(m => ({ default: m.default })));
const ParticleTimeline = lazy(() => import('../components/about/ParticleTimeline').then(m => ({ default: m.default })));
const AnimatedValueCard = lazy(() => import('../components/about/AnimatedValueCard').then(m => ({ default: m.default })));
const HolographicCard = lazy(() => import('../components/about/HolographicCard').then(m => ({ default: m.default })));

// Loading fallback
const ComponentLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function About() {
  const timeline = [
    { year: '2020', event: 'Founded Vedseem with a vision to revolutionize IT solutions', icon: '🚀' },
    { year: '2021', event: 'Expanded team to 20+ developers and launched first major product', icon: '👥' },
    { year: '2022', event: 'Opened second office and reached 100+ satisfied clients', icon: '🏢' },
    { year: '2023', event: 'Won Best IT Startup Award and launched AI-powered solutions', icon: '🏆' },
    { year: '2024', event: 'Global expansion with clients across 15 countries', icon: '🌍' },
  ];

  const stats = [
    { number: '100+', label: 'Clients Served' },
    { number: '200+', label: 'Projects Completed' },
    { number: '15+', label: 'Countries' },
    { number: '50+', label: 'Team Members' },
  ];

  const values = [
    { 
      title: 'Innovation', 
      desc: 'Pushing boundaries with cutting-edge solutions', 
      icon: '💡',
      back: 'We constantly explore new technologies and methodologies to deliver innovative solutions that set industry standards.'
    },
    { 
      title: 'Excellence', 
      desc: 'Delivering quality that exceeds expectations', 
      icon: '⭐',
      back: 'Our commitment to excellence drives us to deliver exceptional results in every project we undertake.'
    },
    { 
      title: 'Integrity', 
      desc: 'Building trust through transparency and honesty', 
      icon: '🤝',
      back: 'We build lasting relationships through honest communication and ethical business practices.'
    },
    { 
      title: 'Collaboration', 
      desc: 'Working together to achieve shared success', 
      icon: '🚀',
      back: 'Teamwork and partnership are at the heart of everything we do, ensuring collective success.'
    },
  ];

  return (
    <>
      <style>{`
        body {
          background-color: #000000 !important;
        }
        html {
          background-color: #000000 !important;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen text-white pt-20 overflow-hidden relative"
        style={{ 
          backgroundColor: '#000000',
        }}
      >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Hero Section - Optimized */}
        <HeroSection />

        {/* Mission, Vision, Growth - Optimized Cards */}
        <MissionVisionSection />

        {/* Core Values - Optimized */}
        <CoreValuesSection values={values} />

        {/* Journey Timeline - Lazy Loaded */}
        <Suspense fallback={<ComponentLoader />}>
          <ParticleTimeline timeline={timeline} />
        </Suspense>

        {/* Stats Section - Lazy Loaded */}
        <Suspense fallback={<ComponentLoader />}>
          <StatsVisualization3D stats={stats} />
        </Suspense>
      </motion.div>

      {/* Optimized Background */}
      <OptimizedBackground />
      </motion.div>
    </>
  );
}

// Vedseem Reveal Animation Component
const VedseemReveal = memo(() => {
  return (
    <div className="relative inline-block">
      {/* Base gradient text (always visible) */}
      <h1 className="text-7xl md:text-9xl font-black relative z-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
          Vedseem
        </span>
      </h1>
      
      {/* Reveal sweep overlay */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-20"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ 
          duration: 1.2, 
          delay: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{ willChange: 'clip-path' }}
      >
        <h1 className="text-7xl md:text-9xl font-black">
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ 
              duration: 1.2,
              delay: 0.4,
              times: [0, 0.5, 1]
            }}
          >
            Vedseem
          </motion.span>
        </h1>
      </motion.div>
      
      {/* Glow pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0, 0.5, 0.2, 0],
          scale: [0.9, 1.1, 1, 1]
        }}
        transition={{ 
          duration: 1.8,
          delay: 0.4,
          times: [0, 0.3, 0.7, 1],
          ease: "easeOut"
        }}
        style={{ willChange: 'opacity, transform' }}
      >
        <h1 className="text-7xl md:text-9xl font-black">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 blur-lg">
            Vedseem
          </span>
        </h1>
      </motion.div>
    </div>
  );
});
VedseemReveal.displayName = 'VedseemReveal';

// Optimized Hero Section
const HeroSection = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative text-center mb-32"
      style={{ willChange: 'opacity' }}
    >
      {/* <Suspense fallback={null}>
        <FloatingGeometry />
      </Suspense> */}

      <div className="relative z-10">
        <Reveal className="inline-block mb-4">
          <h1 className="text-6xl md:text-9xl font-bold text-gray-300">
            About<span className='opacity-0 text-5xl'>w</span> 
          </h1>
        </Reveal>

        <div className="relative inline-block mb-8">
            <Reveal delay={0.1}>
                 <VedseemReveal />
            </Reveal>
        </div>

        <Reveal 
          delay={0.2}
          className="inline-block p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/20"
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a forward-thinking technology company dedicated to transforming businesses
            through innovative IT solutions and cutting-edge software development.
          </p>
        </Reveal>
      </div>
    </motion.div>
  );
});
HeroSection.displayName = 'HeroSection';

// Optimized Mission Vision Section
const MissionVisionSection = memo(() => {
  const cards = [
    {
      icon: <Target className="text-blue-400" size={40} />,
      title: "Our Mission",
      description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation."
    },
    {
      icon: <Eye className="text-blue-400" size={40} />,
      title: "Our Vision",
      description: "To become the global leader in IT consulting and software development, known for excellence and innovation."
    },
    {
      icon: <TrendingUp className="text-blue-400" size={40} />,
      title: "Our Growth",
      description: "From a startup to serving 100+ clients worldwide, we continue to expand our impact in the tech industry."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-32">
      {cards.map((card, index) => (
        <Reveal
           key={index}
           delay={index * 0.1}
           width="100%"
        >
            <Suspense fallback={<ComponentLoader />}>
            <AnimatedValueCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                index={index}
            />
            </Suspense>
        </Reveal>
      ))}
    </div>
  );
});
MissionVisionSection.displayName = 'MissionVisionSection';

// Optimized Core Values Section
const CoreValuesSection = memo(({ values }: { values: Array<{ title: string; desc: string; icon: string; back: string }> }) => {
  return (
    <div className="mb-32">
      <RevealText className="block text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Our Core Values
        </h2>
      </RevealText>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <Reveal
            key={index}
            delay={index * 0.1}
            width="100%"
          >
            <Suspense fallback={<ComponentLoader />}>
                <HolographicCard
                icon={value.icon}
                title={value.title}
                description={value.desc}
                backContent={value.back}
                index={index}
                />
            </Suspense>
          </Reveal>
        ))}
      </div>
    </div>
  );
});
CoreValuesSection.displayName = 'CoreValuesSection';

// Optimized Background - Reduced animation complexity
const OptimizedBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-950 via-black to-cyan-950" />
    </div>
  );
});
OptimizedBackground.displayName = 'OptimizedBackground';
