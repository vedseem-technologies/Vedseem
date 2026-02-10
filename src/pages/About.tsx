import {
  Target,
  Eye,
  TrendingUp,
  Lightbulb,
  Award,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy, memo, ReactNode } from "react";
import { Reveal } from "../components/ui/RevealText";

// Lazy load heavy 3D components
// const StatsVisualization3D = lazy(() =>
//   import("../components/about/StatsVisualization3D").then((m) => ({
//     default: m.default,
//   })),
// );
// const ParticleTimeline = lazy(() =>
//   import("../components/about/ParticleTimeline").then((m) => ({
//     default: m.default,
//   })),
// );
const AnimatedValueCard = lazy(() =>
  import("../components/about/AnimatedValueCard").then((m) => ({
    default: m.default,
  })),
);
const AlternatingValueRow = lazy(() =>
  import("../components/about/AlternatingValueRow").then((m) => ({
    default: m.default,
  })),
);

// Loading fallback
const ComponentLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function About() {
  // const timeline = [
  //   {
  //     year: "2020",
  //     event: "Founded Vedseem with a vision to revolutionize IT solutions",
  //     icon: "🚀",
  //   },
  //   {
  //     year: "2021",
  //     event: "Expanded team to 20+ developers and launched first major product",
  //     icon: "👥",
  //   },
  //   {
  //     year: "2022",
  //     event: "Opened second office and reached 100+ satisfied clients",
  //     icon: "🏢",
  //   },
  //   {
  //     year: "2023",
  //     event: "Won Best IT Startup Award and launched AI-powered solutions",
  //     icon: "🏆",
  //   },
  //   {
  //     year: "2024",
  //     event: "Global expansion with clients across 15 countries",
  //     icon: "🌍",
  //   },
  // ];

  const stats = [
    { number: "30+", label: "Happy Circle" },
    { number: "50+", label: "Projects Delivered" },
    { number: "4+", label: "Countries Served" },
    { number: "24/7", label: "Support Available" },
  ];

  const values: Array<{
    title: string;
    desc: string;
    icon: ReactNode;
    imageUrl: string;
    back: string;
  }> = [
    {
      title: "Innovation",
      desc: "Innovation is the heartbeat of Vedseem. We don't just follow trends; we create them by pushing the boundaries of what's possible in the digital landscape.",
      icon: <Lightbulb className="text-yellow-400" size={32} />,
      imageUrl: "/innovation.jpeg",
      back: "We leverage AI, cloud computing, and advanced analytics to deliver pioneering solutions that set new industry benchmarks for our global clients.",
    },
    {
      title: "Excellence",
      desc: "At Vedseem, excellence is a habit. We are committed to delivering exceptional quality that consistently exceeds expectations and drives real business impact.",
      icon: <Award className="text-blue-400" size={32} />,
      imageUrl: "/excellence.jpeg",
      back: "Our rigorous quality assurance processes and focus on scalable architecture ensure that every project we deliver is robust, performant, and future-proof.",
    },
    {
      title: "Integrity",
      desc: "Building lasting trust is the foundation of our success. We operate with unwavering transparency, honesty, and ethical standards in every client partnership.",
      icon: <ShieldCheck className="text-green-400" size={32} />,
      imageUrl: "/integration.jpeg",
      back: "We believe in honest communication and ethical business practices. Our transparent approach ensures our clients are always informed and fully involved.",
    },
    {
      title: "Collaboration",
      desc: "We believe that the best results come from working together. Our collaborative culture fosters seamless teamwork between our experts and our clients.",
      icon: <Users className="text-purple-400" size={32} />,
      imageUrl: "/collaboration.jpeg",
      back: "Success is a shared journey. We partner closely with our clients to align our technical expertise with their unique business goals for maximum impact.",
    },
  ];

  return (
    <>
      <style>{`
        body, html {
          background-color: #000000 !important;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen text-white overflow-hidden relative"
      >
        {/* Full-width Hero Section */}
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-[90%] mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10"
        >
          {/* Mission, Vision, Growth */}
          <MissionVisionSection />

          {/* Core Values Section */}
          <CoreValuesSection values={values} />

          {/* Journey Timeline - Lazy Loaded */}
          {/* <Suspense fallback={<ComponentLoader />}>
            <ParticleTimeline timeline={timeline} />
          </Suspense> */}

          {/* Stats Section - Lazy Loaded */}
          {/* <Suspense fallback={<ComponentLoader />}>
            <StatsVisualization3D stats={stats} />
          </Suspense> */}
        </motion.div>

        {/* Optimized Background */}
        <PremiumBackground />
      </motion.div>
    </>
  );
}

// Amazing Title Animation
const AmazingTitle = memo(() => {
  const text1 = "About";
  const text2 = "Vedseem";

  const charVariants = {
    hidden: { opacity: 0, rotateX: 90, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-8 perspective-[1000px]">
      <div className="flex">
        {text1.split("").map((char, i) => (
          <motion.span
            key={`t1-${i}`}
            custom={i}
            variants={charVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-300 inline-block origin-bottom transition-all duration-300 hover:text-white"
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="flex">
        {text2.split("").map((char, i) => (
          <motion.span
            key={`t2-${i}`}
            custom={i + text1.length}
            variants={charVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 inline-block origin-bottom drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-110"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
});
AmazingTitle.displayName = "AmazingTitle";

// Flip Word Paragraph
const FlipWordText = memo(
  ({ text, className }: { text: string; className?: string }) => {
    return (
      <div className={className} style={{ perspective: "1000px" }}>
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, rotateX: -90, y: 20 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.03,
              type: "spring",
              damping: 14,
              stiffness: 120,
            }}
            className="inline-block mr-[0.3em] origin-top text-gray-200 drop-shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  },
);
FlipWordText.displayName = "FlipWordText";

// Optimized Hero Section
const HeroSection = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative text-center mb-16 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with fallback */}
      <div
        className="absolute inset-0 z-0 bg-slate-950"
        style={{
          backgroundImage:
            "url('/about.jpeg'), linear-gradient(to bottom, #0f172a, #000000)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay for Readability - Lightened for better visibility */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Bottom Fade to Black */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

      <div className="relative z-10 py-20 px-4">
        <AmazingTitle />

        <div className="max-w-4xl mx-auto">
          <FlipWordText
            text="We are a forward-thinking technology company dedicated to transforming businesses through innovative IT solutions and cutting-edge software development."
            className="text-xl md:text-2xl leading-relaxed font-medium"
          />
        </div>
      </div>
    </motion.div>
  );
});
HeroSection.displayName = "HeroSection";

// Optimized Mission Vision Section
const MissionVisionSection = memo(() => {
  const cards = [
    {
      icon: <Target className="text-blue-400" size={40} />,
      title: "Our Mission",
      description:
        "To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation.",
    },
    {
      icon: <Eye className="text-blue-400" size={40} />,
      title: "Our Vision",
      description:
        "To become the global leader in IT consulting and software development, known for excellence and innovation.",
    },
    {
      icon: <TrendingUp className="text-blue-400" size={40} />,
      title: "Our Growth",
      description:
        "From a startup to serving 100+ clients worldwide, we continue to expand our impact in the tech industry.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-32">
      {cards.map((card, index) => (
        <Reveal key={index} delay={index * 0.1} width="100%">
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
MissionVisionSection.displayName = "MissionVisionSection";

// Optimized Core Values Section
const CoreValuesSection = memo(
  ({
    values,
  }: {
    values: Array<{
      title: string;
      desc: string;
      icon: ReactNode;
      imageUrl: string;
      back: string;
    }>;
  }) => {
    return (
      <div className="mt-32 mb-48">
        <div className="text-center mb-24">
          <Reveal width="100%">
            <h2 className="text-5xl lg xl:text-8xl font-black bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter">
              Our Core Values
            </h2>
          </Reveal>
        </div>

        <div className="space-y-12">
          {values.map((value, index) => (
            <Suspense key={index} fallback={<ComponentLoader />}>
              <AlternatingValueRow
                title={value.title}
                desc={value.desc}
                icon={value.icon}
                imageUrl={value.imageUrl}
                back={value.back}
                index={index}
              />
            </Suspense>
          ))}
        </div>
      </div>
    );
  },
);
CoreValuesSection.displayName = "CoreValuesSection";

// Floating Particles Component
// const FloatingParticles = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(40)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{
//             opacity: Math.random() * 0.4 + 0.1,
//             scale: Math.random() * 0.8 + 0.2,
//             x: Math.random() * 100 + "%",
//             y: Math.random() * 100 + "%"
//           }}
//           animate={{
//             x: [
//               Math.random() * 100 + "%",
//               Math.random() * 100 + "%",
//               Math.random() * 100 + "%"
//             ],
//             y: [
//               Math.random() * 100 + "%",
//               Math.random() * 100 + "%",
//               Math.random() * 100 + "%"
//             ],
//             opacity: [0.1, 0.4, 0.1],
//             scale: [0.5, 1, 0.5]
//           }}
//           transition={{
//             duration: Math.random() * 30 + 30,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className={`absolute rounded-full blur-[2px] ${
//             i % 3 === 0 ? 'w-2 h-2 bg-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
//             'w-1 h-1 bg-cyan-400/30'
//           }`}
//         />
//       ))}
//     </div>
//   );
// };

// Enhanced Premium Background with moving elements
const PremiumBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-black">
      {/* Animated Mesh Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[120px] rounded-full"
      />

      {/* Moving Particles */}
      {/* <FloatingParticles /> */}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px), radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Deep Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
    </div>
  );
});
PremiumBackground.displayName = "PremiumBackground";
