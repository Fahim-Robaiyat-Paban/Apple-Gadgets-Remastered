import { SITE_URL } from "@/lib/utils/site";

const robots = () => ({
  rules: { userAgent: "*", allow: "/", disallow: ["/cart"] },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
