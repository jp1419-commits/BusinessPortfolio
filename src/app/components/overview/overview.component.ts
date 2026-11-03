import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Overview, ProcessStep, Service } from '../../models/company.model';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { ProcessComponent } from '../process/process.component';
import { ServicesComponent } from '../services/services.component';

/**
 * What We Deliver and How We Work on a dark brand surface.
 * On desktop they share one page (page 2), with spacing that scales with the screen height so
 * it fits. Phones and tablets can't fit both on one screen, so each block is its own page there
 * (see the `data-page` sections in ServicesComponent and ProcessComponent).
 *
 * No `overflow-hidden` here: it would make this element a scroll container and hide those
 * sections from the page scroller's snapping. The backdrop clips itself.
 */
@Component({
  selector: 'app-overview',
  imports: [BackdropComponent, ServicesComponent, ProcessComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div data-page class="relative isolate bg-navy-900 text-white lg:snap-start lg:snap-always">
      <app-backdrop tone="dark" />

      <div
        class="px-4 sm:px-6 lg:flex lg:min-h-screen lg:min-h-dvh lg:flex-col lg:justify-center lg:px-8 lg:py-[clamp(1.25rem,4vh,3rem)] compact:py-4"
      >
        <div class="container-max w-full">
          <app-services [copy]="copy().services" [services]="services()" />
          <div
            aria-hidden="true"
            class="hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-[clamp(2rem,6vh,4.5rem)] lg:block compact:my-6"
          ></div>
          <app-process [copy]="copy().process" [steps]="steps()" />
        </div>
      </div>
    </div>
  `,
})
export class OverviewComponent {
  readonly copy = input.required<Overview>();
  readonly services = input.required<Service[]>();
  readonly steps = input.required<ProcessStep[]>();
}
