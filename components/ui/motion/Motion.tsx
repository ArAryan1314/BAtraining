"use client";

import { cn } from "@/components/ui/styles";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type Animation = "fade-in" | "slide-up" | "blur-in";

interface MotionProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}

/** Reveals its children once they scroll into view. */
export function Motion({ children, animation = "slide-up", delay = 0, className, as: Tag = "div" }: MotionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(
        "opacity-0 motion-reduce:opacity-100",
        isVisible && animation === "fade-in" && "animate-fade-in",
        isVisible && animation === "slide-up" && "animate-slide-up",
        isVisible && animation === "blur-in" && "animate-blur-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  delayIncrement = 90,
  className,
  itemClassName,
  animation,
}: {
  children: React.ReactNode;
  delayIncrement?: number;
  className?: string;
  itemClassName?: string;
  animation?: Animation;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <Motion key={index} delay={index * delayIncrement} className={itemClassName} animation={animation}>
          {child}
        </Motion>
      ))}
    </div>
  );
}
