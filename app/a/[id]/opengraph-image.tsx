import { ImageResponse } from "next/og";
import { getArticle, getAllArticleIds } from "@/lib/articles";

export const alt = "Historical Parallax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ISR: Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({ id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);

  // Inter 폰트 로드 (더 안정적인 URL 사용)
  const fontData = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZs.woff2")
  ).then((res) => res.arrayBuffer());

  const name = article?.meta.name || "Historical Figure";
  const nationality = article?.meta.nationality || "";
  const birth = article?.meta.birth || "";
  const death = article?.meta.death || "";
  const lifespan = birth ? `${birth}${death ? ` – ${death}` : " – Present"}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "60px 80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div style={{ fontSize: "28px", color: "#666", letterSpacing: "0.1em" }}>
            HISTORICAL PARALLAX
          </div>
          {nationality && (
            <div
              style={{
                fontSize: "24px",
                color: "#888",
                padding: "8px 20px",
                border: "1px solid #333",
                borderRadius: "8px",
              }}
            >
              {nationality}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            {name}
          </div>
          {lifespan && (
            <div style={{ fontSize: "32px", color: "#888" }}>
              {lifespan}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "40px",
            borderTop: "1px solid #222",
          }}
        >
          <div style={{ fontSize: "20px", color: "#555" }}>
            Multiple Perspectives on History
          </div>
          <div style={{ fontSize: "20px", color: "#555" }}>
            historical.parallax.kr
          </div>
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
