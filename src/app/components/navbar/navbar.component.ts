import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { PageScrollService } from '../../services/page-scroll.service';
import { IconComponent } from '../icon/icon.component';

/** Sections the scroll-spy watches; links whose href matches the active one are highlighted. */
const TRACKED_SECTIONS = [
  'top',
  'services',
  'how-we-work',
  'roles',
  'tech-stack',
  'contact',
  'about',
];

/** The header shows until the page has scrolled this far (px); then the floating menu takes over. */
const HEADER_SCROLL_LIMIT = 120;

/**
 * Site navigation.
 * - At the top of the page: a fixed header with the menu.
 * - Once you scroll down: the header slides away and a round floating button (bottom right)
 *   opens the same menu.
 * - Both highlight the section currently being read (scroll-spy).
 */
@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(document:click)': 'onDocumentClick($event)',
  },
  template: `
    <!-- Header: only at the top of the page -->
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-md transition-[transform,visibility] duration-300 motion-reduce:transition-none"
      [class]="scrolled() ? 'invisible -translate-y-full' : 'visible translate-y-0'"
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
              [attr.aria-current]="activeHref() === link.href ? 'location' : null"
              class="relative rounded py-1 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-primary-500 after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
              [class]="
                activeHref() === link.href
                  ? 'text-primary-700 after:scale-x-100'
                  : 'text-slate-600 after:scale-x-0 hover:text-primary-600'
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
        data-no-paging
        class="border-t border-slate-200/70 bg-white shadow-lg shadow-slate-900/5 lg:hidden"
        [class.hidden]="!mobileMenuOpen()"
      >
        <div class="container-max flex flex-col gap-1 px-4 py-4 sm:px-6">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              [attr.aria-current]="activeHref() === link.href ? 'location' : null"
              (click)="closeMobileMenu()"
              class="rounded-lg px-3 py-2.5 font-medium transition-colors hover:bg-primary-50 hover:text-primary-700"
              [class]="
                activeHref() === link.href ? 'bg-primary-50 text-primary-700' : 'text-slate-700'
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

    <!-- Floating menu: replaces the header once the page is scrolled -->
    <div
      #floatingRoot
      class="fixed bottom-4 right-4 z-50 transition-[transform,opacity,visibility] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6"
      [class]="
        scrolled() ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0'
      "
    >
      <nav
        #floatingMenu
        id="floating-menu"
        aria-label="Site"
        data-no-paging
        [inert]="!floatingMenuOpen()"
        class="absolute bottom-16 right-0 w-64 origin-bottom-right sm:bottom-[4.5rem] rounded-2xl bg-navy-950/95 p-2 text-white shadow-2xl shadow-navy-950/40 ring-1 ring-white/10 backdrop-blur-md transition duration-200 motion-reduce:transition-none"
        [class]="
          floatingMenuOpen() ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        "
      >
        <a
          href="#top"
          (click)="closeFloatingMenu()"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          <img [ngSrc]="logo()" width="28" height="28" alt="" class="h-7 w-7" />
          <span class="text-sm font-bold leading-tight">{{ companyName() }}</span>
          <span class="ml-auto flex items-center gap-1 text-xs text-slate-400">
            Top
            <app-icon name="arrow-up" class="h-3.5 w-3.5" />
          </span>
        </a>
        <div aria-hidden="true" class="mx-3 my-1 h-px bg-white/10"></div>
        @for (link of links; track link.href) {
          <a
            [href]="link.href"
            [attr.aria-current]="activeHref() === link.href ? 'location' : null"
            (click)="closeFloatingMenu()"
            class="flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            [class]="
              activeHref() === link.href
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            "
          >
            {{ link.label }}
            @if (activeHref() === link.href) {
              <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-primary-400"></span>
            }
          </a>
        }
        <a
          href="#contact"
          (click)="closeFloatingMenu()"
          class="btn-primary mt-2 w-full justify-center"
        >
          Contact Us
        </a>
      </nav>

      <button
        #floatingButton
        type="button"
        aria-controls="floating-menu"
        [attr.aria-expanded]="floatingMenuOpen()"
        [attr.aria-label]="floatingMenuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
        (click)="toggleFloatingMenu()"
        class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br sm:h-14 sm:w-14 from-primary-500 to-primary-700 text-white shadow-xl shadow-primary-900/30 ring-4 ring-white/25 transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-primary-300"
      >
        <app-icon [name]="floatingMenuOpen() ? 'close' : 'menu'" class="h-6 w-6" />
      </button>
    </div>
  `,
})
export class NavbarComponent {
  readonly companyName = input.required<string>();
  readonly logo = input.required<string>();

  protected readonly links = [
    { href: '#services', label: 'What We Deliver' },
    { href: '#how-we-work', label: 'How We Work' },
    { href: '#roles', label: 'Roles' },
    { href: '#tech-stack', label: 'Tech Stack' },
    { href: '#about', label: 'About' },
  ];

  protected readonly mobileMenuOpen = signal(false);
  protected readonly floatingMenuOpen = signal(false);
  /** True once the page has scrolled past the header limit. */
  protected readonly scrolled = signal(false);
  private readonly activeSection = signal<string | null>(null);
  protected readonly activeHref = computed(() => {
    const id = this.activeSection();
    return id ? `#${id}` : null;
  });

  private readonly floatingRoot = viewChild.required<ElementRef<HTMLElement>>('floatingRoot');
  private readonly floatingMenu = viewChild.required<ElementRef<HTMLElement>>('floatingMenu');
  private readonly floatingButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('floatingButton');

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageScroll = inject(PageScrollService);

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view) {
        return;
      }

      // Header at the top, floating button further down.
      const onScroll = () => {
        const scrolled = this.pageScroll.scrollTop() > HEADER_SCROLL_LIMIT;
        if (scrolled !== this.scrolled()) {
          this.scrolled.set(scrolled);
          this.mobileMenuOpen.set(false);
          this.floatingMenuOpen.set(false);
        }
      };
      onScroll();
      this.destroyRef.onDestroy(this.pageScroll.onScroll(onScroll));

      // Scroll-spy: whichever section crosses a reading line about a quarter of the way down
      // (high enough that a section reached from the menu counts, even on the compact page 2).
      if (typeof view.IntersectionObserver === 'undefined') {
        return;
      }
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
      this.destroyRef.onDestroy(() => spy.disconnect());
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleFloatingMenu(): void {
    const open = !this.floatingMenuOpen();
    this.floatingMenuOpen.set(open);
    if (open) {
      // Move keyboard focus into the menu once it has rendered as open (no longer inert).
      setTimeout(() => this.floatingMenu().nativeElement.querySelector<HTMLElement>('a')?.focus());
    }
  }

  closeFloatingMenu(): void {
    this.floatingMenuOpen.set(false);
  }

  protected onEscape(): void {
    this.mobileMenuOpen.set(false);
    if (this.floatingMenuOpen()) {
      this.floatingMenuOpen.set(false);
      this.floatingButton().nativeElement.focus();
    }
  }

  protected onDocumentClick(event: Event): void {
    // Use the path captured at click time: toggling the menu swaps the button icon, so by the
    // time the click reaches the document the clicked element may already be detached.
    if (
      this.floatingMenuOpen() &&
      !event.composedPath().includes(this.floatingRoot().nativeElement)
    ) {
      this.floatingMenuOpen.set(false);
    }
  }
}
