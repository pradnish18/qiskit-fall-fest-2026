import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuantumCoreProps {
  activationProgress: number; // 0 to 1
  isDarkTheme?: boolean;
}

export const QuantumCore: React.FC<QuantumCoreProps> = ({ activationProgress, isDarkTheme = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.08 * activationProgress;
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.rotation.y = time * 0.5;
    }

    if (glowRef.current) {
      const glowPulse = 1 + Math.sin(time * 2.5 + 1) * 0.15 * activationProgress;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
      glowRef.current.rotation.z = -time * 0.3;
    }

    if (lightRef.current) {
      const baseIntensity = activationProgress * (isDarkTheme ? 4.5 : 3.0);
      lightRef.current.intensity = baseIntensity + Math.sin(time * 4) * 0.8 * activationProgress;
    }
  });

  const coreOpacity = Math.min(1, Math.max(0.1, activationProgress));

  return (
    <group position={[0, -1.35, 0]}>
      {/* Central Quantum Node (Ruby / Deep Burgundy Crystal) */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.22, 2]} />
        <meshPhysicalMaterial
          color="#8A1B27"
          emissive="#6C151E"
          emissiveIntensity={activationProgress * 2.5}
          roughness={0.15}
          metalness={0.4}
          transmission={0.65}
          thickness={0.8}
          transparent
          opacity={coreOpacity}
        />
      </mesh>

      {/* Outer Coherence Aura / Volumetric Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial
          color="#6C151E"
          transparent
          opacity={activationProgress * 0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point Light emitted from core */}
      <pointLight
        ref={lightRef}
        color="#8A1B27"
        intensity={activationProgress * 3.5}
        distance={4.5}
        decay={2}
      />
    </group>
  );
};
