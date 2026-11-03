import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechStack } from '../../models/company.model';
import { CarouselDirective } from '../../directives/carousel.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/**
 * Tech Stack: the technologies and tools we deliver with and staff for, in groups, and a closing
 * line for anything not listed. (The roles themselves are on the Roles We Staff page.)
 * Desktop and tablets show the groups as a grid; phones get a sideways carousel (like What We
 * Deliver) so the page fits one screen.
 */
@Component({
  selector: 'app-tech-stack',
  imports: [BackdropComponent, CarouselDirective, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="tech-stack"
      data-page
      aria-labelledby="tech-stack-title"
      class="relative isolate flex min-h-screen min-h-dvh snap-start snap-always items-center overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-[clamp(1.5rem,6vh,4rem)] compact:py-6 tight:py-4 phone:pb-14 phone:pt-10 short:pb-12 short:pt-6"
    >
      <app-backdrop tone="dark" />

      <div class="container-max w-full">
        <div appReveal>
          <h2 id="tech-stack-title" class="section-label">{{ stack().label }}</h2>
          <p class="section-statement">{{ stack().title }}</p>
          @if (stack().intro) {
            <p
              class="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300 tight:hidden short:hidden"
            >
              {{ stack().intro }}
            </p>
          }
        </div>

        <div class="mt-8 compact:mt-5 tight:mt-4 phone:mt-6 short:mt-4">
          <ul
            appCarousel
            #carousel="carousel"
            class="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:p-0 lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            @for (group of stack().groups; track group.title; let i = $index) {
              <li
                [appReveal]="100 + i * 60"
                class="flex w-[84%] max-w-xs shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:w-auto md:max-w-none md:shrink md:snap-align-none compact:p-3.5"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/15 text-primary-300 ring-1 ring-inset ring-white/10"
                  >
                    <app-icon [name]="group.icon" class="h-5 w-5" />
                  </span>
                  <h3 class="text-[15px] font-semibold leading-snug text-white">
                    {{ group.title }}
                  </h3>
                </div>
                <ul class="mt-3 flex flex-wrap gap-1.5" [attr.aria-label]="group.title">
                  @for (item of group.items; track item) {
                    <li
                      class="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-200"
                    >
                      {{ item }}
                    </li>
                  }
                </ul>
              </li>
            }
          </ul>

          <!-- Carousel position (phones) -->
          <div class="mt-3 flex justify-center gap-1 md:hidden">
            @for (group of stack().groups; track group.title; let i = $index) {
              <button
                type="button"
                class="group flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                [attr.aria-label]="'Show ' + group.title"
                [attr.aria-current]="carousel.active() === i ? 'true' : null"
                (click)="carousel.show(i)"
              >
                <span
                  class="block h-1.5 rounded-full transition-all duration-300"
                  [class]="
                    carousel.active() === i
                      ? 'w-5 bg-primary-300'
                      : 'w-1.5 bg-white/30 group-hover:bg-white/60'
                  "
                ></span>
              </button>
            }
          </div>
        </div>

        <p
          appReveal
          class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-slate-300 compact:mt-5 tight:mt-4 phone:mt-5 short:mt-3"
        >
          {{ stack().more }}
          <a
            href="#contact"
            class="group inline-flex items-center gap-2 rounded font-semibold text-primary-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900"
          >
            {{ stack().moreLink }}
            <app-icon
              name="arrow-right"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </p>
      </div>
    </section>
  `,
})
export class TechStackComponent {
  readonly stack = input.required<TechStack>();
}
