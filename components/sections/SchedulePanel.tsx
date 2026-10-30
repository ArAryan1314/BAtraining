import { Card } from "@/components/ui";

export type ScheduleSession = { time: string; title: string; description: string };

export function SchedulePanel({ icon, sessions }: { icon: React.ReactNode; sessions: ScheduleSession[] }) {
  return <Card className="p-6 sm:p-8">
    <div className="flex items-center justify-between">
      <div><div className="section-eyebrow">Schedule</div><h3 className="section-title">Upcoming sessions</h3></div>
      {icon}
    </div>
    <div className="mt-6 space-y-3">
      {sessions.map((session) => <div key={`${session.time}-${session.title}`} className="schedule-item">
        <div className="schedule-time">{session.time}</div>
        <div className="mt-1 font-semibold">{session.title}</div>
        <div className="mt-1 text-xs text-ink-500">{session.description}</div>
      </div>)}
    </div>
  </Card>;
}
