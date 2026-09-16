import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumComputer, ActiveComponentId } from './QuantumComputer';
import { IntroPhase } from '../../types';

interface PersistentQuantumSceneProps {
  introPhase: IntroPhase;
  activationProgress: number; // 0 to 1
  transitionProgress: number; // 0 (intro center) to 1 (hero right position)
  sceneOpacity?: number; // 0 to 1
  isDarkTheme?: boolean;
}

interface SceneContentProps {
  introPhase: IntroPhase;
  activationProgress: number;
  transitionProgress: number;
  isDarkTheme: boolean;
}

const getActiveComponentId = (phase: IntroPhase): ActiveComponentId => {
  switch (phase) {
    case 'COMPONENT_01':
      return '01';
    case 'COMPONENT_02':
      return '02';
    case 'COMPONENT_03':
      return '03';
    case 'COMPONENT_04':
      return '04';
    case 'COMPLETE_COMPUTER':
    case 'WAIT_ENTER':
    case 'ENTER_HOME':
    case 'HOME':
    case 'COMPUTER_REVEAL':
      return 'ALL';
    default:
      return 'NONE';
  }
};

const SceneContent: React.FC<SceneContentProps> = ({
  introPhase,
  activationProgress,
  transitionProgress,
  isDarkTheme,
}) => {
  const containerGroup = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollY = useRef(0);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse parallax handler (clamped strictly to subtle angle)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = nx * 0.06;
      mouse.current.targetY = ny * 0.04;
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

  const activeComponent = getActiveComponentId(introPhase);

  // Frame interpolation: camera & object coordinate transformation
  useFrame((state, delta) => {
    // Smooth mouse damping
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    const isMobile = state.size.width < 768 || (state.size.width / (state.size.height || 1)) < 0.85;
    const t = transitionProgress; // 0 to 1

    const scrollOffset3D =
      introPhase === 'HOME'
        ? (scrollY.current / (window.innerHeight || 1)) * 5.14
        : 0;

    // Target position for hero
    // Desktop: right side hero stage
    // Mobile: located in between text/buttons and the bottom dates strip (inside hero-quantum-stage)
    let heroTargetX = 2.05;
    let heroTargetY = 0.05;
    const heroTargetScale = isMobile ? 0.44 : 0.68;

    if (isMobile) {
      heroTargetX = 0.0;
      const stageEl = typeof document !== 'undefined' ? document.getElementById('hero-quantum-stage') : null;
      if (stageEl) {
        const rect = stageEl.getBoundingClientRect();
        const winH = window.innerHeight || state.size.height || 1;
        const centerY = rect.top + rect.height / 2;
        const ndcY = -(centerY / winH) * 2 + 1;
        const dist = 6.6;
        const vHeight = 2 * Math.tan(THREE.MathUtils.degToRad(45 / 2)) * dist;
        const targetWorldY = ndcY * (vHeight / 2);
        // Position relative to scrollOffset3D so total Y equals targetWorldY exactly
        heroTargetY = targetWorldY - scrollOffset3D;
      } else {
        // Fallback below text content
        heroTargetY = -1.85;
      }
    }

    // Responsive initial scale and position for exploration phase:
    // Fits comfortably within narrow phone viewports with zero clipping
    const initialScale = isMobile
      ? Math.max(0.4, Math.min(0.48, (state.size.width / 400) * 0.46))
      : 0.95;
    const startY = isMobile ? -0.32 : -0.1;

    const currentX = THREE.MathUtils.lerp(0.0, heroTargetX, t);
    const currentY = THREE.MathUtils.lerp(startY, heroTargetY, t);
    const currentZ = THREE.MathUtils.lerp(0.0, -0.1, t);
    const currentScale = THREE.MathUtils.lerp(initialScale, heroTargetScale, t);

    if (containerGroup.current) {
      containerGroup.current.position.x = currentX + mouse.current.x * 0.35;
      containerGroup.current.position.y = currentY + mouse.current.y * 0.2 + scrollOffset3D;
      containerGroup.current.position.z = currentZ;

      containerGroup.current.scale.set(currentScale, currentScale, currentScale);

      // Subtle parallax tilt
      containerGroup.current.rotation.x = mouse.current.y * 0.35;
      containerGroup.current.rotation.z = -mouse.current.x * 0.18;
    }

    // Camera targets based on active component & device responsiveness
    let targetCamX = 0;
    let targetCamY = 0;
    const baseCamZ = isMobile ? 5.8 : 5.2;
    let targetCamZ = THREE.MathUtils.lerp(baseCamZ, isMobile ? 6.5 : 6.2, t);
    let targetLookAtY = 0;

    if (introPhase === 'COMPONENT_01') {
      targetCamX = 0.0;
      targetCamY = isMobile ? 0.35 : 0.45;
      targetCamZ = isMobile ? 5.8 : 4.85;
      targetLookAtY = isMobile ? 0.45 : 0.65;
    } else if (introPhase === 'COMPONENT_02') {
      targetCamX = isMobile ? 0.0 : -0.15;
      targetCamY = isMobile ? 0.18 : 0.25;
      targetCamZ = isMobile ? 5.8 : 4.8;
      targetLookAtY = isMobile ? 0.25 : 0.35;
    } else if (introPhase === 'COMPONENT_03') {
      targetCamX = isMobile ? 0.0 : 0.2;
      targetCamY = isMobile ? -0.05 : -0.05;
      targetCamZ = isMobile ? 5.8 : 4.8;
      targetLookAtY = isMobile ? -0.08 : -0.1;
    } else if (introPhase === 'COMPONENT_04') {
      targetCamX = isMobile ? 0.0 : -0.15;
      targetCamY = isMobile ? -0.28 : -0.35;
      targetCamZ = isMobile ? 5.8 : 4.65;
      targetLookAtY = isMobile ? -0.42 : -0.55;
    } else if (introPhase === 'ENTER_HOME' || introPhase === 'HOME') {
      targetCamX = 0;
      targetCamY = 0;
      targetCamZ = isMobile ? 6.5 : 6.2;
      targetLookAtY = 0;
    } else {
      // COMPLETE_COMPUTER, WAIT_ENTER, COMPUTER_REVEAL
      targetCamX = 0;
      targetCamY = 0;
      targetCamZ = baseCamZ;
      targetLookAtY = 0;
    }

    // Smooth camera interpolation
    const camLerpFactor = 0.06;
    state.camera.position.x += (targetCamX - state.camera.position.x) * camLerpFactor;
    state.camera.position.y += (targetCamY - state.camera.position.y) * camLerpFactor;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * camLerpFactor;

    cameraTargetRef.current.y += (targetLookAtY - cameraTargetRef.current.y) * camLerpFactor;
    state.camera.lookAt(cameraTargetRef.current.x, cameraTargetRef.current.y, cameraTargetRef.current.z);
  });

  // Lighting parameters based on theme
  const ambientIntensity = isDarkTheme ? 0.9 : 1.3;
  const keyLightIntensity = isDarkTheme ? 3.6 : 4.2;
  const rimLightIntensity = isDarkTheme ? 2.5 : 1.8;
  const rubyGlowIntensity = activationProgress * (isDarkTheme ? 4.2 : 3.0);

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
        intensity={keyLightIntensity * 0.42}
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
          activeComponent={activeComponent}
          activationProgress={activationProgress}
          isDarkTheme={isDarkTheme}
        />
      </group>
    </>
  );
};

export const PersistentQuantumScene: React.FC<PersistentQuantumSceneProps> = ({
  introPhase,
  activationProgress,
  transitionProgress,
  sceneOpacity,
  isDarkTheme = true,
}) => {
  // Determine if the 3D scene should be visible:
  // INTRO and WAIT_EXPLORE keep canvas invisible (black screen)
  // COMPUTER_REVEAL onwards reveals the 3D quantum computer
  const isSceneActive =
    introPhase === 'COMPUTER_REVEAL' ||
    introPhase === 'COMPONENT_01' ||
    introPhase === 'COMPONENT_02' ||
    introPhase === 'COMPONENT_03' ||
    introPhase === 'COMPONENT_04' ||
    introPhase === 'COMPLETE_COMPUTER' ||
    introPhase === 'WAIT_ENTER' ||
    introPhase === 'ENTER_HOME' ||
    introPhase === 'HOME';

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
          activationProgress={activationProgress}
          transitionProgress={transitionProgress}
          isDarkTheme={isDarkTheme}
        />
      </Canvas>
    </div>
  );
};
