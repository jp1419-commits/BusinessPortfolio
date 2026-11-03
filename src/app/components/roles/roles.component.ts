import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StaffingRoles } from '../../models/company.model';
import { CarouselDirective } from '../../directives/carousel.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/**
 * Roles We Staff: the IT SMEs we provide, grouped by the part of a project they cover, and a
 * closing line for roles not listed. On the light background, between the dark pages around it.
 * Desktop and tablets show the groups side by side; phones get a sideways carousel so the page
 * fits one screen.
 */
@Component({
  selector: 'app-roles',
  imports: [BackdropComponent, CarouselDirective, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="roles"
      data-page
      aria-labelledby="roles-title"
      class="relative isolate flex min-h-screen min-h-dvh snap-start snap-always items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-[clamp(1.5rem,6vh,4rem)] compact:py-6 tight:py-4 phone:pb-14 phone:pt-10 short:pb-10 short:pt-6"
    >
      <app-backdrop tone="light" />

      <div class="container-max w-full">
        <div appReveal>
          <h2 id="roles-title" class="section-label text-primary-600">{{ roles().label }}</h2>
          <p class="section-statement text-ink">{{ roles().title }}</p>
          @if (roles().intro) {
            <p
              class="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 tight:hidden short:hidden"
            >
              {{ roles().intro }}
            </p>
          }
        </div>

        <div class="mt-8 compact:mt-5 tight:mt-4 phone:mt-6 short:mt-4">
          <ul
            appCarousel
            #carousel="carousel"
            class="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:p-0 lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            @for (group of roles().groups; track group.title; let i = $index) {
              <li
                [appReveal]="100 + i * 80"
                class="flex w-[84%] max-w-xs shrink-0 snap-start flex-col rounded-2xl border border-primary-100 bg-white/80 p-5 shadow-sm shadow-primary-900/5 backdrop-blur-sm md:w-auto md:max-w-none md:shrink md:snap-align-none lg:p-6 compact:p-4 phone:p-3.5"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/25"
                  >
                    <app-icon [name]="group.icon" class="h-5 w-5" />
                  </span>
                  <h3
                    class="text-base font-semibold leading-snug text-ink lg:text-lg compact:text-base"
                  >
                    {{ group.title }}
                  </h3>
                </div>
                <ul
                  class="mt-4 space-y-2.5 lg:mt-5 lg:space-y-3 compact:mt-3 compact:space-y-2 phone:mt-3 phone:space-y-2 short:space-y-1.5"
                  [attr.aria-label]="group.title"
                >
                  @for (role of group.roles; track role) {
                    <li
                      class="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-slate-700 lg:text-base compact:text-[15px]"
                    >
                      <span
                        aria-hidden="true"
                        class="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"
                      ></span>
                      {{ role }}
                    </li>
                  }
                </ul>
              </li>
            }
          </ul>

          <!-- Carousel position (phones) -->
          <div class="mt-3 flex justify-center gap-1 md:hidden">
            @for (group of roles().groups; track group.title; let i = $index) {
              <button
                type="button"
                class="group flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                [attr.aria-label]="'Show ' + group.title"
                [attr.aria-current]="carousel.active() === i ? 'true' : null"
                (click)="carousel.show(i)"
              >
                <span
                  class="block h-1.5 rounded-full transition-all duration-300"
                  [class]="
                    carousel.active() === i
                      ? 'w-5 bg-primary-600'
                      : 'w-1.5 bg-primary-200 group-hover:bg-primary-300'
                  "
                ></span>
              </button>
            }
          </div>
        </div>

        <p
          appReveal
          class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-slate-600 compact:mt-5 tight:mt-4 phone:mt-5 short:mt-3"
        >
          {{ roles().more }}
          <a
            href="#contact"
            class="group inline-flex items-center gap-2 rounded font-semibold text-primary-700 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
          >
            {{ roles().moreLink }}
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
export class RolesComponent {
  readonly roles = input.required<StaffingRoles>();
}
