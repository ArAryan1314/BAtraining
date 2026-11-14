"use server";

import { act } from "@/lib/actions/act";
import type { ActionResult } from "@/lib/actions/result";
import { gradeAssignment } from "@/services/assessments";
import { addCohortMember, createCohort, removeCohortMember } from "@/services/cohorts";
import { reviewProjectSubmission } from "@/services/projects";

export async function createCohortAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/trainer", async (actor, input) => {
    await createCohort(actor, input);
  });
}

export async function addCohortMemberAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/trainer", addCohortMember);
}

export async function removeCohortMemberAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/trainer", async (actor, input) => {
    await removeCohortMember(actor, input);
  });
}

export async function gradeAssignmentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/trainer", async (actor, input) => {
    await gradeAssignment(actor, input);
  });
}

export async function reviewProjectAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/trainer", async (actor, input) => {
    await reviewProjectSubmission(actor, input);
  });
}
