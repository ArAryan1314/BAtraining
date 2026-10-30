import { Spinner } from "@/components/ui";
export function Loading({ label = "Loading..." }: { label?: string }) { return <div className="grid min-h-40 place-items-center gap-3 text-sm text-ink-500"><Spinner/><span>{label}</span></div>; }
