import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { About } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/**
 * About Us: mission, vision and values on the front page's light background.
 * Phones get a tighter version of the same layout so the page fits one screen.
 */
@Component({
  selector: 'app-about',
  imports: [BackdropComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="about"
      data-page
      aria-labelledby="about-title"
      class="relative isolate flex min-h-screen min-h-dvh snap-start snap-always items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8 tight:py-10 phone:pb-20 phone:pt-10 short:pb-16 short:pt-6"
    >
      <app-backdrop tone="light" />

      <div
        class="container-max grid w-full items-center gap-12 lg:grid-cols-12 phone:gap-5 short:gap-4"
      >
        <div appReveal class="lg:col-span-5">
          <h2 id="about-title" class="section-label text-primary-600">{{ about().label }}</h2>
          <p
            class="section-statement text-ink phone:text-xl phone:leading-tight short:text-lg short:leading-tight"
          >
            {{ about().title }}
          </p>

          <h3
            class="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 phone:mt-4 short:hidden"
          >
            Our Mission
          </h3>
          <p
            class="mt-3 text-lg leading-relaxed text-slate-600 phone:mt-2 phone:text-[15px] short:mt-2 short:text-sm short:leading-normal"
          >
            {{ about().mission }}
          </p>
        </div>

        <div class="space-y-5 lg:col-span-7 phone:space-y-4 short:space-y-3">
          <article
            [appReveal]="120"
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-navy-800 p-7 text-white shadow-xl shadow-primary-900/20 sm:p-8 phone:rounded-2xl phone:p-5 short:p-4"
          >
            <svg
              aria-hidden="true"
              class="absolute -right-8 -top-10 h-52 w-52"
              viewBox="0 0 100 100"
            >
              <path fill="#fff" fill-opacity="0.1" d="M7.5 45 64.5 3l1 22-17 41z" />
              <path fill="#fff" fill-opacity="0.05" d="M7.5 45l41 21-41 31z" />
              <path fill="#fff" fill-opacity="0.14" d="M64.5 3l28 20-23 32-4-30z" />
              <path fill="#fff" fill-opacity="0.07" d="M92.5 23v48l-23-16z" />
            </svg>
            <!-- Phones: icon and heading side by side -->
            <div class="relative phone:flex phone:items-center phone:gap-3">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25 phone:h-9 phone:w-9"
              >
                <app-icon name="globe" class="h-6 w-6 phone:h-5 phone:w-5" />
              </span>
              <h3
                class="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary-100 phone:mt-0"
              >
                Our Vision
              </h3>
            </div>
            <p
              class="relative mt-2 text-xl font-semibold leading-snug sm:text-2xl sm:leading-snug phone:mt-3 phone:text-base phone:leading-snug short:mt-2 short:text-[15px]"
            >
              {{ about().vision }}
            </p>
          </article>

          <div [appReveal]="200">
            <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Our Values
            </h3>
            <ul class="mt-3 grid gap-4 sm:grid-cols-3 phone:mt-2.5 phone:grid-cols-3 phone:gap-2">
              @for (value of about().values; track value.title) {
                <li
                  class="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white/80 p-4 shadow-sm shadow-primary-900/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-700/10 sm:flex-col sm:items-start sm:p-5 phone:flex-col phone:gap-2 phone:rounded-xl phone:p-2.5 phone:text-center short:gap-1.5 short:p-2"
                >
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/25 phone:h-8 phone:w-8 phone:rounded-lg"
                  >
                    <app-icon [name]="value.icon" class="h-5 w-5 phone:h-[18px] phone:w-[18px]" />
                  </span>
                  <span class="font-semibold text-ink phone:text-[13px] phone:leading-tight">{{
                    value.title
                  }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly about = input.required<About>();
}
