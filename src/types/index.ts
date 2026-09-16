export interface EventPhase {
  dates: string;
  title: string;
  type: 'online' | 'campus';
  badge: string;
  description: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  linkText: string;
}

export interface PartnerItem {
  name: string;
  role: string;
  logoType: 'srm' | 'ibm' | 'qiskit';
  description?: string;
}

export interface PillarItem {
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type IntroState =
  | 'INTRO_BLANK'
  | 'INTRO_LINE'
  | 'INTRO_FIELD'
  | 'INTRO_TEXT'
  | 'INTRO_LOADING'
  | 'WAIT_FIRST_SCROLL'
  | 'ASSEMBLY'
  | 'ACTIVATION'
  | 'WAIT_SECOND_SCROLL'
  | 'ENTER_HOME'
  | 'HOME';

export type IntroPhase = IntroState;
