import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProcessStep } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

/**
 * "How We Work": the engagement steps.
 * Desktop shows a row with chevrons between steps; smaller screens show a vertical timeline.
 * The final step (handover) is highlighted.
 */
@Component({
  selector: 'app-process',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      class="bg-gradient-to-b from-slate-50 to-primary-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <div class="container-max">
        <h2 id="how-we-work-title" class="section-heading">How We Work</h2>

        <ol class="mt-12 grid gap-y-10 lg:mt-14 lg:grid-cols-5 lg:gap-x-6">
          @for (step of steps(); track step.title; let i = $index, last = $last) {
            <li class="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              @if (!last) {
                <!-- Connectors: timeline line (mobile) / chevron (desktop) -->
                <span
                  aria-hidden="true"
                  class="absolute -bottom-10 left-[39px] top-20 w-0.5 rounded-full bg-gradient-to-b from-primary-300 to-primary-100 lg:hidden"
                ></span>
                <app-icon
                  name="chevron-right"
                  class="absolute right-0 top-[2.625rem] hidden h-7 w-7 translate-x-[calc(50%_+_0.75rem)] text-primary-500 lg:block"
                />
              }

              <div
                class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 lg:h-28 lg:w-28"
                [class]="
                  last
                    ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl shadow-primary-700/30'
                    : 'bg-gradient-to-br from-white to-primary-100 text-primary-600 shadow-md shadow-primary-900/5 ring-1 ring-primary-200/70'
                "
              >
                <app-icon [name]="step.icon" class="h-9 w-9 lg:h-14 lg:w-14" />
                <span
                  aria-hidden="true"
                  class="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-primary-700 shadow ring-1 ring-primary-100"
                >
                  {{ i + 1 }}
                </span>
              </div>

              <div class="pt-2 lg:w-full lg:pt-0">
                <h3
                  class="inline-block rounded-2xl px-4 py-1 text-lg font-bold leading-snug text-balance lg:mt-6 lg:block lg:px-3 lg:text-base xl:text-lg"
                  [class]="last ? 'bg-primary-700 text-white' : 'bg-primary-100 text-ink'"
                >
                  {{ step.title }}
                </h3>
                <p class="mt-3 leading-relaxed text-slate-600 lg:mx-auto lg:max-w-[15rem]">
                  {{ step.description }}
                </p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ProcessComponent {
  readonly steps = input.required<ProcessStep[]>();
}
