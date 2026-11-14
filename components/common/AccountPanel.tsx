import { changePasswordAction } from "@/app/account-actions";
import { ActionForm } from "@/components/common/ActionForm";
import { Card, Input } from "@/components/ui";
import type { SessionUser } from "@/lib/auth/guards";

export function AccountPanel({ user }: { user: SessionUser }) {
  return (
    <Card className="max-w-xl p-5">
      <h2 className="font-semibold">Your account</h2>
      <p className="mt-1 text-sm text-ink-500">{user.name} · {user.email}</p>
      <ActionForm action={changePasswordAction} submitLabel="Change password" resetOnSuccess className="mt-5">
        <Input id="currentPassword" name="currentPassword" label="Current password" type="password" autoComplete="current-password" required />
        <Input id="newPassword" name="newPassword" label="New password" hint="At least 10 characters." type="password" autoComplete="new-password" minLength={10} required />
      </ActionForm>
    </Card>
  );
}
