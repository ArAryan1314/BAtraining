const DAY_MS = 86_400_000;

/** Consecutive UTC days with activity, ending today or yesterday. */
export function calculateStreak(activity: Date[], now = new Date()) {
  const days = new Set(activity.map((date) => Math.floor(date.getTime() / DAY_MS)));
  const today = Math.floor(now.getTime() / DAY_MS);
  let day = days.has(today) ? today : today - 1;
  let streak = 0;
  while (days.has(day)) {
    streak++;
    day--;
  }
  return streak;
}
