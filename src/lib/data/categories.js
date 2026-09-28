export const ALL_CATEGORY = { slug: "all", name: "All products", icon: "package" };

export const categories = [
  { slug: "mobile-phone", name: "Mobile Phone", icon: "smartphone" },
  { slug: "tablet", name: "Tablet", icon: "tablet" },
  { slug: "laptops", name: "Laptop", icon: "laptop" },
  { slug: "mac-mini", name: "Mac mini", icon: "monitor" },
  { slug: "airpods", name: "AirPods", icon: "headphones" },
  { slug: "smart-watch", name: "Smart Watch", icon: "watch" },
  { slug: "earbuds", name: "Earbuds", icon: "music" },
  { slug: "headphone", name: "Headphone", icon: "headphones" },
  { slug: "speakers", name: "Speakers", icon: "speaker" },
  { slug: "power-bank", name: "Power Bank", icon: "battery" },
  { slug: "adapter", name: "Adapter", icon: "plug" },
  { slug: "home-appliances", name: "Home Appliances", icon: "refrigerator" },
  { slug: "personal-care", name: "Personal Care", icon: "scissors" },
  { slug: "pc-components", name: "PC & Components", icon: "cpu" },
];

// "All products" followed by every category, used by the desktop menu and the mobile drawer.
export const navCategories = [ALL_CATEGORY, ...categories];

export const getCategoryIcon = (slug) =>
  categories.find((category) => category.slug === slug)?.icon ?? "package";
