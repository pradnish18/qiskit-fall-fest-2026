import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitalSystemProps {
  activationProgress: number; // 0 to 1
  isDarkTheme?: boolean;
}

interface OrbitRingConfig {
  radius: number;
  tubeRadius: number;
  rotation: [number, number, number];
  speed: number;
  axis: 'x' | 'y' | 'z';
  color: string;
  opacity: number;
}

export const OrbitalSystem: React.FC<OrbitalSystemProps> = ({
  activationProgress,
  isDarkTheme = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);

  // Configuration for 4 major orbital rings
  const rings: OrbitRingConfig[] = useMemo(
    () => [
      {
        radius: 1.95,
        tubeRadius: 0.007,
        rotation: [Math.PI / 3.5, Math.PI / 6, 0],
        speed: 0.22,
        axis: 'y',
        color: '#D9D9DC',
        opacity: 0.45,
      },
      {
        radius: 2.35,
        tubeRadius: 0.006,
        rotation: [-Math.PI / 4, 0, Math.PI / 5],
        speed: -0.16,
        axis: 'z',
        color: '#8A1B27',
        opacity: 0.55,
      },
      {
        radius: 2.75,
        tubeRadius: 0.005,
        rotation: [Math.PI / 2.3, -Math.PI / 5, 0],
        speed: 0.12,
        axis: 'x',
        color: '#F1F1F2',
        opacity: 0.35,
      },
      {
        radius: 1.6,
        tubeRadius: 0.008,
        rotation: [0.2, Math.PI / 2.8, -0.3],
        speed: -0.28,
        axis: 'y',
        color: '#6C151E',
        opacity: 0.5,
      },
    ],
    []
  );

  // Discrete orbital particle positions
  const particleCount = 45;
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const ringIndex = i % rings.length;
      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
      const speed = (0.2 + Math.random() * 0.35) * (i % 2 === 0 ? 1 : -1);
      const scale = 0.02 + Math.random() * 0.035;
      const isBurgundy = Math.random() > 0.45;
      data.push({
        ringIndex,
        angle,
        speed,
        scale,
        isBurgundy,
        offsetY: (Math.random() - 0.5) * 0.15,
      });
    }
    return data;
  }, [rings]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Frame animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const effectiveProgress = Math.max(0.05, activationProgress);

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 * effectiveProgress;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * rings[0].speed * effectiveProgress;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * rings[1].speed * effectiveProgress;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * rings[2].speed * effectiveProgress;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z = time * rings[3].speed * effectiveProgress;
    }

    // Animate instanced particles along orbits
    if (particlesRef.current) {
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        const ring = rings[p.ringIndex];
        const currentAngle = p.angle + time * p.speed * effectiveProgress;
        
        // Calculate orbital position based on ring radius and inclination
        const x = Math.cos(currentAngle) * ring.radius;
        const z = Math.sin(currentAngle) * ring.radius;
        const y = p.offsetY + Math.sin(currentAngle * 2) * 0.05;

        // Apply ring tilt rotation to coordinate
        const v = new THREE.Vector3(x, y, z);
        const euler = new THREE.Euler(ring.rotation[0], ring.rotation[1], ring.rotation[2]);
        v.applyEuler(euler);

        dummy.position.copy(v);
        const dynamicScale = p.scale * effectiveProgress * (1 + Math.sin(time * 4 + i) * 0.2);
        dummy.scale.set(dynamicScale, dynamicScale, dynamicScale);
        dummy.updateMatrix();

        particlesRef.current.setMatrixAt(i, dummy.matrix);

        // Color setting
        if (p.isBurgundy) {
          tempColor.set('#8A1B27');
        } else {
          tempColor.set(isDarkTheme ? '#D9D9DC' : '#45474E');
        }
        particlesRef.current.setColorAt(i, tempColor);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
      if (particlesRef.current.instanceColor) {
        particlesRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={rings[0].rotation}>
        <torusGeometry args={[rings[0].radius, rings[0].tubeRadius, 16, 120]} />
        <meshBasicMaterial
          color={rings[0].color}
          transparent
          opacity={rings[0].opacity * activationProgress}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={rings[1].rotation}>
        <torusGeometry args={[rings[1].radius, rings[1].tubeRadius, 16, 120]} />
        <meshBasicMaterial
          color={rings[1].color}
          transparent
          opacity={rings[1].opacity * activationProgress}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={rings[2].rotation}>
        <torusGeometry args={[rings[2].radius, rings[2].tubeRadius, 16, 120]} />
        <meshBasicMaterial
          color={rings[2].color}
          transparent
          opacity={rings[2].opacity * activationProgress}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 4 */}
      <mesh ref={ring4Ref} rotation={rings[3].rotation}>
        <torusGeometry args={[rings[3].radius, rings[3].tubeRadius, 16, 120]} />
        <meshBasicMaterial
          color={rings[3].color}
          transparent
          opacity={rings[3].opacity * activationProgress}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbiting Quantum Particles */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, particleCount]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          transparent
          opacity={0.85 * Math.max(0.2, activationProgress)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
};
