import type { TopicContent } from "./types";

export const careerTopics: TopicContent[] = [
  {
    slug: "career",
    category: "career",
    eyebrow: "Career track",
    title: "Build a Business Analyst career that lasts",
    highlight: "Business Analyst career",
    summary:
      "Move from learning BA techniques to getting hired and growing in the role. This track connects your training to the resume, portfolio and interview work that employers actually look at.",
    meta: [
      { label: "Track", value: "Career" },
      { label: "Format", value: "Guided + self-paced" },
      { label: "Best for", value: "Career switchers, junior BAs" },
      { label: "Output", value: "Job-ready evidence" },
    ],
    overview: {
      heading: "Skills get you shortlisted. Evidence gets you hired.",
      paragraphs: [
        "Hiring managers rarely ask whether you know what a use case is. They ask you to show how you handled an ambiguous requirement, a difficult stakeholder or a scope change. The career track is built around producing that evidence while you learn, not after.",
        "You will map your existing experience to BA competencies, choose a target domain, build portfolio artifacts from practice cases, and rehearse the interview conversations that decide offers. Every step produces something you can show.",
      ],
    },
    outcomes: [
      "Map your current experience to recognised BA competencies and close the gaps deliberately",
      "Pick a target role and domain based on your background rather than guesswork",
      "Present a resume and portfolio that show outcomes, not just responsibilities",
      "Answer behavioural and scenario questions with structured, credible stories",
      "Plan your first 90 days in a BA role and the growth path beyond it",
    ],
    concepts: [
      {
        title: "Transferable experience",
        description:
          "Testers, support analysts, operations staff and developers already do parts of the BA job. We help you name it, frame it and prove it.",
        icon: "route",
      },
      {
        title: "Domain positioning",
        description:
          "Banking, retail, healthcare and SaaS hire BAs differently. Choosing a domain early sharpens your resume, portfolio and interview stories.",
        icon: "building",
      },
      {
        title: "Portfolio of artifacts",
        description:
          "Requirements, process maps, user stories and data analysis from realistic practice cases give interviewers something concrete to probe.",
        icon: "folder-kanban",
      },
      {
        title: "Interview readiness",
        description:
          "Structured STAR stories, scenario walkthroughs and mock interviews so you are rehearsed, not reciting.",
        icon: "mic",
      },
      {
        title: "Growth path",
        description:
          "From junior BA to senior, lead, product owner or product manager: what changes at each step and what to build toward.",
        icon: "trending-up",
      },
    ],
    steps: [
      {
        title: "Assess your starting point",
        description:
          "Take the skills assessment and list the BA-relevant work you have already done, even if it was never called analysis.",
      },
      {
        title: "Choose a target role and domain",
        description:
          "Decide between IT BA, business process BA, data-leaning BA or product-leaning BA, and pick one industry to go deep on.",
      },
      {
        title: "Build evidence through practice cases",
        description:
          "Work through case studies end to end and keep the strongest artifacts for your portfolio.",
      },
      {
        title: "Package your story",
        description:
          "Rewrite your resume around outcomes and publish a focused portfolio of three to five artifacts.",
      },
      {
        title: "Rehearse and apply",
        description:
          "Run mock interviews, refine your answers, then apply to roles that match the position you have built.",
      },
    ],
    faqs: [
      {
        question: "Can I become a BA without an IT background?",
        answer:
          "Yes. Many strong BAs come from operations, finance, customer service or domain roles. Domain knowledge is an advantage; the technical literacy you need, such as reading data, understanding APIs at a high level and writing testable requirements, can be learned.",
      },
      {
        question: "Do I need a certification to get hired?",
        answer:
          "It helps some applications pass screening, but it rarely decides an offer. Demonstrable work and confident interview answers carry more weight. Treat certification as a supplement, not a substitute.",
      },
      {
        question: "Which role should I target first?",
        answer:
          "The one closest to your current experience. A former tester often fits an IT BA role; someone from operations often fits a process or business BA role. Start where your story is strongest.",
      },
      {
        question: "How long does the career track take?",
        answer:
          "It depends on how much time you commit each week and how much relevant experience you already have. The roadmap breaks the work into phases so you can see progress at each stage.",
      },
    ],
    related: ["roadmap", "resume", "portfolio", "interview-prep"],
  },
  {
    slug: "roadmap",
    category: "career",
    eyebrow: "Career roadmap",
    title: "Your roadmap from learner to working BA",
    highlight: "working BA",
    summary:
      "A phased plan that takes you from foundations to applications, with a clear output at the end of every phase so you always know what done looks like.",
    meta: [
      { label: "Phases", value: "5" },
      { label: "Pace", value: "Flexible" },
      { label: "Checkpoints", value: "Every phase" },
      { label: "End state", value: "Interview-ready" },
    ],
    overview: {
      heading: "A sequence, not a syllabus",
      paragraphs: [
        "Most learners stall because they keep studying without producing anything. The roadmap fixes the order: learn a technique, apply it to a practice case, keep the artifact, then move on.",
        "Each phase ends with a checkpoint you can verify yourself: an artifact completed, an assessment passed or a mock interview recorded. If you miss a checkpoint, you know exactly what to revisit.",
      ],
    },
    outcomes: [
      "Follow a clear order of learning that builds on itself",
      "Know what to produce at the end of each phase",
      "Track progress using concrete checkpoints rather than hours studied",
      "Start applying with a finished portfolio instead of a half-built one",
      "Adjust the pace to your schedule without losing the sequence",
    ],
    concepts: [
      {
        title: "Foundations first",
        description:
          "The BA role, the requirements lifecycle and stakeholder basics. Everything later depends on this vocabulary.",
        icon: "book-open",
      },
      {
        title: "Techniques in context",
        description:
          "Elicitation, process modelling, user stories and acceptance criteria practised on realistic scenarios.",
        icon: "wrench",
      },
      {
        title: "Tools and data",
        description:
          "Jira, Excel and SQL to the level a BA uses day to day: tracking work, analysing data and validating requirements.",
        icon: "database",
      },
      {
        title: "Evidence building",
        description:
          "Practice cases turned into portfolio pieces, with feedback on clarity and completeness.",
        icon: "folder-kanban",
      },
      {
        title: "Job search",
        description:
          "Resume, portfolio, interview rehearsal and targeted applications.",
        icon: "target",
      },
    ],
    steps: [
      {
        title: "Phase 1: Foundations",
        description:
          "Understand the BA role, the delivery lifecycle and core terminology. Checkpoint: foundations assessment.",
      },
      {
        title: "Phase 2: Core techniques",
        description:
          "Elicitation, process mapping, requirements writing, user stories and acceptance criteria. Checkpoint: a complete requirements pack for one practice case.",
      },
      {
        title: "Phase 3: Tools and data",
        description:
          "Jira workflows, Excel analysis and SQL queries for validation. Checkpoint: a data analysis task with written findings.",
      },
      {
        title: "Phase 4: Domain and portfolio",
        description:
          "Choose banking, retail or another domain and complete a domain case study. Checkpoint: three to five polished portfolio artifacts.",
      },
      {
        title: "Phase 5: Interview and apply",
        description:
          "Resume rewrite, STAR stories and mock interviews. Checkpoint: a recorded mock interview reviewed against the rubric.",
      },
    ],
    faqs: [
      {
        question: "Can I skip phases if I already have experience?",
        answer:
          "Yes. Take the checkpoint for a phase first. If you pass it comfortably, move on. The checkpoints exist so you do not repeat what you already know.",
      },
      {
        question: "What if I fall behind?",
        answer:
          "The roadmap is sequence-based, not date-based. Pick up from the last checkpoint you completed.",
      },
      {
        question: "When should I start applying?",
        answer:
          "Once you have a rewritten resume, at least three portfolio artifacts and you can answer core behavioural questions without notes. Applying earlier is fine, but you will convert fewer interviews.",
      },
    ],
    related: ["career", "curriculum", "portfolio", "skills"],
  },
  {
    slug: "resume",
    category: "career",
    eyebrow: "Career toolkit",
    title: "Write a BA resume that shows impact",
    highlight: "shows impact",
    summary:
      "Recruiters skim. Hiring managers probe. Your resume needs to pass both: clear role alignment at a glance, and outcome-focused bullets that hold up under questioning.",
    meta: [
      { label: "Focus", value: "Outcomes over duties" },
      { label: "Length", value: "1–2 pages" },
      { label: "Format", value: "ATS-friendly" },
      { label: "Includes", value: "Bullet examples" },
    ],
    overview: {
      heading: "Responsibilities describe the job. Outcomes describe you.",
      paragraphs: [
        "\"Gathered requirements from stakeholders\" is true of every BA. It tells the reader nothing. A strong bullet names the problem, what you did and what changed as a result, in one or two lines.",
        "Only use numbers you can defend in an interview. If you do not have a measured result, describe the concrete change instead: a process removed, a decision unblocked, a defect class prevented. An honest qualitative outcome beats an invented metric every time.",
      ],
    },
    outcomes: [
      "Structure a resume that passes applicant tracking systems and a ten-second skim",
      "Rewrite duty-based bullets as problem, action and outcome statements",
      "Translate non-BA experience into BA-relevant language without overstating it",
      "Tailor your summary and skills section to a specific role and domain",
      "Link your resume to portfolio artifacts that back up your claims",
    ],
    concepts: [
      {
        title: "Role-aligned summary",
        description:
          "Two or three lines stating the role you want, your domain and the type of problems you solve.",
        icon: "target",
      },
      {
        title: "Impact bullets",
        description:
          "Action verb, what you analysed or delivered, and the result. Real numbers where you have them, concrete change where you do not.",
        icon: "trending-up",
      },
      {
        title: "Keyword alignment",
        description:
          "Mirror the techniques and tools named in the job description, such as user stories, process mapping, SQL or Jira, where you genuinely have them.",
        icon: "search",
      },
      {
        title: "Evidence links",
        description:
          "A portfolio link turns a claim into something a hiring manager can open and check.",
        icon: "folder-kanban",
      },
    ],
    steps: [
      {
        title: "Collect raw material",
        description:
          "List every project, improvement and problem you worked on, including the ones that were not called analysis at the time.",
      },
      {
        title: "Pick the strongest stories",
        description:
          "Choose the items with the clearest problem and outcome. These become your bullets and your interview stories.",
      },
      {
        title: "Rewrite as impact bullets",
        description:
          "Use the pattern: verb, what, how, result. Replace vague duties with specific actions.",
      },
      {
        title: "Tailor per application",
        description:
          "Adjust the summary and order of bullets to match each job description's priorities.",
      },
    ],
    artifacts: [
      {
        name: "BA resume template",
        description: "A clean, single-column, ATS-friendly layout with section guidance.",
      },
      {
        name: "Bullet rewrite worksheet",
        description: "Turn duty statements into problem, action and outcome bullets.",
      },
      {
        name: "Job description mapping sheet",
        description: "Match each requirement in a posting to evidence on your resume.",
      },
    ],
    example: {
      title: "Strong BA resume bullets",
      language: "text",
      code: `WEAK
- Responsible for gathering requirements from stakeholders
- Wrote user stories in Jira
- Attended daily stand-ups

STRONG
- Led discovery workshops with operations, finance and IT to
  redesign the refund approval process, removing [x] manual
  hand-offs and cutting average approval time by [x]%
- Wrote and refined [x] user stories with Given/When/Then
  acceptance criteria, reducing requirement-related defects
  found in UAT across two releases
- Built a SQL-based reconciliation check that surfaced
  mismatched order statuses between OMS and finance, giving
  the business a daily exception report it previously lacked
- Mapped current-state and future-state onboarding processes
  in BPMN, which the steering group used to approve phase 1
  scope

[x] = replace with your own measured figure. If you do not
have one, keep the concrete change and drop the number.`,
      caption:
        "Placeholders are illustrative. Only include figures you can explain and defend in an interview.",
    },
    faqs: [
      {
        question: "Should I include numbers if I do not have exact figures?",
        answer:
          "Use a figure only if you can explain where it came from. A reasonable, sourced estimate is fine if you say so in the interview. Otherwise, describe the concrete change. Invented numbers tend to collapse under one follow-up question.",
      },
      {
        question: "How do I write a BA resume with no BA job title?",
        answer:
          "Lead with a summary that states your target role, then write bullets that highlight analysis work you have done: process improvements, requirement clarifications, data investigations. Add portfolio artifacts from practice cases to fill the gap.",
      },
      {
        question: "One page or two?",
        answer:
          "One page if you have under five years of relevant experience, two at most otherwise. Relevance matters more than length.",
      },
      {
        question: "Should I list every tool I have touched?",
        answer:
          "No. List the tools you could use on day one and discuss confidently. A short, honest skills list is more credible than a long one.",
      },
    ],
    related: ["portfolio", "interview-prep", "career", "templates"],
  },
  {
    slug: "portfolio",
    category: "career",
    eyebrow: "Career toolkit",
    title: "Build a BA portfolio interviewers can probe",
    highlight: "BA portfolio",
    summary:
      "A small set of well-made artifacts that show how you think: the problem, the analysis, the decisions and the trade-offs. Quality over volume.",
    meta: [
      { label: "Pieces", value: "3–5 artifacts" },
      { label: "Source", value: "Practice cases" },
      { label: "Format", value: "PDF or web link" },
      { label: "Reviewed", value: "Against a rubric" },
    ],
    overview: {
      heading: "Show the thinking, not just the template",
      paragraphs: [
        "A filled-in template proves you can follow a format. A portfolio piece proves you can analyse. Each artifact should open with context, state the problem and constraints, show the work, and close with the decisions you made and why.",
        "Since most learners cannot share real client work, your portfolio is built from practice cases. Label them clearly as practice work. Interviewers respect honesty and will happily discuss a well-reasoned practice case.",
      ],
    },
    outcomes: [
      "Select artifacts that cover elicitation, modelling, requirements and data",
      "Write a short case narrative that frames each artifact",
      "Present practice work honestly and confidently",
      "Use your portfolio as a structure for interview answers",
      "Publish a portfolio that is easy to share as a link or PDF",
    ],
    concepts: [
      {
        title: "Breadth of technique",
        description:
          "Aim for a mix: a process map, a requirements set or user stories with acceptance criteria, a data analysis and a stakeholder or scope artifact.",
        icon: "layers",
      },
      {
        title: "Case narrative",
        description:
          "Half a page of context per artifact: the business problem, the stakeholders, the constraints and what you were asked to deliver.",
        icon: "file-text",
      },
      {
        title: "Decisions and trade-offs",
        description:
          "Note what you chose not to do and why. This is what separates analysis from documentation.",
        icon: "git-branch",
      },
      {
        title: "Honest framing",
        description:
          "Label practice cases as practice. Never imply client work you did not do.",
        icon: "shield-check",
      },
    ],
    steps: [
      {
        title: "Complete two or three case studies",
        description: "Work them end to end so you have material to choose from.",
      },
      {
        title: "Select your strongest artifacts",
        description: "Pick pieces that show different techniques and a clear line of reasoning.",
      },
      {
        title: "Write the narrative",
        description: "Add context, problem, approach, decisions and what you would do next.",
      },
      {
        title: "Review and publish",
        description:
          "Check against the portfolio rubric, fix gaps, then publish as a PDF or simple web page.",
      },
    ],
    artifacts: [
      {
        name: "Current and future-state process map",
        description: "BPMN or swimlane diagrams with pain points and improvements annotated.",
      },
      {
        name: "User stories with acceptance criteria",
        description: "A prioritised backlog slice with Given/When/Then criteria and open questions.",
      },
      {
        name: "Requirements specification excerpt",
        description: "Functional and non-functional requirements with traceability to business goals.",
      },
      {
        name: "Data analysis summary",
        description: "SQL or Excel analysis with findings written for a business audience.",
      },
    ],
    faqs: [
      {
        question: "Can I include work from my current employer?",
        answer:
          "Only if it is fully anonymised and you have permission. When in doubt, recreate the technique on a practice case instead.",
      },
      {
        question: "How many pieces do I need?",
        answer:
          "Three to five strong pieces. More than that and reviewers stop reading.",
      },
      {
        question: "Do hiring managers actually look at portfolios?",
        answer:
          "Not all do, but those who do use them to steer the interview. Even when unopened, preparing one makes your interview answers sharper.",
      },
    ],
    related: ["case-studies", "deliverables", "resume", "templates"],
  },
  {
    slug: "interview-prep",
    category: "career",
    eyebrow: "Career toolkit",
    title: "Prepare for Business Analyst interviews",
    highlight: "Business Analyst interviews",
    summary:
      "Behavioural questions, scenario problems and requirements walkthroughs: rehearse the three conversations that decide most BA interviews.",
    meta: [
      { label: "Formats", value: "Behavioural, scenario, walkthrough" },
      { label: "Method", value: "STAR" },
      { label: "Practice", value: "Mock interviews" },
      { label: "Feedback", value: "Rubric-based" },
    ],
    overview: {
      heading: "Interviewers are testing how you think under ambiguity",
      paragraphs: [
        "BA interviews rarely test definitions. They test judgement: how you handle conflicting stakeholders, unclear scope, a missed requirement or a sponsor who wants everything. Your answers need structure, specifics and a clear outcome.",
        "Preparation means building a bank of six to eight stories you can adapt, practising scenario questions out loud, and being ready to walk an interviewer through a requirements artifact you produced.",
      ],
    },
    outcomes: [
      "Answer behavioural questions using a tight STAR structure",
      "Reason through scenario questions by clarifying, structuring and prioritising out loud",
      "Walk an interviewer through a requirements artifact and defend your decisions",
      "Ask questions that show you understand the role and the team",
      "Handle questions you cannot answer without losing credibility",
    ],
    concepts: [
      {
        title: "STAR answers",
        description:
          "Situation, Task, Action, Result. Keep situation and task brief; spend most of the time on what you did and what changed.",
        icon: "message-square",
      },
      {
        title: "Scenario questions",
        description:
          "\"A stakeholder says the requirement is wrong a week before go-live. What do you do?\" Clarify, assess impact, identify options, decide who decides.",
        icon: "puzzle",
      },
      {
        title: "Requirements walkthrough",
        description:
          "Present a user story, process map or spec from your portfolio. Explain the context, the choices and what you would change.",
        icon: "clipboard-list",
      },
      {
        title: "Story bank",
        description:
          "Six to eight stories covering conflict, ambiguity, a mistake, influence without authority, a data insight and a delivery under pressure.",
        icon: "list-checks",
      },
      {
        title: "Practical tasks",
        description:
          "Some interviews include a short exercise: write user stories for a feature, map a process or read a dataset. Practise these under time pressure.",
        icon: "wrench",
      },
    ],
    steps: [
      {
        title: "Build your story bank",
        description:
          "Write six to eight STAR stories from work, study or practice cases. Note the skill each one demonstrates.",
      },
      {
        title: "Practise scenario reasoning",
        description:
          "Answer scenario prompts out loud: restate the problem, ask clarifying questions, lay out options and recommend one.",
      },
      {
        title: "Prepare a walkthrough",
        description:
          "Pick one portfolio artifact and rehearse a five-minute explanation with likely follow-up questions.",
      },
      {
        title: "Run mock interviews",
        description:
          "Record a mock interview, review it against the rubric and tighten weak answers.",
      },
    ],
    example: {
      title: "A STAR-structured answer",
      language: "text",
      code: `Question: Tell me about a time stakeholders disagreed on a requirement.

SITUATION
On a practice case for an online retailer, the marketing lead
wanted guest checkout removed to grow account sign-ups. The
e-commerce manager wanted to keep it to protect conversion.

TASK
I needed to get to a decision both could accept before the
sprint planning session, without me deciding for them.

ACTION
- Met each stakeholder separately to understand the goal behind
  their position: marketing needed customer data for retention
  campaigns, e-commerce needed to avoid checkout drop-off.
- Pulled the funnel data and showed where users abandoned.
- Proposed an option that served both goals: keep guest
  checkout, and offer one-click account creation on the
  confirmation page using details already entered.
- Wrote the user story and acceptance criteria, and agreed a
  success measure with both leads before build.

RESULT
Both stakeholders signed off in one session. The story went into
the sprint, and we agreed to review sign-up and conversion data
after release rather than argue from opinion.

WHAT I LEARNED
Positions conflict more often than goals do. Separating the two
is usually where the solution is.`,
      caption:
        "Keep Situation and Task short. Spend most of your time on Action and a concrete Result.",
    },
    faqs: [
      {
        question: "How long should a STAR answer be?",
        answer:
          "Around two minutes. If the interviewer wants more detail, they will ask. Long answers usually mean too much situation and too little action.",
      },
      {
        question: "Can I use practice cases as interview stories?",
        answer:
          "Yes, if you say they are practice cases. Interviewers care about your reasoning. Pair them with real stories from your work history where you can.",
      },
      {
        question: "What if I do not know the answer to a technical question?",
        answer:
          "Say what you do know, explain how you would find out, and move on. Bluffing is easier to spot than you think.",
      },
      {
        question: "What questions should I ask at the end?",
        answer:
          "Ask how requirements flow from idea to delivery on the team, who the BA works most closely with, and what a strong first three months would look like.",
      },
    ],
    related: ["resume", "portfolio", "practice", "case-studies"],
  },
  {
    slug: "outcomes",
    category: "career",
    eyebrow: "Programme outcomes",
    title: "What you leave the programme with",
    highlight: "leave the programme with",
    summary:
      "Not just knowledge: a portfolio of artifacts, a certificate of completion and rehearsed interview answers you can use from the first application.",
    meta: [
      { label: "Portfolio", value: "3–5 artifacts" },
      { label: "Certificate", value: "On completion" },
      { label: "Interview prep", value: "Story bank + mocks" },
      { label: "Resume", value: "Rewritten" },
    ],
    overview: {
      heading: "Evidence you can show, not claims you have to make",
      paragraphs: [
        "Every part of the programme ends in something tangible. By the end, you have artifacts from practice cases, a resume rewritten around outcomes, a bank of interview stories and a certificate that records what you completed.",
        "We do not promise jobs or quote placement figures. What we can promise is that you will finish with the evidence and preparation hiring managers look for, and the ability to explain it in your own words.",
      ],
    },
    outcomes: [
      "A portfolio of three to five BA artifacts from realistic practice cases",
      "A certificate of completion listing the modules and assessments you passed",
      "A resume rewritten around impact, tailored to your target role and domain",
      "A bank of STAR stories and at least one reviewed mock interview",
      "Working familiarity with Jira, Excel and SQL at the level a BA uses them",
      "A clear plan for your next steps, whether that is applying, certifying or specialising",
    ],
    concepts: [
      {
        title: "Portfolio",
        description:
          "Process maps, user stories, requirements and data analysis, each with a short case narrative.",
        icon: "folder-kanban",
      },
      {
        title: "Certificate",
        description:
          "Issued when you complete the required modules and assessments. It records what you did, not just that you enrolled.",
        icon: "award",
      },
      {
        title: "Interview readiness",
        description:
          "A story bank, scenario practice and mock interviews reviewed against a rubric.",
        icon: "mic",
      },
      {
        title: "Practical tool skills",
        description:
          "Hands-on use of the tools BAs work in daily, applied to case data rather than toy examples.",
        icon: "wrench",
      },
    ],
    artifacts: [
      {
        name: "Portfolio pack",
        description: "Your selected artifacts with narratives, ready to share as a link or PDF.",
      },
      {
        name: "Certificate of completion",
        description: "Lists completed modules and assessments.",
      },
      {
        name: "Interview story bank",
        description: "Six to eight STAR stories mapped to common question themes.",
      },
      {
        name: "Tailored resume",
        description: "An outcome-focused resume aligned to your target role.",
      },
    ],
    faqs: [
      {
        question: "Do you guarantee a job?",
        answer:
          "No. Nobody honest can. We give you the skills, evidence and preparation that make you a stronger candidate. The job search itself depends on the market, your background and the effort you put in.",
      },
      {
        question: "Is the certificate an industry certification?",
        answer:
          "No. It is a certificate of completion for this programme. If you want an industry certification, the certification page explains the options and how the programme supports them.",
      },
      {
        question: "Can I use my portfolio after the programme ends?",
        answer:
          "Yes. The artifacts are yours to keep, share and keep improving.",
      },
    ],
    related: ["portfolio", "certification", "interview-prep", "program"],
  },
  {
    slug: "case-studies",
    category: "resources",
    eyebrow: "Practice cases",
    title: "Case studies to practise real BA work",
    highlight: "Case studies",
    summary:
      "Realistic practice cases with a brief, stakeholders, constraints and messy information, so you can apply BA techniques end to end. These are training scenarios, not client engagements.",
    meta: [
      { label: "Cases", value: "4 core scenarios" },
      { label: "Type", value: "Practice, not client work" },
      { label: "Domains", value: "Retail, CRM, field ops, lending" },
      { label: "Output", value: "Portfolio artifacts" },
    ],
    overview: {
      heading: "Practice on problems that look like the job",
      paragraphs: [
        "Each case gives you a business brief, stakeholder personas, sample data and deliberate gaps. Requirements conflict, information is incomplete and scope is under pressure, just as it is on real projects.",
        "You work through discovery, analysis, requirements and validation, producing artifacts as you go. The finished work becomes your portfolio, clearly labelled as practice.",
      ],
    },
    outcomes: [
      "Run discovery on an unfamiliar problem with incomplete information",
      "Produce a connected set of artifacts from one case, from scope to acceptance criteria",
      "Make and justify prioritisation and scope decisions",
      "Analyse case data to support or challenge a stakeholder assumption",
      "Present your case work confidently in an interview",
    ],
    concepts: [
      {
        title: "Checkout optimisation",
        description:
          "An online retailer sees high cart abandonment. Analyse the funnel, map the checkout journey, identify friction and write prioritised user stories for improvement.",
        icon: "shopping-cart",
      },
      {
        title: "CRM migration",
        description:
          "A services firm is moving from spreadsheets and a legacy CRM to a new platform. Define data mapping, migration rules, process changes and cut-over requirements.",
        icon: "database",
      },
      {
        title: "Field-worker app MVP",
        description:
          "Engineers record site visits on paper. Define the MVP scope for a mobile app, including offline working, photo capture and job sync, and decide what waits for later releases.",
        icon: "layers",
      },
      {
        title: "Loan origination",
        description:
          "A lender wants to digitise personal loan applications. Map the origination process, define eligibility and KYC checks, and specify decisioning and exception handling.",
        icon: "building",
      },
    ],
    steps: [
      {
        title: "Read the brief and stakeholder map",
        description: "Identify the business goal, who cares about it and what is unclear.",
      },
      {
        title: "Run discovery",
        description:
          "Use the stakeholder personas and documents to elicit needs and list open questions and assumptions.",
      },
      {
        title: "Model and analyse",
        description: "Map current and future-state processes and analyse the sample data provided.",
      },
      {
        title: "Specify and prioritise",
        description:
          "Write requirements or user stories with acceptance criteria and agree a scope for the first release.",
      },
      {
        title: "Review and reflect",
        description: "Compare against the model answer and rubric, then refine your strongest artifacts.",
      },
    ],
    artifacts: [
      {
        name: "Case brief and stakeholder personas",
        description: "The starting pack for each scenario.",
      },
      {
        name: "Sample datasets",
        description: "Realistic, synthetic data for analysis and validation exercises.",
      },
      {
        name: "Model answers and rubric",
        description: "A reference solution and a rubric to assess your own work.",
      },
    ],
    faqs: [
      {
        question: "Are these real client projects?",
        answer:
          "No. They are training scenarios designed to reflect common BA situations. Present them as practice cases in your portfolio and interviews.",
      },
      {
        question: "Is there one correct answer?",
        answer:
          "Rarely. The model answers show one sound approach. What matters is that your decisions are reasoned and traceable to the brief.",
      },
      {
        question: "Which case should I start with?",
        answer:
          "Checkout optimisation is the most approachable. Loan origination is the most demanding because of regulatory and decisioning detail.",
      },
    ],
    related: ["portfolio", "projects", "retail", "banking"],
  },
  {
    slug: "banking",
    category: "resources",
    eyebrow: "Domain guide",
    title: "Business analysis in banking and financial services",
    highlight: "banking and financial services",
    summary:
      "Banking BAs work where regulation, legacy systems and customer experience meet. Learn the domains, vocabulary and requirement patterns that come up most.",
    meta: [
      { label: "Domain", value: "Banking & finance" },
      { label: "Focus", value: "Regulated change" },
      { label: "Areas", value: "5 core domains" },
      { label: "Level", value: "Intermediate" },
    ],
    overview: {
      heading: "Precision matters because the rules are not optional",
      paragraphs: [
        "In banking, a vague requirement is not just a delivery risk; it can become a compliance finding. BAs here spend more time on rules, data lineage, controls and audit trails than in most industries.",
        "You do not need to be a banker to start. You need enough domain vocabulary to ask good questions, and the discipline to trace every requirement back to a policy, regulation or business rule.",
      ],
    },
    outcomes: [
      "Explain the main banking domains and how they connect",
      "Use core vocabulary confidently in stakeholder conversations",
      "Write requirements that trace to policies and regulatory obligations",
      "Identify control, audit and data lineage needs early",
      "Recognise common integration points between core banking and surrounding systems",
    ],
    concepts: [
      {
        title: "Payments",
        description:
          "Card, account-to-account and cross-border payments. Expect requirements around payment message formats, cut-off times, status tracking, exceptions and reconciliation.",
        icon: "trending-up",
      },
      {
        title: "Lending",
        description:
          "Origination, credit decisioning, servicing and collections. Requirements centre on eligibility rules, affordability checks, documentation and exception routing.",
        icon: "briefcase",
      },
      {
        title: "KYC and AML",
        description:
          "Customer due diligence, screening, risk rating and transaction monitoring. Requirements must be explicit, auditable and aligned to the institution's risk policy.",
        icon: "shield-check",
      },
      {
        title: "Core banking",
        description:
          "Accounts, ledgers, products and interest. Change here is high-risk, so BAs focus on impact analysis, data migration and integration with channel systems.",
        icon: "database",
      },
      {
        title: "Regulatory reporting",
        description:
          "Producing accurate reports for regulators. BAs define data sources, transformation rules, lineage and reconciliation so figures can be explained and defended.",
        icon: "file-text",
      },
    ],
    terms: [
      { term: "KYC", definition: "Know Your Customer: verifying identity and understanding the customer's risk profile." },
      { term: "AML", definition: "Anti-Money Laundering: controls to detect and report suspicious activity." },
      { term: "CDD / EDD", definition: "Customer Due Diligence and Enhanced Due Diligence for higher-risk customers." },
      { term: "Reconciliation", definition: "Matching records between systems to confirm they agree and investigating breaks." },
      { term: "Data lineage", definition: "The traceable path of a data item from its source to a report or decision." },
    ],
    example: {
      title: "Acceptance criteria for a KYC rule",
      language: "gherkin",
      code: `Feature: Customer risk rating at onboarding

  Scenario: Customer flagged by sanctions screening
    Given a new customer has completed identity verification
    And sanctions screening returns a potential match
    When the onboarding application is submitted
    Then the application status is set to "Pending review"
    And a case is created in the compliance queue
    And the account is not opened until the case is resolved
    And the screening result and reviewer decision are logged for audit`,
      caption: "Every outcome is observable and auditable, which is what compliance stakeholders will check.",
    },
    faqs: [
      {
        question: "Do I need a finance background to be a banking BA?",
        answer:
          "It helps but is not required. Many banking BAs learn the domain on the job. Showing you understand the vocabulary and the importance of controls goes a long way in interviews.",
      },
      {
        question: "Which banking area is easiest to enter?",
        answer:
          "Digital channels and payments projects often have more entry-level BA roles. Regulatory reporting and risk usually expect stronger data skills.",
      },
      {
        question: "How important is SQL in banking BA roles?",
        answer:
          "Very, especially in data, reporting and migration work. You will often need to validate data yourself rather than wait for someone else.",
      },
    ],
    related: ["case-studies", "sql", "requirements-engineering", "retail"],
  },
  {
    slug: "retail",
    category: "resources",
    eyebrow: "Domain guide",
    title: "Business analysis in retail and e-commerce",
    highlight: "retail and e-commerce",
    summary:
      "Retail moves fast and measures everything. Learn the domains, customer journeys and data that retail BAs work with, from checkout to stock to loyalty.",
    meta: [
      { label: "Domain", value: "Retail & e-commerce" },
      { label: "Focus", value: "Customer journeys" },
      { label: "Areas", value: "4 core domains" },
      { label: "Level", value: "Beginner–intermediate" },
    ],
    overview: {
      heading: "Small changes, measurable results, constant iteration",
      paragraphs: [
        "Retail BAs work close to the customer and close to the numbers. A change to checkout, delivery options or promotions shows up in conversion, basket size or returns, so requirements need clear success measures from the start.",
        "Behind the storefront sit order management, inventory, pricing and loyalty systems that must agree with each other. Much of the BA work is making sure a change in one channel does not break another.",
      ],
    },
    outcomes: [
      "Map an end-to-end retail customer journey across channels",
      "Write user stories for checkout, delivery and returns with measurable acceptance criteria",
      "Explain how order management and inventory data flow between systems",
      "Define requirements for loyalty and promotions without creating conflicting rules",
      "Use funnel and order data to prioritise improvements",
    ],
    concepts: [
      {
        title: "E-commerce checkout",
        description:
          "Basket, delivery options, payment and confirmation. Requirements focus on reducing friction, handling payment failures and validating addresses and promotions.",
        icon: "shopping-cart",
      },
      {
        title: "Inventory and OMS",
        description:
          "Stock visibility, order routing, split shipments and cancellations. BAs define status models, sync rules and exception handling across warehouse and store.",
        icon: "database",
      },
      {
        title: "Loyalty and promotions",
        description:
          "Points, tiers, vouchers and personalised offers. Requirements must define eligibility, stacking rules and edge cases like returns on discounted orders.",
        icon: "award",
      },
      {
        title: "Omnichannel",
        description:
          "Click and collect, ship from store, returns in any channel. BAs make sure customer, order and stock data stay consistent wherever the customer interacts.",
        icon: "workflow",
      },
    ],
    terms: [
      { term: "OMS", definition: "Order Management System: orchestrates orders from capture to fulfilment and returns." },
      { term: "Conversion rate", definition: "The share of sessions or visitors who complete a purchase." },
      { term: "BOPIS", definition: "Buy Online, Pick up In Store, often called click and collect." },
      { term: "AOV", definition: "Average Order Value: total revenue divided by number of orders." },
      { term: "SKU", definition: "Stock Keeping Unit: a unique identifier for a sellable product variant." },
    ],
    example: {
      title: "User story for click and collect",
      language: "gherkin",
      code: `Feature: Click and collect availability

  Scenario: Item in stock at the selected store
    Given a customer has an item in their basket
    And the selected store has available stock for that item
    When the customer chooses click and collect
    Then the store is shown as available for collection
    And the estimated ready time is displayed

  Scenario: Item out of stock at the selected store
    Given the selected store has no available stock for the item
    When the customer chooses click and collect
    Then the store is shown as unavailable
    And up to three nearby stores with stock are suggested`,
      caption: "Stock rules come from the OMS, so confirm the definition of \"available stock\" with the inventory team.",
    },
    faqs: [
      {
        question: "What makes retail BA work different from other industries?",
        answer:
          "Speed and measurement. Changes ship often and are judged on customer metrics, so BAs need to define success measures and work comfortably with funnel and order data.",
      },
      {
        question: "Do retail BAs need to understand warehousing?",
        answer:
          "At a process level, yes. You do not need to run a warehouse, but you need to know how stock moves and how order statuses change so your requirements are realistic.",
      },
      {
        question: "Is there a practice case for retail?",
        answer:
          "Yes. The checkout optimisation case study is built on a retail scenario and is a good first portfolio piece.",
      },
    ],
    related: ["case-studies", "data-analysis", "process-analysis", "banking"],
  },
];
