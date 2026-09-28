import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// ImageResponse renders with inline styles only; Tailwind classes aren't available here.
const AppleIcon = () =>
  new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#ffd60a",
        }}
      >
        <div style={{ display: "flex", width: 56, height: 56, borderRadius: 28, background: "#0f1222" }} />
      </div>
    ),
    { ...size },
  );

export default AppleIcon;
