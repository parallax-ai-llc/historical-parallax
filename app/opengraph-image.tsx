import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Historical Parallax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Historical Parallax
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#888",
          }}
        >
          Explore historical figures from multiple perspectives
        </div>
      </div>
    ),
    { ...size }
  );
}
