/**
 * Reading-progress bar.
 *
 * Driven purely by CSS `animation-timeline: scroll(root)` where supported, so it
 * runs off the main thread with no scroll listener at all. Browsers without
 * scroll-driven animations simply show nothing (the bar stays at scaleX(0)).
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      <div className="scroll-progress h-full w-full bg-gradient-to-r from-accent via-primary to-accent" />
    </div>
  );
}
