import { cn } from "./styles";
import { ReactNode, ElementType } from "react";

interface SurfaceProps {
  children: ReactNode;
  as?: ElementType;
  variant?: "default" | "muted" | "dark" | "brand";
  border?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function Surface({ 
  children, 
  as: Component = "div", 
  variant = "default", 
  border = false,
  radius = "none",
  className 
}: SurfaceProps) {
  return (
    <Component
      className={cn(
        {
          "bg-white text-ink-900": variant === "default",
          "bg-surface-muted text-ink-900": variant === "muted",
          "bg-ink-950 text-white": variant === "dark",
          "bg-primary-600 text-white": variant === "brand",
        },
        {
          "border border-line": border && variant !== "dark" && variant !== "brand",
          "border border-white/10": border && variant === "dark",
          "border border-primary-500": border && variant === "brand",
        },
        {
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-xl": radius === "xl",
          "rounded-full": radius === "full",
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
