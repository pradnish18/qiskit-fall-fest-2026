import React from 'react';
import { X, MapPin, Navigation, Compass, Building2, Train, Plane } from 'lucide-react';
import { EVENT_DETAILS } from '../../constants/eventData';

interface VenueDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

export const VenueDetailsModal: React.FC<VenueDetailsModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDarkTheme
            ? 'bg-[#121316] border-[#3A0B10] text-[#F5F3F0]'
            : 'bg-white border-[#18191D]/10 text-[#18191D]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 focus:outline-none"
          aria-label="Close venue details"
        >
          <X className="w-5 h-5 opacity-70 hover:opacity-100" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8A1B27] text-xs font-mono-tech uppercase tracking-widest font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>CAMPUS GUIDE & LOGISTICS</span>
            </div>
            <h2 className="font-serif-title text-3xl font-bold uppercase tracking-tight">
              SRM University-AP, Amaravati
            </h2>
            <p className="text-xs sm:text-sm opacity-75">
              {EVENT_DETAILS.venue.address}
            </p>
          </div>

          {/* Key Event Venues on Campus */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech tracking-wider uppercase text-[#8A1B27] font-bold">
              Event Zones & Auditoriums
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`p-4 rounded-xl border ${
                  isDarkTheme ? 'bg-[#18191D] border-[#2D2F36]' : 'bg-[#FAF8F5] border-[#D9D9DC]'
                }`}
              >
                <div className="flex items-center gap-2 font-serif-title font-bold text-sm mb-1">
                  <Building2 className="w-4 h-4 text-[#8A1B27]" />
                  <span>Main University Auditorium</span>
                </div>
                <p className="text-xs opacity-75">
                  Opening keynote ceremonies, IBM Quantum guest lectures, and award gala (1,200 capacity).
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDarkTheme ? 'bg-[#18191D] border-[#2D2F36]' : 'bg-[#FAF8F5] border-[#D9D9DC]'
                }`}
              >
                <div className="flex items-center gap-2 font-serif-title font-bold text-sm mb-1">
                  <Building2 className="w-4 h-4 text-[#8A1B27]" />
                  <span>Quantum Hackathon Arena</span>
                </div>
                <p className="text-xs opacity-75">
                  24/7 dedicated high-speed workstation labs with IBM Cloud cluster access points.
                </p>
              </div>
            </div>
          </div>

          {/* Transit & Commute Info */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono-tech tracking-wider uppercase text-[#8A1B27] font-bold">
              Transit & Connectivity
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-current/10">
                <Plane className="w-4 h-4 text-[#8A1B27] shrink-0" />
                <span>Vijayawada International Airport (VGA) — 45 mins via NH16</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-current/10">
                <Train className="w-4 h-4 text-[#8A1B27] shrink-0" />
                <span>Vijayawada Central Railway Station & Guntur Junction — 30 mins</span>
              </div>
            </div>
          </div>

          {/* Campus Shuttle Notice */}
          <div className="p-4 rounded-xl bg-[#6C151E]/15 border border-[#6C151E]/40 text-xs flex items-center gap-3">
            <Navigation className="w-4 h-4 text-[#8A1B27] shrink-0" />
            <span>Complimentary electric campus shuttles will run between Vijayawada hubs and SRM-AP during Oct 26–30.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
