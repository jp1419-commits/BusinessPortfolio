import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/company.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
     <section class="relative text-white section-padding min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
            <video #videoPlayer loop muted playsinline 
             (click)="togglePlayPause()"
             class="absolute top-1/2 left-1/2 max-w-[90vw] max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2 rounded-xl object-contain z-0">
        <source src="assets/vid.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>

            <div class="absolute top-1/2 left-1/2 max-w-[90vw] max-h-[90vh] w-full h-full transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black opacity-50 z-0"></div>

      
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" class="text-white hover:text-blue-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </div>

            <button (click)="togglePlayPause()" 
              *ngIf="!isVideoPlaying"
             class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-30 backdrop-blur-sm text-white rounded-full p-5 hover:bg-opacity-50 transition-colors">
        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 15.132A1.25 1.25 0 005.25 16.25h9.5A1.25 1.25 0 0016 14.75V5.25a1.25 1.25 0 00-1.25-1.25h-9.5A1.25 1.25 0 004 5.25v9.5c0 .414.202.79.518.982zM5.5 5.25h9v9.5h-9v-9.5z" /><path d="M7.75 10.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" /></svg>
      </button>

    </section>
  `
})
export class HeroComponent {
  @Input() companyInfo!: CompanyInfo;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isVideoPlaying = false;

  togglePlayPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isVideoPlaying = true;
    } else {
      video.pause();
      this.isVideoPlaying = false;
    }
  }
  // Helper function to handle the asynchronous play() method
  async playVideo(video: HTMLVideoElement) {
    try {
      await video.play();
      this.isVideoPlaying = true; // Hide the button when playing
    } catch (err) {
      // Handle cases where play() is rejected (e.g., autoplay blocked)
      console.error("Video play failed:", err);
      this.isVideoPlaying = false; // Keep button visible if play fails
    }
  }
}

