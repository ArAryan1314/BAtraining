import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { contentBlockPayloadSchema, webUrlSchema } from "@/lib/validations/domain";
import type { Course } from "@/types/course";

const enrolledIn = (studentId: string) => ({ enrollments: { some: { studentId, status: { not: "PAUSED" as const } } } });

export async function listMyCourses(actor: SessionUser): Promise<Course[]> {
  requirePermission(actor, "courses.read");
  const courses = await prisma.course.findMany({
    where: { published: true, ...enrolledIn(actor.id) },
    include: {
      _count: { select: { modules: true, enrollments: true } },
      enrollments: { where: { studentId: actor.id }, include: { progress: true } },
    },
    orderBy: { title: "asc" },
  });
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    level: course.level,
    durationHours: Math.round(course.durationMinutes / 60),
    moduleCount: course._count.modules,
    learnerCount: course._count.enrollments,
    completionPercent: Math.round(course.enrollments[0]?.progress?.overallPercent ?? 0),
  }));
}

async function findEnrolledCourse(actor: SessionUser, slug: string) {
  return prisma.course.findFirst({
    where: { slug, published: true, ...enrolledIn(actor.id) },
    include: {
      enrollments: { where: { studentId: actor.id }, include: { progress: true } },
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            orderBy: { sortOrder: "asc" },
            include: { progress: { where: { studentId: actor.id, completed: true } } },
          },
        },
      },
    },
  });
}

/** The course's modules and lessons with the student's progress, or null if they aren't enrolled. */
export async function getCourseOutline(actor: SessionUser, slug: string) {
  requirePermission(actor, "courses.read");
  const course = await findEnrolledCourse(actor, slug);
  if (!course) return null;

  const modules = course.modules.map((module) => ({
    id: module.id,
    title: module.title,
    lessons: module.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title, completed: lesson.progress.length > 0 })),
  }));
  const lessons = modules.flatMap((module) => module.lessons);

  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    percent: Math.round(course.enrollments[0]?.progress?.overallPercent ?? 0),
    modules,
    nextLessonId: lessons.find((lesson) => !lesson.completed)?.id ?? null,
    firstLessonId: lessons[0]?.id ?? null,
  };
}

/** A lesson's published content, or null if the student can't open it. */
export async function getLessonView(actor: SessionUser, slug: string, lessonId: string) {
  const outline = await getCourseOutline(actor, slug);
  if (!outline) return null;

  const lessons = outline.modules.flatMap((module) => module.lessons);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index === -1) return null;

  const version = await prisma.courseVersion.findFirst({
    where: { courseId: outline.id, status: "PUBLISHED" },
    orderBy: { version: "desc" },
  });
  const [blocks, resources] = await Promise.all([
    version ? prisma.contentBlock.findMany({ where: { versionId: version.id, lessonId }, orderBy: { sortOrder: "asc" } }) : [],
    prisma.lessonResource.findMany({ where: { lessonId } }),
  ]);

  return {
    course: { id: outline.id, title: outline.title, slug: outline.slug },
    lesson: lessons[index],
    blocks: blocks.map((block) => {
      const payload = contentBlockPayloadSchema.safeParse(block.payload);
      return { id: block.id, type: block.type, title: block.title, ...(payload.success ? payload.data : {}) };
    }),
    resources: resources.filter((resource) => webUrlSchema.safeParse(resource.url).success),
    previousLessonId: lessons[index - 1]?.id ?? null,
    nextLessonId: lessons[index + 1]?.id ?? null,
  };
}
