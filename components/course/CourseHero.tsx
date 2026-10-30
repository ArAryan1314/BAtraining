import { ArrowRight, Clock3, Layers3 } from "lucide-react";
import type { Course } from "@/types/course";
import { Badge, Button } from "@/components/ui";

export function CourseHero({ course, action }: { course: Course; action?: React.ReactNode }) {
  return <section className="overflow-hidden rounded-xl bg-linear-to-br from-primary-700 via-primary-600 to-primary-800 p-6 text-white sm:p-8"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><Badge tone="primary">{course.level}</Badge><h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{course.title}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">{course.description}</p><div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-white/75"><span><Clock3 className="mr-1 inline" size={14} />{course.durationHours} hours</span><span><Layers3 className="mr-1 inline" size={14} />{course.moduleCount} modules</span></div></div>{action ?? <Button variant="secondary">Continue <ArrowRight size={16} /></Button>}</div></section>;
}
