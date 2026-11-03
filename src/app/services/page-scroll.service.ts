import { Injectable, NgZone, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Where paging is on: the same condition as strict scroll snapping in styles.css. */
const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)';
/** Wheel events closer together than this belong to the same gesture (incl. trackpad inertia). */
const GESTURE_GAP_MS = 150;
/** Ignore further wheel input while the page-to-page scroll is still running. */
const SCROLL_LOCK_MS = 800;

/**
 * Desktop "magnetic" paging: every wheel or trackpad gesture moves exactly one page up or down,
 * in the direction scrolled. Pages are the elements marked `data-page`.
 *
 * It sits on top of CSS scroll snapping (styles.css), which keeps the keyboard, scrollbar and
 * touch input page-aligned. If a page is ever taller than the screen (for example when zoomed
 * in), wheel scrolling inside it stays native so no content is skipped.
 */
@Injectable({ providedIn: 'root' })
export class PageScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);

  /** Starts listening; returns a function that stops it. */
  enable(): () => void {
    const view = this.document.defaultView;
    if (!view) {
      return () => {};
    }
    const desktop = view.matchMedia(DESKTOP_QUERY);
    const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');

    let lastWheelAt = 0;
    let lockedUntil = 0;
    let gestureHandled = false;

    /** Scroll positions that start each page, the last one clamped to the end of the document. */
    const pageStops = (): number[] => {
      const maxScroll = this.document.documentElement.scrollHeight - view.innerHeight;
      const stops = Array.from(this.document.querySelectorAll<HTMLElement>('[data-page]'), (page) =>
        Math.min(Math.round(page.getBoundingClientRect().top + view.scrollY), maxScroll),
      );
      return [...new Set(stops)].sort((a, b) => a - b);
    };

    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }
      const now = performance.now();
      if (now - lastWheelAt > GESTURE_GAP_MS) {
        gestureHandled = false; // a pause in the wheel input starts a new gesture
      }
      lastWheelAt = now;

      const y = view.scrollY;
      const stops = pageStops();
      const down = event.deltaY > 0;
      const target = down
        ? stops.find((stop) => stop > y + 2)
        : [...stops].reverse().find((stop) => stop < y - 2);
      if (target === undefined) {
        return; // already at the first or last page
      }
      if (Math.abs(target - y) > view.innerHeight + 2) {
        return; // the current page is taller than the screen: scroll through it normally
      }

      event.preventDefault();
      if (gestureHandled || now < lockedUntil) {
        return; // same gesture, or still moving: one page per gesture
      }
      gestureHandled = true;
      lockedUntil = now + SCROLL_LOCK_MS;
      view.scrollTo({ top: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    };

    /**
     * Links to a block inside a page (e.g. #how-we-work on page 2) scroll to that page's start.
     * Otherwise strict snapping would settle on whichever page start is nearest, which can be the
     * next page. Whole-page targets (#top, #about, #contact) already line up.
     */
    const onClick = (event: MouseEvent) => {
      if (
        !desktop.matches ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? this.document.getElementById(id) : null;
      const page = target?.closest<HTMLElement>('[data-page]');
      if (!target || !page || page === target) {
        return;
      }
      event.preventDefault();
      view.history.pushState(null, '', `#${id}`);
      view.scrollTo({
        top: Math.round(page.getBoundingClientRect().top + view.scrollY),
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    };

    this.zone.runOutsideAngular(() => {
      view.addEventListener('wheel', onWheel, { passive: false });
      this.document.addEventListener('click', onClick);
    });
    return () => {
      view.removeEventListener('wheel', onWheel);
      this.document.removeEventListener('click', onClick);
    };
  }
}
