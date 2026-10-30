import Link from "next/link";
import { Clock3, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course } from "@/types/course";

const badgeTone = { BEGINNER: "success", INTERMEDIATE: "primary", ADVANCED: "danger" } as const;

export function CourseCard({ course }: { course: Course }) {
  return <Card className="group overflow-hidden"><div className="relative h-32 bg-linear-to-br from-primary-600 via-primary-500 to-indigo-600 p-5 text-white"><div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">BA pathway</div><div className="absolute -right-6 -top-7 h-32 w-32 rounded-full border-[18px] border-white/10" /><div className="absolute -bottom-12 right-16 h-28 w-28 rounded-full border-[10px] border-white/10" /></div><div className="p-5"><div className="flex items-center justify-between gap-3"><Badge tone={badgeTone[course.level]}>{course.level}</Badge><span className="text-xs text-ink-500">{course.moduleCount} modules</span></div><h3 className="mt-3 text-lg font-semibold leading-tight">{course.title}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-ink-500">{course.description}</p><div className="mt-5 flex flex-wrap gap-3 text-xs text-ink-500"><span><Clock3 className="mr-1 inline" size={14} />{course.durationHours} hrs</span><span><Users className="mr-1 inline" size={14} />{course.learnerCount} learners</span></div><div className="mt-5"><div className="mb-2 flex justify-between text-xs font-semibold"><span>Progress</span><span>{course.completionPercent}%</span></div><ProgressBar value={course.completionPercent} /></div><Link href={`/student/courses/${course.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:gap-3">{course.completionPercent === 0 ? "Start" : course.completionPercent === 100 ? "Review" : "Continue"} <ArrowRight size={16} /></Link></div></Card>;
}
