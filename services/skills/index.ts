import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import type { SkillLevel } from "@/types/skill";

export async function listSkills(actor: SessionUser) {
  requirePermission(actor, "skills.read");
  return prisma.skill.findMany({ orderBy: { name: "asc" } });
}

export async function listStudentSkills(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "students.read");
  return prisma.studentSkill.findMany({ where: { studentId }, include: { skill: true }, orderBy: { updatedAt: "desc" } });
}

export async function upsertStudentSkill(actor: SessionUser, studentId: string, skillId: string, level: SkillLevel, score: number) {
  requirePermission(actor, "skills.write");
  return prisma.studentSkill.upsert({
    where: { studentId_skillId: { studentId, skillId } },
    create: { studentId, skillId, level, score },
    update: { level, score },
  });
}
