import { NextResponse } from "next/server";
import { envProblems } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Readiness probe. Reports 503 when the configuration is incomplete or the database can't be reached, so a load
 * balancer stops routing here. Problems name the setting that is wrong, never its value.
 */
export async function GET() {
  const headers = { "Cache-Control": "no-store" };
  const service = "ba-training-platform";

  const config = envProblems(process.env);
  if (config.length) return NextResponse.json({ ok: false, service, config }, { status: 503, headers });

  try {
    // Imported here so a missing database URL is reported above instead of failing when the module loads.
    const { prisma } = await import("@/lib/db/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, service, database: "up" }, { headers });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json({ ok: false, service, database: "down" }, { status: 503, headers });
  }
}
