import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { contentBlockPayloadSchema, coursePublishSchema, courseFormSchema, courseUpdateSchema, lessonContentSchema, lessonInputSchema, lessonResourceSchema, moduleInputSchema } from "@/lib/validations/domain";
import type { Prisma } from "@/generated/prisma/client";
import { writeAuditLog } from "@/services/security";

const idSchema = (key: string) => z.object({ [key]: z.string().min(1) });
const SLUG_MAX_LENGTH = 80;

export async function listPrograms(actor: SessionUser) {
  requirePermission(actor, "programs.read");
  return prisma.program.findMany({ include: { courses: true }, orderBy: { createdAt: "desc" } });
}

export async function listCoursesForAdmin(actor: SessionUser) {
  requirePermission(actor, "courses.write");
  return prisma.course.findMany({
    include: { program: true, _count: { select: { modules: true, enrollments: true } } },
    orderBy: { title: "asc" },
  });
}

export async function setCoursePublished(actor: SessionUser, input: unknown) {
  requirePermission(actor, "courses.publish");
  const { courseId, published } = coursePublishSchema.parse(input);
  const course = await prisma.course.update({ where: { id: courseId }, data: { published } });
  await writeAuditLog({ actorId: actor.id, action: published ? "course.publish" : "course.unpublish", entityType: "Course", entityId: courseId });
  return course;
}

async function uniqueSlug(title: string) {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, SLUG_MAX_LENGTH) || "course";
  let slug = base;
  for (let suffix = 2; await prisma.course.findUnique({ where: { slug }, select: { id: true } }); suffix++) slug = `${base}-${suffix}`;
  return slug;
}

export async function createCourse(actor: SessionUser, input: unknown) {
  requirePermission(actor, "courses.write");
  const { durationHours, ...fields } = courseFormSchema.parse(input);
  const course = await prisma.course.create({ data: { ...fields, slug: await uniqueSlug(fields.title), durationMinutes: Math.round(durationHours * 60) } });
  await writeAuditLog({ actorId: actor.id, action: "course.create", entityType: "Course", entityId: course.id });
  return course;
}

export async function updateCourse(actor: SessionUser, input: unknown) {
  requirePermission(actor, "courses.write");
  const { courseId, durationHours, ...fields } = courseUpdateSchema.parse(input);
  await prisma.course.update({ where: { id: courseId }, data: { ...fields, durationMinutes: Math.round(durationHours * 60) } });
  await writeAuditLog({ actorId: actor.id, action: "course.update", entityType: "Course", entityId: courseId });
}

export async function getCourseEditor(actor: SessionUser, courseId: string) {
  requirePermission(actor, "content.read");
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: { orderBy: { sortOrder: "asc" }, include: { lessons: { orderBy: { sortOrder: "asc" } } } },
      versions: { orderBy: { version: "desc" }, take: 1 },
    },
  });
  if (!course) return null;
  return { ...course, hasDraft: course.versions[0]?.status === "DRAFT" };
}

export async function addModule(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { courseId, title } = moduleInputSchema.parse(input);
  await prisma.module.create({ data: { courseId, title, sortOrder: (await prisma.module.count({ where: { courseId } })) + 1 } });
}

export async function addLesson(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { moduleId, title } = lessonInputSchema.parse(input);
  await prisma.lesson.create({ data: { moduleId, title, sortOrder: (await prisma.lesson.count({ where: { moduleId } })) + 1 } });
}

/** Refuses when a student has already completed the lesson, because deleting it would erase their progress. */
export async function deleteLesson(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { lessonId } = idSchema("lessonId").parse(input);
  if (await prisma.lessonProgress.count({ where: { lessonId, completed: true } })) throw new DomainError("Students have completed this lesson, so it can't be deleted.");
  await prisma.lesson.delete({ where: { id: lessonId } });
  await writeAuditLog({ actorId: actor.id, action: "lesson.delete", entityType: "Lesson", entityId: lessonId });
}

export async function deleteModule(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { moduleId } = idSchema("moduleId").parse(input);
  if (await prisma.lesson.count({ where: { moduleId } })) throw new DomainError("Delete this module's lessons first.");
  await prisma.module.delete({ where: { id: moduleId } });
  await writeAuditLog({ actorId: actor.id, action: "module.delete", entityType: "Module", entityId: moduleId });
}

export async function getLessonEditor(actor: SessionUser, courseId: string, lessonId: string) {
  requirePermission(actor, "content.read");
  const lesson = await prisma.lesson.findFirst({ where: { id: lessonId, module: { courseId } }, include: { resources: true, module: { include: { course: { select: { title: true } } } } } });
  if (!lesson) return null;

  const version = await prisma.courseVersion.findFirst({ where: { courseId, status: { in: ["DRAFT", "PUBLISHED"] } }, orderBy: { version: "desc" } });
  const blocks = version ? await prisma.contentBlock.findMany({ where: { versionId: version.id, lessonId } }) : [];
  const payloadOf = (type: string) => {
    const payload = contentBlockPayloadSchema.safeParse(blocks.find((block) => block.type === type)?.payload);
    return payload.success ? payload.data : {};
  };
  return {
    id: lesson.id,
    title: lesson.title,
    courseId,
    courseTitle: lesson.module.course.title,
    resources: lesson.resources,
    overview: payloadOf("TEXT").text ?? "",
    takeaway: payloadOf("CALLOUT").text ?? "",
    videoUrl: payloadOf("VIDEO").url ?? "",
  };
}

/** Edits go to a draft copy of the latest content, so students keep seeing the published version until it's released. */
async function getOrCreateDraft(tx: Prisma.TransactionClient, courseId: string, createdById: string) {
  const latest = await tx.courseVersion.findFirst({ where: { courseId }, orderBy: { version: "desc" }, include: { blocks: true } });
  if (latest?.status === "DRAFT") return latest;

  const draft = await tx.courseVersion.create({ data: { courseId, version: (latest?.version ?? 0) + 1, status: "DRAFT", createdById } });
  const source = latest?.blocks ?? [];
  if (source.length) {
    await tx.contentBlock.createMany({
      data: source.map(({ lessonId, type, title, sortOrder, payload }) => ({ versionId: draft.id, lessonId, type, title, sortOrder, payload: payload as Prisma.InputJsonValue })),
    });
  }
  return draft;
}

export async function saveLessonContent(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { courseId, lessonId, overview, takeaway, videoUrl } = lessonContentSchema.parse(input);
  const lesson = await prisma.lesson.findFirst({ where: { id: lessonId, module: { courseId } }, select: { id: true } });
  if (!lesson) throw new DomainError("This lesson isn't part of the course.");

  await prisma.$transaction(async (tx) => {
    const draft = await getOrCreateDraft(tx, courseId, actor.id);
    await tx.contentBlock.deleteMany({ where: { versionId: draft.id, lessonId } });
    const blocks = [
      overview && { type: "TEXT" as const, title: "Overview", payload: { text: overview } },
      videoUrl && { type: "VIDEO" as const, title: "Watch the video", payload: { url: videoUrl } },
      takeaway && { type: "CALLOUT" as const, title: "Key takeaway", payload: { text: takeaway } },
    ].filter((block) => !!block);
    await tx.contentBlock.createMany({ data: blocks.map((block, index) => ({ ...block, versionId: draft.id, lessonId, sortOrder: index + 1 })) });
  });
  return "Saved as a draft. Publish the content when you're ready for students to see it.";
}

export async function publishCourseContent(actor: SessionUser, input: unknown) {
  requirePermission(actor, "courses.publish");
  const { courseId } = idSchema("courseId").parse(input);
  const draft = await prisma.courseVersion.findFirst({ where: { courseId, status: "DRAFT" }, orderBy: { version: "desc" } });
  if (!draft) throw new DomainError("There are no draft changes to publish.");
  await prisma.$transaction([
    prisma.courseVersion.updateMany({ where: { courseId, status: "PUBLISHED" }, data: { status: "ARCHIVED" } }),
    prisma.courseVersion.update({ where: { id: draft.id }, data: { status: "PUBLISHED" } }),
  ]);
  await writeAuditLog({ actorId: actor.id, action: "content.publish", entityType: "CourseVersion", entityId: draft.id, metadata: { courseId } });
  return "Content published. Students can see it now.";
}

export async function addLessonResource(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { lessonId, title, url } = lessonResourceSchema.parse(input);
  await prisma.lessonResource.create({ data: { lessonId, title, kind: "LINK", url: url as string } });
}

export async function deleteLessonResource(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const { resourceId } = idSchema("resourceId").parse(input);
  await prisma.lessonResource.delete({ where: { id: resourceId } });
}
