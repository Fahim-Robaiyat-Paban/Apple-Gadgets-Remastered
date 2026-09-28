import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/api/products";

export const alt = "Apple Gadgets category";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse renders with inline styles only; Tailwind classes aren't available here.
const OpengraphImage = async ({ params }) => {
  const { slug } = await params;
  const category = await getCategory(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#f3f4f7",
          color: "#0f1222",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>Apple Gadgets</div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800 }}>
          {category?.name ?? "Apple Gadgets"}
        </div>
        <div style={{ display: "flex", width: 160, height: 16, background: "#ffd60a" }} />
      </div>
    ),
    { ...size },
  );
};

export default OpengraphImage;
