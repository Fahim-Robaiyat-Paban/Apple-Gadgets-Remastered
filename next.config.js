const isDev = process.env.NODE_ENV !== "production";

// Baseline CSP. 'unsafe-inline' on scripts is a compromise because Next inlines its
// bootstrap scripts; move to a nonce-based CSP for the stricter setup.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://adminapi.applegadgetsbd.com https://picsum.photos https://fastly.picsum.photos",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminapi.applegadgetsbd.com",
        pathname: "/storage/media/**",
      },
      // Dummy placeholder photos for products with no real image yet (see
      // server/src/seed/data/products.json). Swap these out for real photos
      // whenever you have them — no code change needed, just re-seed.
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
