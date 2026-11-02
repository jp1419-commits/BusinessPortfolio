export interface Company {
  company: CompanyInfo;
  hero: Hero;
  /** Labels and headlines for the three blocks on page 2. */
  overview: Overview;
  about: About;
  services: Service[];
  process: ProcessStep[];
  clientValue: ClientValue[];
  contact: Contact;
}

/** Icons available in `IconComponent`; referenced by name from company.json. */
export type IconName =
  | 'search'
  | 'lightbulb'
  | 'team'
  | 'gear'
  | 'handshake'
  | 'target'
  | 'chart'
  | 'shield'
  | 'globe'
  | 'star'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'send'
  | 'arrow-right'
  | 'chevron-right'
  | 'menu'
  | 'close';

/** Scenes available in `IllustrationComponent`. */
export type IllustrationName = 'systems' | 'software' | 'operations';

export interface CompanyInfo {
  name: string;
  tagline: string;
  logo: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  /** Part of `title` rendered in the brand gradient. */
  highlight: string;
  subtitle: string;
}

export interface About {
  label: string;
  title: string;
  mission: string;
  vision: string;
  values: AboutValue[];
}

export interface AboutValue {
  title: string;
  icon: IconName;
}

/** Small label plus headline that introduces a block on page 2. */
export interface SectionCopy {
  label: string;
  title: string;
  intro?: string;
}

export interface Overview {
  services: SectionCopy;
  process: SectionCopy;
  clientValue: SectionCopy;
}

/** A "What We Deliver" offering. */
export interface Service {
  title: string;
  description: string;
  illustration: IllustrationName;
  tags: string[];
}

/** A "How We Work" step. */
export interface ProcessStep {
  title: string;
  description: string;
  icon: IconName;
}

export interface ClientValue {
  title: string;
  icon: IconName;
}

export interface Contact {
  label: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}
