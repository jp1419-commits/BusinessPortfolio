import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/** Sections the scroll-spy watches; links whose href matches the active one are highlighted. */
const TRACKED_SECTIONS = ['top', 'services', 'how-we-work', 'client-value', 'about', 'contact'];

/**
 * Fixed top navigation.
 * - Highlights the link of the section currently being read (scroll-spy).
 * - Turns dark while it sits over a section marked `data-nav-theme="dark"`.
 */
@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMobileMenu()' },
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
      [class]="dark() ? 'border-white/10 bg-navy-950/80' : 'border-slate-200/70 bg-white/95'"
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
            class="max-w-[7.5rem] text-[17px] font-extrabold leading-[1.05] tracking-tight transition-colors duration-300"
            [class]="dark() ? 'text-white' : 'text-ink'"
          >
            {{ companyName() }}
          </span>
        </a>

        <!-- Desktop menu -->
        <div class="hidden items-center gap-8 lg:flex">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              [attr.aria-current]="activeHref() === link.href ? 'location' : null"
              class="relative rounded py-1 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-primary-500 after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
              [class]="
                activeHref() === link.href
                  ? (dark() ? 'text-white' : 'text-primary-700') + ' after:scale-x-100'
                  : (dark()
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-primary-600') + ' after:scale-x-0'
              "
            >
              {{ link.label }}
            </a>
          }
          <a href="#contact" class="btn-primary">Contact Us</a>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="-mr-2 rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden"
          [class]="dark() ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-primary-50'"
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
        class="border-t shadow-lg shadow-slate-900/5 lg:hidden"
        [class]="dark() ? 'border-white/10 bg-navy-950/95' : 'border-slate-200/70 bg-white'"
        [class.hidden]="!mobileMenuOpen()"
      >
        <div class="container-max flex flex-col gap-1 px-4 py-4 sm:px-6">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              [attr.aria-current]="activeHref() === link.href ? 'location' : null"
              (click)="closeMobileMenu()"
              class="rounded-lg px-3 py-2.5 font-medium transition-colors"
              [class]="
                dark()
                  ? (activeHref() === link.href ? 'bg-white/10 text-white' : 'text-slate-200') +
                    ' hover:bg-white/10 hover:text-white'
                  : (activeHref() === link.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-700') + ' hover:bg-primary-50 hover:text-primary-700'
              "
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
    { href: '#services', label: 'What We Deliver' },
    { href: '#how-we-work', label: 'How We Work' },
    { href: '#about', label: 'About' },
  ];

  protected readonly mobileMenuOpen = signal(false);
  /** True while the navbar sits over a dark section. */
  protected readonly dark = signal(false);
  private readonly activeSection = signal<string | null>(null);
  protected readonly activeHref = computed(() => {
    const id = this.activeSection();
    return id ? `#${id}` : null;
  });

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view || typeof view.IntersectionObserver === 'undefined') {
        return;
      }

      // Theme: whichever section is under the top edge of the screen (behind the navbar).
      const themeObserver = new view.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.dark.set((entry.target as HTMLElement).dataset['navTheme'] === 'dark');
            }
          }
        },
        { rootMargin: '0px 0px -94% 0px' },
      );
      this.document
        .querySelectorAll<HTMLElement>('[data-nav-theme]')
        .forEach((section) => themeObserver.observe(section));

      // Scroll-spy: whichever section crosses a reading line about a quarter of the way down
      // (high enough that a section reached from the menu counts, even on the compact page 2).
      const spy = new view.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          }
        },
        { rootMargin: '-25% 0px -70% 0px' },
      );
      for (const id of TRACKED_SECTIONS) {
        const section = this.document.getElementById(id);
        if (section) {
          spy.observe(section);
        }
      }

      this.destroyRef.onDestroy(() => {
        themeObserver.disconnect();
        spy.disconnect();
      });
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
