import { useEffect, useRef, useState } from "react";
import { easeOutExpo, observeOnce, prefersReducedMotion } from "@/lib/motion";

/**
 * Animates a number from 0 to `value` the first time it scrolls into view.
 * Uses one rAF loop per element, cancels on unmount, and skips entirely for
 * reduced-motion users (final value rendered immediately).
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  value: number,
  duration = 1400,
) {
  const ref = useRef<T | null>(null);
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    if (prefersReducedMotion() || value === 0) {
      setDisplay(value);
      done.current = true;
      return;
    }

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOutExpo(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
      else done.current = true;
    };

    const begin = () => {
      raf = requestAnimationFrame(tick);
    };

    const inView = el.getBoundingClientRect().top < window.innerHeight * 0.9;
    const stop = inView ? (begin(), () => {}) : observeOnce(el, begin);

    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, [value, duration]);

  return { ref, display };
}
