import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type RevealVariant = "reveal" | "reveal-img" | "reveal-blur" | "reveal-mask";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "reveal",
  stagger,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  /** ms between direct children — enables a staggered cascade */
  stagger?: number;
  as?: ElementType;
}) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={
        {
          transitionDelay: `${delay}ms`,
          ...(stagger ? { "--stagger": `${stagger}ms` } : null),
        } as React.CSSProperties
      }
      className={cn(variant, stagger ? "reveal-stagger" : undefined, className)}
    >
      {children}
    </Tag>
  );
}
