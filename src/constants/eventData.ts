import { EventPhase, HighlightItem, PartnerItem, PillarItem, NavItem } from '../types';

export const APP_VERSION = 'beta-0.1';

export const EVENT_DETAILS = {
  name: 'QISKIT FALL FEST 2026',
  institution: 'SRM UNIVERSITY-AP × IBM QUANTUM',
  theme: 'A Decade of Quantum on Cloud',
  tagline: 'GLOBAL. OPEN. TOGETHER.',
  description:
    'Join a global celebration of quantum computing with workshops, technical sessions, hackathons and more — at SRM University-AP, Amaravati.',
  primaryCta: 'Register Now →',
  secondaryCta: 'Watch Video',
  venue: {
    campus: 'SRM University-AP',
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    country: 'India',
    address: 'Neerukonda, Mangalagiri Mandal, Guntur District, Andhra Pradesh 522502',
    description:
      'A world-class campus, a global stage. Experience innovation, collaboration, and community at the heart of Amaravati.',
  },
  dates: {
    // Official target date for countdown: Oct 5, 2026 09:00:00 IST
    targetISO: '2026-10-05T09:00:00+05:30',
  },
};

export const EVENT_PHASES: EventPhase[] = [
  {
    dates: '5 – 9 OCT 2026',
    title: 'Online Phase',
    type: 'online',
    badge: 'Virtual Global Access',
    description: 'Foundational Qiskit 1.0+ masterclasses, quantum circuit design, and algorithm optimization.',
  },
  {
    dates: '26 – 30 OCT 2026',
    title: 'On-Campus Phase',
    type: 'campus',
    badge: 'SRM University-AP',
    description: '48-hour in-person quantum hackathon, hardware demonstrations, keynote addresses, and awards gala.',
  },
];

export const PILLARS: PillarItem[] = [
  {
    title: 'LEARN',
    subtitle: 'Gain new skills from global experts',
    iconName: 'TrendingUp',
    color: '#D9D9DC',
  },
  {
    title: 'BUILD',
    subtitle: 'Turn ideas into real solutions',
    iconName: 'Box',
    color: '#D9D9DC',
  },
  {
    title: 'CONNECT',
    subtitle: 'Be part of a global community',
    iconName: 'Users',
    color: '#D9D9DC',
  },
  {
    title: 'CREATE IMPACT',
    subtitle: 'Shape a quantum future together',
    iconName: 'Infinity',
    color: '#D9D9DC',
  },
];

export const NEXT_DECADE_STATS = [
  {
    value: '200+',
    label: 'Host Institutions',
    caption: 'Across 30+ countries celebrating Qiskit Fall Fest annually',
  },
  {
    value: 'Global',
    label: 'Qiskit Community',
    caption: 'Half a million active open-source quantum researchers & developers',
  },
  {
    value: '10 Years',
    label: 'of Quantum on Cloud',
    caption: 'Since the historic debut of the IBM Quantum Experience in May 2016',
  },
];

export const EVENT_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'workshops',
    title: 'World-Class Workshops',
    description: 'Learn from experts and get hands-on with Qiskit.',
    tag: 'Hands-On Labs',
    linkText: 'Learn more',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hackathons',
    title: 'Quantum Hackathons',
    description: 'Build real solutions to global challenges.',
    tag: '48-Hour Sprint',
    linkText: 'View Tracks',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sessions',
    title: 'Inspiring Technical Sessions',
    description: 'Explore the latest in quantum technology.',
    tag: 'Keynotes & Panels',
    linkText: 'Speaker Lineup',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'community',
    title: 'Global Community',
    description: 'Connect with a diverse and growing quantum ecosystem.',
    tag: 'Networking',
    linkText: 'Join Network',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
];

export const PARTNERS: PartnerItem[] = [
  {
    name: 'SRM UNIVERSITY-AP',
    role: 'Host Academic Institution',
    logoType: 'srm',
    description: 'Premier multidisciplinary research university located in Amaravati, pioneering quantum education.',
  },
  {
    name: 'IBM QUANTUM',
    role: 'Co-Host & Technology Partner',
    logoType: 'ibm',
    description: 'Global quantum computing leader powering enterprise and research quantum clouds worldwide.',
  },
  {
    name: 'QISKIT',
    role: 'Open-Source Quantum Software Development Kit',
    logoType: 'qiskit',
    description: 'The world\'s most popular open-source software stack for programming utility-scale quantum computers.',
  },
];

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Venues', href: '#venues' },
  { label: 'Team', href: '#team' },
  { label: 'FAQs', href: '#faqs' },
];

export const FAQS = [
  {
    q: 'What is Qiskit Fall Fest?',
    a: 'Qiskit Fall Fest is a premier annual series of quantum computing events supported by IBM Quantum and hosted by top educational and research institutions worldwide, featuring workshops, hackathons, and research talks.',
  },
  {
    q: 'Who can participate in Qiskit Fall Fest 2026 at SRM University-AP?',
    a: 'The fest is open to undergraduate and graduate students, researchers, faculty members, software developers, and industry professionals interested in quantum computation. No prior quantum hardware background is required for foundational tracks.',
  },
  {
    q: 'Is there any registration fee?',
    a: 'No, participation in both the Online Phase and the On-Campus Phase is completely free of charge, sponsored by SRM University-AP and IBM Quantum.',
  },
  {
    q: 'Will participants receive IBM Quantum certificates?',
    a: 'Yes, attendees who complete the requisite workshops and hackathon milestones will receive verified Qiskit Fall Fest 2026 credentials co-issued by SRM University-AP and IBM Quantum.',
  },
];
