import React from 'react';
import { ArrowRight } from 'lucide-react';
import spaceGlobeImg from '../../assets/images/burgundy_globe_space_1789450364785.jpg';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="register-cta"
      className="relative z-20 py-24 px-6 sm:px-8 md:px-12 bg-[#200508] text-[#F5F3F0] overflow-hidden border-t border-[#6C151E]/50"
    >
      {/* Background glow ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#8A1B27] rounded-full blur-[180px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vertical line, Headline, Supporting text, Register Button */}
          <div className="lg:col-span-5 flex items-start gap-4">
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

          {/* Center Column: Burgundy Space Celestial Sphere with Orbital Network Arcs */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full blur-3xl bg-[#8A1B27]/25 pointer-events-none" />
              <img
                src={spaceGlobeImg}
                alt="Burgundy Space Constellation Sphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-full select-none animate-float-gentle drop-shadow-[0_0_50px_rgba(138,27,39,0.5)]"
              />
            </div>
          </div>

          {/* Right Column: Clean Vertical Editorial Pillar matching Image 4 */}
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
