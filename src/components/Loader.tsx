import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  pageReady: boolean;
  onComplete: () => void;
}

const TARGET_TEXT = "VEDSEEM";

export default function Loader({ pageReady, onComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const [animComplete, setAnimComplete] = useState(false);

  // Completion & Particle Trigger
  useEffect(() => {
    if (pageReady && animComplete) {
        const timeout = setTimeout(() => {
            setParticlesActive(true); 
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }, 1000);
        }, 800);
        return () => clearTimeout(timeout);
    }
  }, [pageReady, animComplete, onComplete]);

  // Particle System Data
  const particles = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 600 - 300,
      y: Math.random() * 200 - 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 1.5 + 0.8,
      delay: Math.random() * 0.3
    }));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
           key="loader-container"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.8 } }}
           className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
        >
            {/* Main Premium Content */}
            <div className="z-10 relative flex flex-col items-center w-full px-4">
                
                {/* SVG Writing Animation */}
                <motion.div
                    className="relative w-full max-w-[400px] md:max-w-[900px] aspect-[4/1]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: particlesActive ? 0 : 1, 
                      scale: 1,
                      filter: particlesActive ? "blur(20px)" : "blur(0px)" 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 500 150"
                      xmlns="http://www.w3.org/2000/svg"
                      className="select-none uppercase overflow-visible"
                    >
                      <defs>
                        <linearGradient id="loaderStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e40af" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                      
                      <motion.text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        strokeWidth="1"
                        fontSize="90"
                        fontFamily="Inter, sans-serif"
                        fontWeight="900"
                        fill="none"
                        stroke="url(#loaderStrokeGradient)"
                        initial={{ strokeDashoffset: 1500, strokeDasharray: 1500 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        onAnimationComplete={() => setAnimComplete(true)}
                      >
                        {TARGET_TEXT}
                      </motion.text>
                    </svg>

                    {/* Particle Dispersion Effect */}
                    {particlesActive && (
                      <div className="absolute inset-0 z-20 overflow-visible pointer-events-none flex items-center justify-center">
                        {particles.map((p) => (
                          <motion.div
                            key={p.id}
                            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                            style={{
                              boxShadow: '0 0 10px #3b82f6',
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{ 
                              x: p.x, 
                              y: p.y, 
                              opacity: 0, 
                              scale: 0 
                            }}
                            transition={{ 
                              duration: p.duration, 
                              delay: p.delay,
                              ease: "easeOut" 
                            }}
                          />
                        ))}
                      </div>
                    )}
                </motion.div>
            </div>

            {/* Background Decorators */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e3a8a22_0%,_transparent_70%)] pointer-events-none z-0" />
            <motion.div 
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-0" 
            />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
