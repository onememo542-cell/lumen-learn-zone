import { useEffect, useRef } from "react";
import { prefersReducedMotion, scheduleFrame, supportsFinePointer } from "@/lib/motion";

/**
 * Pointer-tracked spotlight + subtle tilt on a container.
 * Writes only CSS custom properties (--mx / --my / --rx / --ry) so styling stays
 * in CSS, and all writes are coalesced into the shared rAF loop.
 * No-ops on touch devices and for reduced-motion users.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>(tilt = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !supportsFinePointer()) return;

    let x = 0;
    let y = 0;

    const apply = () => {
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      if (tilt) {
        el.style.setProperty("--ry", `${(x - 0.5) * 2 * tilt}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * 2 * tilt}deg`);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = (e.clientX - rect.left) / rect.width;
      y = (e.clientY - rect.top) / rect.height;
      scheduleFrame(apply);
    };

    const onEnter = () => el.setAttribute("data-pointer", "in");
    const onLeave = () => {
      el.removeAttribute("data-pointer");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [tilt]);

  return ref;
}
