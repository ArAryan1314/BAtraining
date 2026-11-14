"use server";

import { act } from "@/lib/actions/act";
import type { ActionResult } from "@/lib/actions/result";
import { changeMyPassword } from "@/services/users";

export async function changePasswordAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/", changeMyPassword);
}
