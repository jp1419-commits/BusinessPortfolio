import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClientValue, Overview, ProcessStep, Service } from '../../models/company.model';
import { BackdropComponent } from '../backdrop/backdrop.component';
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
  imports: [BackdropComponent, ServicesComponent, ProcessComponent, ClientValueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="relative isolate overflow-hidden bg-navy-900 text-white">
      <app-backdrop tone="dark" />

      <div
        class="flex min-h-screen min-h-svh flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:pb-[clamp(1.25rem,4vh,3rem)] lg:pt-[calc(72px_+_clamp(1rem,3.5vh,3rem))] compact:pb-4"
      >
        <div class="container-max w-full">
          <app-services [copy]="copy().services" [services]="services()" />
          <div
            aria-hidden="true"
            class="my-14 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-[clamp(1rem,3.6vh,2.75rem)] compact:my-3"
          ></div>
          <app-process [copy]="copy().process" [steps]="steps()" />
          <div
            aria-hidden="true"
            class="my-14 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-[clamp(1rem,3.6vh,2.75rem)] compact:my-3"
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
