import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { About } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/** About Us: mission, vision and values on the front page's light background. */
@Component({
  selector: 'app-about',
  imports: [BackdropComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="about"
      aria-labelledby="about-title"
      class="relative isolate flex min-h-screen min-h-svh items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <app-backdrop tone="light" belowNav />

      <div class="container-max grid w-full items-center gap-12 lg:grid-cols-12">
        <div appReveal class="lg:col-span-5">
          <h2 id="about-title" class="section-label text-primary-600">{{ about().label }}</h2>
          <p class="section-statement text-ink">{{ about().title }}</p>

          <h3 class="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Our Mission
          </h3>
          <p class="mt-3 text-lg leading-relaxed text-slate-600">{{ about().mission }}</p>
        </div>

        <div class="space-y-5 lg:col-span-7">
          <article
            [appReveal]="120"
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-navy-800 p-7 text-white shadow-xl shadow-primary-900/20 sm:p-8"
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
            <span
              class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25"
            >
              <app-icon name="globe" class="h-6 w-6" />
            </span>
            <h3
              class="relative mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary-100"
            >
              Our Vision
            </h3>
            <p class="relative mt-2 text-xl font-semibold leading-snug sm:text-2xl sm:leading-snug">
              {{ about().vision }}
            </p>
          </article>

          <div [appReveal]="200">
            <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Our Values
            </h3>
            <ul class="mt-3 grid gap-4 sm:grid-cols-3">
              @for (value of about().values; track value.title) {
                <li
                  class="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white/80 p-4 shadow-sm shadow-primary-900/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-700/10 sm:flex-col sm:items-start sm:p-5"
                >
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/25"
                  >
                    <app-icon [name]="value.icon" class="h-5 w-5" />
                  </span>
                  <span class="font-semibold text-ink">{{ value.title }}</span>
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
