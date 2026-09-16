import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  isDarkTheme?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 140,
  isDarkTheme = true,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, initialData } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const init = [];

    // Color palette: deep burgundy (#6C151E), dark silver (#A7A8AD), subtle warm white (#F5F3F0)
    const burgundy = new THREE.Color('#8A1B27');
    const silver = new THREE.Color('#A7A8AD');
    const warmWhite = new THREE.Color('#F5F3F0');

    for (let i = 0; i < count; i++) {
      // Cylinder / spherical distribution around the quantum computer
      const radius = 1.2 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.45) * 6.5;

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color selection
      const rand = Math.random();
      let chosenColor: THREE.Color;
      if (rand < 0.45) {
        chosenColor = burgundy;
      } else if (rand < 0.8) {
        chosenColor = silver;
      } else {
        chosenColor = warmWhite;
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      init.push({
        origX: x,
        origY: y,
        origZ: z,
        speedX: (Math.random() - 0.5) * 0.008,
        speedY: (Math.random() * 0.01 + 0.004),
        speedZ: (Math.random() - 0.5) * 0.008,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return { positions: pos, colors: col, initialData: init };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const data = initialData[i];
      // Subtle upward buoyant quantum fluctuation
      let y = array[i * 3 + 1] + data.speedY * 0.5;
      if (y > 3.5) y = -3.2; // wrap around
      
      const x = data.origX + Math.sin(time * 0.4 + data.phase) * 0.15;
      const z = data.origZ + Math.cos(time * 0.35 + data.phase) * 0.15;

      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={isDarkTheme ? 0.75 : 0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
