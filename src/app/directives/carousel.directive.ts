import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/**
 * A sideways swipe carousel: a scroll-snap row of cards (used on phones).
 * - `active()`: the card most in view, for position dots
 * - `show(index)`: scrolls to a card (e.g. when a dot is tapped)
 * Cards waiting off to the side fade in (RevealDirective) together with the visible one, instead
 * of only once swiped to.
 *
 * Usage: `<ul appCarousel #carousel="carousel">` with the cards as direct children, then
 * `carousel.active() === i` and `(click)="carousel.show(i)"` on the dots.
 */
@Directive({ selector: '[appCarousel]', exportAs: 'carousel' })
export class CarouselDirective {
  readonly active = signal(0);

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const carousel = this.element;
      const cards = Array.from(carousel.children);

      const position = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.active.set(cards.indexOf(entry.target));
            }
          }
        },
        { root: carousel, threshold: 0.6 },
      );
      cards.forEach((card) => position.observe(card));

      const reveal = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          cards.forEach((card) => card.classList.add('is-revealed'));
          reveal.disconnect();
        }
      });
      reveal.observe(carousel);

      this.destroyRef.onDestroy(() => {
        position.disconnect();
        reveal.disconnect();
      });
    });
  }

  /** Scrolls to a card. */
  show(index: number): void {
    const carousel = this.element;
    const card = carousel.children[index] as HTMLElement | undefined;
    if (!card) {
      return;
    }
    const view = carousel.ownerDocument.defaultView;
    const padding = parseFloat(view?.getComputedStyle(carousel).scrollPaddingLeft ?? '') || 0;
    const reduceMotion = view?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    carousel.scrollTo({
      left: card.offsetLeft - padding,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }
}
