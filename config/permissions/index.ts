export const permissions = {
  ADMIN: [
    "users.read", "users.write",
    "programs.read", "programs.write",
    "courses.read", "courses.write", "courses.publish",
    "content.read", "content.write",
    "students.read", "students.write", "trainers.read", "trainers.write",
    "assignments.read", "assignments.grade",
    "quizzes.read", "quizzes.write", "quizzes.grade",
    "projects.read", "projects.review",
    "skills.read", "skills.write",
    "certificates.issue", "certificates.revoke",
    "notifications.send",
    "reports.read", "analytics.read",
    "payments.read", "payments.manage",
    "audit.read", "settings.write",
  ],
  TRAINER: [
    "students.read", "students.write",
    "courses.read", "courses.write",
    "content.read", "content.write",
    "assignments.read", "assignments.grade",
    "quizzes.read", "quizzes.grade",
    "projects.read", "projects.review",
    "skills.read", "skills.write",
    "reports.read", "notifications.send",
  ],
  STUDENT: [
    "courses.read", "enrollments.read", "assignments.read", "assignments.submit",
    "quizzes.read", "quizzes.attempt", "progress.read", "progress.write", "projects.read", "projects.submit",
    "skills.read", "portfolio.read", "portfolio.write", "certificates.read",
    "notifications.read", "payments.read",
  ],
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions][number];
