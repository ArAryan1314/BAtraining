/**
 * The branching rules, as code so CI and the tests enforce the same thing the docs describe.
 * See docs/BRANCHING.md.
 */

export const LONG_LIVED = ["main", "development"];

/** Which branches a working branch may be opened against. */
const TARGETS = {
  feature: ["development"],
  bugfix: ["development"],
  chore: ["development"],
  docs: ["development"],
  release: ["main"],
  hotfix: ["main"],
};

const NAME = /^(feature|bugfix|chore|docs|release|hotfix)\/([a-z0-9][a-z0-9._-]*)$/;
const RELEASE_NAME = /^release\/\d+\.\d+\.\d+$/;

/** Returns a list of problems with opening a pull request from `head` into `base`. Empty means it's allowed. */
export function branchProblems(head, base) {
  // Dependabot names its own branches. Its updates go into development like any other change.
  if (head.startsWith("dependabot/")) return base === "development" ? [] : ["Dependency updates are opened against development."];
  if (LONG_LIVED.includes(head)) {
    // development -> main is not allowed directly: it goes through a release branch.
    return [`Open pull requests from a working branch, not from ${head}. Cut a feature/, bugfix/ or release/ branch.`];
  }
  const match = NAME.exec(head);
  if (!match) return [`Branch "${head}" must look like feature/<name>, bugfix/<name>, chore/<name>, docs/<name>, release/<x.y.z> or hotfix/<name> (lowercase, no spaces).`];
  const [, kind] = match;
  const problems = [];
  if (kind === "release" && !RELEASE_NAME.test(head)) problems.push(`Release branches are named release/<major>.<minor>.<patch>, for example release/1.3.0.`);
  if (!TARGETS[kind].includes(base)) problems.push(`${kind}/ branches are opened against ${TARGETS[kind].join(" or ")}, not ${base}.`);
  return problems;
}

// Run as a script in CI: node scripts/branch-rules.mjs <head> <base>
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split(/[\\/]/).pop())) {
  const [, , head, base] = process.argv;
  const problems = branchProblems(head, base);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log(`OK: ${head} -> ${base} follows the branching strategy.`);
}
