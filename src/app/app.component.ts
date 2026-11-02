import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import content from '../content/company.json';
import { Company } from './models/company.model';
import { StructuredDataService } from './services/structured-data.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

/** Site content, bundled at build time so the page renders without waiting on a download. */
const COMPANY = content as Company;

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    OverviewComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      Skip to content
    </a>

    <app-navbar [companyName]="data.company.name" [logo]="data.company.logo" />

    <main id="main" tabindex="-1" class="focus:outline-none">
      <!-- Page 1 -->
      <app-hero [hero]="data.hero" [logo]="data.company.logo" />

      <!-- Page 2: What We Deliver, How We Work, Client Value -->
      <app-overview
        [copy]="data.overview"
        [services]="data.services"
        [steps]="data.process"
        [values]="data.clientValue"
      />

      <app-about [about]="data.about" />
      <app-contact [contact]="data.contact" />
    </main>

    <app-footer [companyInfo]="data.company" [contact]="data.contact" />
  `,
})
export class AppComponent {
  protected readonly data = COMPANY;

  constructor() {
    inject(StructuredDataService).publishOrganization(this.data);
  }
}
