import { ImageResponse } from "next/og";
import { person } from "@/data/content";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f2f52",
          color: "#ffffff",
          fontSize: 76,
          letterSpacing: 2,
          fontFamily: "sans-serif",
        }}
      >
        {person.initials}
      </div>
    ),
    size,
  );
}
