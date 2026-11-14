"use client";

import { startTransition, useActionState, type SubmitEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitEnquiryAction } from "@/app/(public)/contact/actions";
import { Button } from "@/components/ui/Button";
import { enquiryInterests } from "@/config/enquiry";

const fieldClass =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-[15px] text-ink-900 shadow-soft outline-none transition placeholder:text-ink-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-700";

/** Sends the enquiry to the server, where it is saved for the admissions team. Works without JavaScript too. */
export function ContactForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiryAction, null);

  // React clears an uncontrolled form once its action finishes, even when the action failed. Submitting through a
  // transition keeps what the visitor typed, so an error never costs them their message. Without JavaScript the
  // form still posts natively through `action`.
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <div className="relative rounded-md bg-white p-6 text-ink-900 shadow-[0_40px_100px_-30px_rgb(69_73_229/0.55)] ring-1 ring-white/20 sm:p-9">
      {state?.ok ? (
        <div className="grid min-h-[420px] place-items-center text-center">
          <div role="status">
            <CheckCircle2 className="mx-auto text-success" size={44} strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-semibold">Message received</h2>
            <p className="mx-auto mt-3 max-w-sm text-ink-500">{state.message}</p>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink-500">
              Need us sooner? Write to{" "}
              <a href={`mailto:${email}`} className="font-medium ui-link">
                {email}
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <form action={formAction} onSubmit={handleSubmit} className="grid gap-5">
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
              {enquiryInterests.map((interest, index) => (
                <label
                  key={interest}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-line px-4 py-3 text-sm font-medium text-ink-700 transition has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
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
            <textarea id="message" name="message" required minLength={10} rows={4} className={`${fieldClass} resize-none`} placeholder="Tell us about your background and goals…" />
          </div>
          {/* A trap for bots: people never see or fill it. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Leave this empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {state && !state.ok && (
            <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {state.message}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? "Sending…" : "Send enquiry"} {!pending && <ArrowRight size={16} className="transition-transform group-hover/button:translate-x-0.5" />}
          </Button>
          <p className="text-center text-sm text-ink-500">
            Prefer email?{" "}
            <a href={`mailto:${email}`} className="font-medium ui-link">
              {email}
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
