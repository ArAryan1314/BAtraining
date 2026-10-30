import { Avatar } from "@/components/ui";

export function ActivityFeed({ items }: { items: { id: string; name: string; action: string; time: string }[] }) {
  return <div className="space-y-1">{items.map(item => <div key={item.id} className="flex items-center gap-3 rounded-lg p-3 hover:bg-surface-muted"><Avatar name={item.name} size="sm" /><div className="min-w-0 flex-1"><div className="text-sm"><span className="font-semibold">{item.name}</span> {item.action}</div><div className="mt-0.5 text-xs text-ink-500">{item.time}</div></div></div>)}</div>;
}
