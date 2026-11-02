import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClientValue } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

/** "Client Value": banner summarising what clients get. */
@Component({
  selector: 'app-client-value',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="client-value"
      aria-labelledby="client-value-title"
      class="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div
        class="container-max overflow-hidden rounded-3xl bg-gradient-to-r from-primary-50 to-primary-100/80 shadow-sm ring-1 ring-primary-100 lg:flex"
      >
        <div
          class="bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-7 text-white lg:flex lg:w-72 lg:shrink-0 lg:items-center lg:py-12 lg:pl-10 lg:pr-16 lg:[clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]"
        >
          <h2
            id="client-value-title"
            class="text-3xl font-extrabold uppercase leading-none tracking-tight lg:text-[2.75rem]"
          >
            Client <br class="hidden lg:inline" />Value
          </h2>
        </div>

        <ul
          class="grid flex-1 gap-6 px-8 py-8 sm:grid-cols-2 lg:py-10 lg:pl-4 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:divide-primary-200"
        >
          @for (item of values(); track item.title) {
            <li class="flex items-center gap-4 xl:px-6">
              <app-icon [name]="item.icon" class="h-11 w-11 text-primary-600" />
              <p class="text-balance text-base font-bold leading-snug text-ink lg:text-lg">
                {{ item.title }}
              </p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ClientValueComponent {
  readonly values = input.required<ClientValue[]>();
}
