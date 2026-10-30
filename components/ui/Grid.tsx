import { cn } from "./styles";
import { ReactNode, ElementType } from "react";

interface GridProps {
  children: ReactNode;
  as?: ElementType;
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Grid({ children, as: Component = "div", columns = 1, gap = "md", className }: GridProps) {
  return (
    <Component
      className={cn(
        "grid",
        {
          "gap-3": gap === "sm",
          "gap-6": gap === "md",
          "gap-10": gap === "lg",
          "gap-16": gap === "xl",
        },
        {
          "grid-cols-1": columns === 1,
          "grid-cols-1 md:grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-3": columns === 3,
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-4": columns === 4,
          "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]": columns === "auto",
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
