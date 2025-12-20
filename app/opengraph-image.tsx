import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Historical Parallax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Cormorant Garamond 폰트 로드
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff"
  ).then((res) => res.arrayBuffer());

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
      </div>
    ),
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
