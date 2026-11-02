import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IllustrationName } from '../../models/company.model';

/**
 * Small decorative scenes for the "What We Deliver" cards, drawn for a dark background.
 * Each scene has a subtle loop (data flow, typing cursor, monitoring scan) that only runs
 * when the visitor allows motion (see `.il-*` in styles.css).
 */
@Component({
  selector: 'app-illustration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 280 100" fill="none" focusable="false" class="block h-full w-full">
      @switch (name()) {
        @case ('systems') {
          <defs>
            <linearGradient id="il-sys-hub" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#5aaeef" />
              <stop offset="1" stop-color="#0a74d1" />
            </linearGradient>
            <radialGradient id="il-sys-glow">
              <stop offset="0" stop-color="#2491e6" stop-opacity="0.45" />
              <stop offset="1" stop-color="#2491e6" stop-opacity="0" />
            </radialGradient>
          </defs>
          <circle cx="140" cy="50" r="48" fill="url(#il-sys-glow)" />
          <g
            class="il-flow"
            stroke="#93cbf6"
            stroke-opacity="0.6"
            stroke-width="1.5"
            stroke-dasharray="4 4"
            stroke-linecap="round"
          >
            <path d="M118 50H88" />
            <path d="M162 42c14 0 16-12 30-12" />
            <path d="M162 58c14 0 16 12 30 12" />
          </g>
          <g fill="#93cbf6">
            <circle cx="88" cy="50" r="2.5" />
            <circle cx="192" cy="30" r="2.5" />
            <circle cx="192" cy="70" r="2.5" />
          </g>
          <g fill="#fff" fill-opacity="0.06" stroke="#fff" stroke-opacity="0.14">
            <rect x="22" y="26" width="66" height="48" rx="9" />
            <rect x="192" y="12" width="66" height="36" rx="9" />
            <rect x="192" y="52" width="66" height="36" rx="9" />
          </g>
          <circle cx="35" cy="38" r="4" fill="#5aaeef" />
          <circle cx="205" cy="24" r="4" fill="#5aaeef" />
          <circle cx="205" cy="64" r="4" fill="#93cbf6" />
          <g fill="#fff">
            <rect x="44" y="35" width="32" height="6" rx="3" fill-opacity="0.35" />
            <rect x="32" y="49" width="46" height="5" rx="2.5" fill-opacity="0.18" />
            <rect x="32" y="60" width="30" height="5" rx="2.5" fill-opacity="0.18" />
            <rect x="214" y="21" width="34" height="6" rx="3" fill-opacity="0.35" />
            <rect x="202" y="34" width="44" height="5" rx="2.5" fill-opacity="0.18" />
            <rect x="214" y="61" width="28" height="6" rx="3" fill-opacity="0.35" />
            <rect x="202" y="74" width="40" height="5" rx="2.5" fill-opacity="0.18" />
          </g>
          <rect x="118" y="28" width="44" height="44" rx="12" fill="url(#il-sys-hub)" />
          <g
            transform="translate(128 38)"
            stroke="#fff"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M10.34 5.1 10.61 2.7h2.78l.27 2.4a7.1 7.1 0 0 1 2.05.85l1.88-1.51 1.97 1.97-1.51 1.88a7.1 7.1 0 0 1 .85 2.05l2.4.27v2.78l-2.4.27a7.1 7.1 0 0 1-.85 2.05l1.51 1.88-1.97 1.97-1.88-1.51a7.1 7.1 0 0 1-2.05.85l-.27 2.4h-2.78l-.27-2.4a7.1 7.1 0 0 1-2.05-.85l-1.88 1.51-1.97-1.97 1.51-1.88a7.1 7.1 0 0 1-.85-2.05l-2.4-.27v-2.78l2.4-.27a7.1 7.1 0 0 1 .85-2.05L4.44 6.41l1.97-1.97 1.88 1.51a7.1 7.1 0 0 1 2.05-.85z"
            />
            <circle cx="12" cy="12" r="3" />
          </g>
        }
        @case ('software') {
          <defs>
            <linearGradient id="il-sw-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#5aaeef" />
              <stop offset="1" stop-color="#0a74d1" />
            </linearGradient>
          </defs>
          <rect
            x="22"
            y="10"
            width="170"
            height="80"
            rx="9"
            fill="#fff"
            fill-opacity="0.06"
            stroke="#fff"
            stroke-opacity="0.14"
          />
          <path d="M22 26h170" stroke="#fff" stroke-opacity="0.12" />
          <g fill="#fff" fill-opacity="0.35">
            <circle cx="34" cy="18" r="2.5" />
            <circle cx="42" cy="18" r="2.5" />
            <circle cx="50" cy="18" r="2.5" />
          </g>
          <rect x="36" y="36" width="22" height="5" rx="2.5" fill="#5aaeef" />
          <rect x="62" y="36" width="46" height="5" rx="2.5" fill="#fff" fill-opacity="0.3" />
          <rect x="46" y="48" width="62" height="5" rx="2.5" fill="#fff" fill-opacity="0.18" />
          <rect x="46" y="60" width="26" height="5" rx="2.5" fill="#93cbf6" />
          <rect x="76" y="60" width="38" height="5" rx="2.5" fill="#fff" fill-opacity="0.18" />
          <rect x="36" y="72" width="34" height="5" rx="2.5" fill="#fff" fill-opacity="0.3" />
          <rect class="il-blink" x="74" y="70.5" width="2" height="8" rx="1" fill="#93cbf6" />
          <rect x="132" y="44" width="42" height="32" rx="9" fill="url(#il-sw-badge)" />
          <path
            d="M148 54l-6 6 6 6M158 54l6 6-6 6"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="204"
            y="16"
            width="52"
            height="80"
            rx="10"
            fill="#0b2447"
            stroke="#fff"
            stroke-opacity="0.22"
          />
          <rect x="222" y="21" width="16" height="3" rx="1.5" fill="#fff" fill-opacity="0.25" />
          <rect x="211" y="30" width="38" height="16" rx="4" fill="#2491e6" fill-opacity="0.85" />
          <g fill="#fff" fill-opacity="0.14">
            <rect x="211" y="51" width="38" height="9" rx="3" />
            <rect x="211" y="64" width="26" height="9" rx="3" />
            <rect x="211" y="77" width="32" height="9" rx="3" />
          </g>
        }
        @case ('operations') {
          <defs>
            <linearGradient id="il-ops-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#93cbf6" />
              <stop offset="1" stop-color="#2491e6" />
            </linearGradient>
            <linearGradient id="il-ops-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#5aaeef" />
              <stop offset="1" stop-color="#0a74d1" />
            </linearGradient>
          </defs>
          <rect
            x="22"
            y="10"
            width="164"
            height="80"
            rx="9"
            fill="#fff"
            fill-opacity="0.06"
            stroke="#fff"
            stroke-opacity="0.14"
          />
          <circle cx="35" cy="23" r="3.5" fill="#5aaeef" />
          <rect x="43" y="20" width="36" height="6" rx="3" fill="#fff" fill-opacity="0.3" />
          <rect x="140" y="19" width="34" height="8" rx="4" fill="#5aaeef" fill-opacity="0.3" />
          <path d="M34 42h140M34 56h140M34 70h140" stroke="#fff" stroke-opacity="0.07" />
          <path
            d="M34 62h28l8-16 10 26 10-34 8 24h22l6-10 6 10h42"
            stroke="#fff"
            stroke-opacity="0.16"
            stroke-width="2.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="il-scan"
            d="M34 62h28l8-16 10 26 10-34 8 24h22l6-10 6 10h42"
            stroke="url(#il-ops-line)"
            stroke-width="2.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <g fill="#fff" fill-opacity="0.06" stroke="#fff" stroke-opacity="0.16">
            <rect x="200" y="14" width="58" height="20" rx="5" />
            <rect x="200" y="40" width="58" height="20" rx="5" />
            <rect x="200" y="66" width="58" height="20" rx="5" />
          </g>
          <circle cx="211" cy="24" r="2.5" fill="#5aaeef" />
          <circle cx="211" cy="50" r="2.5" fill="#5aaeef" />
          <circle cx="211" cy="76" r="2.5" fill="#93cbf6" />
          <g fill="#fff" fill-opacity="0.25">
            <rect x="219" y="22" width="28" height="4" rx="2" />
            <rect x="219" y="48" width="22" height="4" rx="2" />
            <rect x="219" y="74" width="26" height="4" rx="2" />
          </g>
          <circle cx="182" cy="84" r="11" fill="url(#il-ops-badge)" />
          <path
            d="m177 84 3.5 3.5 6.5-7"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
      }
    </svg>
  `,
})
export class IllustrationComponent {
  readonly name = input.required<IllustrationName>();
}
