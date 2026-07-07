import { ImageResponse } from "next/og";

export const alt = "Umculo — Artist Websites for South Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "12px",
              backgroundColor: "#fec804",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: 900,
              color: "#000000",
            }}
          >
            U
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "0.08em",
            }}
          >
            UMCULO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: "uppercase",
              maxWidth: "900px",
            }}
          >
            Professional Artist Websites for South Africa
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "28px",
              color: "#fec804",
              fontWeight: 700,
            }}
          >
            Custom design · SEO · Hosting from R99/month
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          umculo.app · Powered by Qwabi Engineering
        </div>
      </div>
    ),
    { ...size },
  );
}
