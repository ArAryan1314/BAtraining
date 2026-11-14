import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { FailureLimiter } from "@/lib/security/rate-limit";

const MAX_FAILED_SIGN_INS = 5;
const SIGN_IN_WINDOW_MS = 15 * 60 * 1000;
const signInLimiter = new FailureLimiter({ limit: MAX_FAILED_SIGN_INS, windowMs: SIGN_IN_WINDOW_MS });

// A fixed hash to compare against when the email is unknown, so response time doesn't reveal which emails have accounts.
const UNKNOWN_USER_HASH = "$2b$12$.EocYzBfd/b.owtqjAV/9.hzA2pnq2jDjThC6RFEdpt4qihAHleb.";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials.password) return null;

        const email = credentials.email.trim().toLowerCase();
        const forwardedFor = request.headers?.["x-forwarded-for"];
        const clientIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim() ?? "unknown";
        const keys = [`email:${email}`, `ip:${clientIp}`];
        if (keys.some((key) => signInLimiter.isBlocked(key))) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        const isValid = await bcrypt.compare(credentials.password, user?.passwordHash ?? UNKNOWN_USER_HASH);
        if (!user?.passwordHash || !isValid) {
          keys.forEach((key) => signInLimiter.recordFailure(key));
          return null;
        }
        signInLimiter.reset(`email:${email}`);

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
