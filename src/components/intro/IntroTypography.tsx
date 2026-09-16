import React from 'react';
import { IntroPhase } from '../../types';

interface IntroTypographyProps {
  introPhase: IntroPhase;
  introProgress: number; // 0 to 1
}

export const IntroTypography: React.FC<IntroTypographyProps> = ({
  introPhase,
  introProgress: _introProgress,
}) => {
  if (introPhase === 'HOME') return null;

  const isRevealed = introPhase === 'INTRO' || introPhase === 'WAIT_EXPLORE';
  const isReceding =
    introPhase === 'COMPUTER_REVEAL' ||
    introPhase === 'COMPONENT_01' ||
    introPhase === 'COMPONENT_02' ||
    introPhase === 'COMPONENT_03' ||
    introPhase === 'COMPONENT_04' ||
    introPhase === 'COMPLETE_COMPUTER' ||
    introPhase === 'WAIT_ENTER' ||
    introPhase === 'ENTER_HOME';

  // Opacity and scale based on phase
  let opacity = 0;
  let transform = 'scale(1) translateZ(0)';

  if (introPhase === 'INTRO') {
    opacity = 1;
    transform = 'scale(1) translateZ(0)';
  } else if (introPhase === 'WAIT_EXPLORE') {
    opacity = 0.85;
    transform = 'scale(0.95) translateY(-20px) translateZ(-50px)';
  } else if (isReceding) {
    opacity = 0;
    transform = 'scale(0.8) translateY(-80px) translateZ(-200px)';
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6 text-center transition-all duration-1000 ease-out"
      style={{
        opacity,
        transform,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Subtle top indicator */}
        <div
          className={`text-[11px] tracking-[0.35em] uppercase text-[#A7A8AD] font-mono-tech transition-all duration-700 delay-100 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          GLOBAL. OPEN. TOGETHER.
        </div>

        {/* Main Title: QISKIT FALL FEST 2026 */}
        <div className="overflow-hidden py-1">
          <h1
            className={`font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F3F0] font-bold transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <span className="text-[#8A1B27] inline-block mr-3">QISKIT</span>
            <span>FALL FEST 2026</span>
          </h1>
        </div>

        {/* Sub-headline: SRM UNIVERSITY-AP × IBM QUANTUM */}
        <div className="overflow-hidden pt-2">
          <p
            className={`font-sans text-sm sm:text-lg md:text-xl font-medium tracking-[0.2em] uppercase text-[#D9D9DC] transition-transform duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            SRM UNIVERSITY-AP <span className="text-[#8A1B27] mx-2">×</span> IBM QUANTUM
          </p>
        </div>

        {/* Supporting subtitle */}
        <div className="overflow-hidden pt-1">
          <p
            className={`font-editorial italic text-base sm:text-xl text-[#A7A8AD] transition-opacity duration-1000 delay-500 ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            A Decade of Quantum on Cloud
          </p>
        </div>

        {/* Engineering Status Readout */}
        <div
          className={`pt-6 flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] text-[#8A1B27] font-mono-tech transition-opacity duration-500 delay-700 ${
            isRevealed ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27] animate-ping" />
          <span>INITIALIZING DILUTION CRYOSTAT [15 mK]</span>
        </div>
      </div>
    </div>
  );
};
