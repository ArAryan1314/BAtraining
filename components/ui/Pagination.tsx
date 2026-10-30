import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Pagination({ page, pageCount, onPageChange }: { page: number; pageCount: number; onPageChange?: (page: number) => void }) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return <div className="flex items-center justify-between gap-4"><div className="text-xs text-ink-500">Page {page} of {pageCount}</div><div className="flex items-center gap-1">{page > 1 && <Button variant="ghost" size="sm" aria-label="Previous page" onClick={() => onPageChange?.(page - 1)}><ChevronLeft size={16}/></Button>}{pages.slice(Math.max(0, page - 2), Math.min(pageCount, page + 1)).map(number => <Button key={number} variant={number === page ? "primary" : "ghost"} size="sm" onClick={() => onPageChange?.(number)}>{number}</Button>)}{page < pageCount && <Button variant="ghost" size="sm" aria-label="Next page" onClick={() => onPageChange?.(page + 1)}><ChevronRight size={16}/></Button>}</div></div>;
}
