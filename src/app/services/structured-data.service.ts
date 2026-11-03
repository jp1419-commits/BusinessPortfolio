import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Company } from '../models/company.model';

/**
 * Publishes the business details as schema.org structured data (JSON-LD) so search engines
 * can show them. Built from company.json, so contact details live in one place.
 */
@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  publishOrganization({ company, hero, contact }: Company): void {
    const origin = this.document.location.origin;
    const [locality, country] = contact.location.split(',').map((part) => part.trim());

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: company.name,
      url: `${origin}/`,
      logo: `${origin}/logo.png`,
      image: `${origin}/logo.png`,
      description: hero.subtitle,
      email: contact.email,
      telephone: contact.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locality,
        ...(country ? { addressCountry: country } : {}),
      },
      sameAs: [contact.socials.linkedin].filter(Boolean),
      ...(hero.founder
        ? { founder: { '@type': 'Person', name: hero.founder.name, jobTitle: hero.founder.title } }
        : {}),
    };

    let script = this.document.getElementById('organization-schema');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'organization-schema';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}
