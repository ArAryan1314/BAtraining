import fs from "node:fs";
import path from "node:path";

/** Genuine circles only: a spinner, an avatar, a switch, the circular progress ring and the back-to-top button. */
const CIRCLE_FILES = new Set(["components/ui/Spinner.tsx", "components/ui/Avatar.tsx", "components/ui/Switch.tsx", "components/dashboard/ProgressOverview.tsx", "components/common/ScrollProgress.tsx"]);
/** The only places allowed to spell out hover colours. Everything else uses the ui-* utilities in app/globals.css. */
const HOVER_FILES = new Set(["components/ui/Button.tsx", "app/globals.css"]);

const radius = /(?<![\w-])rounded(?:-(?:sm|lg|xl|2xl|3xl|full|none|\[[^\]]+\]))?(?![\w-])/g;
const hoverColour = /(?<![\w-])hover:(?:bg|text|border|underline)/g;
const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) check(full);
  }
}

function check(file) {
  const rel = path.relative(process.cwd(), file).split(path.sep).join("/");
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const where = `${rel}:${index + 1}`;
    for (const match of line.matchAll(radius)) {
      if (match[0] === "rounded-full" && CIRCLE_FILES.has(rel)) continue;
      problems.push(`${where}: "${match[0]}" - use rounded-md, the shared radius`);
    }
    if (!HOVER_FILES.has(rel) && hoverColour.test(line)) problems.push(`${where}: raw hover colour - use ui-link, ui-row, ui-card-link or a Button variant`);
    hoverColour.lastIndex = 0;
  });
}

walk(path.join(process.cwd(), "app"));
walk(path.join(process.cwd(), "components"));
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("OK: one shared radius and one shared set of interaction states.");
