import { cn } from "./styles";
import { ReactNode, ElementType } from "react";

interface StackProps {
  children: ReactNode;
  as?: ElementType;
  direction?: "col" | "row";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Stack({ 
  children, 
  as: Component = "div", 
  direction = "col", 
  align, 
  justify, 
  gap = "md", 
  className 
}: StackProps) {
  return (
    <Component
      className={cn(
        "flex",
        {
          "flex-col": direction === "col",
          "flex-row items-center": direction === "row",
        },
        {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
        },
        {
          "justify-start": justify === "start",
          "justify-center": justify === "center",
          "justify-end": justify === "end",
          "justify-between": justify === "between",
        },
        {
          "gap-0": gap === "none",
          "gap-3": gap === "sm",
          "gap-6": gap === "md",
          "gap-10": gap === "lg",
          "gap-16": gap === "xl",
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
