import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface TeamGallery3DProps {
  teamMembers: TeamMember[];
}

interface PhotoRingProps {
  members: TeamMember[];
  onMemberClick: (index: number) => void;
  focusedIndex: number | null;
}

function PhotoRing({ members, onMemberClick, focusedIndex }: PhotoRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  
  // Load textures
  const textures = members.map((member) => {
    const texture = new THREE.TextureLoader().load(member.image);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  });
  
  texturesRef.current = textures;

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Slow rotation when no focus
    if (focusedIndex === null) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const radius = 4;
  const positions = members.map((_, index) => {
    const angle = (index / members.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return new THREE.Vector3(x, 0, z);
  });

  return (
    <group ref={groupRef}>
      {members.map((_, index) => {
        const position = positions[index];
        const angle = Math.atan2(position.z, position.x);
        const isFocused = focusedIndex === index;
        
        return (
          <group
            key={index}
            position={position}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            {/* Photo plane */}
            <mesh
              onClick={() => onMemberClick(index)}
              scale={isFocused ? [1.8, 1.8, 1] : [1.2, 1.5, 1]}
            >
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial
                map={textures[index]}
                side={THREE.DoubleSide}
                emissive={isFocused ? new THREE.Color('#60a5fa') : new THREE.Color('#000000')}
                emissiveIntensity={isFocused ? 0.3 : 0}
              />
            </mesh>
            
            {/* Glow ring when focused */}
            {isFocused && (
              <mesh scale={[1.3, 1.6, 1]} position={[0, 0, -0.05]}>
                <ringGeometry args={[0.6, 0.65, 32]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
              </mesh>
            )}
            
            {/* Floating particles around each photo */}
            {[...Array(3)].map((_, i) => {
              const particleAngle = (i / 3) * Math.PI * 2;
              const particleRadius = 0.8;
              const px = Math.cos(particleAngle + index) * particleRadius;
              const py = Math.sin(particleAngle + index) * particleRadius;
              
              return (
                <mesh
                  key={i}
                  position={[px, py, -0.1]}
                  scale={0.03}
                >
                  <sphereGeometry args={[1, 8, 8]} />
                  <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
                </mesh>
              );
            })}
          </group>
        );
      })}
      
      {/* Center glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function TeamGallery3D({ teamMembers }: TeamGallery3DProps) {
  const [focusedMember, setFocusedMember] = useState<number | null>(null);

  const handleMemberClick = (index: number) => {
    setFocusedMember(focusedMember === index ? null : index);
  };

  return (
    <div className="relative">
      <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
      
      <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-500/20">
        {/* 3D Canvas */}
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={60} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
          <pointLight position={[-10, 0, -10]} intensity={0.5} color="#22d3ee" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            color="#3b82f6"
          />
          
          <PhotoRing
            members={teamMembers}
            onMemberClick={handleMemberClick}
            focusedIndex={focusedMember}
          />
          <Particles />
        </Canvas>
        
        {/* Member details overlay */}
        <AnimatePresence>
          {focusedMember !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-lg border border-blue-500/40 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl shadow-blue-500/30"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {teamMembers[focusedMember].name}
                </h3>
                <p className="text-blue-300 text-lg mb-4">
                  {teamMembers[focusedMember].role}
                </p>
                <a
                  href={teamMembers[focusedMember].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
                >
                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
              
              {/* Close hint */}
              <button
                onClick={() => setFocusedMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          Click photos to learn more • Drag to rotate
        </motion.div>
      </div>
    </div>
  );
}
