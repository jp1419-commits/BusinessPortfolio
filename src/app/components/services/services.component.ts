import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SectionCopy, Service } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';
import { IllustrationComponent } from '../illustration/illustration.component';

/** "What We Deliver": the three service pillars (page 2). */
@Component({
  selector: 'app-services',
  imports: [DecimalPipe, IconComponent, IllustrationComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="services"
      aria-labelledby="services-title"
      class="grid scroll-mt-6 gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div appReveal class="lg:col-span-4">
        <h2 id="services-title" class="section-label">{{ copy().label }}</h2>
        <p class="section-statement">{{ copy().title }}</p>
        @if (copy().intro) {
          <p class="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300 compact:mt-3">
            {{ copy().intro }}
          </p>
        }
        <a
          href="#contact"
          class="group mt-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-primary-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900 compact:mt-4"
        >
          Discuss your project
          <app-icon
            name="arrow-right"
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-8 xl:gap-5">
        @for (service of services(); track service.title; let i = $index) {
          <article
            [appReveal]="100 + i * 90"
            class="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-primary-400/40 hover:bg-white/[0.07] sm:max-md:last:odd:col-span-2 compact:p-3.5"
          >
            <span
              aria-hidden="true"
              class="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></span>

            <div
              class="relative h-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary-500/20 via-white/[0.03] to-transparent ring-1 ring-inset ring-white/10 compact:h-[4.5rem]"
            >
              <span
                class="absolute left-3 top-2 text-[11px] font-semibold tracking-[0.2em] text-primary-200/80"
              >
                {{ i + 1 | number: '2.0' }}
              </span>
              <app-illustration [name]="service.illustration" class="h-full w-full px-2 py-1.5" />
            </div>

            <h3
              class="mt-4 text-lg font-semibold tracking-tight text-white compact:mt-3 compact:text-base"
            >
              {{ service.title }}
            </h3>
            <p class="mt-1 flex-1 text-sm leading-snug text-slate-300 compact:text-[13px]">
              {{ service.description }}
            </p>

            <ul
              class="mt-4 flex flex-wrap gap-1 compact:mt-3"
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
    </section>
  `,
})
export class ServicesComponent {
  readonly copy = input.required<SectionCopy>();
  readonly services = input.required<Service[]>();
}
