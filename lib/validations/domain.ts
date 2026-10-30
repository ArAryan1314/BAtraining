import { z } from "zod";

export const courseInputSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  durationMinutes: z.number().int().positive().max(100_000),
});

export const lessonCompletionSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
});

export const enrollmentInputSchema = z.object({
  studentId: z.string().min(1),
  courseId: z.string().min(1),
});

export const coursePublishSchema = z.object({
  courseId: z.string().min(1),
  published: z.enum(["true", "false"]).transform((value) => value === "true"),
});

/** Lesson block and resource links are shown to learners, so only web URLs are allowed. */
export const webUrlSchema = z.url({ protocol: /^https?$/ });

export const contentBlockPayloadSchema = z.object({
  text: z.string().optional(),
  url: webUrlSchema.optional(),
});

const id = z.string().min(1);
const requiredText = (label: string, max = 10_000) => z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);
const optionalText = (max = 10_000) => z.string().trim().max(max).transform((value) => value || undefined).optional();
const optionalWebUrl = z.preprocess((value) => (value === "" ? undefined : value), z.url({ protocol: /^https?$/, error: "Enter a full web link starting with https://." }).optional());
const courseLevel = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);

export const courseFormSchema = z.object({
  title: requiredText("Title", 160),
  description: requiredText("Description"),
  level: courseLevel,
  durationHours: z.coerce.number("Enter the duration in hours.").positive("Duration must be more than 0 hours.").max(2_000),
});
export const courseUpdateSchema = courseFormSchema.extend({ courseId: id });
export const moduleInputSchema = z.object({ courseId: id, title: requiredText("Module title", 160) });
export const lessonInputSchema = z.object({ moduleId: id, title: requiredText("Lesson title", 160) });
export const lessonContentSchema = z.object({
  courseId: id,
  lessonId: id,
  overview: optionalText(),
  takeaway: optionalText(2_000),
  videoUrl: optionalWebUrl,
});
export const lessonResourceSchema = z.object({ lessonId: id, title: requiredText("Resource title", 160), url: optionalWebUrl.refine(Boolean, "Enter the resource link.") });

export const quizInputSchema = z.object({
  courseId: id,
  title: requiredText("Quiz title", 160),
  passScore: z.coerce.number("Enter a pass mark.").min(1, "The pass mark must be between 1 and 100.").max(100, "The pass mark must be between 1 and 100."),
});
export const questionInputSchema = z.object({
  quizId: id,
  prompt: requiredText("Question"),
  options: z.string().transform((value) => value.split(/\r?\n/).map((option) => option.trim()).filter(Boolean)).refine((options) => options.length >= 2, "Add at least two answer options, one per line."),
  answer: requiredText("Correct answer"),
  points: z.coerce.number().int().min(1, "Points must be at least 1.").max(100),
}).refine((input) => input.options.includes(input.answer), { error: "The correct answer must exactly match one of the options." });
export const assignmentInputSchema = z.object({
  courseId: id,
  title: requiredText("Assignment title", 160),
  instructions: requiredText("Instructions"),
  points: z.coerce.number().int().min(1, "Points must be at least 1.").max(1_000),
  dueAt: z.preprocess((value) => (value === "" ? undefined : value), z.coerce.date().optional()),
});
export const assignmentSubmissionSchema = z.object({ assignmentId: id, content: requiredText("Your answer", 50_000) });
export const gradeInputSchema = z.object({
  submissionId: id,
  score: z.coerce.number("Enter a score.").min(0, "The score can't be negative."),
  feedback: optionalText(),
});

export const projectInputSchema = z.object({ title: requiredText("Project title", 160), description: optionalText() });
export const projectSubmitSchema = z.object({ projectId: id, title: requiredText("Submission title", 160), contentUrl: optionalWebUrl, notes: optionalText() });
export const projectReviewSchema = z.object({
  submissionId: id,
  decision: z.enum(["ACCEPTED", "CHANGES_REQUESTED"]),
  notes: requiredText("Feedback"),
});

export const cohortInputSchema = z.object({ name: requiredText("Cohort name", 120), courseId: id });
export const cohortMemberSchema = z.object({ cohortId: id, studentId: id });

const password = z.string().min(10, "Use at least 10 characters for the password.").max(200);
export const userInputSchema = z.object({
  name: requiredText("Name", 120),
  email: z.email("Enter a valid email address.").transform((value) => value.trim().toLowerCase()),
  role: z.enum(["ADMIN", "TRAINER", "STUDENT"]),
  password,
});
export const passwordChangeSchema = z.object({ currentPassword: z.string().min(1, "Enter your current password."), newPassword: password });

export const paymentInputSchema = z.object({
  studentId: id,
  amount: z.string().trim().regex(/^\d+(\.\d{1,2})?$/, "Enter an amount such as 4999 or 4999.50."),
  currency: z.string().trim().length(3).default("INR"),
  providerRef: optionalText(120),
});
