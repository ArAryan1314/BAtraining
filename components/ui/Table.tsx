import { cn } from "@/lib/cn";

export function Table({ headers, rows, className }: { headers: string[]; rows: React.ReactNode[][]; className?: string }) {
  return <div className={cn("overflow-hidden rounded-xl border border-line bg-white", className)}><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-surface-muted"><tr>{headers.map(header => <th key={header} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-500">{header}</th>)}</tr></thead><tbody className="divide-y divide-line">{rows.map((row, index) => <tr key={index} className="hover:bg-surface-muted/60">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 align-middle text-ink-700">{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
