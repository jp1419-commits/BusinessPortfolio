import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TechGroup } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

/**
 * One Tech Stack card, drawn as what its group represents (`frame` in company.json):
 * - `editor`: a desktop code editor (back end & desktop)
 * - `browser`: a browser window (web)
 * - `phone`: a phone held sideways (mobile)
 * - `sheet`: a spreadsheet (databases & reporting)
 * - `rack`: a server rack (cloud & infrastructure)
 * - `board`: a task board with columns (project delivery)
 * Without a frame it's a plain card. The window chrome, lights and labels are decorative; the
 * title and technologies stay real text.
 */
@Component({
  selector: 'app-tech-card',
  imports: [NgTemplateOutlet, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex w-full' },
  template: `
    @switch (group().frame) {
      @case ('editor') {
        <div [class]="shell">
          <div [class]="bar">
            <ng-container *ngTemplateOutlet="dots" />
            <div
              class="flex min-w-0 items-center gap-2 rounded-md bg-white/[0.06] px-2.5 py-1 ring-1 ring-inset ring-white/10"
            >
              <app-icon [name]="group().icon" class="h-4 w-4 text-primary-300" />
              <h3 [class]="heading">{{ group().title }}</h3>
            </div>
          </div>
          <div class="flex flex-1">
            <!-- Line numbers -->
            <div aria-hidden="true" class="relative w-8 shrink-0 border-r border-white/5">
              <div
                class="absolute inset-0 overflow-hidden pr-2 pt-[9px] text-right font-mono text-[11px] leading-7 text-slate-600 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
              >
                @for (n of lineNumbers; track n) {
                  <div>{{ n }}</div>
                }
              </div>
            </div>
            <ul
              class="flex flex-1 flex-wrap content-start gap-1.5 p-3"
              [attr.aria-label]="group().title"
            >
              @for (item of group().items; track item) {
                <li [class]="chip">{{ item }}</li>
              }
            </ul>
          </div>
        </div>
      }

      @case ('browser') {
        <div [class]="shell">
          <div [class]="bar">
            <ng-container *ngTemplateOutlet="dots" />
            <div
              class="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-navy-950/70 px-3 py-1 ring-1 ring-inset ring-white/10"
            >
              <app-icon name="lock" class="h-3 w-3 text-emerald-400/80" />
              <h3 [class]="heading">{{ group().title }}</h3>
            </div>
          </div>
          <div class="flex-1 p-3">
            <!-- Page skeleton -->
            <div aria-hidden="true" class="mb-2.5 flex items-center gap-2">
              <span class="h-1.5 w-10 rounded-full bg-primary-400/50"></span>
              <span class="h-1.5 w-6 rounded-full bg-white/10"></span>
              <span class="h-1.5 w-8 rounded-full bg-white/10"></span>
            </div>
            <ul class="flex flex-wrap content-start gap-1.5" [attr.aria-label]="group().title">
              @for (item of group().items; track item) {
                <li [class]="chip">{{ item }}</li>
              }
            </ul>
          </div>
        </div>
      }

      @case ('phone') {
        <div
          class="relative flex h-full w-full flex-col rounded-[1.6rem] border-[5px] border-navy-700 bg-navy-950 p-1 shadow-lg shadow-navy-950/40 ring-1 ring-white/15 transition duration-300 md:hover:-translate-y-1"
        >
          <!-- Camera, on the side as the phone is held sideways -->
          <span
            aria-hidden="true"
            class="absolute left-[7px] top-1/2 h-9 w-1.5 -translate-y-1/2 rounded-full bg-navy-800 ring-1 ring-white/10"
          ></span>
          <div
            class="flex flex-1 flex-col rounded-[1.1rem] bg-gradient-to-br from-primary-500/20 via-navy-900 to-navy-900 py-2.5 pl-6 pr-3 ring-1 ring-inset ring-white/10"
          >
            <div class="flex items-center justify-between gap-2">
              <span aria-hidden="true" class="text-[10px] font-semibold text-slate-400">9:41</span>
              <div class="flex min-w-0 items-center gap-1.5">
                <app-icon [name]="group().icon" class="h-4 w-4 text-primary-300" />
                <h3 [class]="heading">{{ group().title }}</h3>
              </div>
              <span aria-hidden="true" class="flex items-end gap-[2px]">
                <span class="h-1 w-[3px] rounded-sm bg-slate-400"></span>
                <span class="h-1.5 w-[3px] rounded-sm bg-slate-400"></span>
                <span class="h-2 w-[3px] rounded-sm bg-slate-400"></span>
                <span class="ml-1 h-2 w-4 rounded-[3px] border border-slate-400 p-px">
                  <span class="block h-full w-2/3 rounded-[1px] bg-emerald-400"></span>
                </span>
              </span>
            </div>
            <ul
              class="mt-2.5 flex flex-wrap content-start gap-1.5"
              [attr.aria-label]="group().title"
            >
              @for (item of group().items; track item) {
                <li [class]="chip">{{ item }}</li>
              }
            </ul>
          </div>
        </div>
      }

      @case ('sheet') {
        <div [class]="shell">
          <div [class]="bar">
            <app-icon [name]="group().icon" class="h-4 w-4 text-primary-300" />
            <h3 [class]="heading">{{ group().title }}</h3>
          </div>
          <!-- Column letters -->
          <div
            aria-hidden="true"
            class="grid grid-cols-2 border-b border-white/10 bg-white/[0.03] text-center font-mono text-[10px] leading-5 text-slate-500"
          >
            <span>A</span>
            <span class="border-l border-white/10">B</span>
          </div>
          <!-- Cells: the grid lines are drawn by the background, so empty cells show too -->
          <ul
            class="grid flex-1 auto-rows-[30px] grid-cols-2 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:50%_30px] bg-[position:-1px_-1px]"
            [attr.aria-label]="group().title"
          >
            @for (item of group().items; track item) {
              <li
                class="flex items-center whitespace-nowrap px-2 text-xs font-medium text-slate-200 md:text-[11px] lg:text-xs"
              >
                {{ item }}
              </li>
            }
          </ul>
        </div>
      }

      @case ('rack') {
        <div [class]="shell">
          <div [class]="bar">
            <app-icon [name]="group().icon" class="h-4 w-4 text-primary-300" />
            <h3 [class]="heading">{{ group().title }}</h3>
            <span
              aria-hidden="true"
              class="ml-auto inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300/90"
            >
              <span class="il-led h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Online
            </span>
          </div>
          <div class="flex flex-1 flex-col gap-1.5 p-2.5">
            @for (unit of rackUnits(); track $index; let u = $index) {
              <div
                class="flex items-center gap-2.5 rounded-md border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-2.5 py-1.5"
              >
                <span
                  aria-hidden="true"
                  class="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                  [class.il-led]="u === 1"
                ></span>
                <ul
                  class="flex flex-1 flex-wrap gap-x-3 gap-y-0.5 text-xs font-medium text-slate-200"
                  [attr.aria-label]="group().title"
                >
                  @for (item of unit; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
                <span aria-hidden="true" class="flex shrink-0 gap-[3px]">
                  <span class="h-3 w-0.5 rounded-full bg-white/15"></span>
                  <span class="h-3 w-0.5 rounded-full bg-white/15"></span>
                  <span class="h-3 w-0.5 rounded-full bg-white/15"></span>
                </span>
              </div>
            }
          </div>
        </div>
      }

      @case ('board') {
        <div [class]="shell">
          <div [class]="bar">
            <app-icon [name]="group().icon" class="h-4 w-4 text-primary-300" />
            <h3 [class]="heading">{{ group().title }}</h3>
          </div>
          <div class="grid flex-1 auto-cols-fr grid-flow-col gap-2 p-2.5">
            @for (column of boardColumns(); track column.title) {
              <div
                class="flex flex-col gap-1.5 rounded-lg bg-white/[0.03] p-1.5 ring-1 ring-inset ring-white/5"
              >
                <p
                  class="flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  {{ column.title }}
                  <span aria-hidden="true" class="rounded bg-white/10 px-1 text-slate-300">{{
                    column.items.length
                  }}</span>
                </p>
                <ul class="flex flex-col gap-1.5" [attr.aria-label]="column.title">
                  @for (item of column.items; track item) {
                    <li
                      class="rounded-md border-l-2 border-primary-400 bg-white/[0.07] px-2 py-1 text-[11px] font-medium leading-tight text-slate-200 shadow-sm shadow-navy-950/40"
                    >
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      }

      @default {
        <div [class]="shell + ' p-4'">
          <div class="flex items-center gap-3">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/15 text-primary-300 ring-1 ring-inset ring-white/10"
            >
              <app-icon [name]="group().icon" class="h-5 w-5" />
            </span>
            <h3 class="text-[15px] font-semibold leading-snug text-white">{{ group().title }}</h3>
          </div>
          <ul class="mt-3 flex flex-wrap gap-1.5" [attr.aria-label]="group().title">
            @for (item of group().items; track item) {
              <li [class]="chip">{{ item }}</li>
            }
          </ul>
        </div>
      }
    }

    <!-- Window controls -->
    <ng-template #dots>
      <span aria-hidden="true" class="flex shrink-0 gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]/80"></span>
      </span>
    </ng-template>
  `,
})
export class TechCardComponent {
  readonly group = input.required<TechGroup>();

  protected readonly shell =
    'flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-950/40 shadow-lg shadow-navy-950/30 transition duration-300 md:hover:-translate-y-1 md:hover:border-primary-400/40';
  protected readonly bar =
    'flex items-center gap-2.5 border-b border-white/10 bg-white/[0.04] px-3 py-2';
  protected readonly heading = 'text-[13px] font-semibold leading-snug text-white';
  protected readonly chip =
    'rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-200';
  protected readonly lineNumbers = [1, 2, 3, 4, 5, 6];

  /** Server rack: the items on units of three. */
  protected readonly rackUnits = computed(() => {
    const items = this.group().items;
    const units: string[][] = [];
    for (let i = 0; i < items.length; i += 3) {
      units.push(items.slice(i, i + 3));
    }
    return units;
  });

  /** Task board: the items fill the columns in order, evenly. */
  protected readonly boardColumns = computed(() => {
    const { items, columns = [] } = this.group();
    const size = Math.ceil(items.length / Math.max(columns.length, 1));
    return columns.map((title, i) => ({ title, items: items.slice(i * size, (i + 1) * size) }));
  });
}
