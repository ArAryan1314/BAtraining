import { cn } from "@/lib/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

export function Avatar({ name, src, size = "md", className }: { name: string; src?: string; size?: AvatarSize; className?: string }) {
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span className={cn("inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary-100 font-semibold text-primary-700",
      size === "sm" && "h-7 w-7 text-[10px]", size === "md" && "h-9 w-9 text-xs", size === "lg" && "h-11 w-11 text-sm", size === "xl" && "h-16 w-16 text-lg", className)}>
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials}
    </span>
  );
}
