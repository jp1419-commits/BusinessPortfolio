export interface Company {
  company: CompanyInfo;
  about: About;
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  contact: Contact;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  logo: string;
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

export interface Service {
  title: string;
  description: string;
  icon: string;
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