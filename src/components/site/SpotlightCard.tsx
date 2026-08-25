import type { ElementType, ReactNode } from "react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { cn } from "@/lib/utils";

/**
 * Card surface that tracks the pointer for a soft accent spotlight
 * (and an optional micro-tilt). All motion is CSS-variable driven and
 * automatically disabled on touch / reduced-motion.
 */
export function SpotlightCard({
  children,
  className,
  tilt = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees; 0 disables tilt */
  tilt?: number;
  as?: ElementType;
}) {
  const ref = useSpotlight<HTMLElement>(tilt);

  return (
    <Tag ref={ref} className={cn("spotlight", tilt ? "tilt" : undefined, className)}>
      {children}
    </Tag>
  );
}
