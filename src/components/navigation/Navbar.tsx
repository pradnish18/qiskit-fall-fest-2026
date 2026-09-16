import React, { useState, useEffect } from 'react';
import { NAVIGATION_ITEMS } from '../../constants/eventData';
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenRegister: () => void;
  onReplayIntro?: () => void;
  visible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkTheme,
  onToggleTheme,
  onOpenRegister,
  onReplayIntro,
  visible = true,
}) => {
  const [activeSection, setActiveSection] = useState<string>('venues');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll and track active section on click or scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sectionIds = ['about', 'experience', 'schedule', 'venues', 'team', 'faqs'];
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      
      // Default to venues or about if near the top
      if (window.scrollY < 400) {
        // If hash in URL, match that; else default to 'venues' as shown in the reference design
        const hash = window.location.hash.replace('#', '');
        if (hash && sectionIds.includes(hash)) {
          setActiveSection(hash);
        } else {
          setActiveSection('venues');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navHeight = 72;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
      } ${
        isDarkTheme
          ? 'bg-[#080809] border-b border-[#232428] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-[#F5F3F0] border-b border-[#E3DFD7] shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Left: Brand / Event Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col focus:outline-none"
          aria-label="Qiskit Fall Fest 2026 Home"
        >
          <span
            className={`font-serif-title font-black text-sm sm:text-base tracking-[0.05em] uppercase transition-colors leading-tight ${
              isDarkTheme ? 'text-[#F5F3F0] group-hover:text-white' : 'text-[#18191D] group-hover:text-[#6C151E]'
            }`}
          >
            QISKIT FALL FEST
          </span>
          <span
            className={`text-[10px] tracking-[0.25em] font-mono-tech font-bold leading-tight ${
              isDarkTheme ? 'text-[#8A1B27]' : 'text-[#6C151E]'
            }`}
          >
            2026
          </span>
        </a>

        {/* Center: Navigation Links (Matching Figma reference styling & active pill) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2" aria-label="Main Navigation">
          {NAVIGATION_ITEMS.map((item) => {
            const itemId = item.href.replace('#', '');
            const isActive = activeSection === itemId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDarkTheme
                      ? 'bg-[#202126] text-[#F5F3F0] font-semibold shadow-sm'
                      : 'bg-[#E5E1D8] text-[#18191D] font-semibold shadow-sm'
                    : isDarkTheme
                    ? 'text-[#A7A8AD] hover:text-[#F5F3F0] hover:bg-white/[0.05]'
                    : 'text-[#5E6068] hover:text-[#18191D] hover:bg-black/[0.04]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle Pill & Join Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Theme Switcher Pill (Matching Figma [ ☀️ | 🌙 ] dual state capsule) */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className={`relative flex items-center p-1 rounded-full border transition-all duration-200 focus:outline-none cursor-pointer ${
              isDarkTheme
                ? 'bg-[#141518] border-[#2A2B32]'
                : 'bg-[#ECEAE4] border-[#D9D6CE]'
            }`}
            aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {/* Sun Icon side */}
            <span
              className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                !isDarkTheme
                  ? 'bg-white text-[#6C151E] shadow-sm'
                  : 'text-[#6C6E76] hover:text-[#A7A8AD]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </span>

            {/* Moon Icon side */}
            <span
              className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                isDarkTheme
                  ? 'bg-[#23242A] text-[#F5F3F0] shadow-sm'
                  : 'text-[#8A8B92] hover:text-[#18191D]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Primary "Join →" Button (Solid deep burgundy pill button matching Figma) */}
          <button
            id="nav-join-btn"
            onClick={onOpenRegister}
            className="group flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full bg-[#6C151E] hover:bg-[#8A1B27] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-[0_2px_8px_rgba(108,21,30,0.3)] hover:shadow-[0_4px_14px_rgba(138,27,39,0.45)] cursor-pointer"
          >
            <span>Join</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none ${
              isDarkTheme
                ? 'text-[#F5F3F0] hover:bg-[#18191D]'
                : 'text-[#18191D] hover:bg-[#EAE7E1]'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Also 100% Solid Non-Transparent) */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 pt-3 pb-6 border-t transition-all ${
            isDarkTheme
              ? 'bg-[#080809] border-[#232428]'
              : 'bg-[#F5F3F0] border-[#E3DFD7]'
          }`}
        >
          <div className="flex flex-col space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const itemId = item.href.replace('#', '');
              const isActive = activeSection === itemId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium py-2.5 px-3.5 rounded-lg transition-colors ${
                    isActive
                      ? isDarkTheme
                        ? 'bg-[#202126] text-white font-semibold'
                        : 'bg-[#E5E1D8] text-[#18191D] font-semibold'
                      : isDarkTheme
                      ? 'text-[#A7A8AD] hover:text-white'
                      : 'text-[#5E6068] hover:text-[#18191D]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

