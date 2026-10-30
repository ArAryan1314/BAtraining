"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, IconButton } from "@/components/ui";
import { workspaces, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import type { UserRole } from "@/types/user";

function WorkspaceNavItem({ item: { label, href, icon: Icon }, active }: { item: NavItem; active: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn("app-sidebar-nav-item", active ? "app-sidebar-nav-item-active" : "app-sidebar-nav-item-inactive")}>
      <Icon size={17} />
      {label}
    </Link>
  );
}

export function AppShell({ children, role, userName }: { children: React.ReactNode; role: UserRole; userName: string }) {
  const pathname = usePathname();
  const { label: roleLabel, navigation } = workspaces[role];
  const navItems = navigation.map((item) => <WorkspaceNavItem key={item.label} item={item} active={pathname === item.href || pathname.startsWith(`${item.href}/`)} />);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar-logo-container">
          <div className="app-sidebar-logo">BA</div>
          <div>
            <div className="font-semibold">{siteConfig.name}</div>
            <div className="text-xs text-ink-500">{roleLabel} workspace</div>
          </div>
        </div>
        <nav aria-label="Workspace" className="app-sidebar-nav">{navItems}</nav>
      </aside>
      <main className="app-main">
        <header className="app-header">
          <div className="font-semibold lg:hidden">{siteConfig.name}</div>
          <div className="hidden text-sm text-ink-500 sm:block">{roleLabel} workspace</div>
          <div className="flex items-center gap-3">
            <Avatar name={userName} />
            <IconButton label="Sign out" onClick={() => signOut({ callbackUrl: "/auth/login" })}>
              <LogOut size={17} />
            </IconButton>
          </div>
        </header>
        <nav aria-label="Workspace" className="app-mobile-nav">{navItems}</nav>
        <div className="app-content">{children}</div>
      </main>
    </div>
  );
}
