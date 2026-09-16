import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumComputer } from './QuantumComputer';
import { IntroPhase } from '../../types';

interface PersistentQuantumSceneProps {
  introPhase: IntroPhase;
  assemblyProgress: number; // 0 to 1
  activationProgress: number; // 0 to 1
  transitionProgress: number; // 0 (intro center) to 1 (hero right position)
  sceneOpacity?: number; // 0 to 1
  isDarkTheme?: boolean;
}

interface SceneContentProps {
  introPhase: IntroPhase;
  assemblyProgress: number;
  activationProgress: number;
  transitionProgress: number;
  isDarkTheme: boolean;
}

const SceneContent: React.FC<SceneContentProps> = ({
  introPhase,
  assemblyProgress,
  activationProgress,
  transitionProgress,
  isDarkTheme,
}) => {
  const containerGroup = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollY = useRef(0);

  // Mouse parallax handler (clamped strictly to ~4 deg horiz, ~3 deg vert)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = nx * 0.07; // ~4 degrees
      mouse.current.targetY = ny * 0.05; // ~3 degrees
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Frame interpolation: camera & object coordinate transformation from Intro to Home
  useFrame((state) => {
    // Smooth mouse damping
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    // Transition interpolation:
    // Intro center position: x = 0, y = -0.1, z = 0, camera z = 5.2
    // Hero composition:
    // Sized around 60–70% of previous size, fully visible with no clipping,
    // positioned on the right side of the hero, vertically centered,
    // completely below the navbar and above the bottom event-info row,
    // never overlapping the left-side title, description, or buttons.
    const t = transitionProgress; // 0 to 1

    const isMobile = state.size.width < 768;

    // Target position for hero (right side, vertically centered, balanced)
    // Desktop: x = 2.05 shifts it cleanly into the right column without overflowing viewport edge.
    // y = 0.05 centers it vertically within the hero section between navbar and bottom event-info row.
    // Scale = 0.68 achieves the 60-70% size requested, keeping top cryogenic cap and bottom cone well within frustum.
    const heroTargetX = isMobile ? 0.0 : 2.05;
    const heroTargetY = isMobile ? 0.45 : 0.05;
    const heroTargetScale = isMobile ? 0.52 : 0.68;

    const currentX = THREE.MathUtils.lerp(0.0, heroTargetX, t);
    const currentY = THREE.MathUtils.lerp(-0.1, heroTargetY, t);
    const currentZ = THREE.MathUtils.lerp(0.0, -0.1, t);
    const currentScale = THREE.MathUtils.lerp(0.95, heroTargetScale, t);

    if (containerGroup.current) {
      containerGroup.current.position.x = currentX + mouse.current.x * 0.35;
      containerGroup.current.position.y = currentY + mouse.current.y * 0.2;
      containerGroup.current.position.z = currentZ;

      containerGroup.current.scale.set(currentScale, currentScale, currentScale);

      // Subtle parallax rotation
      containerGroup.current.rotation.x = mouse.current.y * 0.4;
      containerGroup.current.rotation.z = -mouse.current.x * 0.2;
    }

    // Camera adjustments: pulling camera to z = 6.2 creates comfortable framing headroom with zero clipping
    const targetCamZ = THREE.MathUtils.lerp(5.2, 6.2, t);
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.05;
  });

  // Lighting parameters based on theme
  const ambientIntensity = isDarkTheme ? 0.9 : 1.3;
  const keyLightIntensity = isDarkTheme ? 3.5 : 4.2;
  const rimLightIntensity = isDarkTheme ? 2.5 : 1.8;
  const rubyGlowIntensity = activationProgress * (isDarkTheme ? 4.0 : 2.8);

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={ambientIntensity} color="#FAF8F5" />

      {/* Main Studio Key Light (Platinum / Silver highlights from top-right) */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={keyLightIntensity}
        color="#F1F1F2"
      />

      {/* Fill Light (Soft cool graphite fill from front-left) */}
      <directionalLight
        position={[-4, 2, 3]}
        intensity={keyLightIntensity * 0.4}
        color="#D9D9DC"
      />

      {/* Backlight / Rim Light (Edge definition) */}
      <directionalLight
        position={[0, 4, -4]}
        intensity={rimLightIntensity}
        color="#E8E8EC"
      />

      {/* Ruby / Burgundy Atmospheric Under-Light */}
      <pointLight
        position={[0, -2.5, 1]}
        intensity={rubyGlowIntensity}
        color="#8A1B27"
        distance={6}
        decay={2}
      />

      {/* Persistent Quantum Machine Container */}
      <group ref={containerGroup}>
        <QuantumComputer
          assemblyProgress={assemblyProgress}
          activationProgress={activationProgress}
          isDarkTheme={isDarkTheme}
        />
      </group>
    </>
  );
};

export const PersistentQuantumScene: React.FC<PersistentQuantumSceneProps> = ({
  introPhase,
  assemblyProgress,
  activationProgress,
  transitionProgress,
  sceneOpacity,
  isDarkTheme = true,
}) => {
  // Determine if the 3D scene should be visible:
  // Early intro phases (blank, line, field, text, loading, wait 1st scroll) keep canvas hidden.
  // Starting from ASSEMBLY and onwards, the 3D quantum computer is fully visible.
  const isSceneActive =
    introPhase === 'ASSEMBLY' ||
    introPhase === 'ACTIVATION' ||
    introPhase === 'WAIT_SECOND_SCROLL' ||
    introPhase === 'ENTER_HOME' ||
    introPhase === 'HOME';

  // If sceneOpacity is explicitly controlled and > 0, honor it, otherwise default to 1 when active
  const opacityValue = isSceneActive
    ? sceneOpacity !== undefined && sceneOpacity > 0
      ? sceneOpacity
      : 1
    : 0;

  return (
    <div
      id="persistent-3d-canvas-container"
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 overflow-hidden ${
        isSceneActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        opacity: opacityValue,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <SceneContent
          introPhase={introPhase}
          assemblyProgress={assemblyProgress}
          activationProgress={activationProgress}
          transitionProgress={transitionProgress}
          isDarkTheme={isDarkTheme}
        />
      </Canvas>
    </div>
  );
};
