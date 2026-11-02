import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Contact, IconName } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

interface Channel {
  kicker: string;
  cta: string;
  detail: string;
  href: string;
  icon: IconName;
}

/** Get In Touch: closing call to action with email and phone cards (dark background). */
@Component({
  selector: 'app-contact',
  imports: [BackdropComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="contact"
      aria-labelledby="contact-title"
      class="relative isolate flex min-h-screen min-h-svh items-center overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8 compact:py-12"
    >
      <app-backdrop tone="dark" />

      <div class="container-max w-full">
        <div appReveal class="mx-auto max-w-3xl text-center">
          <h2 id="contact-title" class="section-label justify-center">{{ contact().label }}</h2>
          <p class="section-statement text-3xl sm:text-4xl lg:text-5xl compact:text-4xl">
            {{ contact().title }}
          </p>
          <p class="mt-5 text-lg leading-relaxed text-slate-300">{{ contact().intro }}</p>
        </div>

        <div class="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2 compact:mt-10">
          @for (channel of channels(); track channel.href; let i = $index) {
            <a
              [appReveal]="120 + i * 90"
              [href]="channel.href"
              class="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-7 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-primary-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:p-8"
            >
              <span
                aria-hidden="true"
                class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-500/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70"
              ></span>

              <span
                class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30"
              >
                <app-icon [name]="channel.icon" class="h-7 w-7" />
              </span>
              <span
                aria-hidden="true"
                class="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition duration-300 group-hover:border-primary-300 group-hover:bg-primary-500 group-hover:text-white sm:right-8 sm:top-8"
              >
                <app-icon
                  name="arrow-right"
                  class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>

              <span
                class="relative mt-7 block text-xs font-semibold uppercase tracking-[0.18em] text-primary-300"
              >
                {{ channel.kicker }}
              </span>
              <span
                class="relative mt-2 block text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {{ channel.cta }}
              </span>
              <span class="relative mt-2 block truncate text-base text-slate-400">
                {{ channel.detail }}
              </span>
            </a>
          }
        </div>

        <div
          [appReveal]="300"
          class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400"
        >
          <span class="inline-flex items-center gap-2">
            <app-icon name="pin" class="h-4 w-4 text-primary-300" />
            @if (contact().address) {
              {{ contact().address }},
            }
            {{ contact().location }}
          </span>
          <a
            [href]="contact().socials.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <svg
              class="h-4 w-4 text-primary-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Follow us on LinkedIn
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly contact = input.required<Contact>();

  protected readonly channels = computed<Channel[]>(() => {
    const contact = this.contact();
    return [
      {
        kicker: 'Email us',
        cta: contact.emailCta,
        detail: contact.email,
        href: `mailto:${contact.email}`,
        icon: 'send',
      },
      {
        kicker: 'Call us',
        cta: contact.phoneCta,
        detail: contact.phone,
        // tel: links must not contain spaces
        href: `tel:${contact.phone.replace(/[^+\d]/g, '')}`,
        icon: 'phone',
      },
    ];
  });
}
