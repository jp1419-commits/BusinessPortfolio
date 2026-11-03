import { Injectable, NgZone, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Wheel events closer together than this belong to one gesture (including trackpad inertia). */
const WHEEL_GESTURE_GAP_MS = 140;
/** Page flip animation (ms): a full screen takes the longest, a short settle the shortest. */
const FLIP_MAX_MS = 520;
const FLIP_MIN_MS = 200;
/** Longest flip after a swipe (ms), which continues at the finger's speed. */
const SWIPE_FLIP_MAX_MS = 420;
/** Movement (px) before a touch counts as a swipe rather than a tap. */
const TOUCH_SLOP_PX = 6;
/** A swipe flips the page once it has moved this far (px)... */
const SWIPE_DISTANCE_PX = 16;
/** ...or if the finger was still moving at least this fast when lifted (px per ms). */
const SWIPE_SPEED = 0.25;

type Direction = 1 | -1;

interface TouchDrag {
  id: number;
  startX: number;
  startY: number;
  /** Scroll position when the finger went down. */
  from: number;
  mode: 'pending' | 'drag' | 'native';
  /** How far the drag may move the pages: the previous and next page starts. */
  min: number;
  max: number;
  /** Recent finger positions, for the speed at release. */
  samples: { time: number; y: number }[];
}

/**
 * "Reels-style" page flipping: the slightest swipe, wheel or trackpad gesture, or key press
 * (arrows, Page Up/Down, Space, Home/End) moves exactly one page up or down, and in-page links
 * open their page from the top. While a finger is down the page follows it, like Reels.
 *
 * Pages are the elements marked `data-page` that currently snap (CSS decides: phones split
 * page 2 into two pages). They scroll inside one element, the app root (`.page-scroller` in
 * styles.css), which the browser's own snapping keeps aligned for everything else (scrollbar,
 * find-in-page, resizing). A page taller than the screen (e.g. a phone held sideways) scrolls
 * normally until its end, so nothing is ever skipped. Elements marked `data-no-paging` (menus)
 * are left alone.
 */
@Injectable({ providedIn: 'root' })
export class PageScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private scroller: HTMLElement | null = null;

  /** Registers the element the pages scroll in. */
  attach(scroller: HTMLElement): void {
    this.scroller = scroller;
  }

  /** How far the pages have scrolled (px). */
  scrollTop(): number {
    return this.scroller?.scrollTop ?? 0;
  }

  /** Calls `listener` (outside Angular) whenever the pages scroll; returns a function to stop. */
  onScroll(listener: () => void): () => void {
    const scroller = this.scroller;
    if (!scroller) {
      return () => {};
    }
    this.zone.runOutsideAngular(() =>
      scroller.addEventListener('scroll', listener, { passive: true }),
    );
    return () => scroller.removeEventListener('scroll', listener);
  }

  /** Starts page flipping; returns a function that stops it. */
  enable(): () => void {
    const scroller = this.scroller;
    const view = this.document.defaultView;
    if (!scroller || !view) {
      return () => {};
    }
    const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');

    // ---- Pages ----

    const snapAlign = (element: Element) =>
      view.getComputedStyle(element).scrollSnapAlign || 'none';
    const isPage = (element: Element) => !snapAlign(element).startsWith('none');
    /** Position within the scrolled content (px). */
    const offsetOf = (element: Element) =>
      element.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop;
    const maxScroll = () => scroller.scrollHeight - scroller.clientHeight;
    const clampScroll = (top: number) => Math.round(Math.min(Math.max(top, 0), maxScroll()));

    /** Scroll positions where each page starts (the footer lines up with the bottom instead). */
    const stops = (): number[] => {
      const positions = Array.from(scroller.querySelectorAll('[data-page]'))
        .filter(isPage)
        .map((page) => {
          const top = offsetOf(page);
          const bottomAligned = snapAlign(page).includes('end');
          return clampScroll(
            bottomAligned ? top + page.getBoundingClientRect().height - scroller.clientHeight : top,
          );
        });
      return [...new Set(positions)].sort((a, b) => a - b);
    };

    /**
     * Most a page may exceed the screen and still flip as a whole: a little extra (font
     * differences between browsers) only hides bottom padding.
     */
    const slack = () => Math.min(48, scroller.clientHeight * 0.08);

    /** The next page start from `from` in `direction`, if it is about one screen away or less. */
    const neighbour = (from: number, direction: Direction): number | undefined => {
      const all = stops();
      const target =
        direction > 0
          ? all.find((stop) => stop > from + 1)
          : [...all].reverse().find((stop) => stop < from - 1);
      // Further means the current page is taller than the screen: scroll through it instead.
      return target !== undefined && Math.abs(target - from) <= scroller.clientHeight + slack()
        ? target
        : undefined;
    };

    /** Where an in-page link to #id leads: the start of the page that contains the target. */
    const destinationOf = (id: string): number | undefined => {
      const element = id ? this.document.getElementById(id) : null;
      let page = element?.closest('[data-page]');
      while (page && !isPage(page)) {
        page = page.parentElement?.closest('[data-page]');
      }
      if (!element || !page || !scroller.contains(page)) {
        return undefined; // e.g. the skip link to #main: the browser handles it
      }
      const pageTop = offsetOf(page);
      const elementTop = offsetOf(element);
      // A page taller than the screen: go to the target itself if it is below the first screen.
      const oversized = page.getBoundingClientRect().height > scroller.clientHeight + slack();
      const belowFold = elementTop - pageTop > scroller.clientHeight * 0.75;
      return clampScroll(oversized && belowFold ? elementTop - 24 : pageTop);
    };

    const optedOut = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest('[data-no-paging]');

    // ---- Moving the pages ----

    let frame = 0;
    /** Where the running animation ends, so quick key presses can queue up pages. */
    let heading: number | undefined;

    /** While JS moves the pages, CSS snapping and smooth scrolling would fight every step. */
    const takeOver = () => {
      scroller.style.scrollSnapType = 'none';
      scroller.style.scrollBehavior = 'auto';
    };
    const handBack = () => {
      scroller.style.removeProperty('scroll-snap-type');
      scroller.style.removeProperty('scroll-behavior');
    };
    const stopAnimation = () => {
      if (frame) {
        view.cancelAnimationFrame(frame);
        frame = 0;
      }
      heading = undefined;
    };

    /** Moves to `target`: quick off the mark, then easing in (ease-out). */
    const glideTo = (target: number, duration?: number) => {
      stopAnimation();
      const start = scroller.scrollTop;
      const distance = target - start;
      takeOver();
      if (reducedMotion.matches || Math.abs(distance) < 1) {
        scroller.scrollTop = target;
        handBack();
        return;
      }
      const ms =
        duration ??
        Math.min(
          FLIP_MAX_MS,
          FLIP_MIN_MS + (Math.abs(distance) / scroller.clientHeight) * (FLIP_MAX_MS - FLIP_MIN_MS),
        );
      const startedAt = performance.now();
      heading = target;
      const step = (now: number) => {
        const progress = Math.min(Math.max((now - startedAt) / ms, 0), 1);
        scroller.scrollTop = start + distance * (1 - (1 - progress) ** 3);
        if (progress < 1) {
          frame = view.requestAnimationFrame(step);
        } else {
          frame = 0;
          heading = undefined;
          handBack();
        }
      };
      frame = view.requestAnimationFrame(step);
    };

    // ---- Mouse wheel and trackpad: one page per gesture ----

    let lastWheelAt = 0;
    let wheelHandled = false;
    let wheelLockedUntil = 0;
    let wheelSizes: number[] = [];

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented || optedOut(event.target)) {
        return; // ctrl: zooming
      }
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      const dy = event.deltaY * unit;
      if (Math.abs(dy) <= Math.abs(event.deltaX * unit)) {
        return; // sideways, e.g. through the services carousel
      }

      const now = performance.now();
      const size = Math.abs(dy);
      // A new gesture starts after a pause, or when a trackpad swipe speeds up again (a fresh
      // swipe while the previous one's inertia is still fading out).
      const speedingUp =
        now > wheelLockedUntil &&
        wheelSizes.length >= 3 &&
        size > 8 &&
        size > 1.5 * Math.max(...wheelSizes);
      if (now - lastWheelAt > WHEEL_GESTURE_GAP_MS || speedingUp) {
        wheelHandled = false;
        wheelSizes = [];
      }
      lastWheelAt = now;
      wheelSizes = [...wheelSizes.slice(-2), size];

      const target = neighbour(scroller.scrollTop, dy > 0 ? 1 : -1);
      if (target === undefined) {
        return; // first or last page, or a page taller than the screen
      }
      event.preventDefault();
      if (wheelHandled || now < wheelLockedUntil) {
        return; // one page per gesture
      }
      wheelHandled = true;
      wheelLockedUntil = now + FLIP_MAX_MS + 80;
      glideTo(target);
    };

    // ---- Touch: the page follows the finger, and the slightest swipe flips it ----

    let drag: TouchDrag | null = null;
    /** A flip that a touch interrupted, to finish if the touch turns out to be a tap. */
    let resumeTo: number | undefined;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        // A second finger (pinch zoom): put the page back and let the browser zoom.
        if (drag?.mode === 'drag') {
          release(event.timeStamp, true);
        }
        drag = null;
        return;
      }
      if (optedOut(event.target)) {
        drag = null;
        return;
      }
      resumeTo = heading;
      stopAnimation(); // catch a page mid-flip
      const touch = event.touches[0];
      drag = {
        id: touch.identifier,
        startX: touch.clientX,
        startY: touch.clientY,
        from: scroller.scrollTop,
        mode: 'pending',
        min: 0,
        max: 0,
        // Starts with the touch-down point: a quick flick may reach us as a single move.
        samples: [{ time: event.timeStamp, y: touch.clientY }],
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      const current = drag;
      if (!current || current.mode === 'native' || event.touches.length > 1) {
        return;
      }
      const touch = Array.from(event.touches).find((t) => t.identifier === current.id);
      if (!touch) {
        return;
      }
      const dx = touch.clientX - current.startX;
      const dy = touch.clientY - current.startY;
      if (current.mode === 'pending') {
        if (Math.abs(dx) < TOUCH_SLOP_PX && Math.abs(dy) < TOUCH_SLOP_PX) {
          return; // could still be a tap
        }
        const previous = neighbour(current.from, -1);
        const next = neighbour(current.from, 1);
        const towards = dy < 0 ? next : previous; // finger moving up: next page
        if (Math.abs(dx) > Math.abs(dy) || towards === undefined) {
          // Sideways (the services carousel), past the first or last page, or a page taller
          // than the screen: scroll natively.
          current.mode = 'native';
          return;
        }
        current.mode = 'drag';
        current.min = previous ?? current.from;
        current.max = next ?? current.from;
        takeOver();
      }
      if (event.cancelable) {
        event.preventDefault(); // the page follows the finger instead
      }
      scroller.scrollTop = Math.min(Math.max(current.from - dy, current.min), current.max);
      current.samples.push({ time: event.timeStamp, y: touch.clientY });
      while (current.samples.length > 2 && event.timeStamp - current.samples[0].time > 100) {
        current.samples.shift();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const current = drag;
      if (current && !Array.from(event.touches).some((t) => t.identifier === current.id)) {
        release(event.timeStamp, event.type === 'touchcancel');
      }
    };

    /** Finger lifted: flip to the next or previous page, or settle back. */
    const release = (time: number, cancelled: boolean) => {
      const current = drag;
      drag = null;
      const interrupted = resumeTo;
      resumeTo = undefined;
      if (!current || current.mode !== 'drag') {
        if (interrupted !== undefined) {
          glideTo(interrupted);
        }
        return;
      }

      const y = scroller.scrollTop;
      const moved = y - current.from; // > 0: towards the next page
      const speed = cancelled ? 0 : releaseSpeed(current.samples, time); // > 0: towards the next page
      let direction = 0;
      if (!cancelled) {
        if (Math.abs(speed) >= SWIPE_SPEED) {
          direction = Math.sign(speed);
        } else if (Math.abs(moved) >= SWIPE_DISTANCE_PX) {
          direction = Math.sign(moved);
        }
      }

      const startedOnPage = stops().some((stop) => Math.abs(stop - current.from) <= 1);
      const home = startedOnPage
        ? current.from
        : Math.abs(current.min - y) <= Math.abs(current.max - y)
          ? current.min
          : current.max;
      const target =
        direction > 0 && current.max > current.from
          ? current.max
          : direction < 0 && current.min < current.from
            ? current.min
            : home;

      // Carry on at the finger's speed (an ease-out starts at 3x its average speed).
      const remaining = Math.abs(target - y);
      const duration =
        target !== home && Math.abs(speed) > 0.1
          ? Math.min(Math.max((3 * remaining) / Math.abs(speed), FLIP_MIN_MS), SWIPE_FLIP_MAX_MS)
          : undefined;
      glideTo(target, duration);
    };

    // ---- Keyboard ----

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable], [data-no-paging]')) {
        return;
      }
      let direction: Direction;
      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
          direction = 1;
          break;
        case 'ArrowUp':
        case 'PageUp':
          direction = -1;
          break;
        case ' ':
          if (target?.closest('button, summary, [role="button"]')) {
            return; // Space presses buttons
          }
          direction = event.shiftKey ? -1 : 1;
          break;
        case 'Home':
          event.preventDefault();
          glideTo(0);
          return;
        case 'End':
          event.preventDefault();
          glideTo(maxScroll());
          return;
        default:
          return;
      }
      event.preventDefault();
      const next = neighbour(heading ?? scroller.scrollTop, direction);
      if (next !== undefined) {
        glideTo(next);
        return;
      }
      // A page taller than the screen: move through it.
      const distance = event.key.startsWith('Arrow') ? 80 : scroller.clientHeight * 0.85;
      scroller.scrollBy({
        top: direction * distance,
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    };

    // ---- In-page links and history ----

    /** Moves keyboard and screen-reader focus to a link's target, as following a link does. */
    const focusTarget = (id: string) => {
      const element = this.document.getElementById(id);
      if (!element) {
        return;
      }
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      element.focus({ preventScroll: true });
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const id = decodeURIComponent(link?.getAttribute('href')?.slice(1) ?? '');
      const destination = destinationOf(id);
      if (destination === undefined) {
        return;
      }
      event.preventDefault();
      if (view.location.hash !== `#${id}`) {
        view.history.pushState(null, '', `#${id}`);
      }
      glideTo(destination);
      focusTarget(id);
    };

    /**
     * Runs `callback` once the pages have stopped moving. The browser may scroll to a #section by
     * itself (Back/Forward, a #section typed into the address bar, or while the page loads).
     */
    let settleTimer = 0;
    let onSettled: (() => void) | null = null;
    const waitForStill = () => {
      view.clearTimeout(settleTimer);
      settleTimer = view.setTimeout(() => {
        scroller.removeEventListener('scroll', waitForStill);
        const callback = onSettled;
        onSettled = null;
        callback?.();
      }, 120);
    };
    const whenSettled = (callback: () => void) => {
      onSettled = callback;
      scroller.removeEventListener('scroll', waitForStill);
      scroller.addEventListener('scroll', waitForStill, { passive: true });
      waitForStill();
    };

    // Back and Forward between in-page links, or a #section typed into the address bar.
    const onPopState = () =>
      whenSettled(() => {
        const id = decodeURIComponent(view.location.hash.slice(1));
        const destination = id ? destinationOf(id) : 0;
        if (destination !== undefined) {
          glideTo(destination);
        }
      });

    // Opened with a link to a section (e.g. /#how-we-work): index.html set the #section aside so
    // the browser wouldn't jump to the section itself. Start on its page right away, and put the
    // #section back in the address bar once loading is over (browsers act on it until then).
    // Unless the visitor has moved meanwhile, check the position once more when all is still.
    const root = this.document.documentElement;
    const setAside = root.getAttribute('data-initial-hash');
    root.removeAttribute('data-initial-hash');
    const initialHash = setAside ?? view.location.hash;
    let visitorMoved = false;
    const noteVisitor = () => (visitorMoved = true);
    const alignTo = (hash: string) => {
      const destination = destinationOf(decodeURIComponent(hash.slice(1)));
      if (destination !== undefined && !visitorMoved) {
        takeOver();
        scroller.scrollTop = destination;
        handBack();
      }
    };
    let restoreTimer = 0;
    const restoreHash = () => {
      if (setAside && !view.location.hash) {
        view.history.replaceState(view.history.state, '', setAside);
      }
      whenSettled(() => alignTo(view.location.hash || initialHash));
    };
    const afterLoad = () => (restoreTimer = view.setTimeout(restoreHash));
    if (initialHash.length > 1) {
      alignTo(initialHash);
      if (this.document.readyState === 'complete') {
        afterLoad();
      } else {
        view.addEventListener('load', afterLoad, { once: true });
      }
    }

    this.zone.runOutsideAngular(() => {
      scroller.addEventListener('wheel', onWheel, { passive: false });
      scroller.addEventListener('touchstart', onTouchStart, { passive: true });
      scroller.addEventListener('touchmove', onTouchMove, { passive: false });
      scroller.addEventListener('touchend', onTouchEnd, { passive: true });
      scroller.addEventListener('touchcancel', onTouchEnd, { passive: true });
      this.document.addEventListener('keydown', onKeyDown);
      this.document.addEventListener('click', onClick);
      view.addEventListener('popstate', onPopState);
      for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
        view.addEventListener(type, noteVisitor, { passive: true, capture: true, once: true });
      }
    });

    return () => {
      stopAnimation();
      handBack();
      view.clearTimeout(settleTimer);
      scroller.removeEventListener('wheel', onWheel);
      scroller.removeEventListener('touchstart', onTouchStart);
      scroller.removeEventListener('touchmove', onTouchMove);
      scroller.removeEventListener('touchend', onTouchEnd);
      scroller.removeEventListener('touchcancel', onTouchEnd);
      this.document.removeEventListener('keydown', onKeyDown);
      this.document.removeEventListener('click', onClick);
      view.removeEventListener('popstate', onPopState);
      view.removeEventListener('load', afterLoad);
      view.clearTimeout(restoreTimer);
      scroller.removeEventListener('scroll', waitForStill);
      for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
        view.removeEventListener(type, noteVisitor, { capture: true });
      }
    };
  }
}

/** Finger speed over the last moments before release (px/ms, > 0: towards the next page). */
function releaseSpeed(samples: { time: number; y: number }[], releasedAt: number): number {
  const last = samples[samples.length - 1];
  const first = samples[0];
  // Held still before lifting: no flick.
  if (!last || !first || releasedAt - last.time > 80 || last.time <= first.time) {
    return 0;
  }
  return (first.y - last.y) / (last.time - first.time);
}
