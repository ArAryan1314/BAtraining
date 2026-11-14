import { changelog } from "@/content/changelog";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = changelog.map((release) => `
    <item>
      <title>${escapeXml(`v${release.version}: ${release.title}`)}</title>
      <link>${absoluteUrl(`/changelog#v${release.version}`)}</link>
      <guid isPermaLink="false">${siteConfig.name}-v${release.version}</guid>
      <pubDate>${new Date(release.date).toUTCString()}</pubDate>
      <description>${escapeXml(release.summary)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${escapeXml(siteConfig.name)} changelog</title>
  <link>${absoluteUrl("/changelog")}</link>
  <description>Release notes for the ${escapeXml(siteConfig.name)} platform.</description>${items}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
