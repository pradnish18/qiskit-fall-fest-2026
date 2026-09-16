import React from 'react';
import { PILLARS } from '../../constants/eventData';
import { TrendingUp, Box, Users, Infinity as InfinityIcon } from 'lucide-react';

interface ExperienceStripProps {
  isDarkTheme?: boolean;
}

export const ExperienceStrip: React.FC<ExperienceStripProps> = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Box':
        return <Box className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Infinity':
        return <InfinityIcon className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="experience"
      className="relative z-20 py-12 px-6 sm:px-8 md:px-12 bg-[#200508] text-[#F5F3F0] overflow-hidden border-y border-[#6C151E]/40"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`flex flex-col items-start py-4 sm:py-2 transition-all duration-300 ${
                index === 0 ? 'lg:pr-8' : index === 3 ? 'lg:pl-8' : 'lg:px-8'
              } ${index % 2 === 1 ? 'sm:pl-6' : 'sm:pr-6'}`}
            >
              {/* Minimal Line Icon */}
              <div className="mb-3 text-[#D9D9DC] opacity-80 hover:opacity-100 transition-opacity">
                {getIcon(pillar.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-mono-tech text-sm tracking-[0.2em] font-bold uppercase text-[#F5F3F0] mb-1.5">
                {pillar.title}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-xs text-[#D9D9DC]/80 leading-relaxed max-w-[240px]">
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
