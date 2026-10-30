import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow" | "light" | "glass";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface VariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonVariants({ variant = "primary", size = "md" }: VariantProps = {}) {
  return cn(
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-primary-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(18_21_29/0.2)] hover:bg-primary-700",
    variant === "secondary" && "bg-ink-900 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-ink-800",
    variant === "outline" && "border border-line bg-white text-ink-900 shadow-soft hover:border-ink-300 hover:bg-ink-50",
    variant === "ghost" && "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
    variant === "danger" && "bg-danger text-white hover:bg-red-700",
    variant === "glow" && "bg-primary-500 text-white shadow-glow hover:bg-primary-400 hover:shadow-[0_0_0_1px_rgb(124_140_248/0.5),0_16px_48px_-8px_rgb(91_103_241/0.65)]",
    variant === "light" && "bg-white text-ink-900 shadow-lift hover:bg-ink-50",
    variant === "glass" && "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-white/25 hover:bg-white/10",
    size === "sm" && "h-9 rounded-full px-4 text-[13px]",
    size === "md" && "h-11 rounded-full px-5 text-sm",
    size === "lg" && "h-12 rounded-full px-6 text-[15px]",
    size === "xl" && "h-14 rounded-full px-8 text-base"
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export interface ButtonLinkProps extends React.ComponentProps<typeof Link>, VariantProps {}

/** A Next.js link styled as a button. Use instead of wrapping `<Button>` in `<Link>`. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
