import "./load-env";
import bcrypt from "bcryptjs";
import { parseFirstAdmin } from "../lib/auth/first-admin";
import { prisma } from "../lib/db/prisma";

const BCRYPT_ROUNDS = 12;

/**
 * Creates the first admin on a real database, with no demo data. Safe to re-run: for an existing admin it
 * resets the password. It refuses to touch an account that belongs to a trainer or student.
 */
async function main() {
  const { name, email, password } = parseFirstAdmin(process.env);
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true, role: true } });
  if (existing && existing.role !== "ADMIN") throw new Error(`${email} already belongs to a ${existing.role.toLowerCase()}. Choose a different ADMIN_EMAIL.`);

  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { passwordHash } });
    console.log(`Reset the password for admin ${email}.`);
  } else {
    await prisma.user.create({ data: { email, name, role: "ADMIN", passwordHash } });
    console.log(`Created admin ${email}.`);
  }
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
