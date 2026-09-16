import React from 'react';
import { ArrowRight } from 'lucide-react';
import silverGlobeImg from '../../assets/images/silver_globe_mesh_1789450348345.jpg';

interface NextDecadeProps {
  isDarkTheme?: boolean;
}

export const NextDecade: React.FC<NextDecadeProps> = ({ isDarkTheme = false }) => {
  return (
    <section
      id="about"
      className={`relative z-20 py-20 px-6 sm:px-8 md:px-12 transition-colors duration-500 overflow-hidden ${
        isDarkTheme ? 'bg-[#0E0F12] text-[#F5F3F0]' : 'bg-[#FAF8F5] text-[#18191D]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Vertical decorative line + Narrative */}
          <div className="lg:col-span-4 flex items-start gap-4">
            {/* Vertical accent line with top and bottom dots matching Image 2 */}
            <div className="flex flex-col items-center py-1 select-none shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
              <div className="w-[1px] h-36 sm:h-44 bg-[#6C151E]/40 my-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif-title text-4xl sm:text-5xl md:text-[3.2rem] font-black uppercase tracking-tight leading-[0.92]">
                <span className="block text-current">THE</span>
                <span className="block text-[#6C151E] dark:text-[#8A1B27]">
                  NEXT DECADE
                </span>
                <span className="block text-current">TOGETHER</span>
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#232428]'
                }`}
              >
                Qiskit Fall Fest 2026 brings together students, developers, researchers, and industry
                leaders to learn, build, and share the future of quantum computing.
              </p>

              <div className="pt-1">
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#6C151E] dark:text-[#8A1B27] hover:text-[#8A1B27] transition-colors group cursor-pointer"
                >
                  <span>Explore the event</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Center Column: Silver-gray Monochrome Earth Globe with Constellation Mesh */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Soft ambient aura */}
              <div
                className={`absolute inset-0 rounded-full blur-2xl pointer-events-none ${
                  isDarkTheme ? 'bg-white/5' : 'bg-[#6C151E]/5'
                }`}
              />

              {/* Silver Earth Globe */}
              <img
                src={silverGlobeImg}
                alt="Silver Constellation Earth Globe"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain rounded-full select-none animate-float-gentle transition-all duration-700 ${
                  isDarkTheme
                    ? 'mix-blend-screen opacity-90 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]'
                    : 'mix-blend-multiply opacity-95 drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]'
                }`}
              />

              {/* Decorative constellation coordinate points */}
              <div className="absolute -top-3 right-8 w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
              <div className="absolute bottom-8 -left-2 w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
            </div>
          </div>

          {/* Right Column: Quote + Vertical Divider + Verified Statistics */}
          <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-4">
            {/* Editorial Quote matching Image 2 */}
            <div className="space-y-2 border-l border-[#6C151E]/30 pl-4">
              <blockquote
                className={`font-editorial italic text-base sm:text-lg leading-relaxed ${
                  isDarkTheme ? 'text-[#D9D9DC]' : 'text-[#3A0B10]'
                }`}
              >
                “Quantum computing is not just a technology shift, it's a community movement.”
              </blockquote>
              <div className="text-xs font-mono-tech tracking-wider uppercase text-[#6C151E] dark:text-[#8A1B27] font-semibold">
                — IBM Quantum
              </div>
            </div>

            {/* Statistics Column matching Image 2 exact layout */}
            <div className="flex items-start gap-4 pt-2">
              {/* Vertical line with dots */}
              <div className="flex flex-col items-center py-1 select-none shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
                <div className="w-[1px] h-36 bg-[#6C151E]/40 my-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C151E]" />
              </div>

              <div className="space-y-5">
                {/* 200+ Host Institutions */}
                <div>
                  <div className="font-serif-title text-3xl sm:text-4xl font-black tracking-tight text-[#6C151E] dark:text-[#8A1B27]">
                    200+
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-semibold tracking-wide ${
                      isDarkTheme ? 'text-[#D9D9DC]' : 'text-[#18191D]'
                    }`}
                  >
                    Host Institutions
                  </div>
                </div>

                {/* Global Qiskit Community */}
                <div>
                  <div className="font-serif-title text-3xl sm:text-4xl font-black tracking-tight text-[#6C151E] dark:text-[#8A1B27]">
                    Global
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-semibold tracking-wide ${
                      isDarkTheme ? 'text-[#D9D9DC]' : 'text-[#18191D]'
                    }`}
                  >
                    Qiskit Community
                  </div>
                </div>

                {/* 10 Years of Quantum on Cloud */}
                <div>
                  <div className="font-serif-title text-3xl sm:text-4xl font-black tracking-tight text-[#6C151E] dark:text-[#8A1B27]">
                    10 Years
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-semibold tracking-wide ${
                      isDarkTheme ? 'text-[#D9D9DC]' : 'text-[#18191D]'
                    }`}
                  >
                    of Quantum on Cloud
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
