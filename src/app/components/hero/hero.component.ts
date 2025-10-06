import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/company.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="gradient-bg text-white section-padding min-h-screen flex items-center">
      <div class="container-max relative">
        <div class="text-center max-w-4xl mx-auto">


          <!-- <h2 class="text-3xl md:text-4xl font-semibold mb-4">{{ companyInfo.tagline }}</h2> -->
          
          <!-- CHANGE: Added a logo image above the main heading -->
          <!-- <div class="relative mb-6">
            <img [src]="companyInfo.logo" [alt]="companyInfo.name + ' logo'" 
                  class="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow">
          </div> -->
          <h1 class="text-5xl md:text-7xl font-bold mb-1 leading-tight">
            <!-- {{ companyInfo.name }} -->
                 {{ "Your Innovation Partner" }}
          </h1>
          <div class="w-44 h-0.5 bg-primary-400 mx-auto mb-6"></div>

          <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">   
            Your partner specialized in end-to-end IT Project Management and Software Development. 
            <br>We delivery wide range of projects, from small to large-scale, including desktop applications, web APIs, ERP, SAP integrations (RFC), and IT services.
            <br><br>Our proficiency extends to various methodologies, including Agile, Waterfall, & knowledgeable in PMBOK practice. Particularly skilled in Quality, Cost, and Delivery (QCD), as well as in issue and risk management.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <!-- About link -->
           <a href="#about" class="btn-secondary">About
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
            <!-- Projects services -->
            <a href="#services" class="btn-primary bg-white text-primary-600 hover:bg-gray-900 text-center">Our Services
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
            <!-- contacts link -->
            <a href="#contact" class="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-600 text-center">Get In Touch
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>

          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" class="text-white hover:text-blue-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  `
})
export class HeroComponent {
  @Input() companyInfo!: CompanyInfo;
}