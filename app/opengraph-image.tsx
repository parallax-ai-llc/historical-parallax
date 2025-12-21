import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Historical Parallax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Cormorant Garamond 폰트 로드 (Google Fonts CSS에서 woff2 URL 추출)
  const fontCss = await fetch(
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }
  ).then((res) => res.text());

  const fontUrl = fontCss.match(/src: url\(([^)]+)\)/)?.[1];
  const fontData = await fetch(fontUrl!).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        fontFamily: "Cormorant Garamond",
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
        Every history creates a parallax
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
