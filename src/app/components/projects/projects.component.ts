import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/company.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section-padding bg-gray-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Projects</h2>
          <div class="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent work and see how we've helped businesses transform their digital presence.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div *ngFor="let project of projects" class="card group">
            <div class="relative overflow-hidden">
              <img [src]="project.image" [alt]="project.title" 
                   class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
              <div class="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                <a [href]="project.link" target="_blank" 
                   class="text-white opacity-0 group-hover:opacity-100 transition-opacity btn-primary">
                  View Project
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of project.tech" 
                      class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  @Input() projects!: Project[];
}