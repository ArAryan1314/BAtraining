import { cn } from "./styles";
import { ReactNode, ElementType } from "react";

interface SectionProps {
  children: ReactNode;
  variant?: "default" | "hero" | "dark" | "soft" | "editorial" | "brand";
  as?: ElementType;
  className?: string;
}

export function Section({ children, variant = "default", as: Component = "section", className }: SectionProps) {
  return (
    <Component
      className={cn(
        "py-16 md:py-24", // Default spacing
        {
          "bg-white text-ink-900": variant === "default",
          "bg-ink-950 text-white py-24 md:py-32": variant === "hero",
          "bg-ink-900 text-white": variant === "dark",
          "bg-surface-muted text-ink-900": variant === "soft",
          "bg-primary-50 text-ink-900 border-y border-primary-100": variant === "editorial",
          "bg-primary-600 text-white": variant === "brand",
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
