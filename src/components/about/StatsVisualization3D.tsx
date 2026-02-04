import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';

interface StatItem {
  number: string;
  label: string;
}

interface StatsVisualization3DProps {
  stats: StatItem[];
}

const AnimatedOrb = memo(({ 
  position, 
  color, 
  scale = 1,
  delay = 0 
}: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
  delay?: number;
}) => {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!orbRef.current || !glowRef.current) return;
    
    const time = state.clock.elapsedTime + delay;
    
    // Optimized pulsing animation
    const pulseScale = 1 + Math.sin(time * 1.5) * 0.08;
    orbRef.current.scale.setScalar(scale * pulseScale);
    
    // Glow pulsing
    const glowScale = 1.3 + Math.sin(time * 1.5) * 0.15;
    glowRef.current.scale.setScalar(scale * glowScale);
    
    // Floating motion
    orbRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.15;
  });
  
  return (
    <group position={position}>
      {/* Main orb - optimized detail */}
      <Sphere ref={orbRef} args={[0.5, 12, 12]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </Sphere>
      
      {/* Outer glow - simplified */}
      <Sphere ref={glowRef} args={[0.6, 8, 8]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </Sphere>
    </group>
  );
});
AnimatedOrb.displayName = 'AnimatedOrb';

const EnergyLines = memo(({ stats }: { stats: StatItem[] }) => {
  const linesRef = useRef<THREE.Group>(null);
  
  const positions = useMemo(() => {
    return stats.map((_, index) => {
      const angle = (index / stats.length) * Math.PI * 2;
      const radius = 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return [x, 0, z] as [number, number, number];
    });
  }, [stats]);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });
  
  return (
    <group ref={linesRef}>
      {positions.map((pos, index) => {
        const nextIndex = (index + 1) % positions.length;
        const nextPos = positions[nextIndex];
        
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...pos, ...nextPos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.25}
            />
          </line>
        );
      })}
    </group>
  );
});
EnergyLines.displayName = 'EnergyLines';

function AnimatedCounter({ target, duration = 2 }: { target: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  // Move hooks to top level - they must not be called conditionally
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  
  useEffect(() => {
    if (!isInView || !target) return;
    
    // Extract number from string (e.g., "100+" -> 100)
    const numericValue = parseInt(target.replace(/\D/g, '')) || 0;
    const suffix = target.replace(/\d/g, '');
    
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest) + suffix);
    });
    
    motionValue.set(numericValue);
    
    return () => {
      unsubscribe();
    };
  }, [isInView, target, motionValue, springValue]);
  
  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
      {displayValue}
    </div>
  );
}


function StatsVisualization3D({ stats }: StatsVisualization3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const colors = useMemo(() => ['#60a5fa', '#22d3ee', '#3b82f6', '#06b6d4'], []);
  
  const positions: [number, number, number][] = useMemo(() => {
    return stats.map((_, index) => {
      const angle = (index / stats.length) * Math.PI * 2;
      const radius = 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return [x, 0, z];
    });
  }, [stats]);
  
  return (
    <div ref={ref} className="mt-20 relative">
      <h2 className="text-4xl font-bold text-center mb-12">By The Numbers</h2>
      
      <div className="relative bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 border border-blue-500/20 rounded-2xl p-12 overflow-hidden">
        {/* 3D Visualization - Optimized */}
        <div className="absolute inset-0 opacity-30" style={{ willChange: 'opacity' }}>
          <Canvas 
            camera={{ position: [0, 3, 6], fov: 50 }} 
            dpr={Math.min(window.devicePixelRatio, 1.5)}
            gl={{ 
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
              stencil: false
            }}
            performance={{ min: 0.5 }}
            frameloop="always"
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#60a5fa" />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#22d3ee" />
            
            {isInView && (
              <>
                {stats.map((_, index) => (
                  <AnimatedOrb
                    key={index}
                    position={positions[index]}
                    color={colors[index % colors.length]}
                    scale={1 + (parseInt(stats[index].number) % 50) / 100}
                    delay={index * 0.3}
                  />
                ))}
                <EnergyLines stats={stats} />
              </>
            )}
          </Canvas>
        </div>
        
        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center relative"
            >
              {/* Particle burst effect - optimized */}
              {isInView && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        willChange: 'transform, opacity',
                      }}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 0.6, 0],
                        x: Math.cos((i / 3) * Math.PI * 2) * 30,
                        y: Math.sin((i / 3) * Math.PI * 2) * 30,
                        opacity: [1, 0.6, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1 + 0.2,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>
              )}
              
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ willChange: 'transform, opacity' }}
              >
                <AnimatedCounter target={stat.number} duration={1.5} />
              </motion.div>
              
              <motion.div
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
              >
                {stat.label}
              </motion.div>
              
              {/* Glow effect - CSS animation for better performance */}
              <div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-lg blur-lg"
                style={{
                  animation: `glow-pulse 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  willChange: 'opacity',
                }}
              />
              <style>{`
                @keyframes glow-pulse {
                  0%, 100% { opacity: 0.15; }
                  50% { opacity: 0.3; }
                }
              `}</style>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsVisualization3D;