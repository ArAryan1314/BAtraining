"use client";

import { useState, type FormEvent } from "react";
import { getSession, signIn } from "next-auth/react";
import { Button, Card, Input } from "@/components/ui";
import { workspaces } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function LoginScreen() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    }).catch(() => undefined);
    const session = result?.ok ? await getSession() : null;

    if (session) {
      // Full navigation so server components pick up the new session cookie.
      window.location.href = workspaces[session.user.role].home;
      return;
    }
    setError(result?.error === "CredentialsSignin" ? "That email and password don't match. Please try again." : "We couldn't sign you in right now. Please try again in a moment.");
    setLoading(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-surface-muted p-4">
      <Card variant="elevated" className="w-full max-w-md p-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600">{siteConfig.name}</div>
        <h1 className="mt-2 text-2xl font-black">Sign in to your workspace</h1>
        <p className="mt-2 text-sm text-ink-500">Use the email and password for your account.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input id="email" name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <Input id="password" name="password" label="Password" type="password" autoComplete="current-password" required />
          {error && <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
