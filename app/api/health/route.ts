import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

/** Readiness probe: reports 503 when the database can't be reached, so a load balancer stops routing here. */
export async function GET() {
  const headers = { "Cache-Control": "no-store" };
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, service: "ba-training-platform", database: "up" }, { headers });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json({ ok: false, service: "ba-training-platform", database: "down" }, { status: 503, headers });
  }
}
