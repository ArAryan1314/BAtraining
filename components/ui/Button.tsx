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
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    // Filled buttons hover to primary-700 and press to primary-800, whatever their resting colour.
    variant === "primary" && "bg-primary-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(18_21_29/0.2)] hover:bg-primary-700 active:bg-primary-800",
    variant === "secondary" && "bg-ink-900 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-primary-700 active:bg-primary-800",
    variant === "glow" && "bg-primary-500 text-white shadow-glow hover:bg-primary-700 active:bg-primary-800",
    variant === "danger" && "bg-danger text-white hover:bg-red-700 active:bg-red-800",
    // Quiet buttons tint to primary-50 with primary-700 text, and press to primary-100.
    variant === "outline" && "border border-line bg-white text-ink-900 shadow-soft hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
    variant === "ghost" && "text-ink-700 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
    variant === "light" && "bg-white text-ink-900 shadow-lift hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
    variant === "glass" && "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-primary-300/60 hover:bg-white/15 hover:text-primary-200 active:bg-white/20",
    size === "sm" && "h-9 rounded-md px-4 text-[13px]",
    size === "md" && "h-11 rounded-md px-5 text-sm",
    size === "lg" && "h-12 rounded-md px-6 text-[15px]",
    size === "xl" && "h-14 rounded-md px-8 text-base"
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
