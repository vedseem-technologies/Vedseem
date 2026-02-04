import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'octahedron';
  color: string;
  speed?: number;
}

const FloatingShape = memo(({ position, geometry, color, speed = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = useMemo(() => ({
    x: 0.001 * speed,
    y: 0.002 * speed,
  }), [speed]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Optimized rotation - only continuous, no mouse tracking
    meshRef.current.rotation.x += rotationSpeed.x;
    meshRef.current.rotation.y += rotationSpeed.y;
  });

  const renderGeometry = useMemo(() => {
    const props = { ref: meshRef };
    
    switch (geometry) {
      case 'sphere':
        return (
          <Sphere args={[1, 24, 24]} {...props}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus args={[1, 0.4, 12, 64]} {...props}>
            <meshStandardMaterial
              color={color}
              roughness={0.1}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </Torus>
        );
      case 'octahedron':
        return (
          <Octahedron args={[1.2]} {...props}>
            <meshStandardMaterial
              color={color}
              roughness={0.1}
              metalness={0.7}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Octahedron>
        );
      default:
        return null;
    }
  }, [geometry, color]);

  return (
    <Float
      speed={speed * 0.5}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh position={position}>
        {renderGeometry}
      </mesh>
    </Float>
  );
});
FloatingShape.displayName = 'FloatingShape';

const Scene = memo(() => {
  const shapes = useMemo(() => [
    { position: [-4, 2, -3], geometry: 'sphere' as const, color: '#60a5fa', speed: 0.8 },
    { position: [4, -1, -2], geometry: 'torus' as const, color: '#22d3ee', speed: 1.2 },
    { position: [-3, -2, -4], geometry: 'octahedron' as const, color: '#3b82f6', speed: 1 },
    { position: [3, 3, -5], geometry: 'sphere' as const, color: '#06b6d4', speed: 0.9 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#22d3ee" />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          geometry={shape.geometry}
          color={shape.color}
          speed={shape.speed}
        />
      ))}
    </>
  );
});
Scene.displayName = 'Scene';

function FloatingGeometry() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60" style={{ willChange: 'opacity' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
        frameloop="always"
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default memo(FloatingGeometry);
