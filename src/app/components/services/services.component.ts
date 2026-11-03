import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SectionCopy, Service } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';
import { IllustrationComponent } from '../illustration/illustration.component';

/**
 * "What We Deliver": the three service pillars.
 * Desktop: part of page 2, cards side by side. Phones: a page of its own, with the cards in a
 * sideways carousel (swipe left and right, or tap the dots) so the page fits one screen.
 */
@Component({
  selector: 'app-services',
  imports: [DecimalPipe, IconComponent, IllustrationComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="services"
      data-page
      aria-labelledby="services-title"
      class="flex min-h-screen min-h-dvh snap-start snap-always flex-col justify-center gap-8 py-20 lg:grid lg:min-h-0 lg:snap-align-none lg:snap-normal lg:grid-cols-12 lg:justify-normal lg:gap-12 lg:py-0 phone:gap-6 phone:pb-20 phone:pt-10 short:gap-4 short:pb-16 short:pt-6"
    >
      <div appReveal class="lg:col-span-4">
        <h2 id="services-title" class="section-label">{{ copy().label }}</h2>
        <p class="section-statement">{{ copy().title }}</p>
        @if (copy().intro) {
          <p
            class="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300 compact:mt-3 phone:mt-3 short:hidden"
          >
            {{ copy().intro }}
          </p>
        }
        <a
          href="#contact"
          class="group mt-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-primary-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900 compact:mt-4 phone:mt-4 short:mt-3"
        >
          Discuss your project
          <app-icon
            name="arrow-right"
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div class="lg:col-span-8">
        <div
          #carousel
          class="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:p-0 xl:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          @for (service of services(); track service.title; let i = $index) {
            <article
              [appReveal]="100 + i * 90"
              class="group relative flex w-[84%] max-w-xs shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:border-primary-400/40 hover:bg-white/[0.07] md:w-auto md:max-w-none md:shrink md:snap-align-none md:hover:-translate-y-1 compact:p-3.5"
            >
              <span
                aria-hidden="true"
                class="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              ></span>

              <div
                class="relative h-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary-500/20 via-white/[0.03] to-transparent ring-1 ring-inset ring-white/10 compact:h-[4.5rem] short:h-20"
              >
                <span
                  class="absolute left-3 top-2 text-[11px] font-semibold tracking-[0.2em] text-primary-200/80"
                >
                  {{ i + 1 | number: '2.0' }}
                </span>
                <app-illustration [name]="service.illustration" class="h-full w-full px-2 py-1.5" />
              </div>

              <h3
                class="mt-4 text-lg font-semibold tracking-tight text-white compact:mt-3 compact:text-base short:mt-3"
              >
                {{ service.title }}
              </h3>
              <p class="mt-1 flex-1 text-sm leading-snug text-slate-300 compact:text-[13px]">
                {{ service.description }}
              </p>

              <ul
                class="mt-4 flex flex-wrap gap-1 compact:mt-3 short:mt-3"
                [attr.aria-label]="service.title + ' focus areas'"
              >
                @for (tag of service.tags; track tag) {
                  <li
                    class="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs font-medium text-slate-200"
                  >
                    {{ tag }}
                  </li>
                }
              </ul>
            </article>
          }
        </div>

        <!-- Carousel position (phones) -->
        <div class="mt-3 flex justify-center gap-1 md:hidden">
          @for (service of services(); track service.title; let i = $index) {
            <button
              type="button"
              class="group flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              [attr.aria-label]="'Show ' + service.title"
              [attr.aria-current]="activeCard() === i ? 'true' : null"
              (click)="showCard(i)"
            >
              <span
                class="block h-1.5 rounded-full transition-all duration-300"
                [class]="
                  activeCard() === i
                    ? 'w-5 bg-primary-300'
                    : 'w-1.5 bg-white/30 group-hover:bg-white/60'
                "
              ></span>
            </button>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  readonly copy = input.required<SectionCopy>();
  readonly services = input.required<Service[]>();

  /** Card most in view in the phone carousel. */
  protected readonly activeCard = signal(0);

  private readonly carousel = viewChild.required<ElementRef<HTMLElement>>('carousel');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const carousel = this.carousel().nativeElement;
      const cards = Array.from(carousel.children);

      // Track the card in view, for the dots.
      const position = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeCard.set(cards.indexOf(entry.target));
            }
          }
        },
        { root: carousel, threshold: 0.6 },
      );
      cards.forEach((card) => position.observe(card));

      // Fade all cards in together when the carousel comes into view, including those still
      // waiting off to the side (they would otherwise only start once swiped to).
      const reveal = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          cards.forEach((card) => card.classList.add('is-revealed'));
          reveal.disconnect();
        }
      });
      reveal.observe(carousel);

      this.destroyRef.onDestroy(() => {
        position.disconnect();
        reveal.disconnect();
      });
    });
  }

  /** Scrolls the phone carousel to a card. */
  protected showCard(index: number): void {
    const carousel = this.carousel().nativeElement;
    const card = carousel.children[index] as HTMLElement | undefined;
    if (!card) {
      return;
    }
    const padding = parseFloat(getComputedStyle(carousel).scrollPaddingLeft) || 0;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    carousel.scrollTo({
      left: card.offsetLeft - padding,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }
}
