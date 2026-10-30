import type { TopicContent } from "./types";

export const resourceTopics: TopicContent[] = [
  {
    slug: "resources",
    category: "resources",
    eyebrow: "Resource library",
    title: "Everything a working BA reaches for",
    highlight: "working BA",
    summary:
      "Templates, checklists, tool guides, query patterns and a plain-English glossary — the practical kit behind every BA Upskill module, organised the way you will use it on a live project.",
    meta: [
      { label: "Format", value: "Guides, templates, examples" },
      { label: "Level", value: "Beginner to experienced" },
      { label: "Focus", value: "On-the-job use" },
      { label: "Access", value: "Included with the program" },
    ],
    overview: {
      heading: "A reference shelf, not a reading list",
      paragraphs: [
        "Most BA work is repeatable: you elicit, document, validate, trace and sign off. The difference between a junior and a senior analyst is often how quickly they can produce a clean artifact and how reliably they catch what is missing. This library exists to shorten both.",
        "Each section is built around a job you will actually do — drafting a BRD, preparing a sign-off pack, writing JQL to find untested stories, reconciling two data extracts in SQL. Use it alongside the curriculum, then keep it open once you are in the role.",
      ],
    },
    outcomes: [
      "Start any core BA artifact from a proven structure instead of a blank page",
      "Run readiness checks before sign-off, UAT and release",
      "Use Jira, Confluence, SQL and Excel the way delivery teams expect a BA to",
      "Speak the vocabulary of business analysis precisely in interviews and workshops",
      "Know which deliverable fits which project phase and delivery approach",
    ],
    concepts: [
      {
        title: "Templates",
        description: "Structured starting points for BRDs, FRDs, user stories, RTMs and stakeholder registers.",
        icon: "layout-template",
      },
      {
        title: "Deliverables",
        description: "What each artifact is for, who consumes it and when it is produced in the lifecycle.",
        icon: "file-text",
      },
      {
        title: "Checklists",
        description: "Gate-style checks that catch gaps before sign-off, UAT entry and go-live.",
        icon: "list-checks",
      },
      {
        title: "Tools",
        description: "Practical guides to Jira, Confluence, SQL, Excel and modelling tools used on real teams.",
        icon: "wrench",
      },
      {
        title: "Glossary",
        description: "Concise, accurate definitions of the terms you will hear in every BA conversation.",
        icon: "book-open",
      },
    ],
    faqs: [
      {
        question: "Are these resources tied to a specific methodology?",
        answer:
          "No. Artifacts are presented with both waterfall and agile usage in mind. Where a deliverable differs between approaches — for example a full BRD versus a lean product backlog — the guidance says so.",
      },
      {
        question: "Can I use the templates at work?",
        answer:
          "Yes. They are deliberately generic so you can adapt them to your organisation's standards, branding and governance.",
      },
      {
        question: "Do I need prior tool experience?",
        answer:
          "No. Each tool guide starts with the BA-relevant basics and moves to the patterns you will use daily, so you can follow along from zero.",
      },
    ],
    related: ["templates", "checklists", "tools", "glossary"],
  },
  {
    slug: "templates",
    category: "resources",
    eyebrow: "Resource library",
    title: "BA templates that hold up in review",
    highlight: "hold up in review",
    summary:
      "Field-tested structures for the documents stakeholders, developers and testers actually read — with guidance on what goes in each section and what to leave out.",
    meta: [
      { label: "Templates", value: "Core BA artifacts" },
      { label: "Approach", value: "Agile and waterfall" },
      { label: "Level", value: "All levels" },
    ],
    overview: {
      heading: "A template is a thinking aid, not a form",
      paragraphs: [
        "A good template prompts the right questions: who is the stakeholder, what problem are we solving, how will we know it works, what is out of scope. A bad one invites you to fill every box whether it matters or not.",
        "Each template here includes section-level guidance and common mistakes, so you learn why the structure exists. Trim sections that do not apply, but make that a deliberate decision and record it.",
      ],
    },
    outcomes: [
      "Produce a reviewable BRD or FRD draft in a fraction of the usual time",
      "Write user stories with acceptance criteria that testers can execute",
      "Build a requirements traceability matrix that links needs to tests",
      "Maintain a stakeholder register that drives your engagement plan",
      "Tailor any template to project size and delivery approach",
    ],
    concepts: [
      {
        title: "Purpose before format",
        description: "Every section answers a question a reader has. If no one needs the answer, cut the section.",
        icon: "target",
      },
      {
        title: "Traceable IDs",
        description: "Unique requirement IDs make traceability, change control and test coverage possible.",
        icon: "git-branch",
      },
      {
        title: "Testable language",
        description: "Replace vague words like \"fast\" or \"user-friendly\" with measurable conditions.",
        icon: "shield-check",
      },
      {
        title: "Version control",
        description: "Version history, owners and approval status belong on the first page, not in an email thread.",
        icon: "layers",
      },
    ],
    artifacts: [
      {
        name: "Business Requirements Document (BRD)",
        description: "Business problem, objectives, scope, stakeholders, high-level requirements, assumptions and constraints.",
      },
      {
        name: "Functional Requirements Document (FRD)",
        description: "Detailed system behaviour, business rules, data requirements, interfaces and non-functional requirements.",
      },
      {
        name: "User story and acceptance criteria",
        description: "Role-goal-benefit format with Given/When/Then criteria, dependencies and definition of ready notes.",
      },
      {
        name: "Requirements Traceability Matrix (RTM)",
        description: "Links each requirement to its business objective, design element, test case and status.",
      },
      {
        name: "Stakeholder register",
        description: "Name, role, interest, influence, communication preference and engagement approach for each stakeholder.",
      },
    ],
    faqs: [
      {
        question: "Should agile teams still use a BRD?",
        answer:
          "Often a lighter form of it. Many agile teams keep a short vision or scope document plus a backlog of epics and stories. Regulated environments may still require a formal BRD for audit.",
      },
      {
        question: "How detailed should an FRD be?",
        answer:
          "Detailed enough that a developer and tester reach the same understanding without asking you. If two people can read a requirement two ways, it needs more precision.",
      },
      {
        question: "What is the most commonly skipped template?",
        answer:
          "The RTM. It feels like overhead until a change request lands and nobody can say which tests and design elements are affected.",
      },
    ],
    related: ["deliverables", "checklists", "requirements-engineering", "portfolio"],
  },
  {
    slug: "deliverables",
    category: "resources",
    eyebrow: "Resource library",
    title: "Know every BA deliverable and when it matters",
    highlight: "when it matters",
    summary:
      "A practical map of the artifacts a business analyst produces across a project — what each one is for, who signs it off, and where it sits in the delivery lifecycle.",
    meta: [
      { label: "Coverage", value: "Discovery to go-live" },
      { label: "Approach", value: "Agile and waterfall" },
      { label: "Level", value: "Beginner to intermediate" },
    ],
    overview: {
      heading: "Deliverables are evidence of shared understanding",
      paragraphs: [
        "A deliverable is not valuable because it exists; it is valuable because the right people agreed to it. Each BA artifact captures a decision — what is in scope, how a process works today, what the system must do — so the team can build and test against something stable.",
        "Knowing which deliverable to produce, at what level of detail, and for which audience is a core senior-BA skill. Over-documenting slows teams down; under-documenting pushes ambiguity into development and testing, where it is far more expensive to fix.",
      ],
    },
    outcomes: [
      "Choose the right deliverables for a project's size, risk and approach",
      "Explain the purpose and audience of each artifact in an interview",
      "Sequence deliverables from discovery through UAT and transition",
      "Identify who reviews and approves each deliverable",
      "Keep deliverables aligned when requirements change",
    ],
    concepts: [
      {
        title: "Discovery artifacts",
        description: "Business case, stakeholder register, current-state process maps and problem statements.",
        icon: "search",
      },
      {
        title: "Requirements artifacts",
        description: "BRD, FRD, user stories, use cases, business rules and non-functional requirements.",
        icon: "file-text",
      },
      {
        title: "Analysis models",
        description: "Future-state process maps, data dictionaries, context diagrams and wireframes.",
        icon: "workflow",
      },
      {
        title: "Validation artifacts",
        description: "RTM, UAT plan, test scenarios and sign-off records.",
        icon: "shield-check",
      },
      {
        title: "Transition artifacts",
        description: "Training notes, release notes input and operational readiness checklists.",
        icon: "route",
      },
    ],
    steps: [
      {
        title: "Discovery",
        description: "Confirm the problem, stakeholders and scope; produce the business case input and current-state maps.",
      },
      {
        title: "Elicitation and analysis",
        description: "Capture and model requirements; produce BRD, process maps and data definitions.",
      },
      {
        title: "Specification",
        description: "Detail functional and non-functional requirements as FRD sections or refined backlog items.",
      },
      {
        title: "Validation",
        description: "Trace requirements to tests, plan UAT and secure formal sign-off.",
      },
      {
        title: "Transition",
        description: "Support release readiness, training and handover to operations.",
      },
    ],
    artifacts: [
      {
        name: "Process map (as-is and to-be)",
        description: "BPMN or swimlane diagrams showing current pain points and the target process.",
      },
      {
        name: "Data dictionary",
        description: "Field names, definitions, formats, valid values, sources and owners for in-scope data.",
      },
      {
        name: "UAT plan",
        description: "Scope, entry and exit criteria, scenarios, roles, environment and defect triage approach.",
      },
      {
        name: "Requirements Traceability Matrix",
        description: "The thread connecting business objectives, requirements, design and test results.",
      },
    ],
    faqs: [
      {
        question: "Which deliverable should I prioritise on a small project?",
        answer:
          "A clear scope statement, a to-be process map and testable requirements with acceptance criteria. Those three prevent most downstream confusion.",
      },
      {
        question: "Who approves BA deliverables?",
        answer:
          "Typically the business sponsor or product owner approves business requirements, while solution leads and test leads review functional detail for feasibility and testability.",
      },
      {
        question: "Can I show deliverables in a portfolio?",
        answer:
          "Yes, using sanitised or self-created case material. Never share client or employer documents without permission.",
      },
    ],
    related: ["templates", "checklists", "portfolio", "requirements-engineering"],
  },
  {
    slug: "checklists",
    category: "resources",
    eyebrow: "Resource library",
    title: "Checklists that catch gaps before sign-off",
    highlight: "catch gaps",
    summary:
      "Short, gate-style checks for requirements readiness, UAT entry and go-live — the questions experienced BAs ask before putting their name on a deliverable.",
    meta: [
      { label: "Use at", value: "Every project gate" },
      { label: "Format", value: "Yes / no checks" },
      { label: "Level", value: "All levels" },
    ],
    overview: {
      heading: "Discipline you can repeat under pressure",
      paragraphs: [
        "Deadlines compress review time, and that is exactly when gaps slip through: an unapproved assumption, a requirement with no test, a stakeholder who never saw the final version. A checklist turns experience into a routine you can run in minutes.",
        "These checklists are deliberately short. Each item is a question with a clear yes or no. Any \"no\" becomes either an action or a documented, accepted risk.",
      ],
    },
    outcomes: [
      "Assess whether requirements are genuinely ready for sign-off",
      "Confirm UAT entry criteria before business users start testing",
      "Spot missing non-functional, data and integration requirements",
      "Record open items as owned actions or accepted risks",
      "Walk into a sign-off meeting with no surprises",
    ],
    concepts: [
      {
        title: "Completeness",
        description: "All in-scope processes, roles, data and exceptions are covered — including the unhappy paths.",
        icon: "list-checks",
      },
      {
        title: "Quality",
        description: "Each requirement is clear, testable, uniquely identified and free of solution bias.",
        icon: "shield-check",
      },
      {
        title: "Agreement",
        description: "The right stakeholders reviewed the right version, and their comments are resolved.",
        icon: "users",
      },
      {
        title: "Traceability",
        description: "Every requirement links back to an objective and forward to a test.",
        icon: "git-branch",
      },
    ],
    steps: [
      {
        title: "Scope confirmed",
        description: "In-scope and out-of-scope items are explicit, and the sponsor has agreed them in writing.",
      },
      {
        title: "Requirements quality reviewed",
        description: "Each requirement has an ID, owner, priority and acceptance criteria; ambiguous terms are defined in the glossary.",
      },
      {
        title: "Non-functional and data covered",
        description: "Performance, security, availability, audit and data quality requirements are stated and measurable.",
      },
      {
        title: "Traceability complete",
        description: "The RTM links every requirement to a business objective and at least one test scenario.",
      },
      {
        title: "Open items resolved or logged",
        description: "Outstanding questions, assumptions and dependencies have owners, dates or formal risk acceptance.",
      },
      {
        title: "Approvers identified and briefed",
        description: "Sign-off authority is confirmed, reviewers have the final version, and comments are closed out.",
      },
    ],
    artifacts: [
      {
        name: "Requirements sign-off readiness checklist",
        description: "Scope, quality, NFR, traceability and approval checks before baseline.",
      },
      {
        name: "Definition of Ready checklist",
        description: "Story-level checks before a backlog item enters a sprint.",
      },
      {
        name: "UAT entry and exit checklist",
        description: "Environment, data, test cases, defect thresholds and business sign-off criteria.",
      },
      {
        name: "Go-live readiness checklist",
        description: "Training, communications, support handover, rollback plan and business acceptance.",
      },
    ],
    faqs: [
      {
        question: "Is a checklist a substitute for judgement?",
        answer:
          "No. It ensures you do not forget the basics so your judgement can focus on the genuinely hard questions.",
      },
      {
        question: "What if the sponsor wants sign-off with open items?",
        answer:
          "That can be reasonable. Document each open item, its impact and owner, and have the sponsor explicitly accept the risk as part of the sign-off record.",
      },
      {
        question: "How is Definition of Ready different from Definition of Done?",
        answer:
          "Ready describes when a story can be pulled into a sprint; Done describes when the increment meets the team's quality standard and is potentially releasable.",
      },
    ],
    related: ["templates", "deliverables", "agile-ba", "stakeholder-management"],
  },
  {
    slug: "tools",
    category: "resources",
    eyebrow: "Resource library",
    title: "The BA toolkit employers expect you to know",
    highlight: "BA toolkit",
    summary:
      "The software business analysts use every day — for backlog management, documentation, modelling, data analysis and collaboration — and what you need to know about each.",
    meta: [
      { label: "Categories", value: "Delivery, docs, modelling, data" },
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Focus", value: "Job-ready usage" },
    ],
    overview: {
      heading: "Tools change; the analysis does not",
      paragraphs: [
        "Job descriptions list tools because hiring managers want to know you can contribute from week one. The good news is that BA tools cluster into a few categories, and the concepts transfer: if you understand a backlog in Jira, you can work in Azure DevOps.",
        "Focus on depth in the most common tools — Jira, Confluence, Excel and SQL — and working familiarity with a modelling tool. That combination covers most BA roles across banking, retail and technology teams.",
      ],
    },
    outcomes: [
      "Manage epics, stories and sprints in a backlog tool",
      "Document requirements and decisions in a shared wiki",
      "Model processes in BPMN and sketch screens as wireframes",
      "Query and reconcile data with SQL and Excel",
      "Describe your tool experience credibly on a resume and in interviews",
    ],
    concepts: [
      {
        title: "Delivery and backlog",
        description: "Jira and Azure DevOps for epics, stories, workflows, boards and reporting.",
        icon: "folder-kanban",
      },
      {
        title: "Documentation",
        description: "Confluence, SharePoint and Notion for requirements, decisions and meeting notes.",
        icon: "file-text",
      },
      {
        title: "Modelling",
        description: "Visio, Lucidchart, draw.io and Miro for process maps, context diagrams and journeys.",
        icon: "workflow",
      },
      {
        title: "Prototyping",
        description: "Figma and Balsamiq for low- and mid-fidelity wireframes that validate requirements.",
        icon: "layout-template",
      },
      {
        title: "Data analysis",
        description: "SQL, Excel and Power BI for profiling, reconciliation and KPI reporting.",
        icon: "database",
      },
    ],
    tools: [
      "Jira",
      "Confluence",
      "Azure DevOps",
      "Microsoft Excel",
      "SQL",
      "Power BI",
      "Visio",
      "Lucidchart",
      "draw.io",
      "Miro",
      "Figma",
      "Balsamiq",
    ],
    faqs: [
      {
        question: "Which tool should I learn first?",
        answer:
          "Excel and Jira. Excel underpins most data work a BA does, and Jira is the most widely used backlog tool. Add SQL next.",
      },
      {
        question: "Do I need to code to be a BA?",
        answer:
          "No, but reading and writing basic SQL makes you far more self-sufficient when validating data and investigating defects.",
      },
      {
        question: "Are certifications in specific tools worth it?",
        answer:
          "Rarely essential. Demonstrated use — a portfolio backlog, a process model, a reconciliation query — is more persuasive than a tool badge.",
      },
    ],
    related: ["jira", "sql", "excel", "data-analysis"],
  },
  {
    slug: "jira",
    category: "resources",
    eyebrow: "Tool guide",
    title: "Jira for business analysts",
    highlight: "business analysts",
    summary:
      "How BAs structure backlogs, write and refine stories, track progress and link requirements in Jira and Confluence — the practical skills delivery teams expect on day one.",
    meta: [
      { label: "Tool", value: "Jira + Confluence" },
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Focus", value: "Backlog and JQL" },
    ],
    overview: {
      heading: "The backlog is the BA's working surface",
      paragraphs: [
        "On most agile teams, requirements live in Jira. The BA shapes epics into stories, writes acceptance criteria, keeps the backlog refined and ordered with the product owner, and uses filters and boards to see what is ready, blocked or untested.",
        "Jira works best alongside Confluence. Keep longer-lived context — process maps, business rules, decision logs — in Confluence pages, and link them to the issues they inform. The story stays concise; the detail stays findable.",
      ],
    },
    outcomes: [
      "Structure work as epics, stories and sub-tasks with clear ownership",
      "Write stories with acceptance criteria that meet the team's Definition of Ready",
      "Understand workflow statuses and transitions on your project",
      "Write JQL filters to find gaps, blockers and untested work",
      "Configure board views and dashboards for refinement and reporting",
      "Link Jira issues to Confluence requirements and decision pages",
    ],
    concepts: [
      {
        title: "Issue hierarchy",
        description: "Epics group related value; stories deliver a slice of it; sub-tasks break a story into team activities.",
        icon: "layers",
      },
      {
        title: "Workflows",
        description: "Statuses and transitions such as To Do, In Progress, In Review and Done reflect how the team actually works.",
        icon: "workflow",
      },
      {
        title: "JQL",
        description: "Jira Query Language lets you filter issues by any field — the basis of saved filters, boards and dashboards.",
        icon: "search",
      },
      {
        title: "Boards",
        description: "Scrum boards track sprint commitment; Kanban boards visualise continuous flow and WIP limits.",
        icon: "folder-kanban",
      },
      {
        title: "Confluence linking",
        description: "Embed Jira issue lists in requirement pages and link issues back, so context and status stay connected.",
        icon: "git-branch",
      },
    ],
    steps: [
      {
        title: "Create the epic",
        description: "Capture the business outcome, scope boundaries and a link to the Confluence requirements page.",
      },
      {
        title: "Split into stories",
        description: "Slice by user value, not by technical layer, and check each story against INVEST.",
      },
      {
        title: "Add acceptance criteria",
        description: "Write Given/When/Then scenarios, including edge cases and validation rules.",
      },
      {
        title: "Refine and order",
        description: "Review with the team, resolve questions, estimate, and order the backlog with the product owner.",
      },
      {
        title: "Track and report",
        description: "Use saved JQL filters and dashboards to monitor readiness, blockers and progress.",
      },
    ],
    example: {
      title: "JQL filters a BA uses every week",
      language: "text",
      code: `-- Stories in the next sprint missing acceptance criteria
project = PAY AND issuetype = Story
  AND sprint in futureSprints()
  AND "Acceptance Criteria" is EMPTY
ORDER BY rank ASC

-- Open items in an epic that have been blocked for more than 5 days
project = PAY AND "Epic Link" = PAY-120
  AND status = Blocked
  AND status changed to Blocked before -5d

-- Stories done this sprint with no linked test
project = PAY AND issuetype = Story
  AND sprint in openSprints() AND status = Done
  AND issueFunction not in linkedIssuesOf("issuetype = Test")`,
      caption:
        "Field names vary by instance, and issueFunction requires the ScriptRunner app. In newer Jira Cloud projects, \"Epic Link\" is replaced by parent.",
    },
    tools: ["Jira Software", "Confluence", "Jira dashboards", "Advanced Roadmaps", "Xray / Zephyr"],
    faqs: [
      {
        question: "Should acceptance criteria go in the description or a custom field?",
        answer:
          "Either works if the team is consistent. A dedicated field makes it easy to filter for stories missing criteria.",
      },
      {
        question: "Does the BA own the backlog?",
        answer:
          "The product owner owns ordering and value decisions. The BA typically does much of the refinement work — writing, splitting and clarifying stories — in partnership with them.",
      },
      {
        question: "What goes in Confluence versus Jira?",
        answer:
          "Jira holds actionable work items. Confluence holds context that outlives a sprint: process maps, business rules, glossary, decisions and meeting notes.",
      },
    ],
    related: ["agile-ba", "tools", "templates", "requirements-engineering"],
  },
  {
    slug: "sql",
    category: "resources",
    eyebrow: "Tool guide",
    title: "SQL for business analysts",
    highlight: "SQL",
    summary:
      "The query patterns BAs use to profile data, validate requirements, reconcile systems and investigate defects — without waiting on a developer.",
    meta: [
      { label: "Dialect", value: "ANSI SQL" },
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Focus", value: "Validation and reconciliation" },
    ],
    overview: {
      heading: "Answer your own data questions",
      paragraphs: [
        "A BA who can query data stops guessing. Before writing a requirement you can check how many records actually hit an edge case; during testing you can confirm a migration landed correctly; when a defect is raised you can see whether it is a data issue or a logic issue.",
        "You do not need to be a database developer. A solid grasp of SELECT, WHERE, JOINs, GROUP BY, HAVING and CASE covers most BA work. Always query non-production or read-only replicas, and follow your organisation's data access policies.",
      ],
    },
    outcomes: [
      "Write SELECT queries with filters, sorting and calculated columns",
      "Combine tables with INNER and LEFT JOINs and understand the difference",
      "Aggregate data with GROUP BY and filter groups with HAVING",
      "Reconcile counts and totals between source and target systems",
      "Profile data quality: nulls, duplicates and out-of-range values",
    ],
    concepts: [
      {
        title: "Filtering",
        description: "WHERE narrows rows; use IN, BETWEEN, LIKE and IS NULL deliberately.",
        icon: "search",
      },
      {
        title: "Joins",
        description: "INNER JOIN keeps matches only; LEFT JOIN keeps every row on the left and reveals what is missing.",
        icon: "git-branch",
      },
      {
        title: "Aggregation",
        description: "COUNT, SUM, AVG with GROUP BY summarise data; HAVING filters the summarised groups.",
        icon: "bar-chart",
      },
      {
        title: "Reconciliation",
        description: "Compare counts and totals across systems to prove data moved or transformed correctly.",
        icon: "shield-check",
      },
      {
        title: "Data profiling",
        description: "Find nulls, duplicates and invalid values before they become defects.",
        icon: "database",
      },
    ],
    example: {
      title: "Reconcile daily payments between source and ledger",
      language: "sql",
      code: `-- Compare payment counts and totals per day and channel
-- between the payments source table and the general ledger.
SELECT
  p.payment_date,
  p.channel,
  COUNT(p.payment_id)                     AS source_count,
  COUNT(l.payment_id)                     AS ledger_count,
  SUM(p.amount)                           AS source_total,
  COALESCE(SUM(l.amount), 0)              AS ledger_total,
  SUM(p.amount) - COALESCE(SUM(l.amount), 0) AS variance
FROM payments p
LEFT JOIN ledger_entries l
  ON l.payment_id = p.payment_id
 AND l.entry_type = 'PAYMENT'
WHERE p.payment_date BETWEEN '2026-01-01' AND '2026-01-31'
  AND p.status = 'SETTLED'
GROUP BY p.payment_date, p.channel
HAVING COUNT(p.payment_id) <> COUNT(l.payment_id)
    OR SUM(p.amount) <> COALESCE(SUM(l.amount), 0)
ORDER BY p.payment_date, p.channel;`,
      caption:
        "The LEFT JOIN keeps unposted payments visible; HAVING returns only the day-channel groups that fail to reconcile. Assumes one ledger entry per payment.",
    },
    tools: ["SQL Server", "PostgreSQL", "MySQL", "Oracle", "DBeaver", "SSMS"],
    faqs: [
      {
        question: "Which SQL dialect should I learn?",
        answer:
          "Start with standard SQL. Differences between SQL Server, PostgreSQL, Oracle and MySQL are mostly in functions and date handling, which you pick up quickly on the job.",
      },
      {
        question: "Will I have database access as a BA?",
        answer:
          "Often read-only access to a test or reporting environment. Where you do not, knowing SQL still helps you specify exactly what data a developer should extract.",
      },
      {
        question: "Why use LEFT JOIN for reconciliation?",
        answer:
          "An INNER JOIN silently drops unmatched rows, which are exactly the records you are trying to find. LEFT JOIN keeps them so the gap shows up.",
      },
    ],
    related: ["data-analysis", "excel", "tools", "banking"],
  },
  {
    slug: "excel",
    category: "resources",
    eyebrow: "Tool guide",
    title: "Excel skills every BA uses",
    highlight: "every BA",
    summary:
      "Pivot tables, XLOOKUP, data validation, conditional formatting and Power Query — the Excel features that turn raw extracts into analysis stakeholders trust.",
    meta: [
      { label: "Version", value: "Microsoft 365" },
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Focus", value: "Analysis and data quality" },
    ],
    overview: {
      heading: "Still the most used analysis tool in business",
      paragraphs: [
        "Whatever the official system of record, data reaches the BA as an extract sooner or later. Excel is where you profile it, compare it, summarise it and present it — often within the same afternoon.",
        "The goal is reliable, repeatable analysis. Use tables instead of loose ranges, lookups instead of manual matching, and Power Query instead of copy-paste cleanup, so the next refresh takes minutes rather than hours.",
      ],
    },
    outcomes: [
      "Summarise large extracts with pivot tables and slicers",
      "Match records across sources with XLOOKUP and flag mismatches",
      "Build input templates with data validation and drop-down lists",
      "Highlight exceptions using conditional formatting rules",
      "Clean and combine files repeatably with Power Query",
    ],
    concepts: [
      {
        title: "Pivot tables",
        description: "Group, count and total data by any dimension in seconds; add slicers for interactive filtering.",
        icon: "table",
      },
      {
        title: "XLOOKUP",
        description: "Find matching values across sheets with exact-match defaults and a built-in not-found result.",
        icon: "search",
      },
      {
        title: "Data validation",
        description: "Restrict inputs to lists, ranges or formats so captured data stays clean.",
        icon: "shield-check",
      },
      {
        title: "Conditional formatting",
        description: "Surface duplicates, outliers and SLA breaches visually for fast review.",
        icon: "sparkles",
      },
      {
        title: "Power Query",
        description: "Import, clean, merge and reshape data with recorded, refreshable steps.",
        icon: "workflow",
      },
    ],
    example: {
      title: "Flag records missing from the target system",
      language: "text",
      code: `In the Source table, add a column "In Target":
=XLOOKUP([@CustomerID], Target[CustomerID], Target[CustomerID], "MISSING")

Then add a column "Status":
=IF([@[In Target]]="MISSING", "Not migrated", "OK")

Pivot on Status to count gaps, and apply conditional
formatting to highlight "Not migrated" rows for review.`,
      caption: "Structured table references keep formulas readable and expand automatically as data grows.",
    },
    tools: ["Microsoft Excel", "Power Query", "Power Pivot", "Power BI"],
    faqs: [
      {
        question: "Is VLOOKUP still worth learning?",
        answer:
          "Recognise it, because older workbooks use it widely. For new work, XLOOKUP is simpler and less error-prone, and INDEX/MATCH works in older Excel versions.",
      },
      {
        question: "When should I move from Excel to SQL or Power BI?",
        answer:
          "When data volumes slow Excel down, when the analysis must be refreshed regularly by others, or when you need governed, shared reporting.",
      },
      {
        question: "Do I need macros or VBA?",
        answer:
          "Rarely for BA work. Power Query covers most repetitive cleanup without code and is easier for others to maintain.",
      },
    ],
    related: ["sql", "data-analysis", "tools", "retail"],
  },
  {
    slug: "glossary",
    category: "resources",
    eyebrow: "Resource library",
    title: "Business analysis glossary",
    highlight: "glossary",
    summary:
      "Clear, accurate definitions of the terms business analysts use every day — from acceptance criteria to wireframes — so you can speak the language with confidence.",
    meta: [
      { label: "Terms", value: "30 core terms" },
      { label: "Level", value: "All levels" },
      { label: "Use for", value: "Interviews and workshops" },
    ],
    overview: {
      heading: "Shared vocabulary prevents expensive misunderstandings",
      paragraphs: [
        "Many project problems start with two people using the same word to mean different things. Precise vocabulary signals competence in interviews and keeps workshops focused on substance rather than definitions.",
        "These definitions reflect common industry usage, including the IIBA's BABOK Guide and widely adopted agile practice. Where your organisation uses a term differently, follow local convention and record the difference in your project glossary.",
      ],
    },
    outcomes: [
      "Define core BA terms accurately and concisely",
      "Distinguish closely related terms such as BRD and FRD, or epic and user story",
      "Use standard terminology confidently in interviews",
      "Build a project glossary that removes ambiguity from requirements",
    ],
    concepts: [
      {
        title: "Requirements terms",
        description: "BRD, FRD, user story, use case, acceptance criteria and non-functional requirements.",
        icon: "file-text",
      },
      {
        title: "Agile terms",
        description: "Backlog, epic, MVP, INVEST and Definition of Done.",
        icon: "folder-kanban",
      },
      {
        title: "Analysis techniques",
        description: "Gap analysis, SWOT, SIPOC, BPMN and MoSCoW prioritisation.",
        icon: "lightbulb",
      },
      {
        title: "Governance terms",
        description: "Change request, RACI, traceability, scope creep and UAT.",
        icon: "shield-check",
      },
    ],
    terms: [
      {
        term: "Acceptance Criteria",
        definition:
          "Conditions a solution or user story must satisfy to be accepted by the business, written so they can be objectively tested.",
      },
      {
        term: "BABOK",
        definition:
          "The Business Analysis Body of Knowledge, the IIBA's globally recognised guide to business analysis knowledge areas, tasks and techniques.",
      },
      {
        term: "Backlog",
        definition:
          "An ordered list of work items — epics, stories, defects and tasks — that a team may deliver, maintained by the product owner.",
      },
      {
        term: "BPMN",
        definition:
          "Business Process Model and Notation, a standard graphical notation for modelling business processes using events, activities, gateways and flows.",
      },
      {
        term: "BRD",
        definition:
          "Business Requirements Document: describes the business problem, objectives, scope and high-level needs a solution must address.",
      },
      {
        term: "Business Case",
        definition:
          "A justification for an initiative that compares the costs, benefits, risks and options to support an investment decision.",
      },
      {
        term: "Change Request",
        definition:
          "A formal proposal to modify agreed scope, requirements or deliverables, assessed for impact before approval.",
      },
      {
        term: "Definition of Done",
        definition:
          "A shared, team-level checklist of quality criteria an increment must meet before it is considered complete.",
      },
      {
        term: "Definition of Ready",
        definition:
          "Criteria a backlog item must meet before the team commits to it in a sprint, such as clear acceptance criteria and resolved dependencies.",
      },
      {
        term: "Elicitation",
        definition:
          "Drawing out information from stakeholders and other sources through techniques such as interviews, workshops, observation and document analysis.",
      },
      {
        term: "Epic",
        definition:
          "A large body of work that delivers significant value and is broken down into smaller user stories over multiple sprints.",
      },
      {
        term: "FRD",
        definition:
          "Functional Requirements Document: specifies how a system must behave, including functions, business rules, data and interfaces.",
      },
      {
        term: "Gap Analysis",
        definition:
          "Comparing the current state with the desired future state to identify the capabilities, processes or data that must change.",
      },
      {
        term: "INVEST",
        definition:
          "A quality check for user stories: Independent, Negotiable, Valuable, Estimable, Small and Testable.",
      },
      {
        term: "KPI",
        definition:
          "Key Performance Indicator: a measurable value showing how effectively an organisation or process is achieving a key objective.",
      },
      {
        term: "MoSCoW",
        definition:
          "A prioritisation technique that classifies requirements as Must have, Should have, Could have or Won't have this time.",
      },
      {
        term: "MVP",
        definition:
          "Minimum Viable Product: the smallest version of a product that delivers enough value to validate assumptions with real users.",
      },
      {
        term: "Non-functional Requirement",
        definition:
          "A requirement describing how well a system performs rather than what it does, such as performance, security, availability or usability.",
      },
      {
        term: "Persona",
        definition:
          "A fictional but research-based profile of a typical user, used to keep requirements and design focused on real user needs.",
      },
      {
        term: "Process Map",
        definition:
          "A visual representation of the steps, roles, decisions and handoffs in a business process, often drawn as a swimlane diagram.",
      },
      {
        term: "RACI",
        definition:
          "A responsibility matrix showing who is Responsible, Accountable, Consulted and Informed for each task or decision.",
      },
      {
        term: "Requirements Traceability Matrix",
        definition:
          "A table linking each requirement to its source objective, design elements and test cases, used to confirm coverage and assess change impact.",
      },
      {
        term: "Scope Creep",
        definition:
          "Uncontrolled growth in project scope without corresponding adjustments to time, cost or resources.",
      },
      {
        term: "SIPOC",
        definition:
          "A high-level process view listing Suppliers, Inputs, Process, Outputs and Customers, often used to frame scope early.",
      },
      {
        term: "Stakeholder",
        definition:
          "An individual or group that affects, is affected by, or perceives itself to be affected by a change or solution.",
      },
      {
        term: "SWOT",
        definition:
          "An analysis of internal Strengths and Weaknesses and external Opportunities and Threats, used to inform strategy.",
      },
      {
        term: "UAT",
        definition:
          "User Acceptance Testing: the final testing phase in which business users verify the solution meets their needs before go-live.",
      },
      {
        term: "Use Case",
        definition:
          "A description of the interactions between an actor and a system to achieve a goal, including main, alternative and exception flows.",
      },
      {
        term: "User Story",
        definition:
          "A short statement of need from a user's perspective, typically \"As a [role], I want [goal], so that [benefit]\", supported by acceptance criteria.",
      },
      {
        term: "Wireframe",
        definition:
          "A low-fidelity visual layout of a screen showing structure and content placement, used to validate requirements before detailed design.",
      },
    ],
    faqs: [
      {
        question: "Is this glossary aligned with BABOK?",
        answer:
          "The definitions are consistent with BABOK concepts and common agile usage, written in plain language. For certification exams, always study the official BABOK Guide wording.",
      },
      {
        question: "Should every project have its own glossary?",
        answer:
          "Yes. A project glossary defines business terms specific to the domain — such as what counts as an \"active customer\" — and is one of the simplest ways to remove ambiguity from requirements.",
      },
      {
        question: "What is the difference between a use case and a user story?",
        answer:
          "A use case details the full interaction flow, including alternatives and exceptions. A user story is a brief statement of need that prompts conversation, with detail added through acceptance criteria.",
      },
    ],
    related: ["ba-foundations", "interview-prep", "certification", "templates"],
  },
];
