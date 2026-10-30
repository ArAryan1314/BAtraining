import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Compass,
  Database,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  GitBranch,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutTemplate,
  Library,
  ListChecks,
  Mail,
  MessagesSquare,
  Mic,
  Presentation,
  Route,
  Settings2,
  ShoppingCart,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface NavGroup {
  id: string;
  label: string;
  links: NavLink[];
  featured: { eyebrow: string; title: string; description: string; href: string; cta: string };
}

export const programLinks: NavLink[] = [
  { href: "/program", label: "Program overview", description: "The complete 13-week BA journey", icon: Sparkles },
  { href: "/curriculum", label: "Curriculum", description: "Six modules, foundations to capstone", icon: Compass },
  { href: "/skills", label: "Skills", description: "What hiring managers test for", icon: Target },
  { href: "/practice", label: "Practice scenarios", description: "Realistic simulated projects", icon: Presentation },
  { href: "/projects", label: "Projects", description: "Build portfolio-grade evidence", icon: FolderKanban },
  { href: "/assessments", label: "Assessments", description: "Readiness, not just completion", icon: ClipboardCheck },
  { href: "/certification", label: "Certification", description: "A verifiable credential", icon: Award },
  { href: "/how-it-works", label: "How it works", description: "Learn, practise, prove", icon: Settings2 },
];

export const trackLinks: NavLink[] = [
  { href: "/ba-foundations", label: "BA Foundations", description: "Role, SDLC and business value", icon: BookOpen },
  { href: "/business-analysis", label: "Business Analysis", description: "The discipline end to end", icon: BriefcaseBusiness },
  { href: "/requirements-engineering", label: "Requirements", description: "Elicit, specify, validate", icon: FileText },
  { href: "/agile-ba", label: "Agile BA", description: "Stories, backlogs, Scrum", icon: GitBranch },
  { href: "/process-analysis", label: "Process Analysis", description: "BPMN, as-is and to-be", icon: Workflow },
  { href: "/data-analysis", label: "Data Analysis", description: "SQL, metrics and insight", icon: BarChart3 },
  { href: "/stakeholder-management", label: "Stakeholders", description: "Influence and alignment", icon: Users },
  { href: "/ba-techniques", label: "BA Techniques", description: "The practitioner's toolkit", icon: Wrench },
  { href: "/knowledge-areas", label: "Knowledge Areas", description: "BABOK-aligned coverage", icon: Layers },
  { href: "/roles", label: "BA Roles", description: "Where BAs work and how", icon: Briefcase },
];

export const careerLinks: NavLink[] = [
  { href: "/career", label: "Career guide", description: "Breaking into business analysis", icon: Briefcase },
  { href: "/roadmap", label: "Learning roadmap", description: "Step-by-step path", icon: Route },
  { href: "/resume", label: "Resume", description: "Write a BA resume that lands", icon: FileText },
  { href: "/portfolio", label: "Portfolio", description: "Showcase real deliverables", icon: FolderKanban },
  { href: "/interview-prep", label: "Interview prep", description: "Scenarios, STAR and walkthroughs", icon: Mic },
  { href: "/outcomes", label: "Outcomes", description: "What you leave with", icon: GraduationCap },
];

export const resourceLinks: NavLink[] = [
  { href: "/resources", label: "Resource library", description: "Everything in one place", icon: Library },
  { href: "/templates", label: "Templates", description: "BRD, RTM, UAT and more", icon: LayoutTemplate },
  { href: "/deliverables", label: "Deliverables", description: "Annotated example artifacts", icon: FileText },
  { href: "/checklists", label: "Checklists", description: "Sign-off ready, every time", icon: ListChecks },
  { href: "/tools", label: "BA tools", description: "The modern BA stack", icon: Wrench },
  { href: "/jira", label: "Jira for BAs", description: "Boards, JQL, workflows", icon: Settings2 },
  { href: "/sql", label: "SQL for BAs", description: "Query and validate data", icon: Database },
  { href: "/excel", label: "Excel for BAs", description: "Pivots, lookups, Power Query", icon: FileSpreadsheet },
  { href: "/glossary", label: "Glossary", description: "BA terms, defined", icon: BookOpen },
  { href: "/case-studies", label: "Case studies", description: "Practice cases, end to end", icon: Briefcase },
  { href: "/banking", label: "Banking domain", description: "Payments, lending, KYC", icon: Building2 },
  { href: "/retail", label: "Retail domain", description: "Checkout, OMS, loyalty", icon: ShoppingCart },
];

export const companyLinks: NavLink[] = [
  { href: "/about", label: "About", description: "Why we built BA Upskill", icon: Users },
  { href: "/faq", label: "FAQ", description: "Common questions", icon: HelpCircle },
  { href: "/contact", label: "Contact", description: "Talk to an advisor", icon: Mail },
  { href: "/how-it-works", label: "How it works", description: "The learning model", icon: MessagesSquare },
];

export const navGroups: NavGroup[] = [
  {
    id: "program",
    label: "Program",
    links: programLinks,
    featured: {
      eyebrow: "Next cohort",
      title: "Become a job-ready BA in 13 weeks",
      description: "Mentor-reviewed projects, a real portfolio and a verifiable certificate.",
      href: "/program",
      cta: "Explore the program",
    },
  },
  {
    id: "tracks",
    label: "Tracks",
    links: trackLinks,
    featured: {
      eyebrow: "Start here",
      title: "New to business analysis?",
      description: "BA Foundations covers the role, the SDLC and how BAs create value.",
      href: "/ba-foundations",
      cta: "Begin with foundations",
    },
  },
  {
    id: "career",
    label: "Career",
    links: careerLinks,
    featured: {
      eyebrow: "Interview ready",
      title: "Walk into interviews with evidence",
      description: "Practise scenario questions and present your portfolio like a working BA.",
      href: "/interview-prep",
      cta: "Prepare for interviews",
    },
  },
  {
    id: "resources",
    label: "Resources",
    links: resourceLinks,
    featured: {
      eyebrow: "Free library",
      title: "Templates working BAs actually use",
      description: "BRDs, RTMs, UAT plans and checklists you can adapt today.",
      href: "/templates",
      cta: "Browse templates",
    },
  },
];
