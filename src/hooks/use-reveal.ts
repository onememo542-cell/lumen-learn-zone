import { useEffect, useRef, useState } from "react";
import { observeOnce, prefersReducedMotion } from "@/lib/motion";

/**
 * Enter-on-scroll state driven by a single shared IntersectionObserver.
 * Elements already in view on mount skip the observer entirely, and
 * reduced-motion users are marked visible immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    // Above / inside the fold on mount: reveal without observer churn.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    return observeOnce(el, () => setVisible(true));
  }, []);

  return { ref, visible };
}
