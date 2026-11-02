import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `   
      <section id="about" class="section-padding bg-gray-100 text-center group">

      <div class="container-max">
        <div class="text-center mb-16" appReveal>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
          <div class="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center mb-16" [appReveal]="100">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-lg text-gray-600 leading-relaxed">{{ about.mission }}</p>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-lg text-gray-600 leading-relaxed">{{ about.vision }}</p>
          </div>
        </div>

        <div class="text-center" [appReveal]="150">
          <h3 class="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
          <div class="grid grid-cols-3 md:grid-cols-3 gap-6">
            <div *ngFor="let value of about.values" 
                 class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-center w-full">
              <div class="text-primary-600 font-semibold text-center">{{ value }}</div>
            </div>
          </div>
        </div>
<!-- 
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-8">Our Values</h3> 
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
              <div *ngFor="let value of about.values" 
                  class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div class="text-primary-600 font-semibold">{{ value }}</div>
              </div>
        
            </div>
        </div> -->
      </div>

    </section>
  `
})
export class AboutComponent {
  @Input() about!: About;
}
