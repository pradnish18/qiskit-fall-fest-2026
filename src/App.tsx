import React, { useState, useEffect, useCallback } from 'react';
import { IntroState } from './types';
import { PersistentQuantumScene } from './components/3d/PersistentQuantumScene';
import { IntroSequence } from './components/intro/IntroSequence';
import { Navbar } from './components/navigation/Navbar';
import { Home } from './pages/Home';
import { RegisterModal } from './components/modals/RegisterModal';
import { VideoModal } from './components/modals/VideoModal';
import { VenueDetailsModal } from './components/modals/VenueDetailsModal';

export default function App() {
  // Deterministic state machine starting at STATE 0: INTRO_BLANK
  const [introState, setIntroState] = useState<IntroState>('INTRO_BLANK');
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [activationProgress, setActivationProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [sceneOpacity, setSceneOpacity] = useState(0);

  // Theme: false = Ivory (Primary reference look), true = Dark Graphite
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVenueDetailsOpen, setIsVenueDetailsOpen] = useState(false);

  // Toggle Dark / Light Theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Restart intro cinematic experience
  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setAssemblyProgress(0);
    setActivationProgress(0);
    setTransitionProgress(0);
    setSceneOpacity(0);
    setIntroState('INTRO_BLANK');
  };

  const handleIntroComplete = useCallback(() => {
    setIntroState('HOME');
    setTransitionProgress(1.0);
  }, []);

  // Home is visible once transition begins (ENTER_HOME) and when in HOME
  const isHomeVisible = introState === 'ENTER_HOME' || introState === 'HOME';

  // Compute background color
  const getBackgroundColor = () => {
    if (introState === 'HOME') {
      return isDarkTheme ? '#080809' : '#F5F3F0';
    }
    return '#080809';
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 ${
        isDarkTheme ? 'bg-[#080809] text-[#F5F3F0]' : 'bg-[#F5F3F0] text-[#18191D]'
      }`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {/* 0. Persistent Atmospheric Background (z-0: Behind 3D Scene and UI) */}
      <div
        id="persistent-ambient-background"
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            isDarkTheme || introState !== 'HOME'
              ? 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(108, 21, 30, 0.32) 0%, rgba(58, 11, 16, 0.16) 45%, rgba(8, 8, 9, 0.98) 85%)'
              : 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(245, 243, 240, 0.9) 0%, rgba(228, 224, 218, 0.7) 100%)',
        }}
      />

      {/* 1. The Persistent 3D Canvas (z-10, in front of background, continuous instance) */}
      <PersistentQuantumScene
        introPhase={introState}
        assemblyProgress={assemblyProgress}
        activationProgress={activationProgress}
        transitionProgress={transitionProgress}
        sceneOpacity={sceneOpacity}
        isDarkTheme={isDarkTheme}
      />

      {/* 2. Cinematic Intro Sequence Overlay (Deterministic State Machine) */}
      {introState !== 'HOME' && (
        <IntroSequence
          introState={introState}
          onStateChange={setIntroState}
          onAssemblyProgress={setAssemblyProgress}
          onActivationProgress={setActivationProgress}
          onSceneOpacity={setSceneOpacity}
          onTransitionProgress={setTransitionProgress}
          onComplete={handleIntroComplete}
        />
      )}

      {/* 3. Main Navigation Bar (Revealed during ENTER_HOME / HOME) */}
      <Navbar
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onReplayIntro={handleReplayIntro}
        visible={isHomeVisible}
      />

      {/* 4. Complete Home Page (Transitions seamlessly around the persistent 3D computer) */}
      <div
        className={`transition-opacity duration-1000 ${
          isHomeVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Home
          isDarkTheme={isDarkTheme}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenVideo={() => setIsVideoOpen(true)}
          onExploreVenues={() => setIsVenueDetailsOpen(true)}
          heroVisible={isHomeVisible}
          transitionProgress={transitionProgress}
        />
      </div>

      {/* 5. Modals */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isDarkTheme={isDarkTheme}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        isDarkTheme={isDarkTheme}
      />

      <VenueDetailsModal
        isOpen={isVenueDetailsOpen}
        onClose={() => setIsVenueDetailsOpen(false)}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
}
