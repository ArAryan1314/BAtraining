"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { getSession, signIn } from "next-auth/react";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { postSignInPath } from "@/lib/auth/redirect";

const highlights = ["Pick up your course exactly where you left off", "Submit assignments and get mentor feedback", "Download and share verified certificates"];

export function LoginScreen() {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false }).catch(() => undefined);
    const session = result?.ok ? await getSession() : null;

    if (session) {
      // Full navigation so server components pick up the new session cookie.
      window.location.href = postSignInPath(session.user.role, callbackUrl);
      return;
    }
    setError(result?.error === "CredentialsSignin" ? "That email and password don't match. Please try again." : "We couldn't sign you in right now. Please try again in a moment.");
    setLoading(false);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink-950 p-12 text-white lg:flex">
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-60" />
        <div aria-hidden className="absolute -left-24 top-1/3 h-96 w-96 rounded-md bg-primary-600/30 blur-[120px]" />
        <Link href="/" className="relative text-lg font-semibold tracking-tight ui-link-inverse">{siteConfig.name}</Link>
        <div className="relative max-w-md">
          <h2 className="font-display text-5xl font-normal leading-[1.05]">Welcome back to your workspace.</h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3 text-ink-300">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary-500/20 text-primary-200"><Check size={12} strokeWidth={3} /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-ink-500">Mentor-led business analysis training.</p>
      </aside>

      <main className="grid place-items-center bg-surface-muted p-4 sm:p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium ui-link"><ArrowLeft size={15} /> Back to {siteConfig.name}</Link>
          <div className="rounded-md border border-line bg-white p-6 shadow-soft sm:p-8">
            <h1 className="text-2xl font-black tracking-tight">Sign in to your workspace</h1>
            <p className="mt-2 text-sm text-ink-500">Use the email and password for your account.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input id="email" name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" required autoFocus />
              <div className="relative">
                <Input id="password" name="password" label="Password" type={showPassword ? "text" : "password"} autoComplete="current-password" className="pr-11" required />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="ui-row absolute bottom-0 right-0 grid h-11 w-11 place-items-center text-ink-500"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {error && <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <p className="mt-6 border-t border-line pt-5 text-sm text-ink-500">
              Forgotten your password or need an account? <Link href="/contact" className="font-semibold ui-link">Contact your advisor</Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
