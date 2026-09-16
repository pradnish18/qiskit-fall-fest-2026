import React from 'react';
import { SrmApLogo, IbmQuantumLogo, QiskitLogo } from './PartnerLogos';

interface PartnersProps {
  isDarkTheme?: boolean;
}

export const Partners: React.FC<PartnersProps> = ({ isDarkTheme = false }) => {
  return (
    <section
      id="team"
      className={`relative z-20 py-20 px-6 sm:px-8 md:px-12 transition-colors duration-500 border-b ${
        isDarkTheme
          ? 'bg-[#0E0F12] text-[#F5F3F0] border-[#18191D]'
          : 'bg-[#FAF8F5] text-[#18191D] border-[#18191D]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27]" />
            <h2 className="font-mono-tech text-xs tracking-[0.25em] uppercase font-bold text-current">
              OUR PARTNERS
            </h2>
          </div>
          <div
            className={`text-xs font-mono-tech tracking-wider ${
              isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
            }`}
          >
            Building a stronger quantum tomorrow together.
          </div>
        </div>

        {/* 4-Column Editorial Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center divide-y sm:divide-y-0 lg:divide-x divide-current/10">
          {/* 1. SRM UNIVERSITY-AP */}
          <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:pr-8 group">
            <a
              href="https://srmap.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]"
              aria-label="SRM University-AP"
            >
              <SrmApLogo isDarkTheme={isDarkTheme} className="h-14 sm:h-16" />
            </a>
            <span
              className={`mt-3 text-[10px] font-mono-tech tracking-[0.2em] uppercase font-medium ${
                isDarkTheme ? 'text-[#8A8B92]' : 'text-[#7A7C85]'
              }`}
            >
              Academic & Venue Host
            </span>
          </div>

          {/* 2. IBM QUANTUM */}
          <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:px-8 group pt-6 sm:pt-4">
            <a
              href="https://www.ibm.com/quantum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]"
              aria-label="IBM Quantum"
            >
              <IbmQuantumLogo isDarkTheme={isDarkTheme} className="h-10 sm:h-12" />
            </a>
            <span
              className={`mt-3 text-[10px] font-mono-tech tracking-[0.2em] uppercase font-medium ${
                isDarkTheme ? 'text-[#8A8B92]' : 'text-[#7A7C85]'
              }`}
            >
              Technology & Cloud Platform
            </span>
          </div>

          {/* 3. QISKIT */}
          <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:px-8 group pt-6 sm:pt-4">
            <a
              href="https://qiskit.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]"
              aria-label="Qiskit Foundation"
            >
              <QiskitLogo isDarkTheme={isDarkTheme} className="h-11 sm:h-13" />
            </a>
            <span
              className={`mt-3 text-[10px] font-mono-tech tracking-[0.2em] uppercase font-medium ${
                isDarkTheme ? 'text-[#8A8B92]' : 'text-[#7A7C85]'
              }`}
            >
              Open-Source Quantum Foundation
            </span>
          </div>

          {/* 4. Global Quantum Community */}
          <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:pl-8 pt-6 sm:pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8A1B27] animate-pulse" />
              <span className="font-mono-tech text-xs tracking-wider uppercase font-semibold text-current">
                GLOBAL COMMUNITY
              </span>
            </div>
            <p
              className={`text-xs leading-relaxed max-w-[220px] text-center lg:text-left ${
                isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
              }`}
            >
              Joined by contributors, researchers, and quantum clubs worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
