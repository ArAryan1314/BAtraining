import { revalidatePath } from "next/cache";
import { requireUser, type SessionUser } from "@/lib/auth/guards";
import { getSessionUser } from "@/services/auth";
import { runAction, type ActionResult } from "./result";

export type FormInput = Record<string, FormDataEntryValue>;

/** Shared server action body: resolves the signed-in user, runs the work, refreshes the workspace. */
export async function act(data: FormData, workspacePath: string, body: (actor: SessionUser, input: FormInput) => Promise<string | void>): Promise<ActionResult> {
  return runAction(async () => {
    const actor = requireUser(await getSessionUser());
    const message = await body(actor, Object.fromEntries(data));
    revalidatePath(workspacePath, "layout");
    return message;
  });
}
