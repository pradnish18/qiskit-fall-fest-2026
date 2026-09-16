import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumCore } from './QuantumCore';

interface QuantumComputerProps {
  assemblyProgress: number; // 0 to 1
  activationProgress: number; // 0 to 1
  isDarkTheme?: boolean;
}

// Smooth overshoot and magnetic settle function following:
// ENTER → DECELERATE → ALIGN → SLIGHT OVERSHOOT → MICRO-SETTLE → LOCK
function computePrecisionEntry(
  progress: number,
  startWindow: number,
  endWindow: number,
  startX: number,
  startY: number,
  startZ: number
): [number, number, number] {
  if (progress <= startWindow) return [startX, startY, startZ];
  if (progress >= endWindow) return [0, 0, 0];

  const u = (progress - startWindow) / (endWindow - startWindow);
  // Precision deceleration (cubic ease-out)
  const easeOut = 1 - Math.pow(1 - u, 3);
  // Precision micro-settle: subtle overshoot of ~3-4% decaying exponentially into rock-solid lock
  const settle = Math.sin(u * Math.PI * 2.2) * Math.exp(-u * 4.8) * 0.04;
  const factor = Math.min(1.05, Math.max(0, easeOut + settle));
  const remaining = 1 - factor;
  return [startX * remaining, startY * remaining, startZ * remaining];
}

export const QuantumComputer: React.FC<QuantumComputerProps> = ({
  assemblyProgress = 1,
  activationProgress = 1,
  isDarkTheme = true,
}) => {
  const mainGroup = useRef<THREE.Group>(null);
  // 10 Independent Component Refs matching State 5A & 5B
  const upperCryoRef = useRef<THREE.Group>(null);       // 1. Upper circular cryogenic/cooling structure
  const upperCapRef = useRef<THREE.Group>(null);        // 2. Upper platinum cap & flange
  const ringsRef = useRef<THREE.Group>(null);           // 3. Multiple metallic circular rings
  const centralChamberRef = useRef<THREE.Group>(null);  // 4. Central glass/quantum chamber
  const rodsRef = useRef<THREE.Group>(null);            // 5. Vertical precision rods
  const cablesRef = useRef<THREE.Group>(null);          // 6. Internal copper/platinum wiring
  const leftSupportRef = useRef<THREE.Group>(null);     // 7. Left structural support
  const rightSupportRef = useRef<THREE.Group>(null);    // 8. Right structural support
  const lowerBaseRef = useRef<THREE.Group>(null);       // 9. Lower graphite base
  const coreRef = useRef<THREE.Group>(null);            // 10. Central quantum core

  // Materials definition matching the required specifications
  const materials = useMemo(() => {
    const platinum = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? '#D9D9DC' : '#E8E8EC',
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });

    const polishedChrome = new THREE.MeshStandardMaterial({
      color: '#F1F1F2',
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 1.5,
    });

    const graphite = new THREE.MeshStandardMaterial({
      color: '#1F2026',
      metalness: 0.85,
      roughness: 0.35,
    });

    const goldCoax = new THREE.MeshStandardMaterial({
      color: '#D4AF37', // Precision 24K gold stage plate / copper coaxial
      metalness: 0.95,
      roughness: 0.22,
    });

    const copperWire = new THREE.MeshStandardMaterial({
      color: '#B87333',
      metalness: 0.9,
      roughness: 0.28,
    });

    const darkCeramic = new THREE.MeshStandardMaterial({
      color: '#121316',
      metalness: 0.4,
      roughness: 0.2,
    });

    const glassShroud = new THREE.MeshPhysicalMaterial({
      color: '#F5F3F0',
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const rubyGlow = new THREE.MeshStandardMaterial({
      color: '#8A1B27',
      emissive: '#6C151E',
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    return {
      platinum,
      polishedChrome,
      graphite,
      goldCoax,
      copperWire,
      darkCeramic,
      glassShroud,
      rubyGlow,
    };
  }, [isDarkTheme]);

  // Procedural coaxial cable curves (looping RF wiring between stages)
  const cableCurves = useMemo(() => {
    const curves = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rTop = 0.82;
      const rMid = 0.92;
      const rBot = 0.58;

      const p0 = new THREE.Vector3(Math.cos(angle) * rTop, 0.4, Math.sin(angle) * rTop);
      const p1 = new THREE.Vector3(
        Math.cos(angle + 0.2) * rMid,
        -0.2,
        Math.sin(angle + 0.2) * rMid
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle - 0.15) * (rMid - 0.1),
        -0.7,
        Math.sin(angle - 0.15) * (rMid - 0.1)
      );
      const p3 = new THREE.Vector3(Math.cos(angle) * rBot, -1.2, Math.sin(angle) * rBot);

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);
      curves.push(curve);
    }
    return curves;
  }, []);

  // Frame animations: subtle rotation and magnetic assembly interpolation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle continuous idling rotation
    if (mainGroup.current) {
      mainGroup.current.rotation.y = t * 0.12;
    }

    // 1. UPPER CRYOGENIC STRUCTURE: enters from TOP [0, 6.0, 0]
    const p1 = computePrecisionEntry(assemblyProgress, 0.0, 0.38, 0, 6.0, 0);
    if (upperCryoRef.current) {
      upperCryoRef.current.position.set(p1[0], p1[1], p1[2]);
    }

    // 2. UPPER PLATINUM CAP: enters from TOP-RIGHT [4.5, 4.5, 0]
    const p2 = computePrecisionEntry(assemblyProgress, 0.08, 0.46, 4.5, 4.5, 0);
    if (upperCapRef.current) {
      upperCapRef.current.position.set(p2[0], p2[1], p2[2]);
    }

    // 3. METALLIC CIRCULAR RINGS: enters from TOP-LEFT [-4.0, 3.0, -2.0]
    const p3 = computePrecisionEntry(assemblyProgress, 0.18, 0.54, -4.0, 3.0, -2.0);
    if (ringsRef.current) {
      ringsRef.current.position.set(p3[0], 0.05 + p3[1], p3[2]);
      ringsRef.current.rotation.y = -t * 0.2;
    }

    // 4. CENTRAL QUANTUM CHAMBER: enters from BACK/Z DEPTH [0, 0, -5.5]
    const p4 = computePrecisionEntry(assemblyProgress, 0.28, 0.65, 0, 0, -5.5);
    if (centralChamberRef.current) {
      centralChamberRef.current.position.set(p4[0], p4[1], p4[2]);
    }

    // 5. VERTICAL PRECISION RODS: enter from staggered vertical depths [0, 4.0, 2.0]
    const p5 = computePrecisionEntry(assemblyProgress, 0.38, 0.72, 0, 4.0, 2.0);
    if (rodsRef.current) {
      rodsRef.current.position.set(p5[0], p5[1], p5[2]);
      const rodScale = Math.min(1, Math.max(0.01, (assemblyProgress - 0.35) / 0.35));
      rodsRef.current.scale.set(1, rodScale, 1);
    }

    // 6. INTERNAL WIRING: coils into place from depth [0, -1.0, -3.0]
    const p6 = computePrecisionEntry(assemblyProgress, 0.48, 0.80, 0, -1.0, -3.0);
    if (cablesRef.current) {
      cablesRef.current.position.set(p6[0], p6[1], p6[2]);
      const cableScale = Math.min(1, Math.max(0.01, (assemblyProgress - 0.45) / 0.35));
      cablesRef.current.scale.set(1, cableScale, 1);
    }

    // 7. LEFT STRUCTURAL SUPPORT: enters from LEFT [-5.5, 0, 0]
    const p7 = computePrecisionEntry(assemblyProgress, 0.16, 0.52, -5.5, 0, 0);
    if (leftSupportRef.current) {
      leftSupportRef.current.position.set(p7[0], p7[1], p7[2]);
    }

    // 8. RIGHT STRUCTURAL SUPPORT: enters from RIGHT [5.5, 0, 0]
    const p8 = computePrecisionEntry(assemblyProgress, 0.22, 0.58, 5.5, 0, 0);
    if (rightSupportRef.current) {
      rightSupportRef.current.position.set(p8[0], p8[1], p8[2]);
    }

    // 9. LOWER GRAPHITE BASE: enters from BOTTOM [0, -5.5, 0]
    const p9 = computePrecisionEntry(assemblyProgress, 0.58, 0.88, 0, -5.5, 0);
    if (lowerBaseRef.current) {
      lowerBaseRef.current.position.set(p9[0], -1.45 + p9[1], p9[2]);
    }

    // 10. CENTRAL QUANTUM CORE: appears at heart from [0, 0, 2.5]
    const p10 = computePrecisionEntry(assemblyProgress, 0.72, 1.0, 0, 0, 2.5);
    if (coreRef.current) {
      coreRef.current.position.set(p10[0], p10[1], p10[2]);
      const coreScale = Math.min(1, Math.max(0.001, (assemblyProgress - 0.7) / 0.28));
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }
  });

  return (
    <group ref={mainGroup} position={[0, 0.65, 0]}>
      {/* 1. UPPER CIRCULAR CRYOGENIC/COOLING STRUCTURE */}
      <group ref={upperCryoRef}>
        {/* Tiered platinum collar */}
        <mesh position={[0, 1.6, 0]} material={materials.polishedChrome}>
          <cylinderGeometry args={[1.35, 1.45, 0.16, 48]} />
        </mesh>
        <mesh position={[0, 1.46, 0]} material={materials.platinum}>
          <cylinderGeometry args={[1.2, 1.3, 0.14, 48]} />
        </mesh>
        {/* Top Gold 50K Thermal Stage Plate */}
        <mesh position={[0, 1.32, 0]} material={materials.goldCoax}>
          <cylinderGeometry args={[1.15, 1.15, 0.08, 48]} />
        </mesh>
      </group>

      {/* 2. UPPER PLATINUM CAP & MOUNTING FLANGE */}
      <group ref={upperCapRef}>
        {/* Top ceiling vacuum flange */}
        <mesh position={[0, 1.75, 0]} material={materials.graphite}>
          <cylinderGeometry args={[1.5, 1.5, 0.18, 48]} />
        </mesh>
        {/* Perimeter bolt ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={`bolt-top-${i}`}
              position={[Math.cos(angle) * 1.35, 1.62, Math.sin(angle) * 1.35]}
              material={materials.polishedChrome}
            >
              <cylinderGeometry args={[0.022, 0.022, 0.12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* 3. MULTIPLE METALLIC CIRCULAR RINGS */}
      <group ref={ringsRef} position={[0, 0.05, 0]}>
        <mesh material={materials.polishedChrome}>
          <torusGeometry args={[0.96, 0.018, 16, 64]} />
        </mesh>
        <mesh position={[0, -0.7, 0]} material={materials.platinum}>
          <torusGeometry args={[0.62, 0.015, 16, 48]} />
        </mesh>
      </group>

      {/* 4. CENTRAL GLASS/QUANTUM CHAMBER & THERMAL STAGES */}
      <group ref={centralChamberRef}>
        {/* 4K Stage Plate (Gold Disk with precision cutouts) */}
        <mesh position={[0, 0.45, 0]} material={materials.goldCoax}>
          <cylinderGeometry args={[1.02, 1.02, 0.07, 48]} />
        </mesh>
        {/* Concentric platinum ring mount */}
        <mesh position={[0, 0.46, 0]} material={materials.platinum}>
          <torusGeometry args={[0.82, 0.03, 16, 48]} />
        </mesh>
        {/* Still Stage Plate (0.8K) */}
        <mesh position={[0, -0.32, 0]} material={materials.goldCoax}>
          <cylinderGeometry args={[0.85, 0.85, 0.065, 48]} />
        </mesh>
        {/* Cold Plate (100mK) */}
        <mesh position={[0, -1.02, 0]} material={materials.goldCoax}>
          <cylinderGeometry args={[0.68, 0.68, 0.06, 48]} />
        </mesh>
        {/* Central Vertical Waveguide Column (Graphite & Platinum) */}
        <mesh position={[0, 0.15, 0]} material={materials.graphite}>
          <cylinderGeometry args={[0.22, 0.22, 2.2, 32]} />
        </mesh>
        {/* Central Cylindrical Quantum Shielding Shroud (Semi-transparent Glass/Ceramic) */}
        <mesh position={[0, 0.05, 0]} material={materials.glassShroud}>
          <cylinderGeometry args={[0.55, 0.55, 1.8, 32, 1, true]} />
        </mesh>
      </group>

      {/* 5. VERTICAL PRECISION RODS */}
      <group ref={rodsRef}>
        {/* Tier 1 rods */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={`rod-t1-${i}`}
              position={[Math.cos(angle) * 0.85, 0.88, Math.sin(angle) * 0.85]}
              material={materials.goldCoax}
            >
              <cylinderGeometry args={[0.024, 0.024, 0.8, 16]} />
            </mesh>
          );
        })}
        {/* Tier 2 rods */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
          return (
            <mesh
              key={`rod-t2-${i}`}
              position={[Math.cos(angle) * 0.72, 0.05, Math.sin(angle) * 0.72]}
              material={materials.polishedChrome}
            >
              <cylinderGeometry args={[0.02, 0.02, 0.7, 16]} />
            </mesh>
          );
        })}
        {/* Tier 3 rods */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={`rod-t3-${i}`}
              position={[Math.cos(angle) * 0.52, -0.72, Math.sin(angle) * 0.52]}
              material={materials.goldCoax}
            >
              <cylinderGeometry args={[0.018, 0.018, 0.65, 16]} />
            </mesh>
          );
        })}
      </group>

      {/* 6. INTERNAL COPPER/PLATINUM WIRING (Looping RF lines) */}
      <group ref={cablesRef}>
        {cableCurves.map((curve, idx) => (
          <mesh key={`cable-${idx}`} material={idx % 2 === 0 ? materials.copperWire : materials.goldCoax}>
            <tubeGeometry args={[curve, 28, 0.011, 8, false]} />
          </mesh>
        ))}
      </group>

      {/* 7. LEFT STRUCTURAL SUPPORT */}
      <group ref={leftSupportRef}>
        <mesh position={[-1.18, 0.2, 0]} material={materials.graphite}>
          <boxGeometry args={[0.08, 2.3, 0.12]} />
        </mesh>
        <mesh position={[-1.18, 0.85, 0]} material={materials.platinum}>
          <boxGeometry args={[0.16, 0.08, 0.16]} />
        </mesh>
        <mesh position={[-1.18, -0.45, 0]} material={materials.platinum}>
          <boxGeometry args={[0.16, 0.08, 0.16]} />
        </mesh>
      </group>

      {/* 8. RIGHT STRUCTURAL SUPPORT */}
      <group ref={rightSupportRef}>
        <mesh position={[1.18, 0.2, 0]} material={materials.graphite}>
          <boxGeometry args={[0.08, 2.3, 0.12]} />
        </mesh>
        <mesh position={[1.18, 0.85, 0]} material={materials.platinum}>
          <boxGeometry args={[0.16, 0.08, 0.16]} />
        </mesh>
        <mesh position={[1.18, -0.45, 0]} material={materials.platinum}>
          <boxGeometry args={[0.16, 0.08, 0.16]} />
        </mesh>
      </group>

      {/* 9. LOWER GRAPHITE BASE & SHIELDING CAN */}
      <group ref={lowerBaseRef} position={[0, -1.45, 0]}>
        <mesh position={[0, 0.08, 0]} material={materials.platinum}>
          <cylinderGeometry args={[0.38, 0.38, 0.35, 32]} />
        </mesh>
        <mesh position={[0, -0.15, 0]} material={materials.goldCoax}>
          <cylinderGeometry args={[0.32, 0.28, 0.12, 32]} />
        </mesh>
        <mesh position={[0, -0.25, 0]} material={materials.polishedChrome}>
          <coneGeometry args={[0.15, 0.14, 24]} />
        </mesh>
      </group>

      {/* 10. CENTRAL QUANTUM CORE */}
      <group ref={coreRef}>
        <QuantumCore
          activationProgress={activationProgress}
          isDarkTheme={isDarkTheme}
        />
      </group>
    </group>
  );
};
