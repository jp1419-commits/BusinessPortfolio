import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/company.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section-padding bg-white">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div class="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive technology solutions to help your business grow and succeed in the digital world.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div *ngFor="let service of services" class="card p-2 text-center group hover:bg-blue-50 hover:text-white transition-colors cursor-pointer">
            <div class="text-4xl mb-4">{{ service.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  @Input() services!: Service[];
}