import { useState, memo, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
  backContent?: string;
  index: number;
}

function HolographicCard({ 
  icon, 
  title, 
  description, 
  imageUrl,
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
      className="relative min-h-[450px] w-full perspective-1000"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform', height: '100%' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden', height: '100%' }}
        >
          <div className="relative h-full bg-slate-950 border border-white/10 rounded-2xl overflow-hidden group shadow-2xl">
            {/* Background Image with Overlay */}
            {imageUrl && (
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />

            {/* Holographic gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(59, 130, 246, 0.4) 0%, 
                  rgba(6, 182, 212, 0.2) 30%, 
                  transparent 70%)`,
              }}
            />
            
            {/* Content */}
            <div className="relative z-20 text-center h-full flex flex-col items-center justify-end p-8 gap-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 shadow-xl">
                <div style={{ 
                  animation: 'icon-float 3s ease-in-out infinite',
                  willChange: 'transform'
                }}>
                  {icon}
                </div>
              </div>
              
              <div className="bg-slate-950/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 w-full">
                <motion.h3
                  className="text-2xl font-bold mb-3 text-white"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {title}
                </motion.h3>
                
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
            
            {/* Shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-30 pointer-events-none"
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
              transform: 'rotateY(180deg)',
              height: '100%'
            }}
          >
            <div className="relative h-full bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-500/30 rounded-2xl p-8 flex items-center justify-center overflow-hidden">
               {/* Decorative background for back */}
               <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
               </div>

              <div className="text-center relative z-10">
                <p className="text-gray-200 text-lg leading-relaxed">{backContent}</p>
                <div className="mt-8 text-blue-400 font-semibold cursor-pointer">Click to flip back</div>
              </div>
              
              {/* Pulsing glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite',
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
