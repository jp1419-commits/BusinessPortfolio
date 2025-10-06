import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 w-full bg-gray-900 text-white shadow-sm z-50 transition-all duration-300">
      <div class="container-max">
        <div class="flex items-center justify-between py-1">
          
          <div class="flex items-center space-x-3">
            <img [src]="logo" alt="Logo" class="w-8 h-8 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow">
            <span class="text-md font-bold text-white">{{ companyName }}</span>
          </div>
         
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#about" class="text-white-700 hover:text-primary-600 transition-colors font-medium">About</a>
            <a href="#services" class="text-white-700 hover:text-primary-600 transition-colors font-medium">Services</a>
            <a href="#projects" class="text-white-700 hover:text-primary-600 transition-colors font-medium">Projects</a>
            <a href="#team" class="text-white-700 hover:text-primary-600 transition-colors font-medium">Team</a>
            <a href="#contact" class="btn-primary">Contact Us</a>
          </div>
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMobileMenu()" class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div [class]="'md:hidden transition-all duration-300 overflow-hidden ' + (mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0')">
          <div class="flex flex-col space-y-4">
            <a href="#about" (click)="closeMobileMenu()" class="text-gray-700 hover:text-primary-600 transition-colors font-medium">About</a>
            <a href="#services" (click)="closeMobileMenu()" class="text-gray-700 hover:text-primary-600 transition-colors font-medium">Services</a>
            <a href="#projects" (click)="closeMobileMenu()" class="text-gray-700 hover:text-primary-600 transition-colors font-medium">Projects</a>
            <a href="#team" (click)="closeMobileMenu()" class="text-gray-700 hover:text-primary-600 transition-colors font-medium">Team</a>
            <a href="#contact" (click)="closeMobileMenu()" class="btn-primary inline-flex w-fit">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Input() companyName!: string;
  @Input() logo!: string;
  
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}