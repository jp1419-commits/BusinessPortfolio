export interface Company {
  company: CompanyInfo;
  hero: Hero;
  about: About;
  services: Service[];
  process: ProcessStep[];
  clientValue: ClientValue[];
  projects: Project[];
  team: TeamMember[];
  contact: Contact;
}

/** Icons available in `IconComponent`; referenced by name from company.json. */
export type IconName =
  | 'laptop'
  | 'code'
  | 'headset'
  | 'search'
  | 'lightbulb'
  | 'team'
  | 'gear'
  | 'handshake'
  | 'target'
  | 'chart'
  | 'shield'
  | 'arrow-right'
  | 'chevron-right'
  | 'menu'
  | 'close';

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
  mission: string;
  vision: string;
  values: string[];
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  bio: string;
}

/** A "What We Deliver" offering. */
export interface Service {
  title: string;
  description: string;
  icon: IconName;
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

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  bio: string;
}

export interface Contact {
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
