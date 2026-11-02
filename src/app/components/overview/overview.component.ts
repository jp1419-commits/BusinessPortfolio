import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClientValue, Overview, ProcessStep, Service } from '../../models/company.model';
import { ClientValueComponent } from '../client-value/client-value.component';
import { ProcessComponent } from '../process/process.component';
import { ServicesComponent } from '../services/services.component';

/**
 * Page 2: What We Deliver, How We Work and Client Value on a dark brand surface.
 * On desktop the spacing scales with the viewport height so the page fits one screen;
 * smaller screens stack the blocks and scroll naturally.
 */
@Component({
  selector: 'app-overview',
  imports: [ServicesComponent, ProcessComponent, ClientValueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="relative isolate overflow-hidden bg-navy-900 text-white">
      <!-- Background: depth gradient, faint grid, azure glows and the brand mark in outline -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800"></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_25%,#000_30%,transparent_100%)]"
        ></div>
        <div
          class="absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-primary-500/20 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-56 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary-400/10 blur-3xl"
        ></div>
        <svg
          class="absolute -bottom-40 -right-28 hidden h-[34rem] w-[34rem] lg:block"
          viewBox="0 0 100 100"
        >
          <path fill="#93cbf6" fill-opacity="0.05" d="M7.5 45 64.5 3l1 22-17 41z" />
          <path fill="#93cbf6" fill-opacity="0.025" d="M7.5 45l41 21-41 31z" />
          <path fill="#93cbf6" fill-opacity="0.07" d="M64.5 3l28 20-23 32-4-30z" />
          <path fill="#93cbf6" fill-opacity="0.035" d="M92.5 23v48l-23-16z" />
        </svg>
      </div>

      <div
        class="flex min-h-screen min-h-svh flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:pb-[clamp(1.25rem,4vh,3rem)] lg:pt-[calc(72px_+_clamp(1rem,3.5vh,3rem))] compact:pb-4"
      >
        <div class="container-max w-full">
          <app-services [copy]="copy().services" [services]="services()" />
          <div
            aria-hidden="true"
            class="my-14 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-[clamp(1.25rem,4vh,3rem)] compact:my-4"
          ></div>
          <app-process [copy]="copy().process" [steps]="steps()" />
          <div
            aria-hidden="true"
            class="my-14 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-[clamp(1.25rem,4vh,3rem)] compact:my-4"
          ></div>
          <app-client-value [copy]="copy().clientValue" [values]="values()" />
        </div>
      </div>
    </div>
  `,
})
export class OverviewComponent {
  readonly copy = input.required<Overview>();
  readonly services = input.required<Service[]>();
  readonly steps = input.required<ProcessStep[]>();
  readonly values = input.required<ClientValue[]>();
}
