import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClientValue, SectionCopy } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

/** "Client Value": what clients get (page 2). */
@Component({
  selector: 'app-client-value',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="client-value"
      aria-labelledby="client-value-title"
      class="grid gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div appReveal class="lg:col-span-4">
        <h2 id="client-value-title" class="section-label">{{ copy().label }}</h2>
        <p class="section-statement">{{ copy().title }}</p>
        @if (copy().intro) {
          <p class="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
            {{ copy().intro }}
          </p>
        }
      </div>

      <ul class="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-4 xl:gap-x-5">
        @for (item of values(); track item.title; let i = $index) {
          <li [appReveal]="150 + i * 90" class="flex items-center gap-3.5">
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300 ring-1 ring-inset ring-primary-400/25"
            >
              <app-icon [name]="item.icon" class="h-6 w-6" />
            </span>
            <p class="text-balance text-[15px] font-semibold leading-snug text-white">
              {{ item.title }}
            </p>
          </li>
        }
      </ul>
    </section>
  `,
})
export class ClientValueComponent {
  readonly copy = input.required<SectionCopy>();
  readonly values = input.required<ClientValue[]>();
}
