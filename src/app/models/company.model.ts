export interface Company {
  company: CompanyInfo;
  hero: Hero;
  /** Labels and headlines for the blocks on page 2 (What We Deliver, How We Work). */
  overview: Overview;
  about: About;
  services: Service[];
  process: ProcessStep[];
  /** The Tech Stack page: technologies and project-delivery roles we deliver and staff for. */
  techStack: TechStack;
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
  | 'code'
  | 'monitor'
  | 'smartphone'
  | 'database'
  | 'cloud'
  | 'layers'
  | 'clipboard'
  | 'arrow-right'
  | 'arrow-up'
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
  /** Small label above the Client Value list on the front page. */
  valuesLabel: string;
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

export interface TechStack {
  label: string;
  title: string;
  intro?: string;
  groups: TechGroup[];
  /** Closing line for stacks that aren't listed. */
  more: string;
  /** Link text after `more`; opens Get In Touch. */
  moreLink: string;
}

/** A group of technologies, or a role we staff (e.g. Technical Project Managers). */
export interface TechGroup {
  title: string;
  icon: IconName;
  /** Technologies, or for a role the methods and tools they work with. */
  items: string[];
  /** Highlighted, wider card (used for Technical Project Managers). */
  featured?: boolean;
  /** Small label above the title. */
  kicker?: string;
  description?: string;
}

export interface ClientValue {
  title: string;
  icon: IconName;
}

export interface Contact {
  label: string;
  title: string;
  intro: string;
  /** Call to action shown on the email card, e.g. "Send us your ideas". */
  emailCta: string;
  /** Call to action shown on the phone card, e.g. "Give us a call". */
  phoneCta: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  socials: {
    linkedin: string;
  };
}
