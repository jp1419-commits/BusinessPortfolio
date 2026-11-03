import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import content from '../content/company.json';
import { Company } from './models/company.model';
import { PageScrollService } from './services/page-scroll.service';
import { StructuredDataService } from './services/structured-data.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
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
    TechStackComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The pages scroll inside the app root (see `.page-scroller` in styles.css).
  host: { class: 'page-scroller' },
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      Skip to content
    </a>

    <app-navbar [companyName]="data.company.name" [logo]="data.company.logo" />

    <main id="main" tabindex="-1" class="focus:outline-none">
      <!-- Page 1, including Client Value -->
      <app-hero [hero]="data.hero" [logo]="data.company.logo" [values]="data.clientValue" />

      <!-- Page 2: What We Deliver, How We Work -->
      <app-overview [copy]="data.overview" [services]="data.services" [steps]="data.process" />

      <app-tech-stack [stack]="data.techStack" />

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

    // Page-by-page scrolling (see PageScrollService). Registered before the child components
    // are created, so the navbar can follow the scroll position.
    const pageScroll = inject(PageScrollService);
    pageScroll.attach(inject<ElementRef<HTMLElement>>(ElementRef).nativeElement);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(pageScroll.enable()));
  }
}
