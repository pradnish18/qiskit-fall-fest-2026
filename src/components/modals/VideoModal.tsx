import React from 'react';
import { X, Play, ShieldAlert } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, isDarkTheme = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border transition-all ${
          isDarkTheme ? 'bg-[#0E0F12] border-[#3A0B10]' : 'bg-white border-[#18191D]/10'
        }`}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-current/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8A1B27]" />
            <span className="text-xs font-mono-tech uppercase tracking-widest font-bold">
              IBM QUANTUM // A DECADE OF QUANTUM ON CLOUD
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 focus:outline-none"
            aria-label="Close video player"
          >
            <X className="w-5 h-5 opacity-75 hover:opacity-100" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/HQKfxq0J14Y?autoplay=1&mute=0&rel=0"
            title="IBM Quantum Chandelier Documentary & Qiskit Fall Fest"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 sm:p-6 text-xs leading-relaxed opacity-75">
          Celebrating 10 years of quantum hardware access via the IBM Quantum Cloud, exploring how
          the dilution refrigerator chandelier cools qubits to 15 millikelvin — colder than outer space.
        </div>
      </div>
    </div>
  );
};
