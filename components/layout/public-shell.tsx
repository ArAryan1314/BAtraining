import { PublicHeader } from "./public/PublicHeader";
import { SiteFooter } from "./site-footer";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
