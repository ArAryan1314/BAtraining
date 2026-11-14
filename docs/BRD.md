# Business Requirements Document (BRD)

**Product:** BA Upskill, a mentor-led Business Analyst training platform
**Repository:** `ArAryan1314/BAtraining` (private)
**Live site:** https://batraining.vercel.app
**Document version:** 1.0, aligned with release 1.2.0
**Status key:** ✅ Done · 🟡 Partial · ⬜ Pending

> This document records what the business needs and how much of it exists today. Figures marked *proposed* are suggestions for the business owner to confirm. They are not measurements.

## 1. Purpose

BA Upskill teaches people to become job-ready Business Analysts through a structured, project-based program with mentor review. The platform has two jobs:

1. **Attract and admit learners** through a public website that explains the program and its outcomes.
2. **Run the program** by delivering courses, assessing work, tracking progress and issuing verifiable certificates.

## 2. Business objectives

| # | Objective | How the platform supports it |
|---|---|---|
| O1 | Convert interested visitors into applicants | Public site, topic pages, contact form |
| O2 | Deliver the curriculum consistently | Courses, modules, lessons, versioned content |
| O3 | Prove learner competence | Quizzes, graded assignments, project reviews, skills evidence |
| O4 | Give mentors visibility of who needs help | Trainer dashboard, stalled-learner signal, grading queue |
| O5 | Give graduates a credential employers can check | Certificates with public verification by code |
| O6 | Run the business with few manual steps | Admin workspace, payments record, reports, audit log |
| O7 | Protect learner data | Role-based access, audit log, secure headers, private repository |

## 3. Stakeholders and users

| Group | Needs |
|---|---|
| Business owner | Enrolments, revenue visibility, a credible brand, low running cost |
| Administrator | Manage users, courses, content, enrolments, payments and certificates |
| Trainer / mentor | See their cohorts, grade work, review projects, spot struggling learners |
| Learner (student) | Learn at their own pace, submit work, see progress, earn a certificate |
| Prospective learner | Understand the program and apply |
| Employer / third party | Verify a certificate is genuine |

## 4. Scope

**In scope:** public marketing site; sign-in with three roles; student, trainer and admin workspaces; course and content management; assessments and projects; progress tracking; certificates; in-app notifications; reporting; manual payment records; integration points for email, payments, storage and analytics.

**Out of scope for now:** native mobile apps, live video classes, a learner community or forum, multi-language content, marketplace of third-party courses, employer job board.

## 5. Functional requirements

### 5.1 Public website

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-101 | Home page presenting the program, audiences, curriculum, portfolio and FAQs | ✅ | Includes an audience section and generated artwork |
| FR-102 | Topic pages for learning tracks, career, resources and platform (38 pages) | ✅ | Four layouts, one per category; unique titles enforced by tests |
| FR-103 | Search-engine readiness: titles, descriptions, canonical links, structured data, sitemap, robots | ✅ | Social preview images per page |
| FR-104 | Contact / admissions form | ✅ | Enquiries are stored and shown in the admin inbox, with bot and flood protection |
| FR-105 | Public changelog with RSS feed | ✅ | |
| FR-106 | Public course catalogue with prices and checkout | ⬜ | |
| FR-107 | Self-service sign-up | ⬜ | Accounts are created by an admin |

### 5.2 Accounts and access

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-201 | Email and password sign-in | ✅ | Throttled after five failed attempts |
| FR-202 | Three roles (admin, trainer, student) with enforced permissions | ✅ | Checked at the page, route and service layer |
| FR-203 | Change own password | ✅ | |
| FR-204 | First admin without demo data | ✅ | `pnpm db:admin` |
| FR-205 | Password reset by email | ⬜ | Needs email delivery (FR-701) |
| FR-206 | Invite new users by email | ⬜ | Admins hand out temporary passwords today |
| FR-207 | Two-factor sign-in or single sign-on | ⬜ | |

### 5.3 Student workspace

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-301 | Dashboard with overall progress, streak and courses to resume | ✅ | |
| FR-302 | Course outline, lessons with video/text/callout, resources | ✅ | Reads only the published content version |
| FR-303 | Mark lessons complete | ✅ | Repeating it changes nothing |
| FR-304 | Quizzes scored on the server | ✅ | The learner never supplies their own score |
| FR-305 | Assignments: submit, revise until graded, see feedback | ✅ | |
| FR-306 | Projects: create, submit, track review status | ✅ | |
| FR-307 | Certificates list and notifications | ✅ | |
| FR-308 | Portfolio and skills self-assessment screens | ⬜ | Services exist; no screens |
| FR-309 | File uploads on submissions | ⬜ | Needs storage (FR-702) |

### 5.4 Trainer workspace

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-401 | Dashboard: learners needing attention, pending grading, course progress | ✅ | "Stalled" means no activity for 7 days |
| FR-402 | Cohorts: create, add and remove learners | ✅ | A trainer sees only their own cohort's learners |
| FR-403 | Grade assignments with score and feedback | ✅ | Score is capped at the assignment's points |
| FR-404 | Review project submissions (accept or request changes) | ✅ | |
| FR-405 | Reports on learner progress | ✅ | |
| FR-406 | Author course content as a trainer | 🟡 | Permissions allow it; only the admin screens exist |
| FR-407 | Announce to a cohort | ⬜ | |

### 5.5 Administration

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-501 | Create users and assign roles | ✅ | |
| FR-502 | Create and edit courses, modules, lessons and resources | ✅ | A lesson with completions cannot be deleted |
| FR-503 | Draft and publish content versions | ✅ | Learners keep seeing the published version until release |
| FR-504 | Manage quizzes, questions and assignments | ✅ | |
| FR-505 | Enrol students in published courses | ✅ | |
| FR-506 | Revoke certificates | ✅ | Revoked certificates are never reissued automatically |
| FR-507 | Record payments received outside the platform | ✅ | Manual record only |
| FR-508 | Platform reports and audit log | ✅ | |
| FR-509 | Integration status page | ✅ | Shows which services are configured, never their values |
| FR-510 | Search, filter and paginate large lists | ⬜ | Lists use fixed limits today |
| FR-511 | Admin inbox for enquiries, with status (new, contacted, closed) | ✅ | `/admin/enquiries`; the dashboard shows how many are new |

### 5.6 Progress and credentials

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-601 | Course progress is a weighted percentage: lessons 40%, assignments 20%, project milestones 20%, quizzes 20% | ✅ | Parts a course lacks are left out, so finishing everything reaches 100% |
| FR-602 | Learning streak | ✅ | Consecutive UTC days with activity |
| FR-603 | Completing a course issues a certificate once | ✅ | Safe under concurrent completion |
| FR-604 | Anyone can verify a certificate by its code | ✅ | Returns title and status only |
| FR-605 | Certificate PDF and shareable badge | ⬜ | |

### 5.7 Integrations

| ID | Requirement | Status | Notes |
|---|---|---|---|
| FR-701 | Transactional email (reset, invites, grading, certificates) | ⬜ | |
| FR-702 | File and video storage | ⬜ | Interface only |
| FR-703 | Payment gateway with signed webhooks | ⬜ | |
| FR-704 | Product analytics | ⬜ | |
| FR-705 | Error monitoring | ⬜ | |
| FR-706 | Live sessions and attendance | ⬜ | The event type exists; nothing records it |

## 6. Non-functional requirements

| ID | Area | Requirement | Status |
|---|---|---|---|
| NFR-01 | Security | Role checks on every server action; passwords hashed; sign-in throttled; CSP and HSTS headers; audit log of changes | ✅ |
| NFR-02 | Security | Secrets live only in Vercel environment variables, never in the repository | ✅ |
| NFR-03 | Security | Sign-in rate limit is shared across all servers | ⬜ (per instance today) |
| NFR-04 | Availability | A health endpoint reports configuration and database problems | ✅ |
| NFR-05 | Availability | Proposed target: 99.5% monthly for the learner workspace | ⬜ not measured |
| NFR-06 | Performance | Public pages are pre-built and served from the CDN | ✅ |
| NFR-07 | Performance | Proposed target: workspace pages respond in under 1 second at the 95th percentile | ⬜ not measured |
| NFR-08 | Accessibility | Visible focus, 24 px minimum targets, labelled controls, reduced-motion support | 🟡 not audited with an assistive-technology pass |
| NFR-09 | Maintainability | One radius and one set of interaction states, enforced by a check; typed code; automated tests | ✅ |
| NFR-10 | Observability | Errors and slow requests are captured and alerted | ⬜ |
| NFR-11 | Data protection | Backups with point-in-time recovery; a retention policy for audit logs | ⬜ |
| NFR-12 | Compliance | Privacy policy, terms and a data-deletion process | ⬜ |

## 7. Success measures (proposed)

| Measure | Why it matters |
|---|---|
| Enquiries per month, and enquiry-to-enrolment rate | Objective O1 |
| Course completion rate and median days to complete | O2 |
| Share of learners active in the last 7 days | O4 |
| Assignments graded within an agreed number of days | O3, O4 |
| Certificates verified by third parties | O5 |
| Admin hours per enrolment | O6 |

The business owner should set a target for each. None are tracked yet, because analytics (FR-704) is not connected.

## 8. Assumptions and constraints

- The site runs on Vercel with a managed PostgreSQL database, so running costs scale with use.
- The repository is private and secrets are never committed.
- Content (topics, courses) is authored by the team. No third-party content is licensed.
- Payment today is manual. A gateway needs business verification (KYC), which takes days.
- Demo accounts exist only for local development and must never be seeded on a real database.

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Missing production settings stop sign-in | Learners cannot log in | Health endpoint names the missing item; sign-in page explains it; checklist in `GO-LIVE.md` |
| Enquiries not noticed because there is no email alert | Slow replies | The dashboard and inbox show new enquiries; add an email alert once email delivery exists (T-06) |
| No password-reset email | Support load grows with learners | Email delivery (FR-701) |
| No error monitoring | Problems found by users first | FR-705 |
| One database for preview and production | Test data mixes with real data | Separate Preview database |
| Sign-in limiter is per server | Weaker brute-force protection | Shared store (NFR-03) |

## 10. Acceptance criteria for go-live

1. `/api/health` returns `{"ok":true,"database":"up"}`.
2. An admin can sign in, create a trainer and a student, enrol the student in a published course and see them appear in reports.
3. The student can complete a lesson, pass a quiz, submit an assignment and receive a certificate on finishing.
4. The trainer can grade that assignment and see the learner on their dashboard.
5. The certificate verifies at `/verify/<code>`.
6. Password reset works by email (FR-205).
7. An enquiry sent from the contact form appears in the admin inbox, and an alert exists for errors (FR-705).
8. A backup restore has been tested once.

## 11. Open questions for the business owner

1. What is the price, currency and refund policy, and is payment per course or by subscription?
2. Which payment gateway and email provider should be used?
3. What are the targets for the success measures in section 7?
4. Who staffs trainer accounts, and how many learners should one trainer carry?
5. Is a public catalogue with self sign-up wanted, or is admission always through an advisor?
6. What data-retention period applies to learner records and the audit log?
7. Are the audience descriptions and the "what happens next" steps on the public pages accurate for the real admissions process?
