import { categories } from "@/lib/data/categories";
import { getProducts } from "@/lib/api/products";
import { SITE_URL } from "@/lib/utils/site";

const sitemap = async () => {
  const products = await getProducts();

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/category/all` },
    ...categories.map((category) => ({ url: `${SITE_URL}/category/${category.slug}` })),
    ...products.map((product) => ({ url: `${SITE_URL}/product/${product.slug}` })),
  ];
};

export default sitemap;
