import { ZodError } from "zod";

export type ActionResult = { ok: true; message?: string } | { ok: false; message: string };

/** An expected failure whose message is safe to show to the user. */
export class DomainError extends Error {}

/** Runs a server action body and turns failures into a message the form can display. */
export async function runAction(body: () => Promise<string | void>): Promise<ActionResult> {
  try {
    return { ok: true, message: (await body()) ?? undefined };
  } catch (error) {
    if (error instanceof DomainError) return { ok: false, message: error.message };
    if (error instanceof ZodError) return { ok: false, message: "Please check the form and try again." };
    if (error instanceof Error && (error.message === "UNAUTHENTICATED" || error.message === "FORBIDDEN")) {
      return { ok: false, message: "You don't have permission to do that." };
    }
    console.error(error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
