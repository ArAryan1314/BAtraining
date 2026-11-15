/**
 * Pure helpers that turn raw rows into the shapes the dashboard charts draw. They take `now` as an argument
 * so the results are the same for the same input, which is what makes them testable.
 */

const DAY_MS = 86_400_000;

export const startOfDay = (date: Date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

/** Counts per day for the last `days` days, oldest first, today last. Dates outside that window are ignored. */
export function bucketByDay(dates: readonly Date[], days: number, now = new Date()): number[] {
  const today = startOfDay(now);
  const counts = new Array<number>(days).fill(0);
  for (const date of dates) {
    const age = Math.round((today - startOfDay(date)) / DAY_MS);
    if (age >= 0 && age < days) counts[days - 1 - age] += 1;
  }
  return counts;
}

/** Same as `bucketByDay` but adds a value for each row (revenue, say) instead of counting one. */
export function sumByDay(rows: readonly { at: Date; value: number }[], days: number, now = new Date()): number[] {
  const today = startOfDay(now);
  const totals = new Array<number>(days).fill(0);
  for (const row of rows) {
    const age = Math.round((today - startOfDay(row.at)) / DAY_MS);
    if (age >= 0 && age < days) totals[days - 1 - age] += row.value;
  }
  return totals;
}

export const sum = (values: readonly number[]) => values.reduce((total, value) => total + value, 0);

export interface Trend {
  current: number;
  previous: number;
  /** Percent change from the previous window to the current one. `null` when there was nothing before to compare with. */
  change: number | null;
}

/** Compares the last `window` entries of a daily series with the `window` entries before them. */
export function trend(series: readonly number[], window: number): Trend {
  const current = sum(series.slice(-window));
  const previous = sum(series.slice(-window * 2, -window));
  return { current, previous, change: previous === 0 ? null : Math.round(((current - previous) / previous) * 100) };
}

/** Counts values into buckets. Edges [0, 40, 80, 100] give 0-39, 40-79 and 80-100 (the last bucket includes its top edge). */
export function histogram(values: readonly number[], edges: readonly number[]): { label: string; count: number }[] {
  const buckets = edges.slice(0, -1).map((low, index) => {
    const high = edges[index + 1];
    const last = index === edges.length - 2;
    return { label: `${low}–${last ? high : high - 1}`, low, high, last, count: 0 };
  });
  for (const value of values) {
    const bucket = buckets.find((b) => value >= b.low && (b.last ? value <= b.high : value < b.high));
    if (bucket) bucket.count += 1;
  }
  return buckets.map(({ label, count }) => ({ label, count }));
}

export interface FunnelStage {
  label: string;
  count: number;
  /** Share of the first stage, 0-100. */
  ofFirst: number;
  /** Share of the stage before, 0-100. The first stage is 100. */
  ofPrevious: number;
}

export function funnel(stages: readonly { label: string; count: number }[]): FunnelStage[] {
  const first = stages[0]?.count ?? 0;
  return stages.map((stage, index) => {
    const before = index === 0 ? stage.count : stages[index - 1].count;
    return {
      label: stage.label,
      count: stage.count,
      ofFirst: first === 0 ? 0 : Math.round((stage.count / first) * 100),
      ofPrevious: before === 0 ? 0 : Math.round((stage.count / before) * 100),
    };
  });
}

export interface HeatCell {
  /** Midnight UTC of the day, in ms. `null` for the empty cells that pad the first week. */
  day: number | null;
  count: number;
  /** 0 (none) to 4 (busiest), for choosing a shade. */
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Activity per day for the last `weeks` weeks, laid out column by column (seven rows, Monday first) the way a
 * contribution calendar is drawn. The first column is padded so every row is the same weekday.
 */
export function activityGrid(dates: readonly Date[], weeks: number, now = new Date()): HeatCell[] {
  const days = weeks * 7;
  const counts = bucketByDay(dates, days, now);
  const firstDay = startOfDay(now) - (days - 1) * DAY_MS;
  const pad = (new Date(firstDay).getUTCDay() + 6) % 7;
  const peak = Math.max(1, ...counts);
  const cells: HeatCell[] = Array.from({ length: pad }, () => ({ day: null, count: 0, level: 0 }));
  counts.forEach((count, index) => {
    const level = count === 0 ? 0 : (Math.min(4, Math.ceil((count / peak) * 4)) as 1 | 2 | 3 | 4);
    cells.push({ day: firstDay + index * DAY_MS, count, level });
  });
  return cells;
}

export const percentOf = (part: number, whole: number) => (whole === 0 ? 0 : Math.round((part / whole) * 100));

export const averageOf = (values: readonly number[]) => (values.length ? Math.round(sum(values) / values.length) : null);

/** How long ago something happened, in whole days (0 = today). */
export const daysSince = (date: Date, now = new Date()) => Math.max(0, Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS));

export type Risk = "on-track" | "slowing" | "stalled" | "inactive";

/** Where a learner stands, from the days since their last activity. `null` means they have never done anything. */
export function riskOf(daysIdle: number | null): Risk {
  if (daysIdle === null) return "inactive";
  if (daysIdle >= 7) return "stalled";
  if (daysIdle >= 4) return "slowing";
  return "on-track";
}
