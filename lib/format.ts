const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function formatDate(date: Date | null | undefined, fallback = "—") {
  return date ? dateFormat.format(date) : fallback;
}
