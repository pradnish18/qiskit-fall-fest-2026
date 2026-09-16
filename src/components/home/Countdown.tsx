import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../../constants/eventData';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 142,
    hours: 3,
    minutes: 27,
    seconds: 18,
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.dates.targetISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <section
      id="countdown"
      className="relative z-20 py-16 px-6 sm:px-8 md:px-12 bg-[#200508] text-[#F5F3F0] overflow-hidden border-y border-[#6C151E]/40"
    >
      {/* Subtle geometric line accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#8A1B27" strokeWidth="0.5" />
          <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#8A1B27" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27]" />
              <span className="text-[11px] font-mono-tech tracking-[0.25em] uppercase text-[#D9D9DC]">
                COUNTDOWN
              </span>
            </div>

            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
              <span className="block text-white">THE FUTURE</span>
              <span className="block text-[#F5F3F0]">IS A CLICK AWAY</span>
            </h2>
          </div>

          {/* Right Column: 4 Countdown Boxes */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
              {/* Days */}
              <div className="bg-[#120204]/80 border border-[#6C151E]/50 rounded-xl p-3 sm:p-4 text-center shadow-inner flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]">
                <div className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] font-mono-tech tracking-[0.2em] uppercase text-[#A7A8AD]">
                  DAYS
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#120204]/80 border border-[#6C151E]/50 rounded-xl p-3 sm:p-4 text-center shadow-inner flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]">
                <div className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
                  {formatNumber(timeLeft.hours)}
                </div>
                <div className="text-[10px] font-mono-tech tracking-[0.2em] uppercase text-[#A7A8AD]">
                  HOURS
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-[#120204]/80 border border-[#6C151E]/50 rounded-xl p-3 sm:p-4 text-center shadow-inner flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]">
                <div className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <div className="text-[10px] font-mono-tech tracking-[0.2em] uppercase text-[#A7A8AD]">
                  MINUTES
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-[#120204]/80 border border-[#6C151E]/50 rounded-xl p-3 sm:p-4 text-center shadow-inner flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]">
                <div className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <div className="text-[10px] font-mono-tech tracking-[0.2em] uppercase text-[#A7A8AD]">
                  SECONDS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
