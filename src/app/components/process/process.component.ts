import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProcessStep, SectionCopy } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

/**
 * "How We Work": the engagement steps as a stepper.
 * Desktop: part of page 2. Phones and tablets: a page of its own.
 * From md up the steps sit on a horizontal track that draws itself in; smaller screens get a
 * compact vertical timeline. The final step (handover) is highlighted.
 */
@Component({
  selector: 'app-process',
  imports: [DecimalPipe, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="how-we-work"
      data-page
      aria-labelledby="how-we-work-title"
      class="flex min-h-screen min-h-dvh snap-start snap-always flex-col justify-center gap-8 py-20 lg:grid lg:min-h-0 lg:snap-align-none lg:snap-normal lg:grid-cols-12 lg:justify-normal lg:gap-12 lg:py-0 phone:gap-6 phone:pb-20 phone:pt-10 short:gap-5 short:pb-16 short:pt-6"
    >
      <div appReveal class="lg:col-span-4">
        <h2 id="how-we-work-title" class="section-label">{{ copy().label }}</h2>
        <p class="section-statement">{{ copy().title }}</p>
        @if (copy().intro) {
          <p class="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
            {{ copy().intro }}
          </p>
        }
      </div>

      <div class="relative lg:col-span-8">
        <!-- Horizontal track (md and up) -->
        <div
          aria-hidden="true"
          class="absolute left-[10%] right-[10%] top-[1.375rem] hidden h-px bg-white/10 md:block"
        ></div>
        <div
          aria-hidden="true"
          [appReveal]="200"
          class="reveal-draw-x absolute left-[10%] right-[10%] top-[1.375rem] hidden h-px origin-left bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 md:block"
        ></div>

        <ol class="relative grid gap-7 md:grid-cols-5 md:gap-4 phone:gap-4 short:gap-3">
          @for (step of steps(); track step.title; let i = $index, last = $last) {
            <li
              [appReveal]="250 + i * 110"
              class="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center phone:gap-3.5"
            >
              @if (!last) {
                <!-- Timeline connector (below md) -->
                <span
                  aria-hidden="true"
                  class="absolute -bottom-7 left-[21px] top-12 w-0.5 rounded-full bg-gradient-to-b from-primary-400/70 to-primary-400/10 md:hidden phone:-bottom-4 phone:left-[19px] phone:top-11 short:-bottom-3"
                ></span>
              }

              <div
                class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full phone:h-10 phone:w-10"
                [class]="
                  last
                    ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-navy-800 text-primary-300 ring-1 ring-inset ring-white/15'
                "
              >
                @if (last) {
                  <span
                    aria-hidden="true"
                    class="absolute inset-0 rounded-full bg-primary-400/40 motion-safe:animate-pulse-ring"
                  ></span>
                }
                <app-icon [name]="step.icon" class="relative h-5 w-5" />
              </div>

              <div class="min-w-0 md:mt-4">
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-300/90 phone:hidden"
                >
                  Step {{ i + 1 | number: '2.0' }}
                </p>
                <h3 class="mt-1 text-[15px] font-semibold leading-snug text-white phone:mt-0">
                  <!-- Phones: the step number sits in front of the title -->
                  <span
                    class="mr-2 hidden text-[11px] font-semibold tracking-[0.2em] text-primary-300/90 phone:inline"
                    >{{ i + 1 | number: '2.0' }}</span
                  >{{ step.title }}
                </h3>
                <p
                  class="mt-1 text-sm leading-snug text-slate-400 compact:text-[13px] phone:mt-0.5 phone:text-[13px]"
                >
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
  readonly copy = input.required<SectionCopy>();
  readonly steps = input.required<ProcessStep[]>();
}
