import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  icon: string;
  title: string;
  description: string;
  backContent?: string;
  index: number;
}

function HolographicCard({ 
  icon, 
  title, 
  description, 
  backContent,
  index 
}: HolographicCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const handleClick = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: "easeOut"
      }}
      className="relative h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 overflow-hidden group">
            {/* Holographic gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(96, 165, 250, 0.4) 0%, 
                  rgba(34, 211, 238, 0.3) 25%, 
                  rgba(59, 130, 246, 0.2) 50%, 
                  transparent 70%)`,
              }}
            />
            
            {/* Simplified border glow - CSS only for better performance */}
            <div 
              className="absolute inset-0 rounded-xl opacity-60"
              style={{
                background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.3) 0%, rgba(34, 211, 238, 0.3) 50%, rgba(96, 165, 250, 0.3) 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 3s linear infinite',
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <style>{`
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
              }
            `}</style>
            
            {/* Content */}
            <div className="relative z-10 text-center h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-3" style={{ 
                animation: 'icon-float 3s ease-in-out infinite',
                willChange: 'transform'
              }}>
                {icon}
              </div>
              <style>{`
                @keyframes icon-float {
                  0%, 100% { transform: scale(1) rotate(0deg); }
                  50% { transform: scale(1.05) rotate(3deg); }
                }
              `}</style>
              
              <motion.h3
                className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {title}
              </motion.h3>
              
              <motion.p
                className="text-gray-300 text-sm"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {description}
              </motion.p>
            </div>
            
            {/* Shine effect - CSS animation for better performance */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                transform: 'skewX(-20deg)',
                animation: 'shine 4s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
            <style>{`
              @keyframes shine {
                0% { transform: translateX(-100%) skewX(-20deg); }
                50%, 100% { transform: translateX(200%) skewX(-20deg); }
              }
            `}</style>
          </div>
        </div>

        {/* Back of card */}
        {backContent && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="relative h-full bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/40 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-200 leading-relaxed">{backContent}</p>
              </div>
              
              {/* Pulsing glow - CSS animation */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite',
                  willChange: 'opacity',
                }}
              />
              <style>{`
                @keyframes pulse-glow {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 0.6; }
                }
              `}</style>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default memo(HolographicCard);
