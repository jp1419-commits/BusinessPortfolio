import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Contact } from '../../models/company.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { IconComponent } from '../icon/icon.component';

/** Get In Touch: contact details and message form on the dark page-2 background. */
@Component({
  selector: 'app-contact',
  imports: [BackdropComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section
      id="contact"
      data-nav-theme="dark"
      aria-labelledby="contact-title"
      class="relative isolate flex min-h-screen min-h-svh items-center overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8 compact:py-12"
    >
      <app-backdrop tone="dark" />

      <div class="container-max grid w-full items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div appReveal>
            <h2 id="contact-title" class="section-label">{{ contact().label }}</h2>
            <p class="section-statement">{{ contact().title }}</p>
            <p class="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
              {{ contact().intro }}
            </p>
          </div>

          <ul [appReveal]="100" class="mt-10 space-y-3">
            <li>
              <a [href]="'mailto:' + contact().email" class="group contact-card">
                <span class="contact-icon"><app-icon name="mail" class="h-5 w-5" /></span>
                <span class="min-w-0">
                  <span class="contact-kicker">Email</span>
                  <span class="block truncate font-semibold text-white">{{ contact().email }}</span>
                </span>
                <app-icon
                  name="arrow-right"
                  class="ml-auto h-4 w-4 text-slate-500 transition duration-300 group-hover:translate-x-0.5 group-hover:text-primary-300"
                />
              </a>
            </li>
            <li>
              <a [href]="'tel:' + contact().phone" class="group contact-card">
                <span class="contact-icon"><app-icon name="phone" class="h-5 w-5" /></span>
                <span class="min-w-0">
                  <span class="contact-kicker">Phone</span>
                  <span class="block truncate font-semibold text-white">{{ contact().phone }}</span>
                </span>
                <app-icon
                  name="arrow-right"
                  class="ml-auto h-4 w-4 text-slate-500 transition duration-300 group-hover:translate-x-0.5 group-hover:text-primary-300"
                />
              </a>
            </li>
            <li class="contact-card">
              <span class="contact-icon"><app-icon name="pin" class="h-5 w-5" /></span>
              <span class="min-w-0">
                <span class="contact-kicker">Location</span>
                <span class="block font-semibold text-white">
                  @if (contact().address) {
                    {{ contact().address }},
                  }
                  {{ contact().location }}
                </span>
              </span>
            </li>
          </ul>

          <div [appReveal]="160" class="mt-8 flex items-center gap-4">
            <span class="text-sm font-medium text-slate-400">Follow us</span>
            <a
              [href]="contact().socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-primary-400/40 hover:bg-primary-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
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
        </div>

        <div [appReveal]="150" class="lg:col-span-7">
          <form
            class="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8"
          >
            <span
              aria-hidden="true"
              class="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent"
            ></span>
            <h3 class="text-xl font-semibold text-white">Send us a message</h3>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label for="contact-name" class="text-sm font-medium text-slate-300">Name</label>
                <input id="contact-name" type="text" autocomplete="name" class="form-field" />
              </div>
              <div>
                <label for="contact-email" class="text-sm font-medium text-slate-300">Email</label>
                <input id="contact-email" type="email" autocomplete="email" class="form-field" />
              </div>
            </div>
            <div class="mt-5">
              <label for="contact-subject" class="text-sm font-medium text-slate-300"
                >Subject</label
              >
              <input id="contact-subject" type="text" class="form-field" />
            </div>
            <div class="mt-5">
              <label for="contact-message" class="text-sm font-medium text-slate-300"
                >Message</label
              >
              <textarea id="contact-message" rows="5" class="form-field resize-none"></textarea>
            </div>

            <button
              type="submit"
              class="btn-primary mt-6 w-full justify-center shadow-lg shadow-primary-600/25"
            >
              Send Message
              <app-icon name="send" class="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly contact = input.required<Contact>();
}
