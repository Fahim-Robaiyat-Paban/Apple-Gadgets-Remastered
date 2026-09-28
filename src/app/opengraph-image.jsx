import { ImageResponse } from "next/og";

export const alt = "Apple Gadgets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse renders with inline styles only; Tailwind classes aren't available here.
const OpengraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#f3f4f7",
          color: "#0f1222",
        }}
      >
        <div style={{ display: "flex", width: 160, height: 16, background: "#ffd60a" }} />
        <div style={{ display: "flex", marginTop: 32, fontSize: 104, fontWeight: 800 }}>
          Apple Gadgets
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 40 }}>
          Genuine gadgets, up to 36 months EMI.
        </div>
      </div>
    ),
    { ...size },
  );

export default OpengraphImage;
