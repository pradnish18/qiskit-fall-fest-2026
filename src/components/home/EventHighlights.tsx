import React from 'react';
import { ArrowRight, Cpu, Code2, Presentation, Users } from 'lucide-react';
import workshopImg from '../../assets/images/event_workshop_1789450287999.jpg';
import hackathonImg from '../../assets/images/event_hackathon_1789450303529.jpg';
import keynoteImg from '../../assets/images/event_keynote_1789450318283.jpg';
import communityImg from '../../assets/images/event_community_1789450333688.jpg';

interface EventHighlightsProps {
  isDarkTheme?: boolean;
  onSelectHighlight?: (id: string) => void;
}

export const EventHighlights: React.FC<EventHighlightsProps> = ({
  isDarkTheme = false,
  onSelectHighlight,
}) => {
  const cards = [
    {
      id: 'workshops',
      title: 'World-Class Workshops',
      description: 'Learn from experts and get hands-on with Qiskit.',
      image: workshopImg,
      icon: <Cpu className="w-4 h-4 text-[#8A1B27]" />,
    },
    {
      id: 'hackathons',
      title: 'Quantum Hackathons',
      description: 'Build real solutions to global challenges.',
      image: hackathonImg,
      icon: <Code2 className="w-4 h-4 text-[#8A1B27]" />,
    },
    {
      id: 'sessions',
      title: 'Inspiring Technical Sessions',
      description: 'Explore the latest in quantum technology.',
      image: keynoteImg,
      icon: <Presentation className="w-4 h-4 text-[#8A1B27]" />,
    },
    {
      id: 'community',
      title: 'Global Community',
      description: 'Connect with a diverse and growing quantum ecosystem.',
      image: communityImg,
      icon: <Users className="w-4 h-4 text-[#8A1B27]" />,
    },
  ];

  return (
    <section
      id="schedule"
      className={`relative z-20 py-20 px-6 sm:px-8 md:px-12 transition-colors duration-500 ${
        isDarkTheme ? 'bg-[#080809] text-[#F5F3F0]' : 'bg-[#FAF8F5] text-[#18191D]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8A1B27]" />
            <h2 className="font-mono-tech text-xs tracking-[0.25em] uppercase font-bold text-current">
              EVENT HIGHLIGHTS
            </h2>
          </div>
          <div
            className={`text-xs font-mono-tech tracking-wider ${
              isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#5E6068]'
            }`}
          >
            More than an event — a global movement.
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHighlight && onSelectHighlight(item.id)}
              className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isDarkTheme
                  ? 'bg-[#141518] border-[#22242B] hover:border-[#6C151E]'
                  : 'bg-white border-[#18191D]/10 hover:border-[#6C151E]/40 hover:shadow-lg'
              }`}
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#18191D]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Bottom Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg border border-[#8A1B27]/30 flex items-center justify-center bg-[#6C151E]/5 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-sans font-bold text-base leading-snug text-current group-hover:text-[#6C151E] dark:group-hover:text-[#8A1B27] transition-colors">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDarkTheme ? 'text-[#A7A8AD]' : 'text-[#2D2E32]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Circular Arrow Button at bottom right */}
                <div className="flex justify-end pt-2">
                  <div className="w-7 h-7 rounded-full border border-current/20 flex items-center justify-center group-hover:border-[#6C151E] group-hover:text-[#6C151E] dark:group-hover:text-[#8A1B27] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
