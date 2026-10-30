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

export const projectSubmissionSchema = z.object({
  projectId: z.string().min(1),
  studentId: z.string().min(1),
  title: z.string().min(3).max(160),
  contentUrl: z.url().optional(),
  notes: z.string().max(10_000).optional(),
});

/** Lesson block and resource links are shown to learners, so only web URLs are allowed. */
export const webUrlSchema = z.url({ protocol: /^https?$/ });

export const contentBlockPayloadSchema = z.object({
  text: z.string().optional(),
  url: webUrlSchema.optional(),
});
