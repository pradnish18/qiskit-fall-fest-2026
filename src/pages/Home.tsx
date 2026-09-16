import React from 'react';
import { Hero } from '../components/home/Hero';
import { ExperienceStrip } from '../components/home/ExperienceStrip';
import { NextDecade } from '../components/home/NextDecade';
import { EventHighlights } from '../components/home/EventHighlights';
import { Countdown } from '../components/home/Countdown';
import { Partners } from '../components/home/Partners';
import { Venue } from '../components/home/Venue';
import { FaqSection } from '../components/home/FaqSection';
import { RegistrationCTA } from '../components/home/RegistrationCTA';
import { Footer } from '../components/home/Footer';

interface HomeProps {
  isDarkTheme: boolean;
  onOpenRegister: () => void;
  onOpenVideo: () => void;
  onExploreVenues: () => void;
  heroVisible?: boolean;
  transitionProgress?: number;
}

export const Home: React.FC<HomeProps> = ({
  isDarkTheme,
  onOpenRegister,
  onOpenVideo,
  onExploreVenues,
  heroVisible = true,
  transitionProgress = 1,
}) => {
  return (
    <main className="relative z-20 w-full overflow-hidden">
      {/* 1. Hero Section (with 3D Quantum Chandelier in continuous position) */}
      <Hero
        isDarkTheme={isDarkTheme}
        onOpenRegister={onOpenRegister}
        onOpenVideo={onOpenVideo}
        visible={heroVisible}
        transitionProgress={transitionProgress}
      />

      {/* 2. Section 02: 4 Pillars Burgundy Experience Strip */}
      <ExperienceStrip isDarkTheme={isDarkTheme} />

      {/* 3. Section 03: The Next Decade Together + 3D Quantum Globe */}
      <NextDecade isDarkTheme={isDarkTheme} />

      {/* 4. Section 04: Event Highlights (Workshops, Hackathons, Sessions, Community) */}
      <EventHighlights
        isDarkTheme={isDarkTheme}
        onSelectHighlight={() => onOpenRegister()}
      />

      {/* 5. Section 05: Countdown Section (The Future is a Click Away) */}
      <Countdown />

      {/* 6. Section 06: Our Partners (SRM University-AP, IBM, Qiskit) */}
      <Partners isDarkTheme={isDarkTheme} />

      {/* 7. Section 07: Venue Section (SRM University-AP Amaravati Campus) */}
      <Venue
        isDarkTheme={isDarkTheme}
        onExploreVenues={onExploreVenues}
      />

      {/* 8. Section 08: Frequently Asked Questions */}
      <FaqSection isDarkTheme={isDarkTheme} />

      {/* 9. Section 09: Ready to Take Part? Large Burgundy CTA */}
      <RegistrationCTA onOpenRegister={onOpenRegister} />

      {/* 9. Section 09: Footer */}
      <Footer isDarkTheme={isDarkTheme} />
    </main>
  );
};
