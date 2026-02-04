import { useRef, useEffect, useState, useMemo, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TimelineItem {
  year: string;
  event: string;
  icon: string;
}

interface ParticleTimelineProps {
  timeline: TimelineItem[];
}

/* ---------------- SNAKE PATH (Blue/Cyan themed) ---------------- */

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

function ParticleTimeline({ timeline }: ParticleTimelineProps) {
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
    const gap = isLaptop ? 450 : 500;
    return {
      gap,
      wavelength: gap * 2,
      particleCount: isLaptop ? 1500 : 1000, // Further reduced for better performance
      particleRadius: isLaptop ? 28 : 8,
      cardWidth: isLaptop ? "40%" : "88%",
      snakeAmplitude: 0.35,
      revealStartOffset: isLaptop ? -120 : -60,
      revealEndOffset: isLaptop ? 60 : 60,
    };
  }, [isLaptop]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  /* ---------------- PARTICLE ENGINE (Blue/Cyan colors) ---------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Blue to Cyan gradient color mixing
    const mixColor = (t: number) => {
      const r = Math.floor(59 + (34 - 59) * t);   // 3b -> 22 (blue to cyan)
      const g = Math.floor(130 + (211 - 130) * t); // 82 -> d3
      const b = Math.floor(246 + (238 - 246) * t); // f6 -> ee
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
        drift: 0.12 + Math.random() * 0.2,
        spin: 0.002 + Math.random() * 0.005,
        size: 0.5 + Math.random() * 1.2,
        colorBase: mixColor(t),
        opacity: 0.3 + Math.random() * 0.4,
      };
    });

    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = smoothProgress.get();
      const internalTime = progress * 6.5;
      const currentLimit = canvas.height * progress;
      const snakeWidth = Math.min(canvas.width * layout.snakeAmplitude, 1200);
      const wavelength = layout.wavelength;

      ctx.save();
      if (isLaptop) {
        ctx.shadowBlur = 3; // Reduced shadow blur
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.drift;
        if (p.y > canvas.height) p.y = 0;
        if (p.y > currentLimit + 180) continue;

        p.angle += p.spin;
        const centralX = getSnakeX(p.y, internalTime, canvas.width, snakeWidth, wavelength);
        const spiralX = Math.cos(p.angle) * p.radius;
        const spiralZ = Math.sin(p.angle);

        let opacity = p.opacity;
        if (p.y > currentLimit) {
          opacity *= Math.max(0, 1 - (p.y - currentLimit) / 100);
        }
        if (spiralZ < 0) opacity *= 0.4;

        ctx.beginPath();
        ctx.arc(centralX + spiralX, p.y, p.size * (1 + spiralZ * 0.2), 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${p.colorBase},${opacity})`;
        if (isLaptop) ctx.shadowColor = `rgba(${p.colorBase},0.4)`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [smoothProgress, layout, isLaptop]);

  const totalHeight = timeline.length * layout.gap + layout.gap;

  return (
    <section className="py-24 md:py-32 overflow-hidden relative mb-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Journey
            </span>
          </h2>
        </motion.header>

        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${totalHeight}px` }}
        >
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 h-full w-full pointer-events-none z-0"
            style={{ imageRendering: "auto" }}
          />

          <div className="relative w-full h-full z-10">
            {timeline.map((item, index) => (
              <TimelineStep
                key={index}
                item={item}
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

/* ---------------- TIMELINE STEP ---------------- */

const TimelineStep = memo(({
  item,
  index,
  layout,
  progress,
  totalHeight,
}: {
  item: TimelineItem;
  index: number;
  layout: any;
  progress: any;
  totalHeight: number;
}) => {
  const yPos = index * layout.gap + layout.gap / 2;
  const isEven = index % 2 === 0;

  const centerPoint = yPos / totalHeight;
  const startPoint = centerPoint + layout.revealStartOffset / totalHeight;
  const finishPoint = centerPoint + layout.revealEndOffset / totalHeight;

  const range = [startPoint, finishPoint];

  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const yShift = useTransform(progress, range, [30, 0]);
  const blur = useTransform(progress, range, ["blur(14px)", "blur(0px)"]);

  const xShiftStart = isEven ? -30 : 30;
  const xShift = useTransform(progress, range, [xShiftStart, 0]);

  const focusRange = 250 / totalHeight;
  const glowOpacity = useTransform(
    progress,
    [centerPoint - focusRange, centerPoint, finishPoint + focusRange],
    [0, 1, 0.3]
  );

  return (
    <div
      className="absolute w-full flex"
      style={{
        top: `${yPos}px`,
        left: 0,
        transform: "translateY(-50%) translateZ(0)",
        justifyContent: isEven ? "flex-start" : "flex-end",
        willChange: "transform",
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          y: yShift,
          x: xShift,
          filter: blur,
          width: layout.cardWidth,
          willChange: "transform, opacity, filter",
        }}
        className="relative z-20"
      >
        <div className="px-6 py-8 md:px-10 md:py-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-900/30 via-blue-950/20 to-cyan-900/30 border border-blue-500/30 relative overflow-hidden shadow-2xl backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500">
          {/* Icon */}
          <div className="mb-5 md:mb-6 relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 text-3xl md:text-5xl backdrop-blur-md">
            {item.icon}
          </div>

          {/* Year Badge */}
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {item.year}
            </span>
          </div>

          <p className="text-gray-200 text-base md:text-xl leading-relaxed relative z-10">
            {item.event}
          </p>

          {/* Animated glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/15 blur-[100px] rounded-full pointer-events-none"
          />
          
          {/* Top corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full" />
        </div>
      </motion.div>
    </div>
  );
});
TimelineStep.displayName = 'TimelineStep';

export default memo(ParticleTimeline);
