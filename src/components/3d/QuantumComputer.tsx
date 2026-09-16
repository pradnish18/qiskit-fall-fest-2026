import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumCore } from './QuantumCore';

export type ActiveComponentId = 'ALL' | '01' | '02' | '03' | '04' | 'NONE';

interface QuantumComputerProps {
  activeComponent?: ActiveComponentId;
  activationProgress?: number; // 0 to 1
  isDarkTheme?: boolean;
}

export const QuantumComputer: React.FC<QuantumComputerProps> = ({
  activeComponent = 'ALL',
  activationProgress = 1,
  isDarkTheme = true,
}) => {
  const mainGroup = useRef<THREE.Group>(null);

  // Group references
  const upperCryoRef = useRef<THREE.Group>(null);
  const upperCapRef = useRef<THREE.Group>(null);
  const platesRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const cablesRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);
  const rodsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const supportsRef = useRef<THREE.Group>(null);
  const lowerBaseRef = useRef<THREE.Group>(null);

  // Determine dimming factors based on activeComponent
  const isAll = activeComponent === 'ALL' || activeComponent === 'NONE';
  const is01Active = isAll || activeComponent === '01';
  const is02Active = isAll || activeComponent === '02';
  const is03Active = isAll || activeComponent === '03';
  const is04Active = isAll || activeComponent === '04';

  // Materials definition with highlight & dim states
  const materials = useMemo(() => {
    // Normal Materials
    const platinum = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? '#E2E2E6' : '#E8E8EC',
      metalness: 0.94,
      roughness: 0.16,
      envMapIntensity: 1.4,
    });

    const polishedChrome = new THREE.MeshStandardMaterial({
      color: '#F5F5F7',
      metalness: 0.98,
      roughness: 0.06,
      envMapIntensity: 1.8,
    });

    const graphite = new THREE.MeshStandardMaterial({
      color: '#1A1B20',
      metalness: 0.85,
      roughness: 0.35,
    });

    const goldCoax = new THREE.MeshStandardMaterial({
      color: '#DDA835', // 24K cryogenic gold stage plates
      metalness: 0.95,
      roughness: 0.18,
    });

    const copperWire = new THREE.MeshStandardMaterial({
      color: '#C86D3B', // Coaxial & thermal copper
      metalness: 0.92,
      roughness: 0.24,
    });

    const glassShroud = new THREE.MeshPhysicalMaterial({
      color: '#F5F3F0',
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.82,
      thickness: 0.5,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });

    // Dimmed Materials (used when other parts are focused)
    const dimFactor = 0.22;
    const dimmedMetal = new THREE.MeshStandardMaterial({
      color: '#28292E',
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: dimFactor,
    });

    const dimmedGold = new THREE.MeshStandardMaterial({
      color: '#423618',
      metalness: 0.5,
      roughness: 0.6,
      transparent: true,
      opacity: dimFactor,
    });

    const dimmedCopper = new THREE.MeshStandardMaterial({
      color: '#3B2317',
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: dimFactor,
    });

    // Highlighted Materials (enhanced emissive luster)
    const highlightPlatinum = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      emissive: '#8A1B27',
      emissiveIntensity: 0.45,
      metalness: 0.98,
      roughness: 0.05,
      envMapIntensity: 2.5,
    });

    const highlightGold = new THREE.MeshStandardMaterial({
      color: '#FFD700',
      emissive: '#B8860B',
      emissiveIntensity: 0.4,
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 2.2,
    });

    const highlightCopper = new THREE.MeshStandardMaterial({
      color: '#E27638',
      emissive: '#8A1B27',
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 2.0,
    });

    return {
      platinum,
      polishedChrome,
      graphite,
      goldCoax,
      copperWire,
      glassShroud,
      dimmedMetal,
      dimmedGold,
      dimmedCopper,
      highlightPlatinum,
      highlightGold,
      highlightCopper,
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

  // Helical spiral coil spring (prominent in IBM Quantum Chandelier reference image)
  const coilCurve = useMemo(() => {
    const points = [];
    const loops = 7;
    const height = 0.52;
    const radius = 0.13;
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const angle = t * loops * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, -0.05 + t * height, Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // Frame animations: gentle serene rotation
  useFrame((_, delta) => {
    if (mainGroup.current) {
      mainGroup.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={mainGroup} position={[0, 0.65, 0]}>
      {/* ========================================================================= */}
      {/* 01. UPPER CRYOGENIC STRUCTURE (Top Flange, Collar, 50K Plate Mount)      */}
      {/* ========================================================================= */}
      <group ref={upperCryoRef}>
        {/* Tiered platinum collar */}
        <mesh
          position={[0, 1.6, 0]}
          material={
            is01Active
              ? activeComponent === '01'
                ? materials.highlightPlatinum
                : materials.polishedChrome
              : materials.dimmedMetal
          }
        >
          <cylinderGeometry args={[1.35, 1.45, 0.16, 48]} />
        </mesh>

        <mesh
          position={[0, 1.46, 0]}
          material={
            is01Active
              ? activeComponent === '01'
                ? materials.highlightPlatinum
                : materials.platinum
              : materials.dimmedMetal
          }
        >
          <cylinderGeometry args={[1.2, 1.3, 0.14, 48]} />
        </mesh>

        {/* Top Gold 50K Thermal Stage Plate */}
        <mesh
          position={[0, 1.32, 0]}
          material={
            is01Active
              ? activeComponent === '01'
                ? materials.highlightGold
                : materials.goldCoax
              : materials.dimmedGold
          }
        >
          <cylinderGeometry args={[1.15, 1.15, 0.08, 48]} />
        </mesh>
      </group>

      {/* Top Vacuum Mounting Flange & Bolt Ring */}
      <group ref={upperCapRef}>
        <mesh
          position={[0, 1.75, 0]}
          material={
            is01Active
              ? activeComponent === '01'
                ? materials.highlightPlatinum
                : materials.graphite
              : materials.dimmedMetal
          }
        >
          <cylinderGeometry args={[1.5, 1.5, 0.18, 48]} />
        </mesh>

        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={`bolt-top-${i}`}
              position={[Math.cos(angle) * 1.35, 1.62, Math.sin(angle) * 1.35]}
              material={
                is01Active
                  ? activeComponent === '01'
                    ? materials.highlightPlatinum
                    : materials.polishedChrome
                  : materials.dimmedMetal
              }
            >
              <cylinderGeometry args={[0.022, 0.022, 0.12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* ========================================================================= */}
      {/* 02. PRECISION SUPPORT PLATES (Gold Thermal Stages & Machined Disks)       */}
      {/* ========================================================================= */}
      <group ref={platesRef}>
        {/* 4K Stage Plate (Gold Disk with precision cutouts) */}
        <mesh
          position={[0, 0.45, 0]}
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightGold
                : materials.goldCoax
              : materials.dimmedGold
          }
        >
          <cylinderGeometry args={[1.02, 1.02, 0.07, 48]} />
        </mesh>

        {/* Concentric platinum ring mount */}
        <mesh
          position={[0, 0.46, 0]}
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightPlatinum
                : materials.platinum
              : materials.dimmedMetal
          }
        >
          <torusGeometry args={[0.82, 0.03, 16, 48]} />
        </mesh>

        {/* Still Stage Plate (0.8K) */}
        <mesh
          position={[0, -0.32, 0]}
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightGold
                : materials.goldCoax
              : materials.dimmedGold
          }
        >
          <cylinderGeometry args={[0.85, 0.85, 0.065, 48]} />
        </mesh>

        {/* Cold Plate (100mK) */}
        <mesh
          position={[0, -1.02, 0]}
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightGold
                : materials.goldCoax
              : materials.dimmedGold
          }
        >
          <cylinderGeometry args={[0.68, 0.68, 0.06, 48]} />
        </mesh>

        {/* Precision stage bolt patterns on 4K plate */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={`plate-bolt-${i}`}
              position={[Math.cos(angle) * 0.92, 0.46, Math.sin(angle) * 0.92]}
              material={
                is02Active
                  ? activeComponent === '02'
                    ? materials.highlightPlatinum
                    : materials.polishedChrome
                  : materials.dimmedMetal
              }
            >
              <cylinderGeometry args={[0.015, 0.015, 0.08, 10]} />
            </mesh>
          );
        })}
      </group>

      {/* Circular Rings */}
      <group ref={ringsRef} position={[0, 0.05, 0]}>
        <mesh
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightPlatinum
                : materials.polishedChrome
              : materials.dimmedMetal
          }
        >
          <torusGeometry args={[0.96, 0.018, 16, 64]} />
        </mesh>
        <mesh
          position={[0, -0.7, 0]}
          material={
            is02Active
              ? activeComponent === '02'
                ? materials.highlightPlatinum
                : materials.platinum
              : materials.dimmedMetal
          }
        >
          <torusGeometry args={[0.62, 0.015, 16, 48]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 03. SIGNAL & CONTROL WIRING (RF Coaxial Lines, Copper Coils & Looping RF) */}
      {/* ========================================================================= */}
      <group ref={cablesRef}>
        {cableCurves.map((curve, idx) => (
          <mesh
            key={`cable-${idx}`}
            material={
              is03Active
                ? activeComponent === '03'
                  ? materials.highlightCopper
                  : idx % 2 === 0
                  ? materials.copperWire
                  : materials.goldCoax
                : materials.dimmedCopper
            }
          >
            <tubeGeometry args={[curve, 28, 0.011, 8, false]} />
          </mesh>
        ))}
      </group>

      {/* Prominent Helical Spiral Coil (IBM Chandelier Signature Feature) */}
      <group ref={coilRef} position={[-0.38, 0.0, 0]}>
        <mesh
          material={
            is03Active
              ? activeComponent === '03'
                ? materials.highlightGold
                : materials.goldCoax
              : materials.dimmedGold
          }
        >
          <tubeGeometry args={[coilCurve, 64, 0.016, 12, false]} />
        </mesh>
        {/* Top/bottom brass collar mounts for helical coil */}
        <mesh
          position={[0, 0.48, 0]}
          material={is03Active ? materials.copperWire : materials.dimmedCopper}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.08, 20]} />
        </mesh>
        <mesh
          position={[0, -0.06, 0]}
          material={is03Active ? materials.copperWire : materials.dimmedCopper}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.08, 20]} />
        </mesh>
      </group>

      {/* Vertical Precision Rods */}
      <group ref={rodsRef}>
        {/* Tier 1 rods */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={`rod-t1-${i}`}
              position={[Math.cos(angle) * 0.85, 0.88, Math.sin(angle) * 0.85]}
              material={
                is02Active || is03Active ? materials.goldCoax : materials.dimmedGold
              }
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
              material={
                is02Active || is03Active ? materials.polishedChrome : materials.dimmedMetal
              }
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
              material={
                is02Active || is03Active ? materials.goldCoax : materials.dimmedGold
              }
            >
              <cylinderGeometry args={[0.018, 0.018, 0.65, 16]} />
            </mesh>
          );
        })}
      </group>

      {/* Structural Lateral Supports */}
      <group ref={supportsRef}>
        <mesh
          position={[-1.18, 0.2, 0]}
          material={isAll ? materials.graphite : materials.dimmedMetal}
        >
          <boxGeometry args={[0.08, 2.3, 0.12]} />
        </mesh>
        <mesh
          position={[1.18, 0.2, 0]}
          material={isAll ? materials.graphite : materials.dimmedMetal}
        >
          <boxGeometry args={[0.08, 2.3, 0.12]} />
        </mesh>
      </group>

      {/* Central Vertical Waveguide Column */}
      <mesh
        position={[0, 0.15, 0]}
        material={isAll ? materials.graphite : materials.dimmedMetal}
      >
        <cylinderGeometry args={[0.22, 0.22, 2.2, 32]} />
      </mesh>

      {/* Glass Quantum Shroud */}
      <mesh position={[0, 0.05, 0]} material={materials.glassShroud}>
        <cylinderGeometry args={[0.55, 0.55, 1.8, 32, 1, true]} />
      </mesh>

      {/* Lower Base & Cryogenic Canister */}
      <group ref={lowerBaseRef} position={[0, -1.45, 0]}>
        <mesh
          position={[0, 0.08, 0]}
          material={is04Active || isAll ? materials.platinum : materials.dimmedMetal}
        >
          <cylinderGeometry args={[0.38, 0.38, 0.35, 32]} />
        </mesh>
        <mesh
          position={[0, -0.15, 0]}
          material={is04Active || isAll ? materials.goldCoax : materials.dimmedGold}
        >
          <cylinderGeometry args={[0.32, 0.28, 0.12, 32]} />
        </mesh>
        <mesh
          position={[0, -0.25, 0]}
          material={is04Active || isAll ? materials.polishedChrome : materials.dimmedMetal}
        >
          <coneGeometry args={[0.15, 0.14, 24]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 04. QUANTUM CORE REGION (Central QPU, Ruby Illumination & Quantum Core)   */}
      {/* ========================================================================= */}
      <group ref={coreRef}>
        <QuantumCore
          activationProgress={
            activeComponent === '04'
              ? Math.max(0.9, activationProgress)
              : isAll
              ? activationProgress
              : 0.2
          }
          isDarkTheme={isDarkTheme}
        />
      </group>
    </group>
  );
};
