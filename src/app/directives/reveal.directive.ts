import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Fades and lifts an element in the first time it scrolls into view.
 *
 * Usage: `<div appReveal>` or `<div [appReveal]="120">` (delay in ms, for staggering).
 * The element stays fully visible when IntersectionObserver is unavailable or the visitor
 * prefers reduced motion (see `.reveal` in styles.css).
 */
@Directive({
  selector: '[appReveal]',
  host: { '[style.--reveal-delay]': 'delayCss()' },
})
export class RevealDirective {
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (value: unknown) => numberAttribute(value, 0),
  });

  protected readonly delayCss = computed(() => `${this.delay()}ms`);

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      this.element.classList.add('reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.element.classList.add('is-revealed');
            observer.disconnect();
          }
        },
        // Any visible pixel counts: the element starts slightly offset, so a percentage
        // threshold could leave a partly visible element waiting.
        { threshold: 0, rootMargin: '0px 0px -5% 0px' },
      );
      observer.observe(this.element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
