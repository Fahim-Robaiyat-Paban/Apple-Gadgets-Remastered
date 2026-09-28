import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

const outlets = [
  { name: "Apple Gadgets", address: "Basement 2, Shop 26, Bashundhara City Shopping Complex" },
  { name: "Apple Gadgets", address: "Level 5, Block A, Shop 6, 7, 8, Bashundhara City Shopping Complex" },
  { name: "Apple Gadgets", address: "Level 4, Zone A (West Court), Shop 28D, Jamuna Future Park" },
  { name: "AG Computers", address: "Level 5, Shop 545-546, Multiplan Center, New Elephant Road, Dhaka" },
  { name: "AG Care", address: "Level 3, Block B, Shop 07, Bashundhara City Shopping Complex" },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/applegadgetsltd", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/applegadgetsltd/", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/applegadgets/", Icon: FaLinkedinIn },
  { label: "YouTube", href: "https://www.youtube.com/@AppleGadgetsLtd", Icon: FaYoutube },
  { label: "WhatsApp", href: getWhatsAppUrl(), Icon: FaWhatsapp },
];

const shopLinks = [
  { name: "Offers", href: "/category/all?offer=true" },
  { name: "Pre-order", href: "/category/all?preorder=true" },
  ...categories.slice(0, 6).map((category) => ({
    name: category.name,
    href: `/category/${category.slug}`,
  })),
];

const linkClass =
  "inline-flex min-h-11 items-center hover:text-sticker focus-visible:outline-2 focus-visible:outline-sticker";

const Footer = () => (
  <footer className="mt-12 border-t-4 border-dashed border-sticker bg-linear-to-b from-deep to-ink text-paper lg:mt-20">
    <div className="site-container grid gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1.4fr] lg:px-16 lg:py-20">
      <div>
        <p className="text-3xl font-extrabold tracking-tight">Apple Gadgets</p>
        <p className="mt-4 max-w-sm text-paper/80">
          Genuine devices, home appliances and accessories with EMI, exchange and after-sales
          service, online and in-store.
        </p>
        <ul className="mt-6">
          <li>
            <a href="tel:09678148148" className={`${linkClass} gap-3`}>
              <Phone className="size-5" aria-hidden="true" />
              09678148148
            </a>
          </li>
          <li>
            <a href="mailto:contact@applegadgetsbd.com" className={`${linkClass} gap-3`}>
              <Mail className="size-5" aria-hidden="true" />
              contact@applegadgetsbd.com
            </a>
          </li>
        </ul>
        <ul className="mt-4 flex gap-1">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center hover:text-sticker focus-visible:outline-2 focus-visible:outline-sticker"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Shop">
        <h2 className="text-lg font-bold text-sticker">Shop</h2>
        <ul className="mt-3">
          {shopLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-lg font-bold text-sticker">Visit us</h2>
        <ul className="mt-3 divide-y divide-paper/15">
          {outlets.map((outlet) => (
            <li key={outlet.address} className="py-3">
              <p className="font-semibold">{outlet.name}</p>
              <p className="text-sm text-paper/75">{outlet.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-paper/15">
      <p className="site-container px-5 py-5 text-sm text-paper/75 sm:px-8 lg:px-16">
        © {new Date().getFullYear()} Apple Gadgets. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
