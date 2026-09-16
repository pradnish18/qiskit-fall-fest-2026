import React from 'react';

interface PartnersProps {
  isDarkTheme?: boolean;
}

export const Partners: React.FC<PartnersProps> = ({ isDarkTheme = false }) => {
  return (
    <section
      id="team"
      className={`relative z-20 py-16 px-6 sm:px-8 md:px-12 transition-colors duration-500 border-b ${
        isDarkTheme
          ? 'bg-[#0E0F12] text-[#F5F3F0] border-[#18191D]'
          : 'bg-[#FAF8F5] text-[#18191D] border-[#18191D]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
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
            Building a stronger quantum tomorrow.
          </div>
        </div>

        {/* 4 Columns with vertical dividers matching Image 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 lg:divide-x divide-current/10">
          {/* 1. SRM UNIVERSITY-AP */}
          <div className="flex items-center justify-center p-4 lg:pr-8">
            <div className="flex items-center gap-3">
              {/* SRM Tree Emblem */}
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center p-1 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
                  {/* Stylized Kalpavriksha tree branches */}
                  <path d="M50 82 L50 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  <path d="M50 55 C35 50, 25 35, 30 25 C40 25, 45 35, 50 45" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M50 55 C65 50, 75 35, 70 25 C60 25, 55 35, 50 45" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="50" cy="24" r="8" fill="currentColor" />
                  <circle cx="34" cy="32" r="6" fill="currentColor" />
                  <circle cx="66" cy="32" r="6" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-title text-2xl font-black tracking-wider leading-none">
                  SRM
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#8A1B27]">
                  UNIVERSITY-AP
                </span>
              </div>
            </div>
          </div>

          {/* 2. IBM */}
          <div className="flex items-center justify-center p-4 lg:px-8">
            <svg
              viewBox="0 0 160 64"
              className="h-10 w-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* IBM 8-Bar Logo Representation */}
              <g fill="currentColor">
                {/* I */}
                <rect x="10" y="4" width="22" height="4" />
                <rect x="10" y="12" width="22" height="4" />
                <rect x="17" y="20" width="8" height="4" />
                <rect x="17" y="28" width="8" height="4" />
                <rect x="17" y="36" width="8" height="4" />
                <rect x="17" y="44" width="8" height="4" />
                <rect x="10" y="52" width="22" height="4" />
                <rect x="10" y="60" width="22" height="4" />
                {/* B */}
                <rect x="42" y="4" width="30" height="4" />
                <rect x="42" y="12" width="34" height="4" />
                <rect x="42" y="20" width="10" height="4" />
                <rect x="66" y="20" width="10" height="4" />
                <rect x="42" y="28" width="30" height="4" />
                <rect x="42" y="36" width="32" height="4" />
                <rect x="42" y="44" width="10" height="4" />
                <rect x="68" y="44" width="10" height="4" />
                <rect x="42" y="52" width="36" height="4" />
                <rect x="42" y="60" width="32" height="4" />
                {/* M */}
                <rect x="88" y="4" width="10" height="4" />
                <rect x="116" y="4" width="10" height="4" />
                <rect x="144" y="4" width="10" height="4" />
                <rect x="88" y="12" width="12" height="4" />
                <rect x="114" y="12" width="14" height="4" />
                <rect x="142" y="12" width="12" height="4" />
                <rect x="88" y="20" width="14" height="4" />
                <rect x="112" y="20" width="18" height="4" />
                <rect x="140" y="20" width="14" height="4" />
                <rect x="88" y="28" width="16" height="4" />
                <rect x="110" y="28" width="22" height="4" />
                <rect x="138" y="28" width="16" height="4" />
                <rect x="88" y="36" width="10" height="4" />
                <rect x="108" y="36" width="10" height="4" />
                <rect x="124" y="36" width="10" height="4" />
                <rect x="144" y="36" width="10" height="4" />
                <rect x="88" y="44" width="10" height="4" />
                <rect x="144" y="44" width="10" height="4" />
                <rect x="88" y="52" width="10" height="4" />
                <rect x="144" y="52" width="10" height="4" />
                <rect x="88" y="60" width="10" height="4" />
                <rect x="144" y="60" width="10" height="4" />
              </g>
            </svg>
          </div>

          {/* 3. Qiskit */}
          <div className="flex items-center justify-center p-4 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Qiskit Bloch sphere icon */}
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="6">
                  <circle cx="50" cy="50" r="44" />
                  <ellipse cx="50" cy="50" rx="44" ry="18" />
                  <ellipse cx="50" cy="50" rx="18" ry="44" />
                  <line x1="50" y1="6" x2="50" y2="94" strokeWidth="4" strokeDasharray="6 6" />
                </svg>
              </div>
              <span className="font-sans text-2xl font-black tracking-tight">
                Qiskit
              </span>
            </div>
          </div>

          {/* 4. Community Text */}
          <div className="flex items-center justify-center lg:justify-start p-4 lg:pl-8">
            <p
              className={`text-xs leading-relaxed max-w-[180px] text-center lg:text-left ${
                isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
              }`}
            >
              And a global community of contributors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
