export const LONG_LIVED: string[];

/** Problems with opening a pull request from `head` into `base`. An empty list means it is allowed. */
export function branchProblems(head: string, base: string): string[];
