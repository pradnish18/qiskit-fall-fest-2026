import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumCore } from './QuantumCore';

interface InteractiveQuantumComputerProps {
  isDarkTheme?: boolean;
}

// Procedural 3D Quantum Chandelier matching the IBM Quantum Dilution Refrigerator
const ChandelierModel: React.FC<{ isDarkTheme: boolean; isDragging: boolean }> = ({
  isDarkTheme,
  isDragging,
}) => {
  const modelRef = useRef<THREE.Group>(null);

  // Materials definition with precision metallic and cryogenic finishes
  const materials = useMemo(() => {
    const goldPlates = new THREE.MeshStandardMaterial({
      color: '#E5B842', // 24K cryogenic gold stage plates
      metalness: 0.94,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const platinumChrome = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? '#E0E0E4' : '#F5F5F7',
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 1.8,
    });

    const copperCoils = new THREE.MeshStandardMaterial({
      color: '#C86D3B', // Thermal copper interconnects
      metalness: 0.9,
      roughness: 0.25,
    });

    const coaxialCables = new THREE.MeshStandardMaterial({
      color: '#D4AF37', // Gold-plated microwave RF coaxial lines
      metalness: 0.92,
      roughness: 0.22,
    });

    const darkShield = new THREE.MeshStandardMaterial({
      color: '#16171A',
      metalness: 0.7,
      roughness: 0.3,
    });

    return { goldPlates, platinumChrome, copperCoils, coaxialCables, darkShield };
  }, [isDarkTheme]);

  // Procedural coaxial cable curve paths between cryogenic stages
  const cableCurves = useMemo(() => {
    const curves = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rTop = 0.92;
      const rMid = 0.78;
      const rBot = 0.58;

      const p0 = new THREE.Vector3(Math.cos(angle) * rTop, 1.3, Math.sin(angle) * rTop);
      const p1 = new THREE.Vector3(
        Math.cos(angle + 0.3) * (rTop + 0.08),
        0.7,
        Math.sin(angle + 0.3) * (rTop + 0.08)
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle - 0.2) * (rMid + 0.06),
        0.0,
        Math.sin(angle - 0.2) * (rMid + 0.06)
      );
      const p3 = new THREE.Vector3(
        Math.cos(angle + 0.15) * (rBot + 0.05),
        -0.7,
        Math.sin(angle + 0.15) * (rBot + 0.05)
      );
      const p4 = new THREE.Vector3(Math.cos(angle) * rBot, -1.35, Math.sin(angle) * rBot);

      curves.push(new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]));
    }
    return curves;
  }, []);

  // Idle rotation when not being actively dragged by user
  useFrame((_, delta) => {
    if (modelRef.current && !isDragging) {
      modelRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0.2, 0]} scale={[1.18, 1.18, 1.18]}>
      {/* 1. TOP CEILING FLANGE (Mounting Plate) */}
      <mesh position={[0, 1.55, 0]} material={materials.platinumChrome}>
        <cylinderGeometry args={[1.35, 1.35, 0.09, 48]} />
      </mesh>
      <mesh position={[0, 1.62, 0]} material={materials.darkShield}>
        <cylinderGeometry args={[1.15, 1.15, 0.06, 36]} />
      </mesh>
      <mesh position={[0, 1.72, 0]} material={materials.platinumChrome}>
        <cylinderGeometry args={[0.55, 0.55, 0.15, 32]} />
      </mesh>

      {/* 2. CRYOGENIC STAGE DISKS (Gold Plated) */}
      {/* 50K Stage */}
      <mesh position={[0, 1.25, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[1.2, 1.2, 0.065, 48]} />
      </mesh>
      {/* 4K Stage */}
      <mesh position={[0, 0.65, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[1.08, 1.08, 0.065, 48]} />
      </mesh>
      {/* Still Stage (0.8K) */}
      <mesh position={[0, 0.05, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[0.94, 0.94, 0.06, 48]} />
      </mesh>
      {/* Cold Plate (100 mK) */}
      <mesh position={[0, -0.55, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[0.8, 0.8, 0.055, 48]} />
      </mesh>
      {/* Mixing Chamber Plate (15 mK) */}
      <mesh position={[0, -1.15, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[0.68, 0.68, 0.055, 48]} />
      </mesh>

      {/* 3. STRUCTURAL PLATINUM SUPPORT RODS (Triangular & Hexagonal Arrays) */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx / 6) * Math.PI * 2;
        const rad = 0.95;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        return (
          <mesh
            key={`rod-upper-${idx}`}
            position={[x, 0.95, z]}
            material={materials.platinumChrome}
          >
            <cylinderGeometry args={[0.024, 0.024, 0.6, 16]} />
          </mesh>
        );
      })}

      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx / 6) * Math.PI * 2 + Math.PI / 6;
        const rad = 0.78;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        return (
          <mesh
            key={`rod-mid-${idx}`}
            position={[x, 0.35, z]}
            material={materials.platinumChrome}
          >
            <cylinderGeometry args={[0.022, 0.022, 0.58, 16]} />
          </mesh>
        );
      })}

      {[0, 1, 2, 3].map((idx) => {
        const angle = (idx / 4) * Math.PI * 2;
        const rad = 0.58;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        return (
          <mesh
            key={`rod-lower-${idx}`}
            position={[x, -0.25, z]}
            material={materials.platinumChrome}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.58, 16]} />
          </mesh>
        );
      })}

      {[0, 1, 2, 3].map((idx) => {
        const angle = (idx / 4) * Math.PI * 2 + Math.PI / 4;
        const rad = 0.45;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        return (
          <mesh
            key={`rod-deep-${idx}`}
            position={[x, -0.85, z]}
            material={materials.platinumChrome}
          >
            <cylinderGeometry args={[0.018, 0.018, 0.58, 16]} />
          </mesh>
        );
      })}

      {/* 4. CENTRAL HELIUM DILUTION CHAMBER UNITS */}
      <mesh position={[0, 0.95, 0]} material={materials.copperCoils}>
        <cylinderGeometry args={[0.26, 0.26, 0.55, 32]} />
      </mesh>
      <mesh position={[0, 0.35, 0]} material={materials.platinumChrome}>
        <cylinderGeometry args={[0.22, 0.22, 0.54, 32]} />
      </mesh>
      <mesh position={[0, -0.25, 0]} material={materials.copperCoils}>
        <cylinderGeometry args={[0.18, 0.18, 0.54, 32]} />
      </mesh>
      <mesh position={[0, -0.85, 0]} material={materials.platinumChrome}>
        <cylinderGeometry args={[0.14, 0.14, 0.54, 32]} />
      </mesh>

      {/* 5. COAXIAL RF CABLES (Gold Coaxial Lines with realistic draping) */}
      {cableCurves.map((curve, idx) => (
        <mesh key={`cable-${idx}`} material={materials.coaxialCables}>
          <tubeGeometry args={[curve, 48, 0.013, 8, false]} />
        </mesh>
      ))}

      {/* 6. COPPER HEAT EXCHANGER SPIRALS */}
      {[1.1, 0.5, -0.1, -0.7].map((yPos, i) => (
        <mesh
          key={`copper-ring-${i}`}
          position={[0, yPos, 0]}
          material={materials.copperCoils}
        >
          <torusGeometry args={[0.34 - i * 0.05, 0.022, 16, 48]} />
        </mesh>
      ))}

      {/* 7. QUANTUM PROCESSOR SHIELD (Canister at Bottom) */}
      <mesh position={[0, -1.45, 0]} material={materials.goldPlates}>
        <cylinderGeometry args={[0.42, 0.42, 0.55, 36]} />
      </mesh>
      <mesh position={[0, -1.75, 0]} material={materials.darkShield}>
        <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
      </mesh>

      {/* 8. ACTIVE QUANTUM CORE (Pulsing Ruby Qubit Stage) */}
      <group position={[0, -1.45, 0]} scale={[0.55, 0.55, 0.55]}>
        <QuantumCore
          activationProgress={1}
          isDarkTheme={isDarkTheme}
        />
      </group>
    </group>
  );
};

// Interactive Canvas Container with Mouse/Touch Orbit Controls
export const InteractiveQuantumComputer: React.FC<InteractiveQuantumComputerProps> = ({
  isDarkTheme = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef({ x: 0.15, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - startPos.current.x) * 0.008;
    const deltaY = (e.clientY - startPos.current.y) * 0.008;
    rotationRef.current.y += deltaX;
    rotationRef.current.x = Math.max(-0.4, Math.min(0.5, rotationRef.current.x + deltaY));
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - startPos.current.x) * 0.008;
    const deltaY = (e.touches[0].clientY - startPos.current.y) * 0.008;
    rotationRef.current.y += deltaX;
    rotationRef.current.x = Math.max(-0.4, Math.min(0.5, rotationRef.current.x + deltaY));
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[540px] xl:h-[580px] select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ touchAction: 'none' }}
      title="Click and drag to rotate the 3D IBM Quantum Computer"
    >
      <Canvas
        camera={{ position: [0, 0.1, 4.4], fov: 42, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={isDarkTheme ? 1.0 : 1.6} color="#FAF8F5" />

        {/* Key Light from upper right */}
        <directionalLight
          position={[5, 7, 5]}
          intensity={isDarkTheme ? 3.8 : 4.2}
          color="#FFF8EE"
        />

        {/* Fill Light from front left */}
        <directionalLight
          position={[-5, 3, 3]}
          intensity={isDarkTheme ? 1.4 : 1.8}
          color="#E8E8EE"
        />

        {/* Rim Light for edge definition on gold cables */}
        <directionalLight
          position={[0, 4, -4]}
          intensity={isDarkTheme ? 2.4 : 2.0}
          color="#F2F2F6"
        />

        {/* Under-glow Ruby Point Light */}
        <pointLight
          position={[0, -2, 1]}
          intensity={isDarkTheme ? 3.5 : 2.5}
          color="#8A1B27"
          distance={5}
          decay={2}
        />

        {/* Root Rotating Group controlled by Drag & Frame */}
        <group
          rotation={[rotationRef.current.x, rotationRef.current.y, 0]}
        >
          <ChandelierModel isDarkTheme={isDarkTheme} isDragging={isDragging} />
        </group>
      </Canvas>
    </div>
  );
};
