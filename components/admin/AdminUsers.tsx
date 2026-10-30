import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Table } from "@/components/ui";
import { workspaces } from "@/config/navigation";
import type { listUsers } from "@/services/users";

export function AdminUsers({ users }: { users: Awaited<ReturnType<typeof listUsers>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="People" title="Users" description="Everyone with an account on the platform." />
      <Table
        headers={["Name", "Email", "Role", "Joined"]}
        rows={users.map((user) => [
          <span key="name" className="font-medium text-ink-900">{user.name}</span>,
          user.email,
          <Badge key="role" tone={user.role === "ADMIN" ? "primary" : "neutral"}>{workspaces[user.role].label}</Badge>,
          user.createdAt.toISOString().slice(0, 10),
        ])}
      />
    </div>
  );
}
