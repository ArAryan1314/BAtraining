"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink-900 shadow-soft outline-none transition placeholder:text-ink-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-700";

const interests = ["Full career program", "A single learning track", "Corporate / team training", "Something else"];

/**
 * There is no mail backend yet, so submitting opens the visitor's mail client
 * with the enquiry pre-filled. Swap `handleSubmit` for an API call when one exists.
 */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Program enquiry — ${data.get("interest")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Current role: ${data.get("role") || "—"}`,
      `Interested in: ${data.get("interest")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="relative rounded-[2rem] bg-white p-6 text-ink-900 shadow-[0_40px_100px_-30px_rgb(69_73_229/0.55)] ring-1 ring-white/20 sm:p-9">
      {sent ? (
        <div className="grid min-h-[420px] place-items-center text-center">
          <div>
            <CheckCircle2 className="mx-auto text-success" size={44} strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-semibold">Your email is ready to send</h2>
            <p className="mx-auto mt-3 max-w-sm text-ink-500">
              We opened your mail app with the enquiry filled in. If nothing appeared, write to{" "}
              <a href={`mailto:${email}`} className="font-medium text-primary-600 underline underline-offset-4">
                {email}
              </a>
              .
            </p>
            <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
              Edit enquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
            <p className="mt-1 text-sm text-ink-500">All fields except role are required.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Jordan Lee" />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="role" className={labelClass}>
              Current role
            </label>
            <input id="role" name="role" autoComplete="organization-title" className={fieldClass} placeholder="e.g. QA engineer, operations lead, graduate" />
          </div>
          <fieldset>
            <legend className={labelClass}>I&apos;m interested in</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {interests.map((interest, index) => (
                <label
                  key={interest}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-ink-700 transition has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
                >
                  <input type="radio" name="interest" value={interest} defaultChecked={index === 0} className="accent-primary-600" />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className={`${fieldClass} resize-none`}
              placeholder="Tell us about your background and goals…"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send enquiry <ArrowRight size={16} className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </form>
      )}
    </div>
  );
}
