import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CompanyInfo, Contact } from '../../models/company.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <footer data-page class="relative snap-end bg-navy-950 px-4 text-white sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent"
      ></div>

      <div class="container-max py-14">
        <div class="grid gap-10 md:grid-cols-12">
          <div class="md:col-span-5">
            <a
              href="#top"
              class="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950"
            >
              <img
                [src]="companyInfo().logo"
                width="40"
                height="40"
                alt=""
                loading="lazy"
                class="h-10 w-10"
              />
              <span class="max-w-[7.5rem] text-[17px] font-extrabold leading-[1.05] tracking-tight">
                {{ companyInfo().name }}
              </span>
            </a>
            <p class="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {{ companyInfo().tagline }}
            </p>
            <a
              [href]="contact().socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="companyInfo().name + ' on LinkedIn'"
              class="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-primary-400/40 hover:bg-primary-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>

          <nav aria-label="Footer" class="md:col-span-3">
            <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Explore
            </h2>
            <ul class="mt-4 space-y-2.5">
              @for (link of links; track link.href) {
                <li>
                  <a
                    [href]="link.href"
                    class="rounded text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <div class="md:col-span-4">
            <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Contact
            </h2>
            <ul class="mt-4 space-y-3 text-sm">
              <li>
                <a
                  [href]="'mailto:' + contact().email"
                  class="inline-flex items-center gap-3 rounded text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  <app-icon name="mail" class="h-4 w-4 text-primary-300" />
                  {{ contact().email }}
                </a>
              </li>
              <li>
                <a
                  [href]="phoneHref()"
                  class="inline-flex items-center gap-3 rounded text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  <app-icon name="phone" class="h-4 w-4 text-primary-300" />
                  {{ contact().phone }}
                </a>
              </li>
              <li class="flex items-center gap-3 text-slate-300">
                <app-icon name="pin" class="h-4 w-4 text-primary-300" />
                {{ contact().location }}
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row"
        >
          <p>&copy; {{ currentYear }} {{ companyInfo().name }}. All rights reserved.</p>
          <a
            href="#top"
            class="group inline-flex items-center gap-2 rounded text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            Back to top
            <app-icon
              name="arrow-up"
              class="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly companyInfo = input.required<CompanyInfo>();
  readonly contact = input.required<Contact>();

  protected readonly links = [
    { href: '#services', label: 'What We Deliver' },
    { href: '#how-we-work', label: 'How We Work' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Get In Touch' },
  ];

  /** tel: links must not contain spaces. */
  protected readonly phoneHref = computed(
    () => `tel:${this.contact().phone.replace(/[^+\d]/g, '')}`,
  );

  protected readonly currentYear = new Date().getFullYear();
}
