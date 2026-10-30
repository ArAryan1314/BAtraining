import "./load-env";
import bcrypt from "bcryptjs";
import { ContentBlockType, CourseLevel, PublicationStatus, Role, SkillLevel } from "../generated/prisma/client";
import { prisma } from "../lib/db/prisma";

const lessonContent: Record<string, { summary: string; takeaway: string }> = {
  "What a Business Analyst Does": {
    summary: "A business analyst helps an organisation understand a problem before it spends money solving it. You work out what people actually need, turn that into clear requirements, and make sure the delivered solution meets them.",
    takeaway: "Your job is to define the right problem, not to design the software.",
  },
  "Stakeholder Thinking": {
    summary: "A stakeholder is anyone who affects, or is affected by, the change. Start by listing them, then note how much influence each one has and how much the change matters to them. That tells you who to involve closely and who simply needs to be kept informed.",
    takeaway: "Most failed projects missed a stakeholder rather than a feature.",
  },
  "Elicitation Techniques": {
    summary: "Elicitation is how you draw out requirements. Interviews give depth, workshops build agreement, observation reveals what people really do, and document analysis shows how things work today. Good analysts combine several of these and confirm what they heard.",
    takeaway: "People describe solutions; keep asking until you find the underlying need.",
  },
  "Writing Requirements": {
    summary: "A good requirement is clear, testable and tied to a business need. If nobody could check whether it has been met, it isn't finished. Say what the system must do and for whom, and leave out how it should be built.",
    takeaway: "If you can't test it, rewrite it.",
  },
};

const DEFAULT_DEV_PASSWORD = "ChangeMe123!";

function resolveSeedPassword() {
  const password = process.env.SEED_USER_PASSWORD;
  if (password) return password;
  if (process.env.NODE_ENV === "production") throw new Error("Set SEED_USER_PASSWORD before seeding production.");
  return DEFAULT_DEV_PASSWORD;
}

async function main() {
  const passwordHash = await bcrypt.hash(resolveSeedPassword(), 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@baacademy.local" },
    update: { passwordHash },
    create: { email: "admin@baacademy.local", name: "Platform Admin", role: Role.ADMIN, passwordHash },
  });

  const trainer = await prisma.user.upsert({
    where: { email: "trainer@baacademy.local" },
    update: { passwordHash },
    create: { email: "trainer@baacademy.local", name: "BA Trainer", role: Role.TRAINER, passwordHash, trainerProfile: { create: { specialization: "Business Analysis" } } },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@baacademy.local" },
    update: { passwordHash },
    create: { email: "student@baacademy.local", name: "BA Learner", role: Role.STUDENT, passwordHash, studentProfile: { create: { bio: "Demo learner" } } },
  });

  // Program.name is not unique, so find-or-create instead of upsert.
  const program =
    (await prisma.program.findFirst({ where: { name: "BA Career Accelerator" } })) ??
    (await prisma.program.create({ data: { name: "BA Career Accelerator", description: "End-to-end Business Analyst training." } }));
  const course = await prisma.course.upsert({
    where: { slug: "business-analysis-foundations" },
    update: {},
    create: {
      programId: program.id,
      title: "Business Analysis Foundations",
      slug: "business-analysis-foundations",
      description: "Core BA concepts, stakeholder thinking and requirements fundamentals.",
      level: CourseLevel.BEGINNER,
      durationMinutes: 900,
      published: true,
      modules: {
        create: [
          { title: "BA Foundations", sortOrder: 1, lessons: { create: [{ title: "What a Business Analyst Does", sortOrder: 1 }, { title: "Stakeholder Thinking", sortOrder: 2 }] } },
          { title: "Requirements", sortOrder: 2, lessons: { create: [{ title: "Elicitation Techniques", sortOrder: 1 }, { title: "Writing Requirements", sortOrder: 2 }] } },
        ],
      },
    },
  });

  const version = await prisma.courseVersion.upsert({
    where: { courseId_version: { courseId: course.id, version: 1 } },
    update: {},
    create: { courseId: course.id, version: 1, status: PublicationStatus.PUBLISHED, createdById: admin.id },
  });
  if ((await prisma.contentBlock.count({ where: { versionId: version.id } })) === 0) {
    const lessons = await prisma.lesson.findMany({ where: { module: { courseId: course.id } } });
    await prisma.contentBlock.createMany({
      data: lessons.flatMap((lesson) => {
        const content = lessonContent[lesson.title];
        if (!content) return [];
        return [
          { versionId: version.id, lessonId: lesson.id, type: ContentBlockType.TEXT, title: "Overview", payload: { text: content.summary }, sortOrder: 1 },
          { versionId: version.id, lessonId: lesson.id, type: ContentBlockType.CALLOUT, title: "Key takeaway", payload: { text: content.takeaway }, sortOrder: 2 },
        ];
      }),
    });
  }

  const quiz =
    (await prisma.quiz.findFirst({ where: { courseId: course.id, title: "Foundations check" } })) ??
    (await prisma.quiz.create({
      data: {
        courseId: course.id,
        title: "Foundations check",
        passScore: 70,
        questions: {
          create: [
            { prompt: "What is a business analyst's main job?", options: ["Writing production code", "Defining the right problem and its requirements", "Managing the budget"], answer: "Defining the right problem and its requirements" },
            { prompt: "What makes a requirement good?", options: ["It is long and detailed", "It names the technology to use", "It is clear and testable"], answer: "It is clear and testable" },
          ],
        },
      },
    }));
  if (!(await prisma.assignment.findFirst({ where: { courseId: course.id, title: "Stakeholder map" } }))) {
    await prisma.assignment.create({
      data: { courseId: course.id, title: "Stakeholder map", instructions: "Pick a project you know. List its stakeholders and note each one's influence and interest.", points: 100 },
    });
  }

  await prisma.enrollment.upsert({
    where: { studentId_courseId: { studentId: student.id, courseId: course.id } },
    update: {},
    create: { studentId: student.id, courseId: course.id },
  });

  const cohort =
    (await prisma.cohort.findFirst({ where: { name: "Demo cohort", trainerId: trainer.id } })) ??
    (await prisma.cohort.create({ data: { name: "Demo cohort", trainerId: trainer.id, courseId: course.id } }));
  await prisma.cohortMember.upsert({
    where: { cohortId_studentId: { cohortId: cohort.id, studentId: student.id } },
    update: {},
    create: { cohortId: cohort.id, studentId: student.id },
  });

  for (const name of ["Requirements Elicitation", "Stakeholder Management", "Process Modeling", "User Stories"]) {
    const skill = await prisma.skill.upsert({ where: { name }, update: {}, create: { name } });
    await prisma.studentSkill.upsert({
      where: { studentId_skillId: { studentId: student.id, skillId: skill.id } },
      update: {},
      create: { studentId: student.id, skillId: skill.id, level: SkillLevel.AWARENESS, score: 0 },
    });
  }

  console.log(`Seeded admin ${admin.email}, trainer ${trainer.email}, student ${student.email}, course ${course.slug}, quiz ${quiz.title}`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
