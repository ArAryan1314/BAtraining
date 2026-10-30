import { Bell } from "lucide-react";
import { markNotificationsReadAction } from "@/app/student/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, EmptyState } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { listMyNotifications } from "@/services/notifications";

export function StudentNotifications({ notifications }: { notifications: Awaited<ReturnType<typeof listMyNotifications>> }) {
  const hasUnread = notifications.some((notification) => !notification.readAt);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notifications"
        title="Your notifications"
        description="Grades, feedback and certificates."
        action={hasUnread ? <ActionForm action={markNotificationsReadAction} submitLabel="Mark all as read" variant="outline" size="sm" /> : undefined}
      />
      {notifications.length ? (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card key={notification.id} className={cn("p-4", !notification.readAt && "border-primary-200 bg-primary-50")}>
              <div className="flex justify-between gap-3">
                <div className="font-medium">{notification.title}</div>
                <div className="shrink-0 text-xs text-ink-500">{formatDate(notification.createdAt)}</div>
              </div>
              <p className="mt-1 text-sm text-ink-700">{notification.body}</p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={Bell} title="You're all caught up" description="Grades, feedback and certificates will show up here." />
      )}
    </div>
  );
}
