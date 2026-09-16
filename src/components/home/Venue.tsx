import React from 'react';
import { ArrowRight } from 'lucide-react';
import campusImg from '../../assets/images/srm_campus_architecture_1789450263457.jpg';

interface VenueProps {
  isDarkTheme?: boolean;
  onExploreVenues?: () => void;
}

export const Venue: React.FC<VenueProps> = ({
  isDarkTheme = false,
  onExploreVenues,
}) => {
  return (
    <section
      id="venues"
      className={`relative z-20 py-20 px-6 sm:px-8 md:px-12 transition-colors duration-500 overflow-hidden ${
        isDarkTheme ? 'bg-[#080809] text-[#F5F3F0]' : 'bg-[#FAF8F5] text-[#18191D]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Real Campus Architectural Photo with Reflection Pool */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-current/10 aspect-[16/10] bg-[#18191D]">
              <img
                src={campusImg}
                alt="SRM University-AP Modern Amaravati Campus and Reflective Pool"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Narrative, Button, and Blueprint Grid Background */}
          <div className="lg:col-span-5 space-y-6 relative">
            {/* Blueprint Grid Lines & Nodes in Background */}
            <div className="absolute -right-8 -bottom-12 w-64 h-64 pointer-events-none opacity-20 select-none">
              <svg viewBox="0 0 200 200" className="w-full h-full stroke-current" strokeWidth="0.5">
                <line x1="0" y1="50" x2="200" y2="50" />
                <line x1="0" y1="100" x2="200" y2="100" />
                <line x1="0" y1="150" x2="200" y2="150" />
                <line x1="50" y1="0" x2="50" y2="200" />
                <line x1="100" y1="0" x2="100" y2="200" />
                <line x1="150" y1="0" x2="150" y2="200" />
                <circle cx="100" cy="100" r="3" fill="#8A1B27" stroke="none" />
                <circle cx="150" cy="50" r="2.5" fill="#8A1B27" stroke="none" />
                <circle cx="50" cy="150" r="2.5" fill="#8A1B27" stroke="none" />
              </svg>
            </div>

            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27]" />
              <span className="text-[11px] font-mono-tech tracking-[0.25em] uppercase text-[#6C151E] dark:text-[#8A1B27] font-bold">
                HOSTED AT
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-[#6C151E] dark:text-[#8A1B27]">
              SRM UNIVERSITY-AP
              <br />
              <span className="text-current font-bold">AMARAVATI</span>
            </h2>

            {/* Paragraph */}
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-md ${
                isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
              }`}
            >
              A world-class campus, a global stage. Experience innovation, collaboration, and
              community at the heart of Amaravati.
            </p>

            {/* Button */}
            <div className="pt-2">
              <button
                id="venue-explore-btn"
                onClick={onExploreVenues}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#6C151E] hover:bg-[#8A1B27] text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(108,21,30,0.3)] hover:shadow-[0_6px_25px_rgba(138,27,39,0.45)] cursor-pointer"
              >
                <span>Explore Venues</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
