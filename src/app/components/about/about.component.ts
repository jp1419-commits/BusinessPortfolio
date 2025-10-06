import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '../../models/company.model';
import { TeamMember } from '../../models/company.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `   
      <section id="about" class="section-padding bg-gray-100 text-center group">

      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
          <div class="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-lg text-gray-600 leading-relaxed">{{ about.mission }}</p>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-lg text-gray-600 leading-relaxed">{{ about.vision }}</p>
          </div>
        </div>

        <div class="text-center">
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
export class TeamComponent {

  // ---- THIS IS THE MISSING PIECE ----
  // Define the 'team' array here
  team = [
    {
      photo: 'assets/images/your-photo.jpg', // <-- IMPORTANT: Change this path!
      name: 'Your Name',
      role: 'Software Engineer',
      bio: 'Passionate developer creating innovative solutions for the web.',
      linkedin: 'https://linkedin.com/in/your-profile-url'
    },
    {
      photo: 'assets/images/another-person.jpg', // Example of a second member
      name: 'Jane Doe',
      role: 'UI/UX Designer',
      bio: 'Designing beautiful and intuitive user experiences.',
      linkedin: 'https://linkedin.com/in/jane-doe-url'
    }
    // Add more team members as objects here
  ];

}
