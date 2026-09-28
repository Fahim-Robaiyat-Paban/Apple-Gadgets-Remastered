import Image from "next/image";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { getCategoryIcon } from "@/lib/data/categories";
import { getCategoryTone } from "@/lib/data/tones";

// Uses next/image when the product has an `image` URL (host must be allowed in next.config.js
// `images.remotePatterns`). Until then it falls back to a category glyph tile.
const ProductImage = ({ product, priority = false }) => (
  <div
    className={`relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] bg-linear-to-br ${
      getCategoryTone(product.category).well
    }`}
  >
    {product.image ? (
      <Image
        src={product.image}
        alt={product.name}
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-contain p-6"
      />
    ) : (
      <CategoryIcon
        name={getCategoryIcon(product.category)}
        className="size-1/3 text-ink/25"
        strokeWidth={1}
      />
    )}
    {product.preorder && (
      <p className="absolute left-0 top-4 rounded-r-full bg-linear-to-r from-brand to-deep py-1 pl-3 pr-3 font-mono text-xs font-medium text-white">
        Pre-order
      </p>
    )}
    <p className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-0.5 font-mono text-xs text-ink/80">
      {product.brand}
    </p>
  </div>
);

export default ProductImage;
