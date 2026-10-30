import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "app");
const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) {
      const source = fs.readFileSync(full, "utf8");
      if (/className\s*=/.test(source) && entry.name !== "layout.tsx") {
        problems.push(`${full}: Tailwind/page styling detected outside component layer (className prop found)`);
      }
    }
  }
}

walk(root);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("OK: route files contain no className or Tailwind utility styling.");
