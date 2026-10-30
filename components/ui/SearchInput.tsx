import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function SearchInput({ value, onChange, placeholder = "Search..." }: { value?: string; onChange?: (value: string) => void; placeholder?: string }) {
  return <div className="relative"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"/><Input aria-label="Search" value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} className="pl-9" /></div>;
}
