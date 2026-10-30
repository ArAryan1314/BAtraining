import { BarChart3, BookOpen, ClipboardCheck, FileCog, FolderKanban, GraduationCap, LayoutDashboard, Settings, Users, type LucideIcon } from "lucide-react";
import type { UserRole } from "@/types/user";

/** An item without an `href` has no route yet and is shown as "Soon". */
export interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
}

export interface Workspace {
  label: string;
  home: string;
  navigation: NavItem[];
}

export const workspaces: Record<UserRole, Workspace> = {
  STUDENT: {
    label: "Student",
    home: "/student/dashboard",
    navigation: [
      { label: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
      { label: "My Learning", href: "/student/courses", icon: BookOpen },
      { label: "Assessments", icon: ClipboardCheck },
      { label: "Projects", icon: FolderKanban },
      { label: "Certificates", icon: GraduationCap },
    ],
  },
  TRAINER: {
    label: "Trainer",
    home: "/trainer/dashboard",
    navigation: [
      { label: "Overview", href: "/trainer/dashboard", icon: LayoutDashboard },
      { label: "Cohorts", icon: Users },
      { label: "Assessments", icon: ClipboardCheck },
      { label: "Projects", icon: FolderKanban },
      { label: "Reports", icon: BarChart3 },
    ],
  },
  ADMIN: {
    label: "Admin",
    home: "/admin/dashboard",
    navigation: [
      { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Courses", href: "/admin/courses", icon: BookOpen },
      { label: "Assessments", icon: ClipboardCheck },
      { label: "Content", icon: FileCog },
      { label: "Reports", icon: BarChart3 },
      { label: "Settings", icon: Settings },
    ],
  },
};
