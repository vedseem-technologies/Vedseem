import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
}

interface StatsVisualization3DProps {
  stats: StatItem[];
}

function AnimatedCounter({
  target,
  duration = 2,
}: {
  target: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (!isInView || !target) return;

    // Check if target is a number optionally followed by a suffix (e.g. "500+", "100%")
    const match = target.match(/^(\d+)(\D*)$/);

    if (!match) {
      // Non-numeric pattern like "24/7" — display as-is without animation
      setDisplayValue(target);
      return;
    }

    const numericValue = parseInt(match[1], 10);
    const suffix = match[2];

    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest) + suffix);
    });

    motionValue.set(numericValue);

    return () => {
      unsubscribe();
    };
  }, [isInView, target, motionValue, springValue]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {displayValue}
    </div>
  );
}

function StatsVisualization3D({ stats }: StatsVisualization3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mt-24 mb-20 relative">
      {/* Minimal Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          By The Numbers
        </h2>
      </motion.div>

      {/* Clean Stats Container */}
      <div className="relative max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-blue-950/20 to-cyan-950/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 rounded-2xl" />

          {/* Minimal Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Number */}
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AnimatedCounter target={stat.number} duration={1.8} />
                </motion.div>

                {/* Label */}
                <motion.div
                  className="text-gray-400 text-sm md:text-base"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                >
                  {stat.label}
                </motion.div>

                {/* Subtle accent line */}
                <div className="mt-3 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsVisualization3D;
