import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Html, 
  useTexture,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "../types";

interface CylinderPortfolio3DProps {
  projects: Project[];
}

// Project Card Component on Cylinder
function ProjectCard({ 
  project, 
  index, 
  total, 
  rotationY,
  onProjectClick
}: { 
  project: Project; 
  index: number; 
  total: number;
  rotationY: number;
  onProjectClick: (link: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate position on cylinder circumference
  const radius = 8;
  const height = 0; // All projects at same height (center)
  const angle = (index / total) * Math.PI * 2;
  const currentAngle = angle + rotationY;
  
  // Calculate position on cylinder
  const x = Math.sin(currentAngle) * radius;
  const z = Math.cos(currentAngle) * radius;
  const y = height;
  
  // Calculate if this project is facing the camera (active)
  // Camera is at [0, 0, 0] looking forward
  const angleToCamera = Math.abs(currentAngle % (Math.PI * 2));
  const isActive = angleToCamera < 0.2 || angleToCamera > Math.PI * 2 - 0.2;
  
  // Only show active project
  const opacity = isActive ? 1 : 0;
  const scale = isActive ? 1 : 0;
  
  useFrame(() => {
    if (groupRef.current) {
      // Update position
      groupRef.current.position.x = x;
      groupRef.current.position.y = y;
      groupRef.current.position.z = z;
      
      // Always face the center (camera)
      groupRef.current.lookAt(0, 0, 0);
      
      // Smooth scale transition
      if (meshRef.current) {
        const targetScale = isActive ? 1 : 0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
      }
    }
  });

  const handleClick = () => {
    if (isActive && project.caseStudyLink) {
      onProjectClick(project.caseStudyLink);
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={[x, y, z]}
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Main card mesh */}
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 7]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={opacity}
          emissive={isHovered ? "#3b82f6" : "#1e40af"}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Glow effect for active card */}
      {isActive && (
        <>
          <mesh>
            <planeGeometry args={[5.3, 7.3]} />
            <meshBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Click indicator */}
          {isHovered && (
            <mesh position={[0, -4, 0.1]}>
              <planeGeometry args={[4, 0.8]} />
              <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
        </>
      )}
      
      {/* Project image texture */}
      <Suspense fallback={null}>
        <ProjectImage 
          imageUrl={project.image} 
          opacity={opacity}
          isActive={isActive}
        />
      </Suspense>
      
      {/* HTML overlay with project info */}
      {isActive && (
        <Html
          position={[0, -4.5, 0.1]}
          center
          distanceFactor={6}
          transform
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: opacity,
          }}
        >
          <div className="text-center">
            <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-2xl">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 max-w-[250px] mx-auto line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mb-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-blue-500/20 backdrop-blur-sm rounded text-xs text-blue-300 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            {isHovered && (
              <p className="text-cyan-400 text-xs font-semibold mt-2 animate-pulse">
                Click to View →
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// Project Image Component
function ProjectImage({ 
  imageUrl, 
  opacity,
  isActive 
}: { 
  imageUrl: string; 
  opacity: number;
  isActive: boolean;
}) {
  const texture = useTexture(imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  }, [texture]);
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0.01]}>
      <planeGeometry args={[4.8, 6.8]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={opacity}
        emissive={isActive ? "#1e40af" : "#000000"}
        emissiveIntensity={isActive ? 0.3 : 0}
      />
    </mesh>
  );
}

// Cylinder Structure (visual representation)
function CylinderStructure({ radius, height }: { radius: number; height: number }) {
  return (
    <group>
      {/* Top ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height / 2, 0]}>
        <ringGeometry args={[radius - 0.1, radius, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Bottom ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -height / 2, 0]}>
        <ringGeometry args={[radius - 0.1, radius, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Cylinder wall (semi-transparent) */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 64, 1, true]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

// Camera Controller Component
function CameraController({ 
  cameraView 
}: { 
  cameraView: 'front' | 'top';
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame(() => {
    if (cameraRef.current) {
      if (cameraView === 'top') {
        cameraRef.current.position.lerp(new THREE.Vector3(0, 20, 0), 0.1);
        cameraRef.current.lookAt(0, 0, 0);
      } else {
        cameraRef.current.position.lerp(new THREE.Vector3(0, 0, 15), 0.1);
        cameraRef.current.lookAt(0, 0, 0);
      }
    }
  });
  
  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={cameraView === 'top' ? [0, 20, 0] : [0, 0, 15]} 
      fov={75}
    />
  );
}

// Scene Component
function Scene({ 
  projects, 
  rotationY,
  onProjectClick,
  cameraView
}: { 
  projects: Project[]; 
  rotationY: number;
  onProjectClick: (link: string) => void;
  cameraView: 'front' | 'top';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cylinderRadius = 8;
  const cylinderHeight = 15;
  
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        color="#3b82f6"
        castShadow
      />
      <directionalLight 
        position={[-5, 10, -5]} 
        intensity={1} 
        color="#06b6d4"
      />
      
      {/* Top light for top view */}
      {cameraView === 'top' && (
        <pointLight position={[0, 20, 0]} intensity={1.2} color="#ffffff" />
      )}
      
      {/* Cylinder structure */}
      <CylinderStructure radius={cylinderRadius} height={cylinderHeight} />
      
      {/* Main group containing all project cards */}
      <group ref={groupRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            total={projects.length}
            rotationY={rotationY}
            onProjectClick={onProjectClick}
          />
        ))}
      </group>
      
      {/* Central axis indicator */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, cylinderHeight, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1e40af"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

// Main Component
export default function CylinderPortfolio3D({ projects }: CylinderPortfolio3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState(0);
  const [cameraView, setCameraView] = useState<'front' | 'top'>('front');
  const [isMobile, setIsMobile] = useState(false);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll handler for rotation
  useEffect(() => {
    if (isMobile) return;
    
    let rafId: number;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - windowHeight)));
      
      // Map scroll progress to rotation
      // Each full scroll = one complete rotation
      const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);
      targetRotation.current = easedProgress * Math.PI * 2;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Smooth rotation animation
    const animate = () => {
      const diff = targetRotation.current - currentRotation.current;
      const smoothingFactor = 0.15;
      currentRotation.current += diff * smoothingFactor;
      
      setRotationY(currentRotation.current);
      
      rafId = requestAnimationFrame(animate);
    };
    
    handleScroll();
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);
  
  // Handle project click
  const handleProjectClick = (link: string) => {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  };
  
  // Mobile fallback
  if (isMobile) {
    return (
      <section className="min-h-screen bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Our <span className="text-blue-400">Projects</span>
          </h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all"
                onClick={() => handleProjectClick(project.caseStudyLink)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[80vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[400vh] bg-black"
    >
      {/* Fixed 3D Canvas */}
      <div className="sticky top-0 min-h-screen my-64 w-full overflow-hidden">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <CameraController cameraView={cameraView} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={10}
            maxDistance={30}
            enableRotate={true}
            autoRotate={false}
          />
          <Suspense fallback={null}>
            <Scene 
              projects={projects} 
              rotationY={rotationY}
              onProjectClick={handleProjectClick}
              cameraView={cameraView}
            />
          </Suspense>
        </Canvas>
        
        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white/20 uppercase tracking-tighter">
              Portfolio
            </h2>
            <p className="text-gray-500 text-sm mt-4 font-mono tracking-widest">
              SCROLL DOWN OR TOP TO ROTATE • CLICK PROJECT TO VIEW •
            </p>
          </div>
          
          {/* View toggle buttons */}
          <div className="absolute top-20 right-8 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCameraView('front')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  cameraView === 'front'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setCameraView('top')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  cameraView === 'top'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Top View
              </button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{
                    width: `${Math.min((rotationY / (Math.PI * 2)) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="font-mono">
                {Math.round((rotationY / (Math.PI * 2)) * projects.length) % projects.length + 1} / {projects.length}
              </span>
            </div>
          </div> */}
        </div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>
    </section>
  );
}
