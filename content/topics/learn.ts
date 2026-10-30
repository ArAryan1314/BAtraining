import type { TopicContent } from "./types";

export const learnTopics: TopicContent[] = [
  {
    slug: "ba-foundations",
    category: "learn",
    eyebrow: "Learning track",
    title: "BA Foundations: think like an analyst",
    highlight: "think like an analyst",
    summary:
      "Build the core mindset of a business analyst: define the problem before the solution, trace every requirement to value, and communicate so decisions get made.",
    meta: [
      { label: "Level", value: "Beginner" },
      { label: "Format", value: "Self-paced + practice" },
      { label: "Prerequisites", value: "None" },
      { label: "Reference", value: "BABOK v3" },
    ],
    overview: {
      heading: "What business analysis actually is",
      paragraphs: [
        "BABOK v3 defines business analysis as the practice of enabling change by defining needs and recommending solutions that deliver value to stakeholders. The deliverable is not a document; it is a shared, validated understanding of what must change and why.",
        "Foundations covers the vocabulary and habits every other track depends on: separating needs from solutions, framing the current and future state, distinguishing requirement types, and keeping work traceable from business objective to accepted feature.",
      ],
    },
    outcomes: [
      "Explain the BA role using the BABOK v3 Business Analysis Core Concept Model (change, need, solution, stakeholder, value, context)",
      "Write a problem statement that separates symptoms from the underlying need",
      "Classify requirements as business, stakeholder, solution (functional and non-functional) or transition",
      "Describe current state, future state and the gap between them",
      "Choose an appropriate level of documentation for a predictive or adaptive project",
    ],
    concepts: [
      {
        title: "Core Concept Model",
        description:
          "Six concepts (change, need, solution, stakeholder, value, context) give you a checklist for whether an initiative is understood well enough to act on.",
        icon: "puzzle",
      },
      {
        title: "Need before solution",
        description:
          "Stakeholders usually arrive with a solution. Your job is to work back to the need it serves so alternatives can be compared fairly.",
        icon: "lightbulb",
      },
      {
        title: "Requirement classification",
        description:
          "Business, stakeholder, solution and transition requirements answer different questions and are owned by different people.",
        icon: "layers",
      },
      {
        title: "Current vs future state",
        description:
          "A clear as-is and to-be picture turns vague improvement goals into a scoped, measurable change.",
        icon: "route",
      },
      {
        title: "Traceability",
        description:
          "Linking objectives to requirements to tests shows impact when scope changes and proves nothing was built without a reason.",
        icon: "git-branch",
      },
    ],
    steps: [
      {
        title: "Frame the problem",
        description:
          "Capture who is affected, what is happening, the impact, and what success looks like in a one-paragraph problem statement.",
      },
      {
        title: "Identify stakeholders",
        description:
          "List everyone who is affected by or can influence the change, and note what each needs from the outcome.",
      },
      {
        title: "Describe current state",
        description:
          "Document how work happens today, including pain points, workarounds and constraints.",
      },
      {
        title: "Define future state and gap",
        description:
          "Agree the target capabilities and list the gaps that requirements must close.",
      },
      {
        title: "Elicit and validate requirements",
        description:
          "Draw out detail, confirm it with stakeholders, and check each item traces back to an objective.",
      },
    ],
    artifacts: [
      {
        name: "Problem statement",
        description: "A concise definition of the need, its impact and the measure of success.",
      },
      {
        name: "Stakeholder list",
        description: "Who is involved, their interest and their role in decisions.",
      },
      {
        name: "Current/future state summary",
        description: "Side-by-side view of how things work now, how they should work, and the gap.",
      },
    ],
    tools: ["Confluence", "Miro", "Excel", "Jira"],
    faqs: [
      {
        question: "Do I need a technical background to start?",
        answer:
          "No. Foundations assumes no technical knowledge. Comfort with structured thinking and clear writing matters more; technical fluency such as SQL is covered in later tracks.",
      },
      {
        question: "Is this aligned to BABOK?",
        answer:
          "Yes. Terminology and models follow BABOK v3, so what you learn maps directly to IIBA certification syllabi.",
      },
      {
        question: "What is the difference between a requirement and a design?",
        answer:
          "In BABOK terms, a requirement is a usable representation of a need; a design is a usable representation of a solution. Keeping them distinct stops teams from locking in a solution too early.",
      },
    ],
    related: ["business-analysis", "requirements-engineering", "knowledge-areas", "roadmap"],
  },
  {
    slug: "business-analysis",
    category: "learn",
    eyebrow: "Learning track",
    title: "Business Analysis from need to value",
    highlight: "need to value",
    summary:
      "Learn the end-to-end work of a business analyst: assessing the business need, defining scope, shaping requirements, and confirming the solution actually delivered value.",
    meta: [
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Focus", value: "End-to-end BA lifecycle" },
      { label: "Reference", value: "BABOK v3" },
    ],
    overview: {
      heading: "The work, start to finish",
      paragraphs: [
        "Business analysis spans the whole life of a change, not just the requirements phase. It starts with strategy analysis (why change, and what should change), moves through requirements definition and solution design support, and ends with solution evaluation (did it work).",
        "This track walks that lifecycle with the artifacts and decisions a BA owns at each stage, so you can operate on a real initiative rather than a single task within it.",
      ],
    },
    outcomes: [
      "Build a business case that states the need, options, costs, benefits and risks",
      "Define scope with in-scope and out-of-scope items and a context diagram",
      "Plan elicitation and choose techniques suited to each stakeholder group",
      "Support solution design by assessing options against requirements",
      "Measure solution performance against the original objectives after release",
    ],
    concepts: [
      {
        title: "Strategy analysis",
        description:
          "Assess the business need, define the future state, and identify the change strategy before committing to a solution.",
        icon: "compass",
      },
      {
        title: "Scope definition",
        description:
          "Explicit boundaries, captured in a scope statement and context diagram, protect the team from silent scope creep.",
        icon: "target",
      },
      {
        title: "Business case",
        description:
          "A structured argument for investment comparing options, including doing nothing, on cost, benefit and risk.",
        icon: "briefcase",
      },
      {
        title: "Solution evaluation",
        description:
          "Compare actual performance with expected value and recommend actions to increase it.",
        icon: "trending-up",
      },
    ],
    steps: [
      {
        title: "Assess the need",
        description:
          "Clarify the problem or opportunity, the objectives, and how success will be measured.",
      },
      {
        title: "Define scope and approach",
        description:
          "Set boundaries, choose a predictive or adaptive approach, and plan the BA work.",
      },
      {
        title: "Elicit and analyse",
        description:
          "Gather information, model it, and turn it into prioritised, verified requirements.",
      },
      {
        title: "Support delivery",
        description:
          "Answer questions, manage change requests, and keep traceability current as the solution is built.",
      },
      {
        title: "Evaluate the outcome",
        description:
          "Check the delivered solution against objectives and recommend improvements.",
      },
    ],
    artifacts: [
      { name: "Business case", description: "Justification for the change with options analysis." },
      { name: "Scope statement", description: "In-scope, out-of-scope, assumptions and constraints." },
      { name: "Business requirements document", description: "Objectives and high-level requirements agreed with sponsors." },
      { name: "Solution evaluation report", description: "Measured results against target KPIs with recommendations." },
    ],
    tools: ["Confluence", "Jira", "Visio", "Excel", "Power BI"],
    faqs: [
      {
        question: "How is this different from project management?",
        answer:
          "A project manager owns delivery of the work: time, cost, resources. A BA owns the definition of the right outcome: needs, requirements and value. The roles collaborate closely but answer different questions.",
      },
      {
        question: "Does the lifecycle change in Agile?",
        answer:
          "The activities stay; the cadence changes. In Agile, analysis happens continuously in small slices through backlog refinement rather than in a single upfront phase.",
      },
      {
        question: "Who signs off requirements?",
        answer:
          "The sponsor or product owner approves; the BA facilitates review and records the decision. Sign-off authority should be agreed at the start in a RACI.",
      },
    ],
    related: ["ba-foundations", "requirements-engineering", "stakeholder-management", "deliverables"],
  },
  {
    slug: "requirements-engineering",
    category: "learn",
    eyebrow: "Learning track",
    title: "Requirements Engineering that holds up",
    highlight: "holds up",
    summary:
      "Elicit, analyse, specify, validate and manage requirements so they are clear, testable and traceable from business objective to test case.",
    meta: [
      { label: "Level", value: "Intermediate" },
      { label: "Core artifact", value: "RTM" },
      { label: "Reference", value: "BABOK v3, ISO/IEC/IEEE 29148" },
    ],
    overview: {
      heading: "Requirements are a product, not a by-product",
      paragraphs: [
        "Most delivery defects trace back to requirements that were ambiguous, incomplete or never agreed. Requirements engineering is the discipline of producing requirements that a developer can build, a tester can verify, and a sponsor can recognise as their need.",
        "You will work through the full cycle: elicitation, analysis and modelling, specification, validation, and ongoing management of change and traceability.",
      ],
    },
    outcomes: [
      "Plan and run elicitation using interviews, workshops, observation and document analysis",
      "Write requirements that are atomic, unambiguous, testable and uniquely identified",
      "Distinguish functional requirements from non-functional (performance, security, usability) requirements",
      "Build and maintain a requirements traceability matrix (RTM)",
      "Prioritise with MoSCoW and manage changes through a controlled baseline",
    ],
    concepts: [
      {
        title: "Elicitation",
        description:
          "Drawing out information from stakeholders and sources. Pick techniques by what you need to learn, not by habit.",
        icon: "message-square",
      },
      {
        title: "Quality attributes",
        description:
          "A good requirement is atomic, complete, consistent, feasible, unambiguous, testable and prioritised.",
        icon: "shield-check",
      },
      {
        title: "Non-functional requirements",
        description:
          "Performance, availability, security and usability constraints are often missed and costly to retrofit. State them with measurable thresholds.",
        icon: "settings",
      },
      {
        title: "Traceability",
        description:
          "The RTM links each requirement backward to an objective and forward to design and tests, making impact analysis fast.",
        icon: "git-branch",
      },
      {
        title: "Prioritisation",
        description:
          "MoSCoW (Must, Should, Could, Won't this time) forces explicit trade-offs instead of everything being urgent.",
        icon: "list-checks",
      },
    ],
    steps: [
      { title: "Prepare elicitation", description: "Define goals, select techniques and stakeholders, and gather background material." },
      { title: "Elicit", description: "Run interviews, workshops or observation and capture raw findings." },
      { title: "Analyse and model", description: "Organise findings using process models, data models and use cases; spot gaps and conflicts." },
      { title: "Specify", description: "Write requirements with IDs, rationale, priority, source and acceptance criteria." },
      { title: "Validate and baseline", description: "Review with stakeholders, resolve conflicts, and baseline the approved set." },
      { title: "Manage change", description: "Assess change requests through the RTM and update the baseline under control." },
    ],
    artifacts: [
      { name: "Software requirements specification (SRS)", description: "Detailed functional and non-functional requirements for a solution." },
      { name: "Requirements traceability matrix", description: "Links objectives, requirements, design elements and test cases." },
      { name: "Use case specifications", description: "Actor goals, main flow, alternate and exception flows." },
      { name: "Change request log", description: "Proposed changes with impact assessment and decision." },
    ],
    example: {
      title: "A well-formed functional requirement",
      language: "text",
      code: `ID:          FR-PAY-014
Title:       Block duplicate supplier payments
Priority:    Must (MoSCoW)
Source:      Accounts Payable workshop, AP Lead
Traces to:   BO-03 Reduce payment errors; TC-PAY-041..043

Requirement:
The system shall prevent submission of a supplier payment when another
payment with the same supplier ID, invoice number and amount exists
with status Pending or Paid.

Rationale:
Duplicate payments are currently caught only during month-end
reconciliation, requiring manual recovery from suppliers.

Acceptance criteria:
1. Given a Paid payment exists for supplier S1, invoice INV-77, 500.00,
   when a user submits a new payment with the same three values,
   then submission is blocked and message ERR-PAY-09 is displayed.
2. A payment matching on supplier and invoice but with a different
   amount is allowed and flagged for review.
3. Each blocked attempt is written to the audit log with user ID
   and timestamp.`,
      caption: "Unique ID, single testable statement, rationale, traceability and verifiable acceptance criteria.",
    },
    tools: ["Jira", "Confluence", "Azure DevOps", "Excel", "Enterprise Architect"],
    faqs: [
      {
        question: "Should I write 'shall' statements or user stories?",
        answer:
          "Use what the delivery approach and audience need. Regulated or contract-based work often requires formal 'shall' statements; Agile teams use user stories with acceptance criteria. The quality attributes apply to both.",
      },
      {
        question: "How detailed should requirements be?",
        answer:
          "Detailed enough that the team can build and test without guessing, and no more. Higher risk, regulatory exposure or distributed teams justify more detail.",
      },
      {
        question: "What goes in an RTM?",
        answer:
          "At minimum: requirement ID, description, source, business objective, priority, status, and linked design and test case IDs.",
      },
      {
        question: "How do I handle conflicting requirements?",
        answer:
          "Make the conflict visible, trace each side to its objective, and take it to the decision-maker identified in your RACI with options and impacts.",
      },
    ],
    related: ["ba-techniques", "agile-ba", "templates", "deliverables"],
  },
  {
    slug: "agile-ba",
    category: "learn",
    eyebrow: "Learning track",
    title: "The Agile BA: analysis in every sprint",
    highlight: "analysis in every sprint",
    summary:
      "Work as a business analyst inside Scrum and Kanban teams: shape the backlog, slice user stories, write Gherkin acceptance criteria and keep analysis just ahead of delivery.",
    meta: [
      { label: "Level", value: "Intermediate" },
      { label: "Frameworks", value: "Scrum, Kanban" },
      { label: "Reference", value: "Agile Extension to BABOK" },
      { label: "Key skill", value: "Story writing" },
    ],
    overview: {
      heading: "Continuous analysis, not upfront documents",
      paragraphs: [
        "In Agile delivery, analysis is spread across the life of the product. The BA helps the product owner turn goals into a well-ordered backlog, keeps the next one or two sprints of stories refined and ready, and makes sure each story has acceptance criteria the team can test.",
        "You will learn the practical mechanics: story mapping, writing INVEST stories, splitting large items, writing Given/When/Then scenarios, and running refinement sessions that end with stories the team can estimate.",
      ],
    },
    outcomes: [
      "Write user stories in the 'As a, I want, so that' format that meet the INVEST criteria",
      "Split epics into thin vertical slices using workflow, business rule and data variation patterns",
      "Write acceptance criteria as Gherkin scenarios that support BDD",
      "Build a user story map to plan releases around user journeys",
      "Facilitate backlog refinement and apply a Definition of Ready",
    ],
    concepts: [
      {
        title: "INVEST",
        description:
          "Independent, Negotiable, Valuable, Estimable, Small, Testable: a quick quality check for every story before it enters a sprint.",
        icon: "list-checks",
      },
      {
        title: "Story mapping",
        description:
          "Arrange stories under the user's journey to see the whole product and cut releases horizontally into usable increments.",
        icon: "route",
      },
      {
        title: "Acceptance criteria in Gherkin",
        description:
          "Given/When/Then scenarios make expected behaviour concrete and can be automated as tests.",
        icon: "file-text",
      },
      {
        title: "Backlog refinement",
        description:
          "A recurring session where the team clarifies, splits and estimates upcoming items so sprint planning is fast.",
        icon: "folder-kanban",
      },
      {
        title: "BA and PO collaboration",
        description:
          "The product owner owns priority and value decisions; the BA supplies the analysis that informs them.",
        icon: "users",
      },
    ],
    steps: [
      { title: "Understand the goal", description: "Confirm the product or sprint goal and the outcome it should move." },
      { title: "Map the journey", description: "Lay out user activities and tasks in a story map to find gaps and slice releases." },
      { title: "Write and split stories", description: "Draft stories, check them against INVEST, and split anything too large for a sprint." },
      { title: "Add acceptance criteria", description: "Write Given/When/Then scenarios for the main path, rules and edge cases." },
      { title: "Refine with the team", description: "Walk stories through with developers and testers, answer questions, and agree Ready." },
    ],
    artifacts: [
      { name: "Product backlog", description: "Ordered list of epics and stories owned by the product owner." },
      { name: "User story map", description: "Journey-based view of the backlog used for release planning." },
      { name: "Acceptance criteria", description: "Testable Given/When/Then scenarios per story." },
      { name: "Definition of Ready", description: "The team's checklist for a story entering a sprint." },
    ],
    example: {
      title: "Story with Gherkin acceptance criteria",
      language: "gherkin",
      code: `# Story: As a registered customer, I want to reset my password by email
#        so that I can regain access without calling support.

Feature: Password reset by email

  Background:
    Given a registered customer with email "asha@example.com"

  Scenario: Reset link sent for a registered email
    When the customer requests a password reset for "asha@example.com"
    Then a reset link is emailed to "asha@example.com"
    And the link expires after 30 minutes

  Scenario: Unknown email does not reveal account existence
    When a password reset is requested for "unknown@example.com"
    Then the same confirmation message is shown as for a registered email
    And no email is sent

  Scenario: Expired link is rejected
    Given the customer received a reset link 31 minutes ago
    When the customer opens the link
    Then the message "This link has expired" is shown
    And the customer is offered a new reset link`,
      caption: "Each scenario covers one behaviour: the main path, a security rule and an edge case.",
    },
    tools: ["Jira", "Azure DevOps", "Confluence", "Miro", "Cucumber"],
    faqs: [
      {
        question: "Is there a BA role in Scrum?",
        answer:
          "Scrum names only product owner, developers and scrum master. Many teams include a BA as a developer focused on analysis, or as support to the product owner. The analysis work exists regardless of the title.",
      },
      {
        question: "How far ahead should stories be refined?",
        answer:
          "Typically one to two sprints of ready work. More than that risks waste when priorities change; less leaves the team waiting on answers.",
      },
      {
        question: "Do acceptance criteria have to be Gherkin?",
        answer:
          "No. A rule-based checklist works too. Gherkin is valuable when the team practices BDD or automates acceptance tests, because the scenarios become executable.",
      },
      {
        question: "What makes a good story split?",
        answer:
          "Each slice should deliver end-to-end value a user could see, cutting through UI, logic and data. Avoid splitting by technical layer.",
      },
    ],
    related: ["requirements-engineering", "jira", "ba-techniques", "stakeholder-management"],
  },
  {
    slug: "process-analysis",
    category: "learn",
    eyebrow: "Learning track",
    title: "Process Analysis with BPMN 2.0",
    highlight: "BPMN 2.0",
    summary:
      "Model how work flows today, find where it breaks, and design a better to-be process using BPMN 2.0, swimlanes and root-cause analysis.",
    meta: [
      { label: "Level", value: "Intermediate" },
      { label: "Notation", value: "BPMN 2.0" },
      { label: "Methods", value: "As-is / to-be, 5 Whys" },
    ],
    overview: {
      heading: "Make the work visible, then improve it",
      paragraphs: [
        "Many requirements problems are really process problems: hand-offs that lose information, approvals that add delay without control, rework loops nobody measured. Process analysis exposes these by modelling the work as it actually happens.",
        "You will learn BPMN 2.0 core elements (events, activities, gateways, pools and lanes, sequence and message flows), how to run a process walkthrough with the people who do the work, and how to move from an as-is model to a justified to-be design.",
      ],
    },
    outcomes: [
      "Model processes in BPMN 2.0 using events, tasks, exclusive and parallel gateways, pools and lanes",
      "Run a process discovery workshop and validate the as-is model with process participants",
      "Identify waste, bottlenecks, hand-offs and rework loops",
      "Apply 5 Whys and fishbone (Ishikawa) diagrams to find root causes",
      "Design a to-be process and document the gap and its impact on roles and systems",
    ],
    concepts: [
      {
        title: "BPMN 2.0 essentials",
        description:
          "A small set of elements covers most business processes: start/end events, tasks, gateways, lanes and flows.",
        icon: "workflow",
      },
      {
        title: "As-is and to-be",
        description:
          "Model the current process faithfully before designing the future one, so improvements address real problems.",
        icon: "route",
      },
      {
        title: "Root-cause analysis",
        description:
          "5 Whys and fishbone diagrams move the conversation from symptoms to causes you can fix.",
        icon: "search",
      },
      {
        title: "Waste and hand-offs",
        description:
          "Waiting, rework, duplicate entry and unnecessary approvals are the usual targets for improvement.",
        icon: "trending-up",
      },
      {
        title: "SIPOC",
        description:
          "Suppliers, Inputs, Process, Outputs, Customers: a one-page scoping view before detailed modelling.",
        icon: "table",
      },
    ],
    steps: [
      { title: "Scope with SIPOC", description: "Agree the process boundaries, triggers, outputs and customers." },
      { title: "Discover the as-is", description: "Interview and observe participants; capture steps, roles, systems and exceptions." },
      { title: "Model and validate", description: "Draw the BPMN diagram and walk it through with participants until they recognise it." },
      { title: "Analyse problems", description: "Mark pain points, measure where possible, and run root-cause analysis." },
      { title: "Design the to-be", description: "Remove waste, simplify hand-offs, and define the target process and its rules." },
      { title: "Document the gap", description: "List changes to roles, systems, data and policy that the to-be requires." },
    ],
    artifacts: [
      { name: "SIPOC diagram", description: "High-level process scope on one page." },
      { name: "As-is BPMN model", description: "Validated model of the current process with pain points annotated." },
      { name: "Root-cause analysis", description: "5 Whys chain or fishbone diagram for priority problems." },
      { name: "To-be BPMN model and gap analysis", description: "Target process with the changes needed to get there." },
    ],
    example: {
      title: "5 Whys on a process delay",
      language: "text",
      code: `Problem: New-customer accounts take 6 working days to open
         against a target of 2.

Why 1: Applications wait in the compliance queue for 3-4 days.
Why 2: Compliance returns about a third of applications to the
       branch for missing documents.
Why 3: Branch staff submit applications before all KYC documents
       are attached.
Why 4: The onboarding form allows submission with mandatory
       document fields empty.
Why 5: Document checks were never configured as validation rules
       when the form was built; they exist only in a policy PDF.

Root cause: Mandatory KYC document rules are not enforced at the
            point of capture.

To-be change: Add submit-time validation for mandatory documents
              by customer type; route complete applications
              straight to compliance (removes the return loop).`,
      caption: "Stop when you reach a cause the team can act on, then verify it with data before redesigning the process.",
    },
    tools: ["Camunda Modeler", "Bizagi Modeler", "Visio", "Lucidchart", "draw.io", "Miro"],
    faqs: [
      {
        question: "Do I need to learn all of BPMN 2.0?",
        answer:
          "No. The full specification is large, but a core palette of events, tasks, gateways, lanes and flows covers most business-level modelling. Learn the rest as needed.",
      },
      {
        question: "BPMN or a simple flowchart?",
        answer:
          "Use a flowchart for quick conversations. Use BPMN when the model will be shared across teams, maintained over time, or handed to process automation, because the semantics are standardised.",
      },
      {
        question: "How do I avoid modelling the 'official' process instead of the real one?",
        answer:
          "Talk to and observe the people doing the work, not only their managers, and ask about exceptions and workarounds explicitly.",
      },
    ],
    related: ["ba-techniques", "data-analysis", "case-studies", "banking"],
  },
  {
    slug: "data-analysis",
    category: "learn",
    eyebrow: "Learning track",
    title: "Data Analysis for Business Analysts",
    highlight: "Data Analysis",
    summary:
      "Use SQL, Excel and basic data modelling to validate assumptions, size problems, specify data requirements and check that a solution is working.",
    meta: [
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Core tools", value: "SQL, Excel" },
      { label: "Focus", value: "Evidence for decisions" },
    ],
    overview: {
      heading: "Bring evidence, not just opinions",
      paragraphs: [
        "A BA who can query data answers questions in minutes that would otherwise take a request to another team and a week of waiting. Data lets you size a problem, test a stakeholder's claim, and define acceptance thresholds that mean something.",
        "This track focuses on the data skills a BA uses every week: reading an entity-relationship diagram, writing SELECT queries with joins and aggregation, profiling data quality, building pivot tables, and writing data requirements and mappings.",
      ],
    },
    outcomes: [
      "Read and draw entity-relationship diagrams with cardinality",
      "Write SQL queries using SELECT, WHERE, JOIN, GROUP BY and HAVING",
      "Profile a dataset for completeness, validity and duplicates",
      "Summarise data with Excel pivot tables, lookups and conditional logic",
      "Write a source-to-target data mapping and a data dictionary entry",
      "Define KPIs with a precise formula, data source and owner",
    ],
    concepts: [
      {
        title: "Data modelling",
        description:
          "Entities, attributes and relationships show what the business needs to know and how facts relate.",
        icon: "database",
      },
      {
        title: "SQL for analysis",
        description:
          "A handful of clauses (filter, join, group, aggregate) answers most of the questions a BA needs to ask.",
        icon: "table",
      },
      {
        title: "Data quality",
        description:
          "Completeness, validity, consistency, uniqueness and timeliness determine whether data can be trusted for a decision.",
        icon: "shield-check",
      },
      {
        title: "Data requirements",
        description:
          "Data dictionaries and source-to-target mappings make migration and integration requirements testable.",
        icon: "file-text",
      },
      {
        title: "KPIs and reporting",
        description:
          "A metric is only useful when its definition, calculation, source and refresh frequency are agreed.",
        icon: "bar-chart",
      },
    ],
    steps: [
      { title: "Frame the question", description: "State the business question and the decision the answer will inform." },
      { title: "Locate the data", description: "Identify sources, tables and owners; review the data model." },
      { title: "Profile and clean", description: "Check nulls, ranges, duplicates and inconsistent codes before trusting results." },
      { title: "Query and summarise", description: "Write queries or pivots that answer the question directly." },
      { title: "Communicate the finding", description: "Present the result with its assumptions and limits, and a recommendation." },
    ],
    artifacts: [
      { name: "Data dictionary", description: "Field names, definitions, types, valid values and owners." },
      { name: "Source-to-target mapping", description: "Field-level mapping with transformation rules for migration or integration." },
      { name: "Data quality report", description: "Profiling results and issues with business impact." },
      { name: "KPI definition sheet", description: "Formula, source, frequency and owner for each metric." },
    ],
    example: {
      title: "Sizing a repeat-complaint problem",
      language: "sql",
      code: `-- Customers with 3+ complaints in the last 90 days, by product
SELECT
  p.product_name,
  COUNT(DISTINCT c.customer_id) AS repeat_customers,
  COUNT(*)                      AS complaints
FROM complaints AS c
JOIN products   AS p ON p.product_id = c.product_id
WHERE c.created_at >= CURRENT_DATE - INTERVAL '90' DAY
  AND c.customer_id IN (
    SELECT customer_id
    FROM complaints
    WHERE created_at >= CURRENT_DATE - INTERVAL '90' DAY
    GROUP BY customer_id
    HAVING COUNT(*) >= 3
  )
GROUP BY p.product_name
ORDER BY repeat_customers DESC;`,
      caption: "Turns 'customers keep complaining' into a ranked, quantified list that can drive scope and priority.",
    },
    tools: ["SQL", "Excel", "Power BI", "Tableau", "DBeaver"],
    faqs: [
      {
        question: "How much SQL does a BA need?",
        answer:
          "Enough to read data independently: SELECT, filtering, joins, grouping and aggregation, plus subqueries. Writing production code or tuning databases is not the BA's job.",
      },
      {
        question: "Is Excel still relevant if I know SQL?",
        answer:
          "Yes. Stakeholders live in Excel. Pivot tables, XLOOKUP and clean, well-labelled sheets are often the fastest way to share and discuss findings.",
      },
      {
        question: "What is a source-to-target mapping?",
        answer:
          "A specification that lists each target field, its source field or fields, and the transformation rule between them. It is the core requirement artifact for data migration and integration work.",
      },
    ],
    related: ["sql", "excel", "process-analysis", "practice"],
  },
  {
    slug: "stakeholder-management",
    category: "learn",
    eyebrow: "Learning track",
    title: "Stakeholder Management and influence",
    highlight: "influence",
    summary:
      "Identify who matters, understand what they need, and keep them engaged so decisions are made on time and requirements reflect the people affected.",
    meta: [
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Key models", value: "Power/interest, RACI" },
      { label: "Reference", value: "BABOK v3" },
    ],
    overview: {
      heading: "Requirements come from people",
      paragraphs: [
        "A missed stakeholder is a missed requirement, discovered late and expensively. Stakeholder management is the BA's method for finding everyone affected by a change, understanding their interests and influence, and planning how and how often to engage each group.",
        "You will learn to build a stakeholder map, define decision rights with a RACI, plan communication by audience, and handle disagreement constructively when stakeholders want different things.",
      ],
    },
    outcomes: [
      "Identify stakeholders systematically using organisation charts, process models and onion diagrams",
      "Classify stakeholders on a power/interest grid and choose an engagement approach for each quadrant",
      "Build a RACI matrix that makes approval and decision rights explicit",
      "Write a communication plan by audience, content, channel and frequency",
      "Facilitate conflict resolution between stakeholders with competing requirements",
    ],
    concepts: [
      {
        title: "Stakeholder identification",
        description:
          "Look beyond the sponsor: end users, operations, support, compliance, suppliers and customers are all affected by change.",
        icon: "users",
      },
      {
        title: "Power/interest grid",
        description:
          "Manage closely, keep satisfied, keep informed or monitor: match engagement effort to influence and interest.",
        icon: "layers",
      },
      {
        title: "RACI",
        description:
          "Responsible, Accountable, Consulted, Informed. One Accountable per decision prevents stalled sign-offs.",
        icon: "table",
      },
      {
        title: "Communication planning",
        description:
          "Executives need decisions and risk; users need impact and timing. Tailor content and channel to each group.",
        icon: "message-square",
      },
      {
        title: "Negotiation and conflict",
        description:
          "Separate positions from interests and trace each request to business objectives to find workable agreements.",
        icon: "puzzle",
      },
    ],
    steps: [
      { title: "Identify", description: "List everyone affected by or able to influence the change." },
      { title: "Analyse", description: "Assess each stakeholder's interest, influence, attitude and needs." },
      { title: "Define decision rights", description: "Agree a RACI for key decisions and approvals." },
      { title: "Plan engagement", description: "Set communication content, channel and frequency for each group." },
      { title: "Engage and adjust", description: "Track sentiment and participation, and revise the plan as the project changes." },
    ],
    artifacts: [
      { name: "Stakeholder register", description: "Names or roles, interests, influence, attitude and engagement approach." },
      { name: "Power/interest grid", description: "Visual classification used to plan engagement effort." },
      { name: "RACI matrix", description: "Decision and activity ownership across roles." },
      { name: "Communication plan", description: "Audience, message, channel, frequency and owner." },
    ],
    tools: ["Excel", "Confluence", "Miro", "Microsoft Teams"],
    faqs: [
      {
        question: "Who counts as a stakeholder?",
        answer:
          "Anyone with a relationship to the change, the need or the solution. BABOK lists categories including customers, domain experts, end users, implementation experts, operational support, regulators, sponsors, suppliers and testers.",
      },
      {
        question: "What if a key stakeholder will not engage?",
        answer:
          "Find out why: time, priority or disagreement. Offer shorter or asynchronous formats, involve a delegate with authority, and escalate through the sponsor if decisions are blocked.",
      },
      {
        question: "Can a RACI have more than one Accountable?",
        answer:
          "It should not. A single Accountable per item ensures someone owns the final decision; multiple Responsible parties are fine.",
      },
    ],
    related: ["business-analysis", "ba-techniques", "templates", "interview-prep"],
  },
  {
    slug: "ba-techniques",
    category: "learn",
    eyebrow: "Learning track",
    title: "BA Techniques you will actually use",
    highlight: "actually use",
    summary:
      "A practical toolkit of the analysis techniques that come up on real projects, from interviews and workshops to SWOT, MoSCoW, use cases and root-cause analysis.",
    meta: [
      { label: "Level", value: "All levels" },
      { label: "Techniques", value: "Core BABOK set" },
      { label: "Reference", value: "BABOK v3 Chapter 10" },
    ],
    overview: {
      heading: "The right technique for the question",
      paragraphs: [
        "BABOK v3 describes 50 techniques. You do not need all of them; you need to know which few fit the question in front of you. Use interviews to explore, workshops to converge, models to expose gaps, and prioritisation techniques to force decisions.",
        "This track groups the most-used techniques by purpose and shows when each is the right choice, what it produces, and its common pitfalls.",
      ],
    },
    outcomes: [
      "Select elicitation techniques by stakeholder, information need and constraints",
      "Facilitate a requirements workshop with a clear agenda and outcomes",
      "Apply SWOT and PESTLE in strategy analysis",
      "Prioritise with MoSCoW and weighted scoring",
      "Model behaviour with use cases, user stories and decision tables",
      "Run root-cause analysis using 5 Whys and fishbone diagrams",
    ],
    concepts: [
      {
        title: "Elicitation techniques",
        description:
          "Interviews, workshops, observation, surveys, document analysis and prototyping each surface different kinds of information.",
        icon: "mic",
      },
      {
        title: "Strategy techniques",
        description:
          "SWOT, PESTLE and business model canvas frame the context and options before requirements are written.",
        icon: "compass",
      },
      {
        title: "Prioritisation",
        description:
          "MoSCoW, weighted scoring and cost of delay make trade-offs explicit and defensible.",
        icon: "list-checks",
      },
      {
        title: "Modelling",
        description:
          "Use cases, process models, data models, state diagrams and decision tables expose gaps that text hides.",
        icon: "git-branch",
      },
      {
        title: "Root-cause analysis",
        description:
          "5 Whys and fishbone diagrams keep solutions aimed at causes rather than symptoms.",
        icon: "search",
      },
      {
        title: "Prototyping",
        description:
          "Wireframes and clickable mock-ups validate requirements with users before anything is built.",
        icon: "layout-template",
      },
    ],
    steps: [
      { title: "Clarify the question", description: "Decide what you need to learn or decide." },
      { title: "Pick the technique", description: "Match the technique to the information need, stakeholders and time available." },
      { title: "Prepare", description: "Set an agenda, materials and expected outputs." },
      { title: "Apply and capture", description: "Run the technique and record outputs in a reusable form." },
      { title: "Confirm", description: "Play results back to stakeholders and correct misunderstandings." },
    ],
    artifacts: [
      { name: "Elicitation plan", description: "Techniques, participants, schedule and expected outputs." },
      { name: "Workshop outputs", description: "Agreed decisions, actions, open questions and parking lot." },
      { name: "Decision table", description: "Conditions and actions for complex business rules." },
      { name: "SWOT analysis", description: "Strengths, weaknesses, opportunities and threats for an initiative." },
    ],
    tools: ["Miro", "Balsamiq", "Figma", "Visio", "Excel", "Confluence"],
    faqs: [
      {
        question: "Which techniques should I learn first?",
        answer:
          "Interviews, workshops, process modelling, user stories with acceptance criteria, MoSCoW and 5 Whys cover most day-to-day BA work.",
      },
      {
        question: "Interview or workshop?",
        answer:
          "Interview to explore individual perspectives and sensitive topics; workshop to resolve differences and reach group agreement quickly.",
      },
      {
        question: "When is a decision table better than text?",
        answer:
          "When a rule depends on several conditions in combination. A table shows every combination and makes missing cases obvious.",
      },
    ],
    related: ["requirements-engineering", "process-analysis", "knowledge-areas", "checklists"],
  },
  {
    slug: "knowledge-areas",
    category: "learn",
    eyebrow: "Learning track",
    title: "The six BABOK v3 Knowledge Areas",
    highlight: "Knowledge Areas",
    summary:
      "Understand the six knowledge areas of the BABOK Guide v3, what tasks sit in each, and how they connect on a real initiative.",
    meta: [
      { label: "Level", value: "Intermediate" },
      { label: "Knowledge areas", value: "6" },
      { label: "Reference", value: "BABOK Guide v3" },
      { label: "Useful for", value: "IIBA certification" },
    ],
    overview: {
      heading: "A map of the profession",
      paragraphs: [
        "The BABOK Guide v3 organises business analysis into six knowledge areas. They are not sequential phases; on real work they overlap and repeat. Together they describe everything a BA plans, elicits, manages, analyses and evaluates.",
        "Knowing the knowledge areas helps you see gaps in your own practice, explain your role to employers, and prepare for IIBA certifications such as ECBA, CCBA and CBAP.",
      ],
    },
    outcomes: [
      "Name the six knowledge areas and explain the purpose of each",
      "List key tasks within each knowledge area",
      "Explain how outputs of one area become inputs to another",
      "Map your own project experience to BABOK tasks",
      "Use the knowledge areas as a structure for certification study",
    ],
    concepts: [
      {
        title: "Business Analysis Planning and Monitoring",
        description:
          "Plan the approach, stakeholder engagement, governance and information management, and improve BA performance.",
        icon: "clipboard-list",
      },
      {
        title: "Elicitation and Collaboration",
        description:
          "Prepare for, conduct and confirm elicitation; communicate information and manage stakeholder collaboration.",
        icon: "message-square",
      },
      {
        title: "Requirements Life Cycle Management",
        description:
          "Trace, maintain, prioritise, assess changes to and approve requirements and designs.",
        icon: "git-branch",
      },
      {
        title: "Strategy Analysis",
        description:
          "Analyse current state, define future state, assess risks and define change strategy.",
        icon: "compass",
      },
      {
        title: "Requirements Analysis and Design Definition",
        description:
          "Specify and model requirements, verify and validate them, define architecture, and analyse design options and value.",
        icon: "layers",
      },
      {
        title: "Solution Evaluation",
        description:
          "Measure solution performance, analyse results, assess limitations, and recommend actions to increase value.",
        icon: "trending-up",
      },
    ],
    steps: [
      { title: "Plan the work", description: "Planning and Monitoring sets the approach and governance." },
      { title: "Understand the strategy", description: "Strategy Analysis defines why change is needed and what the future state is." },
      { title: "Elicit and collaborate", description: "Elicitation and Collaboration gathers information from stakeholders throughout." },
      { title: "Analyse and design", description: "RADD turns information into specified, validated requirements and design options." },
      { title: "Manage the life cycle", description: "RLCM keeps requirements traced, prioritised and approved as change occurs." },
      { title: "Evaluate the solution", description: "Solution Evaluation confirms value delivered and recommends improvements." },
    ],
    tools: ["BABOK Guide v3", "Confluence", "Jira"],
    faqs: [
      {
        question: "Are the knowledge areas performed in order?",
        answer:
          "No. BABOK explicitly states they are not phases. Tasks from several areas run concurrently and iteratively on most projects.",
      },
      {
        question: "How do the knowledge areas relate to certification?",
        answer:
          "IIBA exams weight questions by knowledge area, so they are the natural structure for study. Check the current IIBA exam blueprint for the weightings of the level you are targeting.",
      },
      {
        question: "What else is in BABOK besides knowledge areas?",
        answer:
          "Underlying competencies, techniques, perspectives (Agile, Business Intelligence, Information Technology, Business Architecture, Business Process Management), and the Core Concept Model.",
      },
    ],
    related: ["ba-foundations", "certification", "ba-techniques", "glossary"],
  },
  {
    slug: "roles",
    category: "learn",
    eyebrow: "Career context",
    title: "BA roles and where they fit",
    highlight: "where they fit",
    summary:
      "Compare the roles that do business analysis work, from business analyst and product owner to systems, data and process analysts, and see how responsibilities differ.",
    meta: [
      { label: "Level", value: "All levels" },
      { label: "Roles covered", value: "7" },
      { label: "Focus", value: "Responsibilities and overlap" },
    ],
    overview: {
      heading: "One discipline, many job titles",
      paragraphs: [
        "Business analysis is practised under many titles. The core work, understanding needs and defining solutions that deliver value, is shared; the emphasis differs. A systems analyst leans technical, a process analyst leans operational, a product owner owns backlog priority.",
        "Understanding the landscape helps you read job descriptions accurately, position your experience, and choose a direction that suits your strengths.",
      ],
    },
    outcomes: [
      "Describe the responsibilities of common BA-family roles",
      "Distinguish the business analyst from the product owner and project manager",
      "Map required skills to each role and identify your own gaps",
      "Read a job description and identify which flavour of BA work it describes",
      "Plan a progression path from junior BA toward senior, lead or specialist roles",
    ],
    concepts: [
      {
        title: "Business Analyst",
        description:
          "Elicits and manages requirements, models processes and data, and bridges business and delivery teams.",
        icon: "briefcase",
      },
      {
        title: "Product Owner",
        description:
          "Accountable in Scrum for maximising product value and ordering the backlog; often works alongside a BA.",
        icon: "target",
      },
      {
        title: "Systems Analyst",
        description:
          "Focuses on system behaviour, integrations, interfaces and technical specifications.",
        icon: "settings",
      },
      {
        title: "Business Process Analyst",
        description:
          "Models, measures and redesigns processes, often using BPMN and Lean or Six Sigma methods.",
        icon: "workflow",
      },
      {
        title: "Data / Reporting Analyst",
        description:
          "Defines data and reporting requirements, writes queries, and validates data quality.",
        icon: "database",
      },
      {
        title: "Senior and Lead BA",
        description:
          "Shapes strategy analysis, leads BA practice across workstreams, and coaches other analysts.",
        icon: "graduation-cap",
      },
    ],
    steps: [
      { title: "Assess your strengths", description: "Note whether you lean towards people, process, data or technology." },
      { title: "Compare role profiles", description: "Match your strengths to the emphasis of each role." },
      { title: "Close skill gaps", description: "Build the specific techniques and tools the target role expects." },
      { title: "Build evidence", description: "Create portfolio artifacts that demonstrate the target role's core work." },
    ],
    tools: ["Jira", "Confluence", "SQL", "Excel", "Visio", "Power BI"],
    faqs: [
      {
        question: "Is a product owner the same as a business analyst?",
        answer:
          "No. The product owner is accountable for value and backlog order; the BA provides analysis that informs those decisions. On some small teams one person holds both roles.",
      },
      {
        question: "How is a BA different from a project manager?",
        answer:
          "The project manager is responsible for delivering the work within time, cost and scope; the BA is responsible for defining what the right scope and requirements are.",
      },
      {
        question: "Which BA role suits someone from a technical background?",
        answer:
          "Systems analyst and data analyst roles build directly on technical experience, and technical fluency is valued in any BA role on IT-heavy projects.",
      },
      {
        question: "Which suits someone from operations or a business function?",
        answer:
          "Business analyst and process analyst roles reward domain knowledge, since understanding how the business really works is the hardest part to learn.",
      },
    ],
    related: ["career", "skills", "resume", "interview-prep"],
  },
];
