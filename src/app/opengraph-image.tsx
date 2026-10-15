// Site-wide social card, rendered at build time by Satori (next/og).
// Flexbox only, and any node with more than one child needs display: "flex".
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Applause Reality — bank-approved Delhi NCR property, from first visit to possession.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Inline the logo: Satori can't fetch paths or URLs.
  const logo = await readFile(join(process.cwd(), "public/images/logo-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 90px",
          background: "#050c1f",
          backgroundImage: "radial-gradient(900px 520px at 85% 0%, rgba(36,69,160,0.55), transparent 65%)",
        }}
      >
        <img src={logoSrc} width={460} height={131} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#f7f4ee",
            }}
          >
            Bank-approved Delhi NCR property, from first visit to possession.
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 28, color: "#8ea6e8", letterSpacing: "0.04em" }}>
            applausereality.com · Noida · Greater Noida · Ghaziabad
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
