import { BookOpen, CheckCircle2, Clock3, PlayCircle } from "lucide-react";
import { Badge, Card } from "@/components/ui";

export function LessonCard({ title, type = "Lesson", duration, status = "AVAILABLE" }: { title: string; type?: string; duration: string; status?: "AVAILABLE" | "COMPLETED" | "LOCKED" }) {
  return <Card className="p-4 transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-surface-muted">{status === "COMPLETED" ? <CheckCircle2 className="text-success" size={18} /> : type === "Video" ? <PlayCircle className="text-primary-600" size={18} /> : <BookOpen className="text-primary-600" size={18} />}</div><div className="min-w-0 flex-1"><div className="font-semibold">{title}</div><div className="mt-1 flex items-center gap-2 text-xs text-ink-500"><span>{type}</span><span>·</span><Clock3 size={12} /><span>{duration}</span></div></div><Badge tone={status === "COMPLETED" ? "success" : status === "LOCKED" ? "neutral" : "primary"}>{status === "COMPLETED" ? "Done" : status === "LOCKED" ? "Locked" : "Open"}</Badge></div></Card>;
}
