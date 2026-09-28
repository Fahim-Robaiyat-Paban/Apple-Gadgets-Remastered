import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/layout/MotionProvider";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import StoreHydrator from "@/components/layout/StoreHydrator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/utils/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Apple Gadgets is one of the biggest tech retail chains in Bangladesh. Shop the latest gadgets, devices, and smart electronics and get fast delivery.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Smartphones, Gadgets & Premium Accessories | Apple Gadgets",
    template: "%s | Apple Gadgets",
  },
  description,
  openGraph: {
    title: "Smartphones, Gadgets & Premium Accessories | Apple Gadgets",
    description,
    type: "website",
    locale: "en_US",
    siteName: "Apple Gadgets",
  },
  twitter: { card: "summary_large_image" },
};

const RootLayout = ({ children }) => (
  <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
    <body className="bg-paper font-sans text-ink antialiased">
      <MotionProvider>
        <SmoothScrollProvider>
          <StoreHydrator />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </MotionProvider>
    </body>
  </html>
);

export default RootLayout;
