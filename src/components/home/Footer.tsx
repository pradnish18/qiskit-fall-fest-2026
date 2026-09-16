import React from 'react';
import { NAVIGATION_ITEMS, APP_VERSION } from '../../constants/eventData';

interface FooterProps {
  isDarkTheme?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkTheme = false }) => {
  return (
    <footer
      id="main-footer"
      className={`relative z-20 py-12 px-6 sm:px-8 md:px-12 transition-colors duration-500 border-t ${
        isDarkTheme
          ? 'bg-[#080809] text-[#F5F3F0] border-[#18191D]'
          : 'bg-[#FAF8F5] text-[#18191D] border-[#18191D]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Brand Identity & Emblem matching Image 4 */}
          <div className="flex items-center gap-3">
            {/* Circular ruby ring emblem */}
            <div className="w-9 h-9 rounded-full border border-[#8A1B27] flex items-center justify-center p-1.5 shrink-0">
              <div className="w-full h-full rounded-full border border-[#8A1B27]/40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6C151E]" />
              </div>
            </div>
            <div>
              <div className="font-sans font-bold text-sm tracking-wide uppercase leading-tight">
                QISKIT FALL FEST 2026
              </div>
              <div
                className={`text-[11px] font-sans ${
                  isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
                }`}
              >
                A Decade of Quantum on Cloud
              </div>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav
            className="flex flex-wrap items-center gap-6 sm:gap-8"
            aria-label="Footer Navigation"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={`footer-${item.label}`}
                href={item.href}
                className={`text-xs uppercase tracking-wider transition-colors font-medium ${
                  isDarkTheme
                    ? 'text-[#A7A8AD] hover:text-white'
                    : 'text-[#5E6068] hover:text-[#6C151E]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Social Icons matching Image 4 */}
          <div className="flex items-center gap-5">
            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/qiskit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-current hover:text-[#6C151E] dark:hover:text-[#8A1B27] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/qiskit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-current hover:text-[#6C151E] dark:hover:text-[#8A1B27] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/qiskit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-current hover:text-[#6C151E] dark:hover:text-[#8A1B27] transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/qiskit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-current hover:text-[#6C151E] dark:hover:text-[#8A1B27] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright notice right-aligned under social links exactly as in Image 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-current/10">
          <span
            className={`text-[10px] font-mono-tech tracking-wider uppercase px-2 py-0.5 rounded border inline-block w-fit ${
              isDarkTheme
                ? 'border-[#232428] text-[#8A1B27] bg-[#141518]'
                : 'border-[#E3DFD7] text-[#6C151E] bg-[#EAE7E1]'
            }`}
          >
            v{APP_VERSION}
          </span>
          <p
            className={`text-[11px] ${
              isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
            }`}
          >
            © 2026 Qiskit Fall Fest | SRM University-AP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
