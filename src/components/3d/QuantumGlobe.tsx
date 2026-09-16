import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuantumGlobeProps {
  size?: 'sm' | 'md' | 'lg';
  isDarkTheme?: boolean;
}

const GlobeMesh: React.FC<{ isDarkTheme: boolean }> = ({ isDarkTheme }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  // Generate sphere dot grid representing global quantum network
  const { positions, nodeColors, networkLines } = useMemo(() => {
    const coords: number[] = [];
    const colors: number[] = [];
    const silver = new THREE.Color(isDarkTheme ? '#D9D9DC' : '#5E6068');
    const ruby = new THREE.Color('#8A1B27');

    const latSteps = 24;
    const lonSteps = 48;
    const radius = 1.45;

    const points: THREE.Vector3[] = [];

    for (let lat = -90; lat <= 90; lat += 180 / latSteps) {
      const phi = (90 - lat) * (Math.PI / 180);
      for (let lon = -180; lon < 180; lon += 360 / lonSteps) {
        const theta = (lon + 180) * (Math.PI / 180);

        // Density weighting: highlight continental regions (approximate dot clusters)
        const isCluster =
          (lat > 10 && lat < 55 && lon > -125 && lon < -65) || // North America
          (lat > 35 && lat < 65 && lon > -10 && lon < 35) || // Europe
          (lat > 5 && lat < 38 && lon > 65 && lon < 95) || // India / South Asia
          (lat > 15 && lat < 45 && lon > 100 && lon < 145); // East Asia

        if (Math.random() > (isCluster ? 0.2 : 0.65)) {
          const x = -(radius * Math.sin(phi) * Math.cos(theta));
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const y = radius * Math.cos(phi);

          coords.push(x, y, z);
          points.push(new THREE.Vector3(x, y, z));

          // 20% of nodes are active burgundy quantum nodes
          const isNode = isCluster && Math.random() < 0.22;
          const chosen = isNode ? ruby : silver;
          colors.push(chosen.r, chosen.g, chosen.b);
        }
      }
    }

    // Interconnecting quantum geodesic arcs between nodes
    const lineCoords: number[] = [];
    for (let i = 0; i < Math.min(points.length, 60); i += 4) {
      const p1 = points[i];
      const p2 = points[(i + 13) % points.length];
      if (p1 && p2 && p1.distanceTo(p2) < 2.2) {
        lineCoords.push(p1.x, p1.y, p1.z);
        // Elevated arc midpoint
        const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.08);
        lineCoords.push(mid.x, mid.y, mid.z);
        lineCoords.push(mid.x, mid.y, mid.z);
        lineCoords.push(p2.x, p2.y, p2.z);
      }
    }

    return {
      positions: new Float32Array(coords),
      nodeColors: new Float32Array(colors),
      networkLines: new Float32Array(lineCoords),
    };
  }, [isDarkTheme]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = 0.2;
    }
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = -t * 0.18;
      ringGroupRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Dark Metallic Sphere */}
      <mesh>
        <sphereGeometry args={[1.38, 32, 32]} />
        <meshStandardMaterial
          color={isDarkTheme ? '#101114' : '#E8E8EC'}
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Global Node Dot Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.9}
        />
      </points>

      {/* Geodesic Transmission Lines */}
      {networkLines.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[networkLines, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#8A1B27"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {/* Orbital Quantum Rings around Globe */}
      <group ref={ringGroupRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.68, 0.005, 16, 96]} />
          <meshBasicMaterial
            color="#D9D9DC"
            transparent
            opacity={0.4}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.88, 0.006, 16, 96]} />
          <meshBasicMaterial
            color="#8A1B27"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};

export const QuantumGlobe: React.FC<QuantumGlobeProps> = ({
  size = 'md',
  isDarkTheme = false,
}) => {
  const heightClass =
    size === 'lg' ? 'h-[440px] md:h-[540px]' : size === 'sm' ? 'h-[280px]' : 'h-[360px] md:h-[440px]';

  return (
    <div className={`w-full ${heightClass} relative flex items-center justify-center`}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 4]} intensity={2.5} color="#F1F1F2" />
        <directionalLight position={[-3, -2, -3]} intensity={1.2} color="#8A1B27" />
        <GlobeMesh isDarkTheme={isDarkTheme} />
      </Canvas>
    </div>
  );
};
