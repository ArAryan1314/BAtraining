import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
/** 1200x630 is the 1.91:1 ratio used by Open Graph and X large cards. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: 80, background: "linear-gradient(135deg, #090b11 0%, #1e1b4b 100%)", color: "white" }}>
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#a5b4fc" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.tagline}</div>
        <div style={{ fontSize: 32, color: "#cbd5e1" }}>Mentor-led, project-based Business Analyst training.</div>
      </div>
    ),
    size,
  );
}
