import { useRef, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineItem {
  year: string;
  event: string;
}

interface Timeline3DProps {
  timeline: TimelineItem[];
}

function TimelinePath({ timeline }: { timeline: TimelineItem[] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Create curved path points
  const points = useMemo(() => {
    const curvePoints: THREE.Vector3[] = [];
    const segments = 50;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * 10; // Vertical spread
      const x = Math.sin(t * Math.PI * 2) * 2; // Curved along X
      const z = Math.cos(t * Math.PI) * 1.5; // Depth variation
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    
    return curvePoints;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main curved line */}
      <Line
        points={points}
        color="#3b82f6"
        lineWidth={2}
        opacity={0.8}
        transparent
      />
      
      {/* Timeline nodes */}
      {timeline.map((_, index) => {
        const t = index / (timeline.length - 1);
        const pointIndex = Math.floor(t * (points.length - 1));
        const position = points[pointIndex];
        
        return (
          <group key={index} position={position}>
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial
                color="#60a5fa"
                emissive="#3b82f6"
                emissiveIntensity={0.5}
              />
            </Sphere>
            
            {/* Pulsing glow */}
            <Sphere args={[0.25, 16, 16]}>
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.3}
              />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
}

export default function Timeline3D({ timeline }: Timeline3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={containerRef} className="relative mb-20 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
      
      <div className="relative">
        {/* 3D Canvas Background */}
        <motion.div 
          className="absolute inset-0 h-full"
          style={{ opacity, scale }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
            <TimelinePath timeline={timeline} />
          </Canvas>
        </motion.div>
        
        {/* Timeline Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-full md:w-2/3 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateZ: index % 2 === 0 ? 2 : -2 }}
                    className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <motion.div
                        className="w-3 h-3 bg-blue-500 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                      <h3 className="text-2xl font-bold text-blue-400">{item.year}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.event}</p>
                    
                    {/* Decorative particles */}
                    <div className="absolute -z-10 inset-0 overflow-hidden rounded-xl">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
