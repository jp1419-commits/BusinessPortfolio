import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ClientValue, Hero } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/** Page 1: full-screen introduction, including the Client Value points. */
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, BackdropComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="top"
      data-page
      class="relative isolate flex min-h-screen min-h-svh snap-start snap-always items-center overflow-hidden px-4 pb-28 pt-28 sm:px-6 lg:px-8 compact:pb-20 compact:pt-20"
    >
      <app-backdrop tone="light" belowNav />

      <div class="container-max grid w-full items-center gap-16 lg:grid-cols-12">
        <div class="lg:col-span-8 xl:col-span-7">
          <p
            appReveal
            class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm sm:px-4 sm:text-sm"
          >
            <span class="h-2 w-2 rounded-full bg-primary-500"></span>
            {{ hero().eyebrow }}
          </p>

          <h1
            [appReveal]="90"
            class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl compact:mt-4 compact:text-5xl"
          >
            {{ headline().before
            }}<span
              class="box-decoration-clone bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 bg-clip-text text-transparent"
              >{{ headline().highlight }}</span
            >{{ headline().after }}
          </h1>

          <p
            [appReveal]="180"
            class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl compact:mt-4 compact:text-lg"
          >
            {{ hero().subtitle }}
          </p>

          <!-- Client Value -->
          <div [appReveal]="240" class="mt-8 max-w-2xl compact:mt-5">
            <h2
              class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700"
            >
              <span
                aria-hidden="true"
                class="h-px w-8 bg-gradient-to-r from-primary-500 to-primary-300"
              ></span>
              {{ hero().valuesLabel }}
            </h2>
            <ul class="mt-3 grid grid-cols-2 gap-2.5">
              @for (item of values(); track item.title) {
                <li
                  class="flex flex-col items-start gap-2 rounded-2xl border border-primary-100 bg-white/80 p-3 shadow-sm shadow-primary-900/5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-3 sm:p-2.5 sm:pr-4"
                >
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/25"
                  >
                    <app-icon [name]="item.icon" class="h-5 w-5" />
                  </span>
                  <span class="text-[13px] font-semibold leading-snug text-ink sm:text-sm">
                    {{ item.title }}
                  </span>
                </li>
              }
            </ul>
          </div>

          <div
            [appReveal]="300"
            class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap compact:mt-6"
          >
            <a href="#contact" class="btn-primary justify-center shadow-lg shadow-primary-600/25">
              Get In Touch
              <app-icon name="arrow-right" class="h-5 w-5" />
            </a>
            <a href="#services" class="btn-secondary justify-center">See What We Deliver</a>
            <a href="#how-we-work" class="btn-secondary justify-center">See How We Work</a>
          </div>
        </div>

        <!-- Brand artwork -->
        <div
          aria-hidden="true"
          [appReveal]="150"
          class="relative mx-auto hidden w-full max-w-md lg:col-span-4 lg:block lg:max-w-[min(28rem,56vh)] xl:col-span-5"
        >
          <div class="relative aspect-square">
            <div
              class="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,#ddeefc,rgb(240_247_254/0.6)_60%,transparent)]"
            ></div>
            <div class="absolute inset-[4%] rounded-full border border-primary-200/80"></div>
            <div
              class="absolute inset-[17%] rounded-full border border-dashed border-primary-300/70"
            ></div>
            <span class="absolute left-[12%] top-[17%] h-3 w-3 rounded-full bg-primary-400"></span>
            <span
              class="absolute bottom-[9%] right-[24%] h-4 w-4 rounded-full bg-primary-600"
            ></span>
            <span
              class="absolute right-[3%] top-[44%] h-2.5 w-2.5 rounded-full bg-primary-300"
            ></span>
            <img
              [ngSrc]="logo()"
              width="240"
              height="240"
              priority
              alt=""
              class="absolute left-1/4 top-1/4 h-1/2 w-1/2 drop-shadow-[0_28px_36px_rgba(8,94,173,0.28)] motion-safe:animate-float"
            />
          </div>
        </div>
      </div>

      <!-- Scroll cue to page 2 -->
      <a
        href="#services"
        [appReveal]="600"
        aria-label="Scroll to What We Deliver"
        class="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full compact:bottom-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
      >
        <span class="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5">
          <span class="h-2 w-1 rounded-full bg-current motion-safe:animate-scroll-cue"></span>
        </span>
        Scroll
      </a>
    </section>
  `,
})
export class HeroComponent {
  readonly hero = input.required<Hero>();
  readonly logo = input.required<string>();
  /** Client Value points shown between the subtitle and the call-to-action buttons. */
  readonly values = input.required<ClientValue[]>();

  /** Splits the title so the `highlight` phrase can be styled on its own. */
  protected readonly headline = computed(() => {
    const { title, highlight } = this.hero();
    const start = highlight ? title.indexOf(highlight) : -1;
    if (start < 0) {
      return { before: title, highlight: '', after: '' };
    }
    return {
      before: title.slice(0, start),
      highlight,
      after: title.slice(start + highlight.length),
    };
  });
}
