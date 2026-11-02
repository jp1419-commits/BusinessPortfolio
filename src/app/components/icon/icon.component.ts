import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../models/company.model';

/**
 * Decorative 24×24 line icons used across the landing page.
 * Size and colour come from the host element, e.g. `<app-icon name="gear" class="h-8 w-8 text-primary-600" />`.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      class="block h-full w-full"
    >
      @switch (name()) {
        @case ('search') {
          <circle cx="10.5" cy="10.5" r="6.75" />
          <path d="m15.5 15.5 5.25 5.25" />
        }
        @case ('lightbulb') {
          <path
            d="M9.4 16.25v-1.1c0-.95-.45-1.75-1.15-2.5a4.6 4.6 0 1 1 7.5 0c-.7.75-1.15 1.55-1.15 2.5v1.1z"
          />
          <path d="M10.1 19.25h3.8" />
          <path d="M12 1.75v1.5M4.6 4.6l1.06 1.06M19.4 4.6l-1.06 1.06M2.25 10h1.5M20.25 10h1.5" />
        }
        @case ('team') {
          <circle cx="12" cy="7.75" r="3" />
          <path d="M6.75 20v-.75a5.25 5.25 0 0 1 10.5 0V20" />
          <circle cx="5.25" cy="10.25" r="2.25" />
          <path d="M1.75 19.25v-.5a3.5 3.5 0 0 1 4.6-3.33" />
          <circle cx="18.75" cy="10.25" r="2.25" />
          <path d="M22.25 19.25v-.5a3.5 3.5 0 0 0-4.6-3.33" />
        }
        @case ('gear') {
          <path
            d="M10.34 5.1 10.61 2.7h2.78l.27 2.4a7.1 7.1 0 0 1 2.05.85l1.88-1.51 1.97 1.97-1.51 1.88a7.1 7.1 0 0 1 .85 2.05l2.4.27v2.78l-2.4.27a7.1 7.1 0 0 1-.85 2.05l1.51 1.88-1.97 1.97-1.88-1.51a7.1 7.1 0 0 1-2.05.85l-.27 2.4h-2.78l-.27-2.4a7.1 7.1 0 0 1-2.05-.85l-1.88 1.51-1.97-1.97 1.51-1.88a7.1 7.1 0 0 1-.85-2.05l-2.4-.27v-2.78l2.4-.27a7.1 7.1 0 0 1 .85-2.05L4.44 6.41l1.97-1.97 1.88 1.51a7.1 7.1 0 0 1 2.05-.85z"
          />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('handshake') {
          <path d="M2 12.5 5.5 6l2.5 1.7-3.5 6.5z" />
          <path d="M22 12.5 18.5 6 16 7.7l3.5 6.5z" />
          <path d="M16.2 8.2 13.6 7.2a2.2 2.2 0 0 0-2 .3L8.6 9.9a1.3 1.3 0 0 0 1.6 2.1l2.3-1.5" />
          <path d="m12.5 10.5 4.9 4.3M7.9 8.1l1.9-.5M4.5 14.2l6.8 5.6" />
          <path d="M17.4 14.8a1.2 1.2 0 0 1-1.7 1.7l-1.4-1.3" />
          <path d="M15.7 16.5a1.2 1.2 0 0 1-1.7 1.7l-1.4-1.3" />
          <path d="M14 18.2a1.2 1.2 0 0 1-1.8 1.6l-.9-.8" />
        }
        @case ('target') {
          <path d="M17.5 11.2A8 8 0 1 1 12.8 6.5" />
          <path d="M14.4 12.6A4.5 4.5 0 1 1 11.4 9.6" />
          <circle cx="10" cy="14" r="1" />
          <path d="m10 14 7-7" />
          <path d="M16.5 4.5v3h3l2.5-2.5h-3V2.5z" />
        }
        @case ('chart') {
          <rect x="3" y="15" width="3.75" height="5.5" rx="1" />
          <rect x="10.1" y="12" width="3.75" height="8.5" rx="1" />
          <rect x="17.25" y="9" width="3.75" height="11.5" rx="1" />
          <path d="M3 10.5 8.5 5.5 12 8.5l8.5-5.75" />
          <path d="M16.25 2.75h4.25V7" />
        }
        @case ('shield') {
          <path
            d="M12 2.75 19.5 5.6v5.65c0 4.7-3.15 8.55-7.5 9.95-4.35-1.4-7.5-5.25-7.5-9.95V5.6z"
          />
          <path d="m8.6 12.1 2.4 2.4 4.4-4.6" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" />
          <path
            d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"
          />
        }
        @case ('star') {
          <path
            d="m12 3.25 2.6 5.5 6 .75-4.4 4.15 1.15 5.95L12 16.7l-5.35 2.9 1.15-5.95L3.4 9.5l6-.75z"
          />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m3.5 7.5 8.5 6 8.5-6" />
        }
        @case ('phone') {
          <path
            d="M5.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2z"
          />
        }
        @case ('pin') {
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        }
        @case ('send') {
          <path d="M21 3 10.5 13.5" />
          <path d="m21 3-6.5 18-4-7.5L3 9.5z" />
        }
        @case ('arrow-right') {
          <path d="M5 12h14M13 6l6 6-6 6" />
        }
        @case ('arrow-up') {
          <path d="M12 19V5M6 11l6-6 6 6" />
        }
        @case ('chevron-right') {
          <path d="m9 5.5 6.5 6.5L9 18.5" />
        }
        @case ('menu') {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
