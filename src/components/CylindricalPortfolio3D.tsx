import React, {
  useRef,
  useMemo,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Zap, ArrowRight } from "lucide-react";
import type { Project } from "../types";

interface CylindricalPortfolio3DProps {
  projects: Project[];
  radius?: number; // Cylinder radius - increase this value to make cylinder larger
}

// Cylinder wall with project images
function CylindricalWall({
  projects,
  rotationY,
  positionZ,
  onProjectClick,
  onProjectHover,
  radius,
}: {
  projects: Project[];
  rotationY: number;
  positionZ: number;
  onProjectClick: (index: number) => void;
  onProjectHover: (index: number | null) => void;
  radius: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [localHoveredIndex, setLocalHoveredIndex] = useState<number | null>(
    null,
  );

  const height = 24; // Increased height to prevent cutting

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      groupRef.current.position.z = positionZ;
    }
  });

  const { camera } = useThree();
  const segmentsRef = useRef<THREE.Mesh[]>([]);

  // No longer using manual raycasting on window, using R3F events instead

  return (
    <group ref={groupRef} position={[0, -4, 0]}>
      {/* Create individual segments for each project */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const segmentAngle = (Math.PI * 2) / projects.length;

        return (
          <ProjectSegmentWithTexture
            key={index}
            ref={(el) => {
              if (el) segmentsRef.current[index] = el;
            }}
            project={project}
            index={index}
            angle={angle}
            segmentAngle={segmentAngle}
            radius={radius}
            height={height}
            isHovered={localHoveredIndex === index}
            rotationY={rotationY}
            onHover={(hovered) => {
              setLocalHoveredIndex(hovered ? index : null);
              onProjectHover(hovered ? index : null);
            }}
            onClick={() => onProjectClick(index)}
          />
        );
      })}
    </group>
  );
}

// Texture loader with error handling
function useTextureSafe(imageUrl: string, fallbackText: string): THREE.Texture {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.warn(`Failed to load texture: ${imageUrl}`, error);
        // Create fallback texture
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#1a1a2e";
          ctx.fillRect(0, 0, 512, 512);
          ctx.fillStyle = "#3b82f6";
          ctx.font = "bold 32px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(fallbackText.substring(0, 15), 256, 256);
        }
        setTexture(new THREE.CanvasTexture(canvas));
      },
    );
  }, [imageUrl, fallbackText]);

  // Return placeholder while loading
  if (!texture) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, 512, 512);
    }
    return new THREE.CanvasTexture(canvas);
  }

  return texture;
}

// Individual project segment - creates a curved plane that follows cylinder
const ProjectSegmentWithTexture = React.forwardRef<
  THREE.Mesh,
  {
    project: Project;
    index: number;
    angle: number;
    segmentAngle: number;
    radius: number;
    height: number;
    isHovered: boolean;
    rotationY: number;
    onHover: (hovered: boolean) => void;
    onClick: () => void;
  }
>(
  (
    {
      project,
      angle,
      segmentAngle,
      radius,
      height,
      isHovered,
      rotationY,
      onHover,
      onClick,
    },
    ref,
  ) => {
    // Load texture with error handling
    const texture = useTextureSafe(project.image, project.title);
    // Create curved plane geometry for seamless cylinder
    const { geometry, effectiveHeight } = useMemo(() => {
      const widthSegments = 32;
      const heightSegments = 24;
      const imageWidth = 1.2;
      const segmentGeometry = new THREE.PlaneGeometry(
        imageWidth,
        height,
        widthSegments,
        heightSegments,
      );

      const paddingY = 1.5;
      const effectiveHeight = height - paddingY * 2;

      const positions = segmentGeometry.attributes.position;
      const uvs = segmentGeometry.attributes.uv;

      for (let i = 0; i <= widthSegments; i++) {
        const u = i / widthSegments;
        const widerSegmentAngle = segmentAngle * 0.99;
        const localAngle = angle + (u - 0.5) * widerSegmentAngle;

        for (let j = 0; j <= heightSegments; j++) {
          const v = j / heightSegments;
          const idx = j * (widthSegments + 1) + i;

          const x = Math.sin(localAngle) * radius;
          const z = Math.cos(localAngle) * radius;
          const y = (v - 0.5) * effectiveHeight;

          positions.setXYZ(idx, x, y, z);
          uvs.setXY(idx, u, v);
        }
      }

      segmentGeometry.computeVertexNormals();
      return { geometry: segmentGeometry, effectiveHeight };
    }, [angle, segmentAngle, radius, height]);

    const material = useMemo(() => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      return new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.9,
        emissive: isHovered ? "#ffffff" : "#000000",
        emissiveIntensity: isHovered ? 0.05 : 0,
      });
    }, [texture, isHovered]);

    return (
      <mesh
        ref={ref}
        geometry={geometry}
        material={material}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* Add subtle blue overlay on hover */}
        {isHovered && (
          <mesh geometry={geometry}>
            <meshBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </mesh>
    );
  },
);

ProjectSegmentWithTexture.displayName = "ProjectSegmentWithTexture";

// Scene component
function Scene({
  projects,
  rotationY,
  positionZ,
  onProjectClick,
  onProjectHover,
  radius,
}: {
  projects: Project[];
  rotationY: number;
  positionZ: number;
  onProjectClick: (index: number) => void;
  onProjectHover: (index: number | null) => void;
  radius: number;
}) {
  return (
    <>
      {/* Ambient lighting - darker for cinematic feel */}
      <ambientLight intensity={0.8} />

      {/* Directional lights for depth - positioned for elevated view */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={2.2}
        color="#3b82f6"
        castShadow
      />
      <directionalLight
        position={[-10, 15, -10]}
        intensity={2.2}
        color="#06b6d4"
      />

      {/* Top light for inner surface visibility */}
      <pointLight position={[0, 12, 0]} intensity={2.6} color="#ffffff" />
      <pointLight position={[0, -12, 0]} intensity={2.4} color="#ffffff" />

      {/* Rim lighting for cylinder edges */}
      <pointLight position={[15, 5, 0]} intensity={2.5} color="#8b5cf6" />
      <pointLight position={[-15, 5, 0]} intensity={2.5} color="#8b5cf6" />

      {/* Cylindrical wall */}
      <Suspense fallback={null}>
        <CylindricalWall
          projects={projects}
          rotationY={rotationY}
          positionZ={positionZ}
          onProjectClick={onProjectClick}
          onProjectHover={onProjectHover}
          radius={radius}
        />
      </Suspense>
    </>
  );
}

// Main component
export default function CylindricalPortfolio3D({
  projects,
  radius = 18,
}: CylindricalPortfolio3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(
    null,
  );
  const isMouseOverUI = useRef(false);
  const hoverClearTimeout = useRef<NodeJS.Timeout | null>(null);

  // ── Scroll-gating: only capture scroll when user clicks INTO the 3D section ──
  const [isWallActive, setIsWallActive] = useState(false);
  const isWallActiveRef = useRef(false); // ref mirror for event listeners

  // Keep ref in sync with state
  useEffect(() => {
    isWallActiveRef.current = isWallActive;
  }, [isWallActive]);

  // Activate wall on click inside the 3D container
  const handleWallActivate = useCallback(() => {
    setIsWallActive(true);
  }, []);

  // Deactivate wall: click outside or press Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsWallActive(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsWallActive(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleProjectHover = (index: number | null) => {
    // Clear any pending timeout
    if (hoverClearTimeout.current) {
      clearTimeout(hoverClearTimeout.current);
      hoverClearTimeout.current = null;
    }

    // Always show the latest hovered project immediately.
    if (index !== null) {
      setHoveredProjectIndex(index);
      return;
    }

    // Debounce the clear: wait a bit before clearing to allow smooth transition to UI
    if (!isMouseOverUI.current) {
      hoverClearTimeout.current = setTimeout(() => {
        setHoveredProjectIndex(null);
      }, 150); // 150ms delay prevents flash when moving from image to description
    }
  };

  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const targetZ = useRef(0);
  const currentZ = useRef(0);

  // CYLINDER RADIUS: Change the default value above (radius = 18) to increase/decrease cylinder size
  // Example: radius = 20 (larger), radius = 15 (smaller)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll handler - handles both horizontal and vertical scrolling
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the section
      // 0 = top of section, 1 = bottom of section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(
        0,
        Math.min(1, -sectionTop / (sectionHeight - windowHeight)),
      );

      // Map scroll progress to exactly one full rotation (360 degrees)
      const totalRotation = Math.PI * 2;
      targetRotation.current = scrollProgress * totalRotation;

      // Move cylinder on Z axis: start at 0, max out at 12
      const maxZ = 12;
      targetZ.current = scrollProgress * maxZ;
    };

    const handleWheel = (event: WheelEvent) => {
      // Only intercept scroll when wall is explicitly active
      if (!isWallActiveRef.current) return;

      // Horizontal scrolling controls rotation directly
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        targetRotation.current += event.deltaX * 0.01;
      }
      // Vertical scroll: prevent default ONLY when wall is active
      // (this stops normal page scroll so wheel controls the 3D scene)
      // Remove the line below if you want normal page scrolling even when active
      // event.preventDefault();
    };

    const handleHorizontalScroll = () => {
      if (!scrollContainerRef.current) return;

      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;
      const scrollProgress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;

      // Map horizontal scroll progress to rotation
      const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);
      targetRotation.current = easedProgress * Math.PI * 2;
    };

    // Listen to wheel events — passive: false so preventDefault() works when needed
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Also listen to horizontal scroll on the scroll container
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleHorizontalScroll, {
        passive: true,
      });
    }

    // Smooth rotation animation with inertia
    const animate = () => {
      const diff = targetRotation.current - currentRotation.current;
      // Exponential smoothing for premium, inertia-based feel
      const smoothingFactor = 0.18;
      currentRotation.current += diff * smoothingFactor;

      setRotationY(currentRotation.current);

      const diffZ = targetZ.current - currentZ.current;
      currentZ.current += diffZ * smoothingFactor;
      setPositionZ(currentZ.current);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      if (scrollContainer)
        scrollContainer.removeEventListener("scroll", handleHorizontalScroll);
      if (rafId) cancelAnimationFrame(rafId);
      // Cleanup hover timeout
      if (hoverClearTimeout.current) {
        clearTimeout(hoverClearTimeout.current);
      }
    };
  }, [isMobile]);

  // Handle project click
  const handleProjectClick = (index: number) => {
    const project = projects[index];
    if (project && project.caseStudyLink && project.caseStudyLink !== "#") {
      window.open(project.caseStudyLink, "_blank");
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
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => handleProjectClick(index)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
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
      className="relative min-h-[300vh] bg-black"
      onClick={handleWallActivate}
    >
      {/* Active-state indicator ring */}
      {isWallActive && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 rounded-full backdrop-blur-sm text-xs text-blue-300 font-mono animate-pulse">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          3D Active · ESC to exit
        </div>
      )}
      {/* Horizontal scroll support (pointer-events-none to prevent scroll blocking) */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden pointer-events-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{ width: "400vw", height: "1px" }} />
      </div>

      {/* Fixed 3D Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          // Slightly reduced max DPR for smoother motion on more devices
          dpr={[1, 1.5]}
        >
          <PerspectiveCamera makeDefault position={[0, 8, 22]} fov={65} />
          <OrbitControls
            enableZoom={isWallActive} // only zoom when wall is clicked-into
            enablePan={false}
            enableRotate={isWallActive} // only orbit-rotate when active
            autoRotate={false}
            minDistance={12}
            maxDistance={35}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            target={[0, 0, 0]}
            dampingFactor={0.05}
            enableDamping={true}
          />
          <Suspense fallback={null}>
            <Scene
              projects={projects}
              rotationY={rotationY}
              positionZ={positionZ}
              onProjectClick={handleProjectClick}
              onProjectHover={handleProjectHover}
              radius={radius}
            />
          </Suspense>
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Header */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
            <h2 className="text-5xl md:text-7xl font-black text-white/10 uppercase tracking-tighter">
              Portfolio Gallery
            </h2>
            <p className="text-gray-500 text-sm mt-4 font-mono tracking-widest">
              SCROLL TO ROTATE • CLICK TO VIEW
            </p>
          </div>

          {/* Project Details Card - BOTTOM OVERLAY */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-center pb-24 px-6 pointer-events-auto"
            onMouseEnter={() => {
              isMouseOverUI.current = true;
              // Cancel any pending clear timeout when entering UI
              if (hoverClearTimeout.current) {
                clearTimeout(hoverClearTimeout.current);
                hoverClearTimeout.current = null;
              }
            }}
            onMouseLeave={() => {
              isMouseOverUI.current = false;
              handleProjectHover(null);
            }}
          >
            <div
              className={`max-w-4xl w-full transition-all duration-500 transform ${hoveredProjectIndex !== null ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {hoveredProjectIndex !== null && (
                <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {projects[hoveredProjectIndex].title}
                    </h3>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-2xl">
                      {projects[hoveredProjectIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projects[hoveredProjectIndex].tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleProjectClick(hoveredProjectIndex)}
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105"
                  >
                    <Zap size={20} className="fill-white" />
                    Live Link
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scroll Progress / Counter */}
          {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{
                    width: `${Math.min((rotationY / (Math.PI * 2)) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="font-mono text-white/40">
                {(Math.round((rotationY / (Math.PI * 2)) * projects.length) % projects.length + projects.length) % projects.length + 1} / {projects.length}
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
