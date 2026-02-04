"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/* ---------------- DATA ---------------- */

const features = [
  {
    icon: "🚀",
    title: "Rapid Execution",
    description: "High-quality engineering delivered at the speed of modern business.",
  },
  {
    icon: "🛡️",
    title: "Secure by Design",
    description: "Ironclad security architectures protecting your data at every touchpoint.",
  },
  {
    icon: "⚙️",
    title: "Elastic Scalability",
    description: "Infrastructure that breathes and grows dynamically with your user base.",
  },
  {
    icon: "🎯",
    title: "Outcome Driven",
    description: "Deeply aligned technology solutions built for real business impact.",
  },
  {
    icon: "🤝",
    title: "Technical Partnership",
    description: "A committed long-term ally in your journey toward digital excellence.",
  },
];

/* ---------------- SNAKE PATH ---------------- */

const getSnakeX = (
  y: number,
  time: number,
  canvasWidth: number,
  snakeWidth: number,
  wavelength: number
) => {
  const k = (Math.PI * 2) / wavelength;
  const mainWave = Math.sin(y * k + Math.PI) * snakeWidth;
  const secondaryWave = Math.sin(y * 0.01 - time * 0.5) * (snakeWidth * 0.1);
  return canvasWidth / 2 + mainWave + secondaryWave;
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function ParticleLineScrollFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLaptop, setIsLaptop] = useState(false);

  // Responsive Configuration
  useEffect(() => {
    const checkSize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const layout = useMemo(() => {
    const gap = isLaptop ? 400 : 450; 
    return {
      gap,
      wavelength: gap * 2,
      particleCount: isLaptop ? 3000 : 1500,
      particleRadius: isLaptop ? 25 : 8, 
      cardWidth: isLaptop ? "40%" : "88%",
      snakeAmplitude: 0.38,
      // User defined offsets (snappy)
      revealStartOffset: isLaptop ? -250 : -150,
      revealEndOffset: isLaptop ? -120 : 0,
    };
  }, [isLaptop]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Tuned for maximum smoothness: lower stiffness, higher damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  /* ---------------- PARTICLE ENGINE ---------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disable alpha if not needed (but we use it for particles)
    if (!ctx) return;

    // Pre-calculate colors to avoid processing in the hot loop
    const mixColor = (t: number) => {
      const r = Math.floor(34 + (234 - 34) * t);
      const g = Math.floor(197 + (179 - 197) * t);
      const b = Math.floor(94 + (8 - 94) * t);
      return `${r},${g},${b}`;
    };

    let particles: any[] = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles = Array.from({ length: layout.particleCount }, () => {
      const t = Math.random();
      return {
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * layout.particleRadius,
        drift: 0.15 + Math.random() * 0.25,
        spin: 0.003 + Math.random() * 0.006,
        size: 0.6 + Math.random() * 1.1,
        colorBase: mixColor(t),
        opacity: 0.25 + Math.random() * 0.35,
      };
    });

    const animate = () => {
      // Use black background since section is black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = smoothProgress.get();
      const internalTime = progress * 6.5;
      const currentLimit = canvas.height * progress;
      const snakeWidth = Math.min(canvas.width * layout.snakeAmplitude, 1200);
      const wavelength = layout.wavelength;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.drift;
        if (p.y > canvas.height) p.y = 0;
        
        // Aggressive Culling: Only draw what's near the scroll head
        if (p.y > currentLimit + 120 || p.y < currentLimit - 800) continue; 

        p.angle += p.spin;
        const centralX = getSnakeX(p.y, internalTime, canvas.width, snakeWidth, wavelength);
        const spiralX = Math.cos(p.angle) * p.radius;
        const spiralZ = Math.sin(p.angle);

        let opacity = p.opacity;
        if (p.y > currentLimit) {
          opacity *= Math.max(0, 1 - (p.y - currentLimit) / 100);
        }
        if (spiralZ < 0) opacity *= 0.35;

        ctx.beginPath();
        ctx.arc(centralX + spiralX, p.y, p.size * (1 + spiralZ * 0.2), 0, Math.PI * 2);
        
        ctx.fillStyle = `rgba(${p.colorBase},${opacity})`;
        ctx.fill();
      }
      frameId = requestAnimationFrame(animate);
    };

    let frameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [smoothProgress, layout, isLaptop]);
  
  const totalHeight = features.length * layout.gap + layout.gap;

  return (
    <section className="bg-black py-24 md:py-48 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <header className="text-center mb-20 md:mb-40">
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter">
            Core{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-green-400 to-yellow-400">
              Capabilities
            </span>
          </h2>
        </header>

        <div 
          ref={containerRef} 
          className="relative w-full"
          style={{ height: `${totalHeight}px` }}
        > 
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 h-full w-full pointer-events-none z-0"
            style={{ imageRendering: "auto" }} // Ensure best interpolation
          />

          <div className="relative w-full h-full z-10">
            {features.map((feature, index) => (
              <FeatureStep
                key={index}
                feature={feature}
                index={index}
                layout={layout}
                progress={smoothProgress}
                totalHeight={totalHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURE STEP ---------------- */

function FeatureStep({
  feature,
  index,
  layout,
  progress,
  totalHeight,
}: {
  feature: any;
  index: number;
  layout: any;
  progress: MotionValue<number>;
  totalHeight: number;
}) {
  const yPos = index * layout.gap + (layout.gap / 2); 
  const isEven = index % 2 === 0;
  
  const centerPoint = yPos / totalHeight;
  const startPoint = centerPoint + (layout.revealStartOffset / totalHeight);
  const finishPoint = centerPoint + (layout.revealEndOffset / totalHeight);
  
  const range = [startPoint, finishPoint];

  // Hardware-accelerated transforms
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.94, 1]); 
  const yShift = useTransform(progress, range, [20, 0]); 
  
  const xShiftStart = isEven ? -25 : 25;
  const xShift = useTransform(progress, range, [xShiftStart, 0]);

  const focusRange = 250 / totalHeight; 
  const glowOpacity = useTransform(
    progress,
    [centerPoint - focusRange, centerPoint, finishPoint + focusRange],
    [0, 1, 0.4]
  );

  return (
    <div
      className="absolute w-full flex"
      style={{
        top: `${yPos}px`,
        left: 0,
        transform: 'translateY(-50%) translateZ(0)', // Force GPU layer
        justifyContent: isEven ? 'flex-start' : 'flex-end',
        willChange: 'transform'
      }}
    >
      <motion.div
        style={{ 
          opacity, 
          scale,
          y: yShift,
          x: xShift,
          width: layout.cardWidth,
          willChange: 'transform, opacity'
        }}
        className="relative z-20"
      >
        <div className="px-6 py-8 md:px-8 md:py-10 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-zinc-900 via-black to-black border border-white/10 relative overflow-hidden shadow-2xl transition-shadow duration-700">
          <div className="mb-4 md:mb-6 relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-3xl md:text-4xl">
            {feature.icon}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 relative z-10 tracking-tight">
            {feature.title}
          </h3>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10">
            {feature.description}
          </p>
          
           <motion.div 
             style={{ opacity: glowOpacity }}
             className="absolute -right-20 -bottom-20 w-80 h-80 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"
           />
        </div>
      </motion.div>
    </div>
  );
}
