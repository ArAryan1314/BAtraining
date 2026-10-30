import type { ReactNode } from "react";

const keywords: Record<"sql" | "gherkin" | "text", RegExp | null> = {
  sql: /\b(SELECT|FROM|WHERE|AND|OR|NOT|LEFT|RIGHT|INNER|OUTER|FULL|JOIN|ON|AS|GROUP|BY|ORDER|HAVING|CASE|WHEN|THEN|ELSE|END|IN|IS|NULL|BETWEEN|LIKE|DISTINCT|COUNT|SUM|AVG|MIN|MAX|COALESCE|WITH|UNION|ALL|LIMIT|DESC|ASC)\b/g,
  gherkin: /\b(Feature|Scenario Outline|Scenario|Background|Examples|Given|When|Then|And|But|Rule)\b/g,
  text: null,
};

function highlightLine(line: string, language: "sql" | "gherkin" | "text"): ReactNode {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("--") || trimmed.startsWith("#")) {
    return <span className="italic text-ink-500">{line}</span>;
  }
  const pattern = keywords[language];
  if (!pattern) return line;

  // Split into strings and non-strings first, then colour keywords outside strings.
  return line.split(/('[^']*'|"[^"]*")/g).map((part, i) => {
    if (/^['"]/.test(part)) return <span key={i} className="text-emerald-300">{part}</span>;
    return part.split(pattern).map((token, j) =>
      j % 2 === 1 ? (
        <span key={`${i}-${j}`} className="font-medium text-primary-300">
          {token}
        </span>
      ) : (
        token
      )
    );
  });
}

export function CodeWindow({
  title,
  language,
  code,
  caption,
}: {
  title: string;
  language: "sql" | "gherkin" | "text";
  code: string;
  caption?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  const filename = language === "sql" ? "query.sql" : language === "gherkin" ? "story.feature" : "example.md";

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-[0_40px_80px_-32px_rgb(9_11_17/0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-ink-500">{filename}</span>
        <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-ink-400">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-ink-200 sm:p-6">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="table-row">
              <span className="table-cell select-none pr-5 text-right text-ink-600">{index + 1}</span>
              <span className="table-cell whitespace-pre">{highlightLine(line, language)}</span>
            </span>
          ))}
        </code>
      </pre>
      {caption && <figcaption className="border-t border-white/10 px-6 py-4 text-sm text-ink-400">{caption}</figcaption>}
    </figure>
  );
}
