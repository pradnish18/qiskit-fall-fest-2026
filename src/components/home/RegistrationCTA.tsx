import React from 'react';
import { ArrowRight } from 'lucide-react';
import burgundyWaveImg from '../../assets/images/burgundy_quantum_wave_1789555778902.jpg';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="register-cta"
      className="relative z-20 py-24 sm:py-28 px-6 sm:px-8 md:px-12 bg-[#170305] text-[#F5F3F0] overflow-hidden border-t border-[#6C151E]/50"
    >
      {/* Panoramic Quantum Wave Background Image replacing the sphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={burgundyWaveImg}
          alt="Quantum Wave Network"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-right-center opacity-90 select-none"
        />
        {/* Soft edge blending gradients for contrast and seamless transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#170305] via-[#170305]/75 sm:via-[#170305]/50 to-[#170305]/30 lg:from-[#170305] lg:via-[#170305]/60 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#170305] via-transparent to-[#170305] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[320px]">
          {/* Left Column: Vertical line, Headline, Supporting text, Register Button */}
          <div className="lg:col-span-6 flex items-start gap-4">
            {/* Vertical accent line with top and bottom dots */}
            <div className="flex flex-col items-center py-1 select-none shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27]" />
              <div className="w-[1px] h-36 sm:h-44 bg-[#8A1B27]/40 my-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27]" />
            </div>

            <div className="space-y-6 max-w-md">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-tech tracking-[0.25em] uppercase text-[#D9D9DC]/80 font-bold">
                  BE PART OF IT
                </span>
              </div>

              <h2 className="font-serif-title text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                <span className="block text-white">Ready to</span>
                <span className="block text-[#F5F3F0]">Take Part?</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#D9D9DC]/90">
                Join students, developers, researchers, and industry leaders at Qiskit Fall Fest 2026 —
                SRM University-AP × IBM.
              </p>

              <div className="pt-2">
                <button
                  id="cta-register-now-btn"
                  onClick={onOpenRegister}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#8A1B27] bg-[#6C151E] hover:bg-[#8A1B27] text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_30px_rgba(138,27,39,0.5)] hover:shadow-[0_8px_40px_rgba(138,27,39,0.7)] cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column: Open breathing space showcasing the wave ribbon, node constellations, and light flare */}
          <div className="lg:col-span-4 hidden lg:block" />

          {/* Right Column: Clean Vertical Editorial Pillar matching the reference */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-start justify-center space-y-3 font-mono-tech text-xs tracking-[0.25em] text-[#D9D9DC]/90 uppercase font-semibold pl-4">
            <div>PEOPLE</div>
            <div>IDEAS</div>
            <div>TECHNOLOGY</div>
            <div className="leading-snug">
              A BRIGHTER
              <br />
              TOMORROW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
