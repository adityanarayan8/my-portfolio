import { ImageResponse } from "next/og";
import { person } from "@/data/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name}, ${person.positioning}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0b1526",
          backgroundImage:
            "radial-gradient(900px 600px at 10% 0%, #2e5694 0%, transparent 60%)," +
            "radial-gradient(800px 600px at 95% 10%, #1c3e70 0%, transparent 58%)",
          color: "#eef3fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#4ade80",
          }}
        >
          {person.discipline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 132, lineHeight: 1 }}>
            {person.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#aab8ce" }}>
            {person.motto}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            color: "#97a7c0",
          }}
        >
          {person.positioning}
        </div>
      </div>
    ),
    size,
  );
}
