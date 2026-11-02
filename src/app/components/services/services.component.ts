import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Service } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

/** "What We Deliver": the three service pillars. */
@Component({
  selector: 'app-services',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="services"
      aria-labelledby="services-title"
      class="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <div class="container-max">
        <h2 id="services-title" class="section-heading">What We Deliver</h2>

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (service of services(); track service.title) {
            <article
              class="group flex flex-col rounded-2xl border border-primary-100 bg-gradient-to-b from-primary-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-700/10 sm:p-7 md:max-lg:odd:last:col-span-2"
            >
              <div class="flex flex-1 items-center gap-5">
                <div
                  class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/25 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
                >
                  <app-icon [name]="service.icon" class="h-8 w-8 sm:h-9 sm:w-9" />
                </div>
                <div class="min-w-0 border-l-2 border-primary-200 pl-5">
                  <h3 class="text-xl font-extrabold tracking-tight text-ink">
                    {{ service.title }}
                  </h3>
                  <p class="mt-1 text-[15px] leading-snug text-slate-600">
                    {{ service.description }}
                  </p>
                </div>
              </div>

              <ul
                class="mt-6 flex divide-x divide-primary-300/70 rounded-xl bg-primary-100/80 py-3 text-center text-[13px] font-semibold text-ink sm:text-sm"
                [attr.aria-label]="service.title + ' focus areas'"
              >
                @for (tag of service.tags; track tag) {
                  <li class="flex-1 px-1.5">{{ tag }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  readonly services = input.required<Service[]>();
}
