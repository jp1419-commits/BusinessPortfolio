import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './services/company.service';
import { Company } from './models/company.model';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent
  ],
  providers: [CompanyService],
  template: `
    <div class="min-h-screen">
      <div *ngIf="companyData; else loading">
        <!-- <app-navbar 
          [companyName]="companyData.company.name"
          [logo]="companyData.company.logo">
        </app-navbar> -->
        
        <app-hero [companyInfo]="companyData.company"></app-hero>
        
        <!-- <app-about [about]="companyData.about"></app-about>
        <app-services [services]="companyData.services"></app-services>
        <app-projects [projects]="companyData.projects"></app-projects>

        <app-team [team]="companyData.team"></app-team>
        <app-contact [contact]="companyData.contact"></app-contact>
        
        <app-footer 
          [companyInfo]="companyData.company"
          [contact]="companyData.contact">
        </app-footer> -->
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

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompanyData().subscribe({
      next: (data) => {
        this.companyData = data;
      },
      error: (error) => {
        console.error('Error loading company data:', error);
      }
    });
  }
}