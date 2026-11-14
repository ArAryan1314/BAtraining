import { createUserAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, Input, Select, Table } from "@/components/ui";
import { workspaces } from "@/config/navigation";
import { formatDate } from "@/lib/format";
import type { listUsers } from "@/services/users";

const roles = [
  { value: "STUDENT", label: "Student" },
  { value: "TRAINER", label: "Trainer" },
  { value: "ADMIN", label: "Admin" },
];

export function AdminUsers({ users }: { users: Awaited<ReturnType<typeof listUsers>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="People" title="Users" description="Everyone with an account on the platform." />
      <Card className="p-5">
        <h2 className="font-semibold">Add a user</h2>
        <ActionForm action={createUserAction} submitLabel="Create account" resetOnSuccess className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="name" name="name" label="Full name" required />
            <Input id="email" name="email" label="Email" type="email" required />
            <Select id="role" name="role" label="Role" options={roles} required />
            <Input id="password" name="password" label="Temporary password" hint="At least 10 characters. They can change it under Account." type="text" autoComplete="off" minLength={10} required />
          </div>
        </ActionForm>
      </Card>
      <Table
        headers={["Name", "Email", "Role", "Joined"]}
        rows={users.map((user) => [
          <span key="name" className="font-medium text-ink-900">{user.name}</span>,
          user.email,
          <Badge key="role" tone={user.role === "ADMIN" ? "primary" : "neutral"}>{workspaces[user.role].label}</Badge>,
          formatDate(user.createdAt),
        ])}
      />
    </div>
  );
}
