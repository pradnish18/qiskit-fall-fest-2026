import React from 'react';
import { EVENT_DETAILS, EVENT_PHASES } from '../../constants/eventData';
import { ArrowRight, Play, Calendar, MapPin } from 'lucide-react';
import quantumSphereImg from '../../assets/images/quantum_network_sphere_1789446386921.jpg';

interface HeroProps {
  isDarkTheme: boolean;
  onOpenRegister: () => void;
  onOpenVideo: () => void;
  visible?: boolean;
  transitionProgress?: number;
}

export const Hero: React.FC<HeroProps> = ({
  isDarkTheme,
  onOpenRegister,
  onOpenVideo,
  visible = true,
  transitionProgress = 1,
}) => {
  return (
    <section
      id="hero"
      className={`relative min-h-screen pt-28 pb-12 px-6 sm:px-8 md:px-12 flex flex-col justify-between overflow-hidden transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. LEFT CELESTIAL SPHERE
          Moved far outwards and to the back (-z-10).
          Hidden on mobile/tablet (< xl) so it never intrudes on small screens.
          On big screens (xl, 2xl), appears along the outer boundary with gentle opacity. */}
      <div className="hidden xl:block absolute -left-72 2xl:-left-56 top-16 w-[440px] 2xl:w-[480px] h-[440px] 2xl:h-[480px] pointer-events-none select-none -z-10">
        <div className="relative w-full h-full animate-float-gentle">
          <img
            src={quantumSphereImg}
            alt="Quantum Constellation Sphere"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-contain rounded-full transition-all duration-700 ${
              isDarkTheme
                ? 'mix-blend-screen opacity-35 drop-shadow-[0_0_50px_rgba(138,27,39,0.3)]'
                : 'mix-blend-multiply opacity-20'
            }`}
          />
          <div className="absolute inset-4 rounded-full border border-[#8A1B27]/20 animate-slow-rotate" />
        </div>
      </div>

      {/* 2. RIGHT CELESTIAL SPHERE
          Moved far outwards to the back (-z-10).
          Hidden on mobile/tablet (< xl). On big desktop screens, frames the outer right margin. */}
      <div className="hidden xl:block absolute -right-72 2xl:-right-56 top-28 w-[420px] 2xl:w-[460px] h-[420px] 2xl:h-[460px] pointer-events-none select-none -z-10">
        <div
          className="relative w-full h-full animate-float-gentle"
          style={{ animationDelay: '2s' }}
        >
          <img
            src={quantumSphereImg}
            alt="Quantum Orbital Network Sphere"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-contain rounded-full transition-all duration-700 ${
              isDarkTheme
                ? 'mix-blend-screen opacity-25 drop-shadow-[0_0_40px_rgba(138,27,39,0.25)]'
                : 'mix-blend-multiply opacity-15'
            }`}
          />
          <div
            className="absolute inset-4 rounded-full border border-[#8A1B27]/15 animate-slow-rotate"
            style={{ animationDirection: 'reverse' }}
          />
        </div>
      </div>

      {/* 3. FLUID BURGUNDY BACKGROUND WAVE / RIBBON (Gentle background layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <svg
          className="absolute w-full h-full min-w-[1200px] -bottom-4 right-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="burgundyWaveGrad"
              x1="1440"
              y1="600"
              x2="300"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="#6C151E"
                stopOpacity={isDarkTheme ? '0.35' : '0.10'}
              />
              <stop
                offset="50%"
                stopColor="#8A1B27"
                stopOpacity={isDarkTheme ? '0.18' : '0.05'}
              />
              <stop offset="100%" stopColor="#6C151E" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="waveLineGrad"
              x1="1440"
              y1="500"
              x2="450"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="#8A1B27"
                stopOpacity={isDarkTheme ? '0.5' : '0.22'}
              />
              <stop offset="100%" stopColor="#D9D9DC" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 580 600 C 820 530, 1080 430, 1440 370 L 1440 600 Z"
            fill="url(#burgundyWaveGrad)"
          />
          <path
            d="M 420 600 C 720 490, 1040 360, 1440 310"
            stroke="url(#waveLineGrad)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[560px]">
          {/* LEFT COLUMN: Editorial Typography & Actions */}
          <div
            className="lg:col-span-7 z-30 space-y-6 max-w-2xl transition-transform duration-300"
            style={{
              opacity: Math.max(0.9, 0.9 + 0.1 * transitionProgress),
              transform: `translateX(${-16 * (1 - transitionProgress)}px)`,
            }}
          >
            {/* Top Eyebrow Tagline: • GLOBAL . OPEN . TOGETHER . • */}
            <div className="flex items-center gap-2">
              <span className={`font-bold text-xs ${isDarkTheme ? 'text-[#8A1B27]' : 'text-[#6C151E]'}`}>•</span>
              <span
                className={`text-[11px] font-mono-tech tracking-[0.35em] uppercase font-bold ${
                  isDarkTheme ? 'text-[#8A1B27]' : 'text-[#6C151E]'
                }`}
              >
                GLOBAL . OPEN . TOGETHER .
              </span>
              <span className={`font-bold text-xs ${isDarkTheme ? 'text-[#8A1B27]' : 'text-[#6C151E]'}`}>•</span>
            </div>

            {/* Giant Editorial Title: QISKIT FALL FEST 2026 */}
            <div className="space-y-0.5">
              <h1 className="font-serif-title text-6xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[6.8rem] tracking-tight leading-[0.88] font-black uppercase select-none">
                <span className={`block ${isDarkTheme ? 'text-[#8A1B27]' : 'text-[#6C151E]'}`}>
                  QISKIT
                </span>
                <span className={`block ${isDarkTheme ? 'text-[#F5F3F0]' : 'text-black'}`}>
                  FALL FEST
                </span>
                <span className={`block ${isDarkTheme ? 'text-[#D9D9DC]' : 'text-black'}`}>
                  2026
                </span>
              </h1>
            </div>

            {/* Sub-headline & Theme */}
            <div className="space-y-1.5 pt-2">
              <h2
                className={`font-sans text-base sm:text-xl font-bold tracking-tight uppercase ${
                  isDarkTheme ? 'text-[#D9D9DC]' : 'text-black'
                }`}
              >
                SRM UNIVERSITY-AP <span className="text-[#8A1B27]">×</span> IBM
              </h2>
              <p
                className={`font-editorial italic text-xl sm:text-2xl md:text-3xl font-normal ${
                  isDarkTheme ? 'text-[#F5F3F0]' : 'text-[#3A0B10]'
                }`}
              >
                A Decade of Quantum on Cloud
              </p>
            </div>

            {/* Supporting Event Description */}
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-lg font-normal ${
                isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#232428]'
              }`}
            >
              {EVENT_DETAILS.description}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-register-btn"
                onClick={onOpenRegister}
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#6C151E] hover:bg-[#8A1B27] text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_6px_24px_rgba(108,21,30,0.35)] hover:shadow-[0_8px_30px_rgba(138,27,39,0.5)] cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-video-btn"
                onClick={onOpenVideo}
                className={`group flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-all duration-300 text-sm font-medium cursor-pointer ${
                  isDarkTheme
                    ? 'text-[#F5F3F0] hover:text-white'
                    : 'text-black hover:text-[#6C151E]'
                }`}
              >
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Spatial Stage for the 3D Persistent Quantum Computer
              Cleaned up: No redundant 2D photo dump overlapping the 3D model.
              Provides breathing space, soft ambient illumination, and sleek technical telemetry badges. */}
          <div
            id="hero-quantum-stage"
            className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] pointer-events-none select-none my-2 lg:my-0 w-full"
          >
            {/* Soft ambient radiant aura behind 3D machine */}
            <div
              className={`absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
                isDarkTheme ? 'bg-[#8A1B27]/25' : 'bg-[#6C151E]/10'
              }`}
            />

            {/* Vertical Tech Accent on Right Edge */}
            <div className="hidden xl:flex flex-col items-end text-right space-y-1.5 select-none absolute -right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-[1px] h-6 bg-[#8A1B27]/40 mb-1" />
              <span className={`text-[10px] font-mono-tech tracking-[0.3em] uppercase ${isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'}`}>
                QUANTUM
              </span>
              <span className={`text-[10px] font-mono-tech tracking-[0.3em] uppercase ${isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'}`}>
                IDEAS
              </span>
              <span className={`text-[10px] font-mono-tech tracking-[0.3em] uppercase ${isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'}`}>
                REAL
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.3em] uppercase text-[#8A1B27] font-bold">
                IMPACT
              </span>
              <div className="w-[1px] h-8 bg-[#8A1B27] mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HORIZONTAL EVENT INFORMATION STRIP */}
      <div
        className={`max-w-7xl mx-auto w-full z-20 pt-8 border-t transition-colors duration-500 ${
          isDarkTheme ? 'border-white/10' : 'border-black/10'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {/* Phase 1: Online */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#6C151E]/10 text-[#8A1B27] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`text-sm font-bold tracking-tight font-mono-tech uppercase ${
                  isDarkTheme ? 'text-[#F5F3F0]' : 'text-black'
                }`}
              >
                {EVENT_PHASES[0].dates}
              </div>
              <div
                className={`text-xs ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#3A3B40]'
                }`}
              >
                {EVENT_PHASES[0].title}
              </div>
            </div>
          </div>

          {/* Phase 2: On-Campus */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#6C151E]/10 text-[#8A1B27] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`text-sm font-bold tracking-tight font-mono-tech uppercase ${
                  isDarkTheme ? 'text-[#F5F3F0]' : 'text-black'
                }`}
              >
                {EVENT_PHASES[1].dates}
              </div>
              <div
                className={`text-xs ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#3A3B40]'
                }`}
              >
                {EVENT_PHASES[1].title}
              </div>
            </div>
          </div>

          {/* Location: SRM University-AP */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#6C151E]/10 text-[#8A1B27] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`text-sm font-bold tracking-tight font-sans ${
                  isDarkTheme ? 'text-[#F5F3F0]' : 'text-black'
                }`}
              >
                {EVENT_DETAILS.venue.campus}
              </div>
              <div
                className={`text-xs ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#3A3B40]'
                }`}
              >
                {EVENT_DETAILS.venue.city}, {EVENT_DETAILS.venue.country}
              </div>
            </div>
          </div>

          {/* Right end badge: 10 A DECADE OF QUANTUM ON CLOUD */}
          <div className="flex items-center justify-start lg:justify-end gap-3.5">
            <span
              className={`font-serif-title text-5xl sm:text-6xl font-black ${
                isDarkTheme ? 'text-[#D9D9DC]/40' : 'text-[#6C151E]/30'
              }`}
            >
              10
            </span>
            <div className="text-[11px] font-mono-tech tracking-[0.2em] uppercase leading-tight max-w-[150px] font-bold text-[#8A1B27]">
              A DECADE OF QUANTUM ON CLOUD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

