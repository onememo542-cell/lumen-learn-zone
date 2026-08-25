/**
 * Shared motion primitives.
 *
 * Everything here is designed around three rules:
 *  1. One observer / one rAF loop for the whole page (no per-component listeners).
 *  2. Only compositor-friendly properties are animated (transform / opacity / clip-path).
 *  3. `prefers-reduced-motion` short-circuits work instead of just hiding it.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsFinePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/* ------------------------------------------------------------------ */
/* Shared IntersectionObserver                                         */
/* ------------------------------------------------------------------ */

type RevealCallback = (visible: boolean) => void;

const targets = new WeakMap<Element, RevealCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = targets.get(entry.target);
          if (cb) {
            cb(true);
            targets.delete(entry.target);
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
  }
  return sharedObserver;
}

/** Observe an element once; returns an unsubscribe function. */
export function observeOnce(el: Element, cb: RevealCallback): () => void {
  const observer = getObserver();
  if (!observer) {
    cb(true);
    return () => {};
  }
  targets.set(el, cb);
  observer.observe(el);
  return () => {
    targets.delete(el);
    observer.unobserve(el);
  };
}

/* ------------------------------------------------------------------ */
/* Shared rAF scheduler (one loop for all pointer/scroll driven work)   */
/* ------------------------------------------------------------------ */

const frameJobs = new Set<() => void>();
let frameHandle = 0;

function runFrame() {
  frameHandle = 0;
  const jobs = Array.from(frameJobs);
  frameJobs.clear();
  for (const job of jobs) job();
}

/** Coalesce work into the next animation frame; duplicate jobs collapse. */
export function scheduleFrame(job: () => void) {
  if (typeof requestAnimationFrame === "undefined") return;
  frameJobs.add(job);
  if (!frameHandle) frameHandle = requestAnimationFrame(runFrame);
}

/** Standard easing used across the site (expo-out). */
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
