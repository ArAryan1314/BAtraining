"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { DomainError, runAction, type ActionResult } from "@/lib/actions/result";
import { FailureLimiter } from "@/lib/security/rate-limit";
import { submitEnquiry } from "@/services/enquiries";

const SUBMISSIONS_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

// Counts each accepted submission against the sender's address and email. Per server instance, like the sign-in limiter.
const submissions = new FailureLimiter({ limit: SUBMISSIONS_PER_HOUR, windowMs: HOUR_MS });

const thanks = `Thank you. We have your enquiry and will reply within ${siteConfig.responseTime}.`;

/** The public contact form. Anyone can send it, so it guards against bots and floods before saving. */
export async function submitEnquiryAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return runAction(async () => {
    // A hidden field that people never see. Bots fill it, so answer as if it worked and save nothing.
    if (String(data.get("website") ?? "").trim()) return thanks;

    const forwardedFor = (await headers()).get("x-forwarded-for");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const keys = [`ip:${clientIp}`, `email:${email}`];
    if (keys.some((key) => submissions.isBlocked(key))) {
      throw new DomainError(`You've sent several enquiries recently. Please wait a while, or email ${siteConfig.contactEmail} directly.`);
    }

    await submitEnquiry(Object.fromEntries(data));
    keys.forEach((key) => submissions.recordFailure(key));
    return thanks;
  });
}
