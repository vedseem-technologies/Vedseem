import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function AnimatedValueCard({ icon, title, description, index }: AnimatedValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 400,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 400,
    damping: 25,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Optimized particle effect - reduced frequency
  useEffect(() => {
    if (!isHovered || !cardRef.current) return;

    const card = cardRef.current;
    const particles: HTMLDivElement[] = [];
    
    const interval = setInterval(() => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none';
      particle.style.willChange = 'transform, opacity';
      
      const rect = card.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.animation = 'particle-float 1s ease-out forwards';
      
      card.appendChild(particle);
      particles.push(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }, 200); // Reduced from 100ms to 200ms

    return () => {
      clearInterval(interval);
      particles.forEach(p => p.remove());
    };
  }, [isHovered]);

  return (
    <>
      <style>
        {`
          @keyframes particle-float {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-30px) scale(0);
            }
          }
        `}
      </style>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        whileHover={{ 
          y: -10,
          transition: { duration: 0.2, ease: "easeOut" } 
        }}
        className="relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 group overflow-hidden"
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'translateZ(10px)',
            willChange: 'opacity',
          }}
        />
        
        {/* Glow effect - optimized */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
          style={{ willChange: 'opacity' }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="group-hover:scale-110 transition-transform duration-300 mb-4"
            style={{ transform: 'translateZ(30px)' }}
          >
            {icon}
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold mb-4"
            style={{ transform: 'translateZ(20px)' }}
          >
            {title}
          </motion.h3>
          
          <motion.p
            className="text-gray-300 leading-relaxed"
            style={{ transform: 'translateZ(15px)' }}
          >
            {description}
          </motion.p>
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </>
  );
}

export default memo(AnimatedValueCard);
