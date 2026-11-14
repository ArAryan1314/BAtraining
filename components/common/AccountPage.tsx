import { PageHeader } from "@/components/layout/PageHeader";
import type { SessionUser } from "@/lib/auth/guards";
import { AccountPanel } from "./AccountPanel";

export function AccountPage({ user }: { user: SessionUser }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Account" title="Your account" description="Manage how you sign in." />
      <AccountPanel user={user} />
    </div>
  );
}
