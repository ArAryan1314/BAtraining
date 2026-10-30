import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select, type SelectOption } from "@/components/ui/Select";

export function FilterBar({ search, onSearch, options, value, onValueChange, reset }: { search?: string; onSearch?: (value: string) => void; options?: SelectOption[]; value?: string; onValueChange?: (value: string) => void; reset?: () => void }) {
  return <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-3 sm:flex-row sm:items-center"><div className="min-w-0 flex-1">{typeof search === "string" && <SearchInput value={search} onChange={onSearch} />}</div>{options && <div className="sm:w-56"><Select aria-label="Filter" options={options} value={value} onChange={(event) => onValueChange?.(event.target.value)} /></div>}{reset && <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>}</div>;
}
