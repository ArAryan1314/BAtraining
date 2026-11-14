import { userInputSchema } from "@/lib/validations/domain";

export interface FirstAdminInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Reads the first admin's details from the environment. Throws a message that names the problem
 * but never repeats the password.
 */
export function parseFirstAdmin(env: Record<string, string | undefined>): FirstAdminInput {
  if (!env.ADMIN_EMAIL) throw new Error("ADMIN_EMAIL is not set.");
  if (!env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is not set.");

  const result = userInputSchema.safeParse({ name: env.ADMIN_NAME || "Platform Admin", email: env.ADMIN_EMAIL, role: "ADMIN", password: env.ADMIN_PASSWORD });
  if (!result.success) throw new Error(result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "));

  const { name, email, password } = result.data;
  if (/^(password|changeme|admin)/i.test(password)) throw new Error("ADMIN_PASSWORD is too easy to guess. Use a long, random password.");
  return { name, email, password };
}
