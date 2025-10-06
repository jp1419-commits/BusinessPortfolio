import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../models/company.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="team" class="section-padding bg-white">

      <div class="container-max">
        <div class="flex justify-center max-w-full">
          
          <div class="w-full xl:w-1/2 md:w-1/3 lg:w-1/4"> 
            <div *ngFor="let member of team" class="card text-center group">
              <div class="p-6">
                <div class="relative mb-6">
                    <!-- Title -->
                  <!-- <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Innovation Partner</h2>
                    <div class="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
                  </div> -->

                  <!-- Image -->
                  <img [src]="member.photo" [alt]="member.name" 
                      class="w-52 h-30 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow">
                  <div class="absolute inset-0 rounded-full bg-primary-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
                <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
                <p class="text-gray-600 text-sm mb-4 leading-relaxed">{{ member.bio }}</p>
                <a [href]="member.linkedin" target="_blank" 
                  class="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
                  </svg>
                  LinkedIn
                </a>

        <!-- <div class="text-center mb-16">
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Your Innovation Partner, with decade experience in IT industry, specialized in end-to-end IT Project Management and Software Development. 
            <br>Successfully handled a wide range of projects, from small to large-scale, including desktop applications, web APIs, ERP, SAP integrations (RFC), and IT services.
            <br><br>My proficiency extends to various methodologies, including Agile, Waterfall, & knowledgeable in PMBOK practice. Particularly skilled in Quality, Cost, and Delivery (QCD), as well as in issue and risk management.
          </p>
        </div> -->
              </div>
            </div>

            
          </div>
        </div>
  <br>


      </div>





    </section>
  `
})
export class TeamComponent {
  @Input() team!: TeamMember[];
}