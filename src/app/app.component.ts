import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from './services/company.service';
import { StructuredDataService } from './services/structured-data.service';
import { Company } from './models/company.model';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    OverviewComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent
  ],
  providers: [CompanyService],
  template: `
    <div class="min-h-screen">
      <div *ngIf="companyData; else loading">
        <a
          href="#main"
          class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
          Skip to content
        </a>

        <app-navbar
          [companyName]="companyData.company.name"
          [logo]="companyData.company.logo">
        </app-navbar>

        <main id="main" tabindex="-1" class="focus:outline-none">
          <!-- Page 1 -->
          <app-hero [hero]="companyData.hero" [logo]="companyData.company.logo"></app-hero>

          <!-- Page 2: What We Deliver, How We Work, Client Value -->
          <app-overview
            [copy]="companyData.overview"
            [services]="companyData.services"
            [steps]="companyData.process"
            [values]="companyData.clientValue">
          </app-overview>

          <app-about [about]="companyData.about"></app-about>
          <app-contact [contact]="companyData.contact"></app-contact>
        </main>

        <app-footer 
          [companyInfo]="companyData.company"
          [contact]="companyData.contact">
        </app-footer>
      </div>
      
      <ng-template #loading>
        <div class="min-h-screen flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p class="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class AppComponent implements OnInit {
  companyData: Company | null = null;

  private readonly structuredData = inject(StructuredDataService);

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompanyData().subscribe({
      next: (data) => {
        this.companyData = data;
        this.structuredData.publishOrganization(data);
      },
      error: (error) => {
        console.error('Error loading company data:', error);
      }
    });
  }
}