import { BarChart3, Bell, BookOpen, ClipboardCheck, FileCog, FolderKanban, GraduationCap, LayoutDashboard, Settings, Users, type LucideIcon } from "lucide-react";
import type { UserRole } from "@/types/user";

export interface NavItem {
  label: string;
  href: string;
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
      { label: "Assessments", href: "/student/assessments", icon: ClipboardCheck },
      { label: "Projects", href: "/student/projects", icon: FolderKanban },
      { label: "Certificates", href: "/student/certificates", icon: GraduationCap },
      { label: "Notifications", href: "/student/notifications", icon: Bell },
      { label: "Account", href: "/student/account", icon: Settings },
    ],
  },
  TRAINER: {
    label: "Trainer",
    home: "/trainer/dashboard",
    navigation: [
      { label: "Overview", href: "/trainer/dashboard", icon: LayoutDashboard },
      { label: "Cohorts", href: "/trainer/cohorts", icon: Users },
      { label: "Assessments", href: "/trainer/assessments", icon: ClipboardCheck },
      { label: "Projects", href: "/trainer/projects", icon: FolderKanban },
      { label: "Reports", href: "/trainer/reports", icon: BarChart3 },
      { label: "Account", href: "/trainer/account", icon: Settings },
    ],
  },
  ADMIN: {
    label: "Admin",
    home: "/admin/dashboard",
    navigation: [
      { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Courses", href: "/admin/courses", icon: BookOpen },
      { label: "Assessments", href: "/admin/assessments", icon: ClipboardCheck },
      { label: "Content", href: "/admin/content", icon: FileCog },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
};
