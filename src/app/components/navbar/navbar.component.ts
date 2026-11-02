import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMobileMenu()' },
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        class="container-max flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          class="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
        >
          <img [ngSrc]="logo()" width="40" height="40" priority alt="" class="h-10 w-10" />
          <span
            class="max-w-[7.5rem] text-[17px] font-extrabold leading-[1.05] tracking-tight text-ink"
          >
            {{ companyName() }}
          </span>
        </a>

        <!-- Desktop menu -->
        <div class="hidden items-center gap-8 lg:flex">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              class="rounded text-[15px] font-medium text-slate-600 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
            >
              {{ link.label }}
            </a>
          }
          <a href="#contact" class="btn-primary">Contact Us</a>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="-mr-2 rounded-lg p-2 text-ink transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden"
          aria-controls="mobile-menu"
          [attr.aria-expanded]="mobileMenuOpen()"
          [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'"
          (click)="toggleMobileMenu()"
        >
          <app-icon [name]="mobileMenuOpen() ? 'close' : 'menu'" class="h-6 w-6" />
        </button>
      </nav>

      <!-- Mobile menu -->
      <div
        id="mobile-menu"
        class="border-t border-slate-200/70 bg-white shadow-lg shadow-slate-900/5 lg:hidden"
        [class.hidden]="!mobileMenuOpen()"
      >
        <div class="container-max flex flex-col gap-1 px-4 py-4 sm:px-6">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              (click)="closeMobileMenu()"
              class="rounded-lg px-3 py-2.5 font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {{ link.label }}
            </a>
          }
          <a href="#contact" (click)="closeMobileMenu()" class="btn-primary mt-2 justify-center">
            Contact Us
          </a>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly companyName = input.required<string>();
  readonly logo = input.required<string>();

  protected readonly links = [
    { href: '#services', label: 'Services' },
    { href: '#how-we-work', label: 'How We Work' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#team', label: 'Team' },
  ];

  protected readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
