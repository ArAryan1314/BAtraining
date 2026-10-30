import type { TopicContent } from "./types";

export const platformTopics: TopicContent[] = [
  {
    slug: "program",
    category: "learn",
    eyebrow: "The program",
    title: "A mentor-led path into Business Analysis",
    highlight: "Business Analysis",
    summary:
      "A project-based BA career program that takes you from fundamentals to a reviewed portfolio in four phases, with practising senior BAs guiding every deliverable.",
    meta: [
      { label: "Format", value: "Mentor-led, project-based" },
      { label: "Core duration", value: "12 weeks + placement prep" },
      { label: "Modules", value: "6" },
      { label: "Outcome", value: "Portfolio + verifiable certificate" },
    ],
    overview: {
      heading: "Built around the work, not the slides",
      paragraphs: [
        "Most BA courses stop at definitions. This program is structured around the deliverables a Business Analyst actually produces on the job: business requirements documents, user stories with acceptance criteria, process maps, traceability matrices and stakeholder maps.",
        "You learn a concept, apply it to a realistic scenario, and submit the result for review by a practising senior BA. Each phase builds on the last, so by week 12 you have a capstone portfolio that shows how you think, not just what you know.",
      ],
    },
    outcomes: [
      "Explain the BA role, its responsibilities and where it fits in delivery teams",
      "Elicit, document and prioritise requirements for a realistic business problem",
      "Write user stories with clear, testable acceptance criteria",
      "Model as-is and to-be processes in BPMN and identify improvement opportunities",
      "Query and summarise data with SQL and Excel to support recommendations",
      "Present a reviewed capstone portfolio in interviews",
    ],
    concepts: [
      {
        title: "Learn by doing",
        description: "Every module ends in a deliverable built against a realistic business scenario.",
        icon: "folder-kanban",
      },
      {
        title: "Mentor review",
        description: "Practising senior BAs review your work and give specific, actionable feedback.",
        icon: "users",
      },
      {
        title: "Portfolio-first",
        description: "Your deliverables become a portfolio you can walk an interviewer through.",
        icon: "briefcase",
      },
      {
        title: "Verifiable credential",
        description: "Completion earns a certificate with a unique code anyone can verify online.",
        icon: "award",
      },
    ],
    steps: [
      {
        title: "Phase 1 — Knowledge (weeks 1–4)",
        description:
          "Build the foundations: the BA role, stakeholder analysis, elicitation techniques, requirements types and the core vocabulary of delivery teams.",
      },
      {
        title: "Phase 2 — Application (weeks 5–8)",
        description:
          "Apply each technique to practice scenarios: write BRDs and user stories, map processes in BPMN and analyse data with SQL and Excel.",
      },
      {
        title: "Phase 3 — Portfolio (weeks 9–12)",
        description:
          "Complete an end-to-end capstone project, from problem statement to traceable requirements, with mentor review at each milestone.",
      },
      {
        title: "Phase 4 — Placement prep (week 13+)",
        description:
          "Refine your resume and portfolio, rehearse interview answers using your own deliverables, and prepare to talk confidently about your work.",
      },
    ],
    artifacts: [
      { name: "Business Requirements Document", description: "A structured BRD covering scope, objectives, requirements and assumptions." },
      { name: "User stories", description: "A prioritised backlog with acceptance criteria written in Given/When/Then." },
      { name: "BPMN process maps", description: "As-is and to-be models that make process gaps visible." },
      { name: "Requirements Traceability Matrix", description: "Links each requirement to its business objective and test coverage." },
      { name: "Stakeholder map", description: "An influence/interest analysis with an engagement plan." },
    ],
    faqs: [
      {
        question: "Do I need prior BA experience?",
        answer:
          "No. Phase 1 starts from the fundamentals. Comfort with reading, writing and basic spreadsheets is enough to begin.",
      },
      {
        question: "What happens after week 12?",
        answer:
          "You move into placement prep: polishing your resume and portfolio and practising interviews built around the work you have produced.",
      },
      {
        question: "Who reviews my work?",
        answer:
          "Mentors who are practising senior Business Analysts. They review your deliverables and return written feedback you can act on.",
      },
    ],
    related: ["curriculum", "how-it-works", "projects", "certification"],
  },
  {
    slug: "curriculum",
    category: "learn",
    eyebrow: "Curriculum",
    title: "Six modules, one complete BA toolkit",
    highlight: "complete BA toolkit",
    summary:
      "From BA foundations to a capstone project, each module teaches a core skill and ends with a deliverable reviewed by a senior BA mentor.",
    meta: [
      { label: "Modules", value: "6" },
      { label: "Level", value: "Beginner to job-ready" },
      { label: "Format", value: "Lessons + practice + review" },
      { label: "Capstone", value: "Included" },
    ],
    overview: {
      heading: "A sequence designed around real BA work",
      paragraphs: [
        "The curriculum follows the order in which a Business Analyst typically engages with a project: understand the business and stakeholders, define requirements, work within Agile delivery, model processes and analyse data.",
        "Modules build on each other. The requirements you elicit in one become the user stories you refine in the next, and the capstone brings every technique together on a single end-to-end problem.",
      ],
    },
    outcomes: [
      "Describe the BA lifecycle and the key BABOK knowledge areas",
      "Plan and run elicitation sessions and turn findings into requirements",
      "Write and refine user stories within Scrum ceremonies",
      "Produce as-is and to-be BPMN models",
      "Use SQL and Excel to validate assumptions with data",
      "Deliver a complete capstone with traceable requirements",
    ],
    concepts: [
      { title: "Foundations first", description: "Role clarity and stakeholder thinking before any templates.", icon: "book-open" },
      { title: "Requirements discipline", description: "Clear, testable, traceable requirements at every level.", icon: "clipboard-list" },
      { title: "Agile fluency", description: "Backlogs, stories and ceremonies as they work in real teams.", icon: "git-branch" },
      { title: "Process and data", description: "Visual models and evidence that back up recommendations.", icon: "workflow" },
    ],
    steps: [
      {
        title: "Module 1 — BA Foundations",
        description:
          "The BA role, the project lifecycle, BABOK knowledge areas, stakeholder identification and the core techniques you will use throughout the program.",
      },
      {
        title: "Module 2 — Requirements Engineering",
        description:
          "Elicitation techniques, functional and non-functional requirements, BRD structure, prioritisation and building a requirements traceability matrix.",
      },
      {
        title: "Module 3 — Agile Business Analysis",
        description:
          "Epics, user stories and acceptance criteria, backlog refinement, Scrum ceremonies and working with product owners and developers in Jira.",
      },
      {
        title: "Module 4 — Process Modeling",
        description:
          "BPMN notation, as-is and to-be mapping, gap analysis and identifying bottlenecks, handoffs and automation opportunities.",
      },
      {
        title: "Module 5 — Data Analysis (SQL/Excel)",
        description:
          "Querying data with SQL, summarising with Excel pivots and lookups, and turning analysis into evidence for business decisions.",
      },
      {
        title: "Module 6 — Capstone Project",
        description:
          "An end-to-end engagement on a realistic scenario, producing a full set of BA deliverables reviewed by a mentor at each milestone.",
      },
    ],
    tools: ["Jira", "Confluence", "Excel", "SQL", "BPMN modelling tools", "Miro"],
    faqs: [
      {
        question: "Can I skip modules I already know?",
        answer:
          "The modules build on each other, so we recommend completing them in order. If you have prior experience, you will simply move through the familiar material faster.",
      },
      {
        question: "Is the curriculum aligned with BABOK?",
        answer:
          "Yes. Module 1 introduces the BABOK knowledge areas, and the later modules map techniques back to them so you can see how practice connects to the standard.",
      },
      {
        question: "How technical is the data module?",
        answer:
          "It covers the SQL and Excel a BA uses day to day: filtering, joining, aggregating and summarising data. No programming background is needed.",
      },
    ],
    related: ["program", "requirements-engineering", "agile-ba", "data-analysis"],
  },
  {
    slug: "skills",
    category: "learn",
    eyebrow: "Skills you build",
    title: "The skills hiring managers expect from a BA",
    highlight: "skills hiring managers expect",
    summary:
      "A balanced mix of analytical, technical and interpersonal skills, each practised on realistic scenarios and demonstrated through reviewed deliverables.",
    meta: [
      { label: "Skill areas", value: "Analysis, delivery, data, communication" },
      { label: "Practice", value: "Scenario-based" },
      { label: "Evidence", value: "Portfolio deliverables" },
    ],
    overview: {
      heading: "Skills you can show, not just list",
      paragraphs: [
        "A resume that lists \"requirements gathering\" says little. A user story backlog with sharp acceptance criteria, or a to-be process map that removes three handoffs, says a lot.",
        "Every skill in the program is tied to a deliverable, so by the end you have concrete evidence for each one and can explain how you applied it.",
      ],
    },
    outcomes: [
      "Run structured elicitation through interviews, workshops and document analysis",
      "Write requirements and user stories that developers and testers can act on",
      "Map processes in BPMN and recommend practical improvements",
      "Use SQL and Excel to answer business questions with data",
      "Manage stakeholders with differing priorities and communicate trade-offs clearly",
    ],
    concepts: [
      { title: "Elicitation", description: "Asking the right questions and uncovering the real need behind a request.", icon: "message-square" },
      { title: "Requirements writing", description: "Clear, testable, prioritised requirements and user stories.", icon: "file-text" },
      { title: "Process thinking", description: "Seeing a business as a set of flows that can be measured and improved.", icon: "workflow" },
      { title: "Data literacy", description: "Using SQL and Excel to test assumptions and support decisions.", icon: "database" },
      { title: "Stakeholder management", description: "Mapping influence and interest, and keeping people aligned.", icon: "users" },
      { title: "Communication", description: "Presenting findings concisely to business and technical audiences.", icon: "presentation" },
    ],
    tools: ["Jira", "Confluence", "Excel", "SQL", "BPMN", "Miro"],
    faqs: [
      {
        question: "Which skills matter most for a first BA role?",
        answer:
          "Requirements writing, elicitation and stakeholder communication come up most often. The program also covers process modelling and data analysis so you can stand out.",
      },
      {
        question: "Will I learn soft skills or only techniques?",
        answer:
          "Both. Stakeholder management and communication are practised through workshops, presentations and mentor feedback on how you explain your work.",
      },
      {
        question: "How do I prove these skills to an employer?",
        answer:
          "Through your portfolio. Each skill maps to at least one reviewed deliverable you can walk an interviewer through.",
      },
    ],
    related: ["ba-techniques", "stakeholder-management", "sql", "portfolio"],
  },
  {
    slug: "practice",
    category: "learn",
    eyebrow: "Practice scenarios",
    title: "Practise on scenarios that feel like real projects",
    highlight: "real projects",
    summary:
      "Work through realistic business problems — from checkout optimisation to data migration — and build the deliverables a BA would produce on the job.",
    meta: [
      { label: "Scenarios", value: "3 core" },
      { label: "Domains", value: "E-commerce, CRM, field operations" },
      { label: "Review", value: "Senior BA mentors" },
    ],
    overview: {
      heading: "Context makes the technique stick",
      paragraphs: [
        "Techniques are easier to learn than to apply. Practice scenarios give you a business context, stakeholders with competing goals and incomplete information — the conditions BAs work in every day.",
        "Each scenario comes with a brief, supporting materials and a set of deliverables. You submit your work and a mentor reviews it against what a senior BA would expect to see.",
      ],
    },
    outcomes: [
      "Turn a vague business brief into a clear problem statement and scope",
      "Identify stakeholders and plan how to engage each one",
      "Produce requirements, user stories and process maps for a realistic problem",
      "Handle conflicting stakeholder priorities and document trade-offs",
      "Respond to reviewer feedback and improve a deliverable",
    ],
    concepts: [
      {
        title: "E-commerce checkout optimisation",
        description: "Analyse drop-off in a checkout flow, map the as-is journey and define requirements for a simpler to-be experience.",
        icon: "shopping-cart",
      },
      {
        title: "CRM data migration",
        description: "Plan a migration between systems: data mapping, quality rules, stakeholder sign-off and cut-over requirements.",
        icon: "database",
      },
      {
        title: "Field-worker mobile app MVP",
        description: "Define the minimum viable scope for a mobile app used by field staff, from user research to a prioritised backlog.",
        icon: "layers",
      },
      {
        title: "Mentor feedback loop",
        description: "Submit, receive specific feedback, revise — the same cycle you will follow on real projects.",
        icon: "message-square",
      },
    ],
    steps: [
      { title: "Read the brief", description: "Understand the business context, constraints and the stakeholders involved." },
      { title: "Analyse", description: "Map stakeholders and processes, review the supporting data and identify gaps." },
      { title: "Build deliverables", description: "Produce the requirements, stories and models the scenario calls for." },
      { title: "Submit for review", description: "A mentor reviews your work and returns written feedback." },
      { title: "Revise", description: "Act on the feedback and add the improved version to your portfolio." },
    ],
    example: {
      title: "User story from the checkout scenario",
      language: "gherkin",
      code: `Feature: Guest checkout

  As a first-time shopper
  I want to check out without creating an account
  So that I can complete my purchase quickly

  Scenario: Guest completes checkout
    Given I have items in my cart
    And I am not signed in
    When I choose "Continue as guest"
    And I enter valid delivery and payment details
    Then my order is placed
    And I receive an order confirmation email`,
      caption: "A user story with acceptance criteria written in Given/When/Then format.",
    },
    faqs: [
      {
        question: "Are the scenarios based on real companies?",
        answer:
          "They are realistic but fictional, modelled on the kinds of problems BAs commonly face so you can discuss them freely in interviews.",
      },
      {
        question: "Can I use scenario work in my portfolio?",
        answer:
          "Yes. Reviewed scenario deliverables are designed to go straight into your portfolio.",
      },
      {
        question: "What if I get stuck on a scenario?",
        answer:
          "Each scenario includes guidance, and mentors can point you in the right direction during review.",
      },
    ],
    related: ["projects", "case-studies", "deliverables", "retail"],
  },
  {
    slug: "assessments",
    category: "learn",
    eyebrow: "Assessments",
    title: "Assessments that measure real BA ability",
    highlight: "real BA ability",
    summary:
      "Knowledge checks confirm you understand the concepts; mentor-reviewed deliverables confirm you can apply them.",
    meta: [
      { label: "Types", value: "Quizzes + deliverable reviews" },
      { label: "Reviewed by", value: "Senior BA mentors" },
      { label: "Feedback", value: "Written, specific" },
    ],
    overview: {
      heading: "Two kinds of evidence",
      paragraphs: [
        "Short knowledge checks after each lesson help you confirm you have understood key terms, techniques and notation before moving on.",
        "The assessments that matter most are your deliverables. Mentors review BRDs, user stories, process maps and RTMs against the standard a hiring manager would expect, and tell you exactly what to improve.",
      ],
    },
    outcomes: [
      "Identify gaps in your understanding early through module knowledge checks",
      "Receive structured feedback on each major deliverable",
      "Understand the criteria that separate a good requirement from a weak one",
      "Track your progress across modules toward certification",
    ],
    concepts: [
      { title: "Knowledge checks", description: "Short quizzes that reinforce concepts after each lesson.", icon: "list-checks" },
      { title: "Deliverable reviews", description: "Mentors assess your work for clarity, completeness and testability.", icon: "search" },
      { title: "Clear criteria", description: "You know what good looks like before you submit.", icon: "target" },
      { title: "Progress tracking", description: "See what you have completed and what remains for certification.", icon: "trending-up" },
    ],
    steps: [
      { title: "Learn", description: "Complete the lessons for a module." },
      { title: "Check", description: "Take the knowledge check and revisit any weak areas." },
      { title: "Submit", description: "Upload the module deliverable for mentor review." },
      { title: "Improve", description: "Revise based on feedback until it meets the standard." },
    ],
    faqs: [
      {
        question: "Can I retake knowledge checks?",
        answer: "Yes. They are there to help you learn, so you can retake them as you review the material.",
      },
      {
        question: "What do mentors look for in a deliverable?",
        answer:
          "Clarity, completeness, testability and traceability — whether a developer, tester or stakeholder could act on it without coming back to you with questions.",
      },
      {
        question: "Do assessments count toward the certificate?",
        answer:
          "Yes. Completing the required modules and having your key deliverables accepted are part of the certification criteria.",
      },
    ],
    related: ["certification", "curriculum", "checklists"],
  },
  {
    slug: "projects",
    category: "learn",
    eyebrow: "Projects",
    title: "Build a portfolio of real BA deliverables",
    highlight: "real BA deliverables",
    summary:
      "Projects take you from a business problem to a full set of reviewed artifacts — BRDs, user stories, BPMN maps, RTMs and stakeholder maps.",
    meta: [
      { label: "Capstone", value: "Weeks 9–12" },
      { label: "Deliverables", value: "5 core artifact types" },
      { label: "Review", value: "At each milestone" },
    ],
    overview: {
      heading: "From brief to portfolio",
      paragraphs: [
        "Projects connect everything you learn. You start with a business problem, work through stakeholder analysis, elicitation, process modelling and data analysis, and finish with requirements that trace back to business objectives.",
        "The capstone in weeks 9–12 is your centrepiece: an end-to-end engagement reviewed by a mentor at each milestone, ready to present in interviews.",
      ],
    },
    outcomes: [
      "Deliver a complete set of BA artifacts for a single business problem",
      "Show traceability from business objective to requirement to acceptance test",
      "Present your approach and decisions in a clear, structured way",
      "Use mentor feedback to raise each artifact to a professional standard",
    ],
    concepts: [
      { title: "End-to-end scope", description: "Cover the full BA lifecycle on one problem, not isolated exercises.", icon: "route" },
      { title: "Milestone reviews", description: "Mentors review your work at each stage, not just at the end.", icon: "shield-check" },
      { title: "Traceability", description: "Every requirement links to a goal and a test.", icon: "git-branch" },
      { title: "Presentation", description: "Package your project so an interviewer can follow it in minutes.", icon: "presentation" },
    ],
    artifacts: [
      { name: "Business Requirements Document", description: "Scope, objectives, stakeholders, requirements, assumptions and constraints." },
      { name: "User stories with acceptance criteria", description: "A prioritised backlog with Given/When/Then criteria." },
      { name: "BPMN as-is and to-be maps", description: "Current and future process models with the gaps called out." },
      { name: "Requirements Traceability Matrix", description: "Links objectives, requirements and test cases." },
      { name: "Stakeholder map", description: "Influence/interest grid with an engagement approach for each group." },
    ],
    example: {
      title: "RTM extract",
      language: "text",
      code: `ID     Business objective           Requirement                          Test case
BR-01  Reduce checkout abandonment  Allow guest checkout                 TC-01, TC-02
BR-02  Reduce checkout abandonment  Show delivery cost before payment    TC-03
BR-03  Improve order accuracy       Validate postcode on address entry   TC-04`,
      caption: "A traceability matrix links each requirement to the objective it serves and the tests that verify it.",
    },
    faqs: [
      {
        question: "Can I choose my capstone topic?",
        answer:
          "You work from a defined capstone brief so mentors can review consistently, with room to make your own analysis and design decisions.",
      },
      {
        question: "How do I present the project to employers?",
        answer:
          "Placement prep covers how to package your portfolio and walk through it in an interview, focusing on the decisions you made and why.",
      },
      {
        question: "Is the capstone required for certification?",
        answer: "Yes. A mentor-accepted capstone is part of the certification criteria.",
      },
    ],
    related: ["portfolio", "deliverables", "practice", "templates"],
  },
  {
    slug: "certification",
    category: "learn",
    eyebrow: "Certification",
    title: "A certificate backed by reviewed work",
    highlight: "reviewed work",
    summary:
      "Complete the program and earn a certificate with a unique verification code that employers can check online.",
    meta: [
      { label: "Issued on", value: "Program completion" },
      { label: "Verification", value: "Unique code, online check" },
      { label: "Backed by", value: "Mentor-reviewed capstone" },
    ],
    overview: {
      heading: "Proof that goes beyond attendance",
      paragraphs: [
        "The certificate is issued when you complete the required modules and your capstone deliverables are accepted by a mentor. It reflects work you have produced, not just time spent watching lessons.",
        "Each certificate carries a unique verification code. Anyone — a recruiter, a hiring manager — can enter it on our verification page to confirm it is genuine.",
      ],
    },
    outcomes: [
      "Earn a credential tied to mentor-reviewed deliverables",
      "Share a verification code employers can check instantly",
      "Add the certificate to your resume and professional profiles",
      "Reference the certificate alongside your portfolio in interviews",
    ],
    concepts: [
      { title: "Earned through work", description: "Issued only after your capstone is accepted by a mentor.", icon: "award" },
      { title: "Verifiable", description: "A unique code that can be checked on the verification page.", icon: "shield-check" },
      { title: "Shareable", description: "Add it to your resume and professional profiles.", icon: "sparkles" },
      { title: "Portfolio companion", description: "Pairs with your deliverables to show both credential and capability.", icon: "briefcase" },
    ],
    steps: [
      { title: "Complete the modules", description: "Finish the lessons and knowledge checks for all six modules." },
      { title: "Get deliverables accepted", description: "Have your key deliverables and capstone accepted by a mentor." },
      { title: "Receive your certificate", description: "Your certificate is issued with a unique verification code." },
      { title: "Share and verify", description: "Employers enter the code on the verification page to confirm it." },
    ],
    faqs: [
      {
        question: "How does verification work?",
        answer:
          "Each certificate has a unique code. Entering it on our verification page shows whether the certificate is valid and who it was issued to.",
      },
      {
        question: "Is this an IIBA certification?",
        answer:
          "No. It is a program completion certificate. The curriculum references BABOK, and the program can be a helpful foundation if you later pursue an IIBA certification.",
      },
      {
        question: "What if I do not finish the capstone?",
        answer:
          "The certificate requires an accepted capstone. You can keep working on it with mentor feedback until it meets the standard.",
      },
    ],
    related: ["assessments", "projects", "career", "resume"],
  },
  {
    slug: "how-it-works",
    category: "platform",
    eyebrow: "How it works",
    title: "How BA Upskill works",
    highlight: "BA Upskill",
    summary:
      "Learn the concepts, apply them to realistic scenarios, get your work reviewed by senior BAs and leave with a portfolio and verifiable certificate.",
    meta: [
      { label: "Learning model", value: "Learn → apply → review" },
      { label: "Mentors", value: "Practising senior BAs" },
      { label: "Pace", value: "Structured weekly phases" },
    ],
    overview: {
      heading: "A simple loop, repeated with purpose",
      paragraphs: [
        "Every module follows the same pattern: short lessons introduce a technique, a practice scenario lets you apply it, and a mentor reviews what you produce.",
        "That loop repeats across four phases — Knowledge, Application, Portfolio and Placement prep — so your skills and your portfolio grow together.",
      ],
    },
    outcomes: [
      "Know exactly what to work on each week",
      "Receive feedback on your deliverables from practising BAs",
      "Build a portfolio as a natural by-product of learning",
      "Finish with a verifiable certificate and interview-ready materials",
    ],
    concepts: [
      { title: "Learn", description: "Focused lessons on one technique at a time.", icon: "book-open" },
      { title: "Apply", description: "Use the technique on a realistic business scenario.", icon: "puzzle" },
      { title: "Review", description: "A senior BA mentor reviews your deliverable and gives feedback.", icon: "users" },
      { title: "Showcase", description: "Reviewed work goes into your portfolio.", icon: "briefcase" },
    ],
    steps: [
      { title: "Enrol", description: "Sign up and get access to the program dashboard and Module 1." },
      { title: "Knowledge (weeks 1–4)", description: "Learn BA foundations and core requirements techniques." },
      { title: "Application (weeks 5–8)", description: "Apply Agile, process modelling and data analysis to practice scenarios." },
      { title: "Portfolio (weeks 9–12)", description: "Complete the capstone with mentor review at each milestone." },
      { title: "Placement prep (week 13+)", description: "Prepare your resume, portfolio and interview answers." },
      { title: "Certify", description: "Receive a certificate with a unique verification code." },
    ],
    faqs: [
      {
        question: "Is the program self-paced?",
        answer:
          "It follows a structured weekly plan so you keep momentum, with flexibility in when you study within each week.",
      },
      {
        question: "How do I submit work for review?",
        answer: "You upload deliverables through your dashboard, and mentor feedback is returned there.",
      },
      {
        question: "What do I get at the end?",
        answer:
          "A portfolio of reviewed BA deliverables, interview preparation and a certificate with a verification code.",
      },
    ],
    related: ["program", "curriculum", "faq", "roadmap"],
  },
  {
    slug: "about",
    category: "platform",
    eyebrow: "About us",
    title: "Training Business Analysts the way the job works",
    highlight: "the way the job works",
    summary:
      "BA Upskill is a mentor-led, project-based program that helps people build the skills, portfolio and confidence to start a career in Business Analysis.",
    meta: [
      { label: "Focus", value: "Business Analysis careers" },
      { label: "Approach", value: "Project-based, mentor-led" },
      { label: "Mentors", value: "Practising senior BAs" },
    ],
    overview: {
      heading: "Why we built BA Upskill",
      paragraphs: [
        "Many aspiring Business Analysts learn the theory but struggle to show they can do the work. Interviewers ask about requirements you have written, processes you have mapped and stakeholders you have managed — and course certificates alone do not answer that.",
        "We built BA Upskill to close that gap. Learners work on realistic scenarios, produce the deliverables BAs create on real projects, and get feedback from practising senior BAs who know what good looks like.",
      ],
    },
    outcomes: [
      "Learn from people who do Business Analysis for a living",
      "Practise on realistic problems rather than abstract exercises",
      "Leave with evidence of your skills, not just a list of topics covered",
      "Prepare for interviews with your own work as the talking points",
    ],
    concepts: [
      { title: "Practice over theory", description: "Concepts matter, but deliverables prove capability.", icon: "wrench" },
      { title: "Honest feedback", description: "Specific, constructive reviews from experienced BAs.", icon: "message-square" },
      { title: "Career focus", description: "Everything points toward being ready for a BA role.", icon: "target" },
      { title: "Transparency", description: "Verifiable certificates and clear completion criteria.", icon: "shield-check" },
    ],
    faqs: [
      {
        question: "Who are the mentors?",
        answer:
          "Practising senior Business Analysts who review learner deliverables and share how the work is done on real projects.",
      },
      {
        question: "Who is the program for?",
        answer:
          "Career changers, recent graduates and professionals in adjacent roles — such as QA, support or operations — who want to move into Business Analysis.",
      },
      {
        question: "How can I get in touch?",
        answer: "Use the contact page and our team will get back to you.",
      },
    ],
    related: ["program", "how-it-works", "outcomes", "faq"],
  },
  {
    slug: "faq",
    category: "platform",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    highlight: "questions",
    summary:
      "Answers to common questions about enrolment, prerequisites, time commitment, mentor review, certification and career support.",
    meta: [
      { label: "Topics", value: "Enrolment, learning, certification" },
      { label: "Still unsure?", value: "Contact us" },
      { label: "Program length", value: "12 weeks + placement prep" },
    ],
    overview: {
      heading: "Everything you need to know before you start",
      paragraphs: [
        "BA Upskill is a mentor-led, project-based program that takes you from BA fundamentals to a reviewed portfolio and verifiable certificate.",
        "If your question is not answered here, contact us and our team will help.",
      ],
    },
    outcomes: [
      "Understand what the program involves before you enrol",
      "Know what you need to get started",
      "See how mentor review and certification work",
      "Find out how to reach us with further questions",
    ],
    concepts: [
      { title: "Enrolment", description: "How to join and what happens next.", icon: "graduation-cap" },
      { title: "Learning", description: "Time commitment, tools and how modules are structured.", icon: "book-open" },
      { title: "Review and certification", description: "How mentors assess work and how certificates are verified.", icon: "award" },
      { title: "Career support", description: "Resume, portfolio and interview preparation.", icon: "briefcase" },
    ],
    faqs: [
      {
        question: "How do I enrol?",
        answer:
          "Create an account and choose the program from your dashboard. Once enrolled, you get immediate access to Module 1 and the program schedule.",
      },
      {
        question: "Do I need any prerequisites?",
        answer:
          "No prior BA experience is required. You should be comfortable reading and writing in English and using a computer and basic spreadsheets.",
      },
      {
        question: "How much time should I set aside each week?",
        answer:
          "Plan for regular study every week across the 12-week core program. Consistent weekly effort matters more than long sessions, especially once you start submitting deliverables.",
      },
      {
        question: "How does mentor review work?",
        answer:
          "You submit deliverables such as BRDs, user stories and process maps through your dashboard. A practising senior BA reviews them and returns written feedback, and you can revise and resubmit.",
      },
      {
        question: "What certificate do I receive?",
        answer:
          "On completing the program and having your capstone accepted, you receive a certificate with a unique verification code that anyone can check on our verification page.",
      },
      {
        question: "What tools do I need?",
        answer:
          "A computer with a modern browser and a reliable internet connection. Spreadsheet software is useful for the data module. Any other tools are introduced in the lessons, with free options where possible.",
      },
      {
        question: "Do you offer career support?",
        answer:
          "Yes. From week 13 onward, placement prep helps you refine your resume, package your portfolio and practise interviews using your own deliverables.",
      },
      {
        question: "Can I study while working full time?",
        answer:
          "Yes. The program is designed for people balancing study with other commitments, with flexibility in when you complete each week's work.",
      },
      {
        question: "What is your refund policy?",
        answer: "Please contact us and our team will explain the refund terms that apply to your enrolment.",
      },
      {
        question: "Is this an IIBA certification?",
        answer:
          "No. It is a program completion certificate. The curriculum references BABOK and can be a useful foundation if you later pursue an IIBA certification.",
      },
    ],
    related: ["how-it-works", "program", "certification", "about"],
  },
];
