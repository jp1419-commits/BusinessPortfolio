import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Hero } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="top"
      class="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-primary-50 px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:pb-24 lg:pt-40"
    >
      <!-- Background: faint grid + the corner ribbons from the brand artwork -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_116_209/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(10_116_209/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        ></div>
        <svg
          class="absolute right-0 top-[72px] hidden h-40 w-40 sm:block lg:h-56 lg:w-56"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero-ribbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#2491e6" />
              <stop offset="1" stop-color="#085ead" />
            </linearGradient>
          </defs>
          <polygon points="34,0 58,0 100,42 100,66" fill="#5aaeef" opacity="0.55" />
          <polygon points="66,0 100,0 100,34" fill="url(#hero-ribbon)" />
        </svg>
      </div>

      <div class="container-max grid items-center gap-16 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p
            class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm sm:px-4 sm:text-sm"
          >
            <span class="h-2 w-2 rounded-full bg-primary-500"></span>
            {{ hero().eyebrow }}
          </p>

          <h1
            class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl"
          >
            {{ headline().before
            }}<span
              class="box-decoration-clone bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 bg-clip-text text-transparent"
              >{{ headline().highlight }}</span
            >{{ headline().after }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {{ hero().subtitle }}
          </p>

          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" class="btn-primary justify-center shadow-lg shadow-primary-600/25">
              Get In Touch
              <app-icon name="arrow-right" class="h-5 w-5" />
            </a>
            <a href="#how-we-work" class="btn-secondary justify-center">See How We Work</a>
          </div>
        </div>

        <!-- Brand artwork -->
        <div
          aria-hidden="true"
          class="relative mx-auto hidden w-full max-w-md lg:col-span-5 lg:block"
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
    </section>
  `,
})
export class HeroComponent {
  readonly hero = input.required<Hero>();
  readonly logo = input.required<string>();

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
