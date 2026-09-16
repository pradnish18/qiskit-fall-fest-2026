import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, Sparkles } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme = true,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: 'SRM University-AP',
    track: 'hackathon',
    experience: 'intermediate',
  });
  const [regId, setRegId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `QFF26-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegId(generatedId);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDarkTheme
            ? 'bg-[#121316] border-[#3A0B10] text-[#F5F3F0]'
            : 'bg-white border-[#18191D]/10 text-[#18191D]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 transition-colors focus:outline-none"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5 opacity-70 hover:opacity-100" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-[#8A1B27] text-xs font-mono-tech uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL REGISTRATION</span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                Join Qiskit Fall Fest 2026
              </h2>
              <p
                className={`text-xs ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
                }`}
              >
                SRM University-AP × IBM Quantum. Free admission for students, researchers, and developers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech tracking-wider uppercase mb-1.5 opacity-80">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#8A1B27] ${
                    isDarkTheme
                      ? 'bg-[#18191D] border-[#2D2F36] text-white'
                      : 'bg-[#FAF8F5] border-[#D9D9DC] text-black'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech tracking-wider uppercase mb-1.5 opacity-80">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#8A1B27] ${
                    isDarkTheme
                      ? 'bg-[#18191D] border-[#2D2F36] text-white'
                      : 'bg-[#FAF8F5] border-[#D9D9DC] text-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech tracking-wider uppercase mb-1.5 opacity-80">
                    Institution / Org
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#8A1B27] ${
                      isDarkTheme
                        ? 'bg-[#18191D] border-[#2D2F36] text-white'
                        : 'bg-[#FAF8F5] border-[#D9D9DC] text-black'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech tracking-wider uppercase mb-1.5 opacity-80">
                    Participation Track
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#8A1B27] ${
                      isDarkTheme
                        ? 'bg-[#18191D] border-[#2D2F36] text-white'
                        : 'bg-[#FAF8F5] border-[#D9D9DC] text-black'
                    }`}
                  >
                    <option value="hackathon">Hackathon (Campus Phase)</option>
                    <option value="workshops">Masterclasses (Online Phase)</option>
                    <option value="all">Full Fest Pass (Hybrid)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#6C151E] hover:bg-[#8A1B27] text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Complete Registration →
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#6C151E]/15 text-[#8A1B27] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-title text-2xl font-bold uppercase">
                Registration Confirmed!
              </h2>
              <p
                className={`text-xs ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
                }`}
              >
                Welcome to Qiskit Fall Fest 2026. Your delegate badge has been issued.
              </p>
            </div>

            {/* Virtual Credential Badge Card */}
            <div
              className={`p-5 rounded-2xl border text-left space-y-3 ${
                isDarkTheme ? 'bg-[#18191D] border-[#3A0B10]' : 'bg-[#FAF8F5] border-[#D9D9DC]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-current/10 pb-2">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#8A1B27] font-bold">
                  DELEGATE PASS // 2026
                </span>
                <span className="font-mono-tech text-xs font-bold">{regId}</span>
              </div>
              <div className="space-y-1">
                <div className="font-serif-title text-base font-bold">{formData.name}</div>
                <div className="text-xs opacity-75">{formData.institution}</div>
                <div className="text-[11px] font-mono-tech text-[#8A1B27] uppercase">
                  Track: {formData.track.toUpperCase()}
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] font-mono-tech opacity-60">
                <span>OCT 5–30, 2026</span>
                <QrCode className="w-6 h-6 text-current" />
              </div>
            </div>

            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#18191D] hover:bg-[#22242B] text-white text-xs font-mono-tech tracking-wider uppercase transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
