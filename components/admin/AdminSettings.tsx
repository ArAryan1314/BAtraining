import { AccountPanel } from "@/components/common/AccountPanel";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card } from "@/components/ui";
import type { SessionUser } from "@/lib/auth/guards";
import type { getIntegrationStatus } from "@/services/reports";

export function AdminSettings({ user, integrations }: { user: SessionUser; integrations: ReturnType<typeof getIntegrationStatus> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Settings" description="Your account and the platform's connected services." />
      <AccountPanel user={user} />
      <Card className="max-w-xl p-5">
        <h2 className="font-semibold">Integrations</h2>
        <p className="mt-1 text-sm text-ink-500">These are set through environment variables on your server.</p>
        <ul className="mt-4 space-y-2">
          {integrations.map((integration) => (
            <li key={integration.name} className="flex items-center justify-between gap-3 text-sm">
              {integration.name}
              <Badge tone={integration.configured ? "success" : "neutral"}>{integration.configured ? "Configured" : "Not configured"}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
