import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/api/products";

export const alt = "Apple Gadgets product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse renders with inline styles only, and its default font has no "৳" glyph,
// so the price is written as "BDT" here.
const OpengraphImage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProduct(slug);

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 40 }}>{product?.brand ?? ""}</div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 80, fontWeight: 800 }}>
            {product?.name ?? "Apple Gadgets"}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              background: "#ffd60a",
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            {product ? `BDT ${product.price.toLocaleString("en-US")}` : ""}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OpengraphImage;
