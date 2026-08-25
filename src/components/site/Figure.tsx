import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

/**
 * Numeric display that counts up the first time it enters the viewport.
 * Accepts formatted strings ("1,000", "4+") — separators and suffixes are
 * preserved, only the digits animate.
 */
export function Figure({ value, className }: { value: string; className?: string }) {
  const digits = Number(value.replace(/[^\d.]/g, "")) || 0;
  const grouped = value.includes(",");
  const suffix = value.replace(/[\d.,]/g, "");
  const { ref, display } = useCountUp<HTMLSpanElement>(digits);

  return (
    <span ref={ref} className={cn("figure", className)}>
      {grouped ? display.toLocaleString("en-US") : display}
      {suffix}
    </span>
  );
}
