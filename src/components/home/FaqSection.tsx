import React, { useState } from 'react';
import { FAQS } from '../../constants/eventData';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  isDarkTheme?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isDarkTheme = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className={`relative z-20 py-20 px-6 sm:px-8 md:px-12 transition-colors duration-500 border-b ${
        isDarkTheme
          ? 'bg-[#080809] text-[#F5F3F0] border-[#18191D]'
          : 'bg-[#FAF8F5] text-[#18191D] border-[#18191D]/10'
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#8A1B27]" />
            <h2 className="font-mono-tech text-xs tracking-[0.25em] uppercase font-bold text-current">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div
            className={`text-xs font-mono-tech tracking-wider flex items-center gap-1.5 ${
              isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8A1B27]" />
            <span>Everything you need to know</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-serif-title text-3xl sm:text-4xl font-bold tracking-tight">
            Have Questions? We Have Answers.
          </h3>
          <p
            className={`text-sm max-w-xl ${
              isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
            }`}
          >
            Learn about eligibility, certifications, track formats, and campus accommodation for Qiskit Fall Fest 2026.
          </p>
        </div>

        {/* Accordion FAQ items */}
        <div className="divide-y divide-current/10 border-y border-current/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={faq.q} className="py-5 transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-sans text-base sm:text-lg font-semibold transition-colors ${
                      isOpen
                        ? 'text-[#6C151E] dark:text-[#8A1B27]'
                        : 'group-hover:text-[#6C151E] dark:group-hover:text-[#8A1B27]'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`p-1 rounded-full border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#6C151E] border-[#6C151E] text-white'
                        : isDarkTheme
                        ? 'border-[#232428] text-[#A7A8AD]'
                        : 'border-[#D9D9DC] text-[#5E6068]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-sm sm:text-base leading-relaxed animate-fade-in font-normal text-[#44464D] dark:text-[#A7A8AD]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
