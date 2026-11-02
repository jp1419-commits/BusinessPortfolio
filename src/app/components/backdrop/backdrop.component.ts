import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

let nextId = 0;

/**
 * Decorative section background, shared so sections that should look alike stay identical:
 * - `light`: the front page look (white to light blue, faint grid, corner ribbons)
 * - `dark`: the navy look of page 2 (depth gradient, faint grid, azure glows, logo facets)
 *
 * Place it first inside a `relative isolate overflow-hidden` section.
 */
@Component({
  selector: 'app-backdrop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
    'aria-hidden': 'true',
  },
  template: `
    @if (tone() === 'light') {
      <div class="absolute inset-0 bg-gradient-to-b from-white via-white to-primary-50"></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_116_209/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(10_116_209/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      ></div>
      <svg
        class="absolute right-0 hidden h-40 w-40 sm:block lg:h-56 lg:w-56"
        [class]="belowNav() ? 'top-[72px]' : 'top-0'"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient [attr.id]="ribbonId" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2491e6" />
            <stop offset="1" stop-color="#085ead" />
          </linearGradient>
        </defs>
        <polygon points="34,0 58,0 100,42 100,66" fill="#5aaeef" opacity="0.55" />
        <polygon points="66,0 100,0 100,34" [attr.fill]="'url(#' + ribbonId + ')'" />
      </svg>
    } @else {
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
    }
  `,
})
export class BackdropComponent {
  readonly tone = input<'light' | 'dark'>('light');
  /** Light tone only: start the corner ribbons below the fixed navbar (front page). */
  readonly belowNav = input(false, { transform: booleanAttribute });

  protected readonly ribbonId = `backdrop-ribbon-${nextId++}`;
}
