import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating geometric shapes component
// function FloatingShape({ 
//   position, 
//   shape = "icosahedron",
//   color = "#3b82f6",
//   emissive = "#1e40af"
// }: { 
//   position: [number, number, number]; 
//   shape?: string;
//   color?: string;
//   emissive?: string;
// }) {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const rotationSpeed = useMemo(() => [
//     (Math.random() - 0.5) * 0.02,
//     (Math.random() - 0.5) * 0.02,
//     (Math.random() - 0.5) * 0.02,
//   ], []);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += rotationSpeed[0];
//       meshRef.current.rotation.y += rotationSpeed[1];
//       meshRef.current.rotation.z += rotationSpeed[2];
//     }
//   });

//   const GeometryComponent = useMemo(() => {
//     switch (shape) {
//       case "torus":
//         return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
//       case "octahedron":
//         return <octahedronGeometry args={[0.6]} />;
//       case "tetrahedron":
//         return <tetrahedronGeometry args={[0.6]} />;
//       default:
//         return <icosahedronGeometry args={[0.6, 0]} />;
//     }
//   }, [shape]);

//   return (
//     <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
//       <mesh ref={meshRef} position={position}>
//         {GeometryComponent}
//         <MeshDistortMaterial
//           color={color}
//           emissive={emissive}
//           emissiveIntensity={0.5}
//           metalness={0.8}
//           roughness={0.2}
//           distort={0.3}
//           speed={2}
//           transparent
//           opacity={0.8}
//         />
//       </mesh>
//     </Float>
//   );
// }

// Animated wireframe sphere
function WireframeSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          emissive="#0891b2"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

// Particle system
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
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
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.position.x = mouse.x * 0.5;
      groupRef.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional lights */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#06b6d4" />
      
      {/* Point lights for depth */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      {/* Stars background */}
      <Stars radius={15} depth={50} count={2000} factor={4} fade speed={0.5} />

      {/* Particle system */}
      <Particles />

      {/* Main group of shapes */}
      {/* <group ref={groupRef}>
        <FloatingShape 
          position={[-3, 2, -2]} 
          shape="icosahedron" 
          color="#3b82f6"
          emissive="#1e40af"
        />
        <FloatingShape 
          position={[3, -2, -1]} 
          shape="torus" 
          color="#06b6d4"
          emissive="#0891b2"
        />
        <FloatingShape 
          position={[0, 3, -3]} 
          shape="octahedron" 
          color="#3b82f6"
          emissive="#1e40af"
        />
        <FloatingShape 
          position={[-2, -3, -2]} 
          shape="tetrahedron" 
          color="#06b6d4"
          emissive="#0891b2"
        />
        <WireframeSphere position={[2, 1, -4]} />
        <FloatingShape 
          position={[4, 0, -3]} 
          shape="icosahedron" 
          color="#3b82f6"
          emissive="#1e40af"
        />
      </group> */}
    </>
  );
}

// Main component
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
          style={{ background: "transparent" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
