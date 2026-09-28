import { ALL_CATEGORY, categories } from "@/lib/data/categories";
import { slugify } from "@/lib/utils/formatters";

// Mock API: the whole catalogue lives in this file and every function below returns a
// Promise after a short simulated delay, so pages and loading.jsx / Suspense skeletons
// behave the way they will against a real backend.
// TODO: replace each function body with a fetch to the real API once it exists.
// Keep the exported names and return shapes so no component has to change.

export const PAGE_SIZE = 12;

const DELAY_MIN_MS = 300;
const DELAY_MAX_MS = 700;

const simulateLatency = () =>
  new Promise((resolve) => {
    setTimeout(resolve, DELAY_MIN_MS + Math.random() * (DELAY_MAX_MS - DELAY_MIN_MS));
  });

// `image` is a dummy placeholder photo where no real one exists yet. Swap the URL for a
// real one whenever you have it; the host must stay allowed in next.config.js.
const productsData = [
  {id: "p01", slug: "iphone-18-pro", name: "iPhone 18 Pro", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: "https://picsum.photos/seed/iphone-18-pro/800/800"},
  {id: "p02", slug: "iphone-18-pro-max", name: "iPhone 18 Pro Max", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: "https://picsum.photos/seed/iphone-18-pro-max/800/800"},
  {id: "p03", slug: "iphone-duo", name: "iPhone Duo", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: "https://picsum.photos/seed/iphone-duo/800/800"},
  {id: "p04", slug: "galaxy-s26-ultra-5g", name: "Galaxy S26 Ultra 5G", brand: "Samsung", category: "mobile-phone", price: 113999, regularPrice: 117000, image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-black-4396.png"},
  {id: "p05", slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple", category: "mobile-phone", price: 155499, regularPrice: 162499, image: "https://picsum.photos/seed/iphone-17-pro-max/800/800"},
  {id: "p06", slug: "galaxy-s25-ultra-5g", name: "Galaxy S25 Ultra 5G", brand: "Samsung", category: "mobile-phone", price: 98999, regularPrice: 101000, image: "https://picsum.photos/seed/galaxy-s25-ultra-5g/800/800"},
  {id: "p07", slug: "pixel-9", name: "Pixel 9", brand: "Google", category: "mobile-phone", price: 69999, regularPrice: 73000, image: "https://picsum.photos/seed/pixel-9/800/800"},
  {id: "p08", slug: "galaxy-a37-5g", name: "Galaxy A37 5G", brand: "Samsung", category: "mobile-phone", price: 36799, image: "https://picsum.photos/seed/galaxy-a37-5g/800/800"},
  {id: "p09", slug: "motorola-edge-70-fusion", name: "Motorola Edge 70 Fusion 5G", brand: "Motorola", category: "mobile-phone", price: 37599, image: "https://picsum.photos/seed/motorola-edge-70-fusion/800/800"},
  {id: "p10", slug: "galaxy-s25-5g", name: "Galaxy S25 5G", brand: "Samsung", category: "mobile-phone", price: 72999, regularPrice: 82000, image: "https://picsum.photos/seed/galaxy-s25-5g/800/800"},
  {id: "p11", slug: "redmi-note-15-4g", name: "Redmi Note 15 4G", brand: "Xiaomi", category: "mobile-phone", price: 26399, image: "https://picsum.photos/seed/redmi-note-15-4g/800/800"},
  {id: "p12", slug: "honor-600-pro", name: "Honor 600 Pro 5G", brand: "Honor", category: "mobile-phone", price: 76499, image: "https://picsum.photos/seed/honor-600-pro/800/800"},
  {id: "p13", slug: "iphone-15", name: "iPhone 15", brand: "Apple", category: "mobile-phone", price: 82499, image: "https://picsum.photos/seed/iphone-15/800/800"},
  {id: "p14", slug: "nothing-phone-4a-pro", name: "Nothing Phone (4a) Pro", brand: "Nothing", category: "mobile-phone", price: 56499, regularPrice: 58500, image: "https://picsum.photos/seed/nothing-phone-4a-pro/800/800"},
  {id: "p15", slug: "ipad-11th-gen", name: "iPad 11th Gen - 2025", brand: "Apple", category: "tablet", price: 54499, regularPrice: 56499, image: "https://picsum.photos/seed/ipad-11th-gen/800/800"},
  {id: "p16", slug: "galaxy-tab-s10-fe-plus", name: "Galaxy Tab S10 FE+", brand: "Samsung", category: "tablet", price: 59499, image: "https://picsum.photos/seed/galaxy-tab-s10-fe-plus/800/800"},
  {id: "p17", slug: "galaxy-tab-s10-fe", name: "Galaxy Tab S10 FE", brand: "Samsung", category: "tablet", price: 45499, regularPrice: 50000, image: "https://picsum.photos/seed/galaxy-tab-s10-fe/800/800"},
  {id: "p18", slug: "ipad-air-m4", name: "iPad Air M4 - 2026", brand: "Apple", category: "tablet", price: 91999, regularPrice: 95999, image: "https://picsum.photos/seed/ipad-air-m4/800/800"},
  {id: "p19", slug: "galaxy-tab-a11", name: "Galaxy Tab A11", brand: "Samsung", category: "tablet", price: 15999, regularPrice: 16999, image: "https://picsum.photos/seed/galaxy-tab-a11/800/800"},
  {id: "p20", slug: "xiaomi-pad-7", name: "Xiaomi Pad 7", brand: "Xiaomi", category: "tablet", price: 37499, regularPrice: 39499, image: "https://picsum.photos/seed/xiaomi-pad-7/800/800"},
  {id: "p21", slug: "macbook-neo", name: "MacBook Neo", brand: "Apple", category: "laptops", price: 84999, image: "https://picsum.photos/seed/macbook-neo/800/800"},
  {id: "p22", slug: "macbook-air-m5", name: "MacBook Air M5 13-Inch", brand: "Apple", category: "laptops", price: 170999, image: "https://picsum.photos/seed/macbook-air-m5/800/800"},
  {id: "p23", slug: "macbook-air-m5-15-inch", name: "MacBook Air M5 15-Inch", brand: "Apple", category: "laptops", price: 198999, regularPrice: 199999, image: "https://picsum.photos/seed/macbook-air-m5-15-inch/800/800"},
  {id: "p24", slug: "macbook-pro-m5-pro-14-inch", name: "MacBook Pro M5 Pro 14-Inch 24/1TB", brand: "Apple", category: "laptops", price: 318999, image: "https://picsum.photos/seed/macbook-pro-m5-pro-14-inch/800/800"},
  {id: "p25", slug: "mac-mini-m4-16-256gb", name: "Apple Mac mini M4 - 16/256GB", brand: "Apple", category: "mac-mini", price: 96999, image: "https://picsum.photos/seed/mac-mini-m4-16-256gb/800/800"},
  {id: "p26", slug: "mac-mini-m4-16-512gb", name: "Apple Mac mini M4 - 16/512GB", brand: "Apple", category: "mac-mini", price: 120999, regularPrice: 122999, image: "https://picsum.photos/seed/mac-mini-m4-16-512gb/800/800"},
  {id: "p27", slug: "apple-airpods-5", name: "Apple AirPods 5", brand: "Apple", category: "airpods", price: 10000, preorder: true, image: "https://picsum.photos/seed/apple-airpods-5/800/800"},
  {id: "p28", slug: "airpods-pro-2nd-generation-usbc", name: "AirPods Pro (2nd generation) USB-C", brand: "Apple", category: "airpods", price: 20999, regularPrice: 24000, image: "https://picsum.photos/seed/airpods-pro-2nd-generation-usbc/800/800"},
  {id: "p29", slug: "apple-airpods-4", name: "Apple AirPods 4", brand: "Apple", category: "airpods", price: 13799, regularPrice: 15500, image: "https://picsum.photos/seed/apple-airpods-4/800/800"},
  {id: "p30", slug: "apple-watch-series-12", name: "Apple Watch Series 12", brand: "Apple", category: "smart-watch", price: 10000, preorder: true, image: "https://picsum.photos/seed/apple-watch-series-12/800/800"},
  {id: "p31", slug: "apple-watch-ultra-4", name: "Apple Watch Ultra 4", brand: "Apple", category: "smart-watch", price: 10000, preorder: true, image: "https://picsum.photos/seed/apple-watch-ultra-4/800/800"},
  {id: "p32", slug: "apple-watch-series-11", name: "Apple Watch Series 11", brand: "Apple", category: "smart-watch", price: 41499, regularPrice: 53500, image: "https://picsum.photos/seed/apple-watch-series-11/800/800"},
  {id: "p33", slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", brand: "Apple", category: "smart-watch", price: 97500, regularPrice: 105000, image: "https://picsum.photos/seed/apple-watch-ultra-3/800/800"},
  {id: "p34", slug: "galaxy-watch9", name: "Galaxy Watch9", brand: "Samsung", category: "smart-watch", price: 37000, newArrival: true, image: "https://picsum.photos/seed/galaxy-watch9/800/800"},
  {id: "p35", slug: "galaxy-watch-ultra-2025", name: "Galaxy Watch Ultra - 2025", brand: "Samsung", category: "smart-watch", price: 41500, regularPrice: 46500, image: "https://picsum.photos/seed/galaxy-watch-ultra-2025/800/800"},
  {id: "p36", slug: "cmf-watch-3-pro", name: "CMF by Nothing Watch 3 Pro BT Calling Smart Watch", brand: "Nothing", category: "smart-watch", price: 8999, regularPrice: 9999, image: "https://picsum.photos/seed/cmf-watch-3-pro/800/800"},
  {id: "p37", slug: "qcy-melobuds-n20-pro", name: "QCY MeloBuds N20 Pro Earbuds", brand: "QCY", category: "earbuds", price: 2549, regularPrice: 2800, newArrival: true, image: "https://picsum.photos/seed/qcy-melobuds-n20-pro/800/800"},
  {id: "p38", slug: "galaxy-buds4-pro", name: "Galaxy Buds4 Pro", brand: "Samsung", category: "earbuds", price: 19999, regularPrice: 25500, newArrival: true, image: "https://picsum.photos/seed/galaxy-buds4-pro/800/800"},
  {id: "p39", slug: "realme-buds-air-8-pro", name: "realme Buds Air 8 Pro ANC TWS Earbuds", brand: "realme", category: "earbuds", price: 8499, newArrival: true, image: "https://picsum.photos/seed/realme-buds-air-8-pro/800/800"},
  {id: "p40", slug: "realme-buds-air-8", name: "realme Buds Air 8 ANC TWS Earbuds", brand: "realme", category: "earbuds", price: 4699, regularPrice: 5500, newArrival: true, image: "https://picsum.photos/seed/realme-buds-air-8/800/800"},
  {id: "p41", slug: "oneplus-nord-buds-4-pro", name: "OnePlus Nord Buds 4 Pro ANC TWS Earbuds", brand: "OnePlus", category: "earbuds", price: 4649, regularPrice: 5000, newArrival: true, image: "https://picsum.photos/seed/oneplus-nord-buds-4-pro/800/800"},
  {id: "p42", slug: "anker-soundcore-r60i", name: "Anker Soundcore R60i NC TWS Earbuds", brand: "Anker", category: "earbuds", price: 2999, regularPrice: 3500, newArrival: true, image: "https://picsum.photos/seed/anker-soundcore-r60i/800/800"},
  {id: "p43", slug: "anker-soundcore-q20i", name: "Anker Soundcore Q20i Hybrid Active Noise Cancelling Headphones", brand: "Anker", category: "headphone", price: 4999, regularPrice: 5999, image: "https://picsum.photos/seed/anker-soundcore-q20i/800/800"},
  {id: "p44", slug: "plextone-g31-venom", name: "PLEXTONE G31 Venom Gaming Headphones", brand: "Plextone", category: "headphone", price: 1100, newArrival: true, image: "https://picsum.photos/seed/plextone-g31-venom/800/800"},
  {id: "p45", slug: "hoco-w65-plus", name: "Hoco W65 Plus ANC Wireless Headphones", brand: "Hoco", category: "headphone", price: 2000, regularPrice: 2200, image: "https://picsum.photos/seed/hoco-w65-plus/800/800"},
  {id: "p46", slug: "jbl-go-5", name: "JBL GO 5 Portable Waterproof Speaker", brand: "JBL", category: "speakers", price: 5799, newArrival: true, image: "https://picsum.photos/seed/jbl-go-5/800/800"},
  {id: "p47", slug: "jbl-xtreme-5", name: "JBL Xtreme 5 Portable Bluetooth Speaker", brand: "JBL", category: "speakers", price: 39300, image: "https://picsum.photos/seed/jbl-xtreme-5/800/800"},
  {id: "p48", slug: "jbl-boombox-4", name: "JBL Boombox 4 Wireless Speaker", brand: "JBL", category: "speakers", price: 49999, image: "https://picsum.photos/seed/jbl-boombox-4/800/800"},
  {id: "p49", slug: "jbl-flip-7", name: "JBL Flip 7 Portable Wireless Speaker", brand: "JBL", category: "speakers", price: 11299, image: "https://picsum.photos/seed/jbl-flip-7/800/800"},
  {id: "p50", slug: "anker-soundcore-flare-2", name: "Anker Soundcore Flare 2", brand: "Anker", category: "speakers", price: 5699, regularPrice: 7500, image: "https://picsum.photos/seed/anker-soundcore-flare-2/800/800"},
  {id: "p51", slug: "anker-nano-45w-power-bank", name: "Anker A1638 Nano 45W Power Bank - 10000mAh", brand: "Anker", category: "power-bank", price: 4799, regularPrice: 5500, image: "https://picsum.photos/seed/anker-nano-45w-power-bank/800/800"},
  {id: "p52", slug: "anker-zolo-a1116-power-bank", name: "Anker Zolo A1116 45W Power Bank - 10000mAh", brand: "Anker", category: "power-bank", price: 3499, regularPrice: 5800, image: "https://picsum.photos/seed/anker-zolo-a1116-power-bank/800/800"},
  {id: "p53", slug: "apple-40w-dynamic-power-adapter", name: "Apple 40W Dynamic Power Adapter with 60W Max", brand: "Apple", category: "adapter", price: 7000, image: "https://picsum.photos/seed/apple-40w-dynamic-power-adapter/800/800"},
  {id: "p54", slug: "philips-na231-air-fryer", name: "Philips NA231 Air Fryer - 6.2L", brand: "Philips", category: "home-appliances", price: 12500, regularPrice: 18500, image: "https://picsum.photos/seed/philips-na231-air-fryer/800/800"},
  {id: "p55", slug: "philips-na120-air-fryer", name: "Philips NA120/00 Air Fryer 4.2L", brand: "Philips", category: "home-appliances", price: 7500, regularPrice: 12990, image: "https://picsum.photos/seed/philips-na120-air-fryer/800/800"},
  {id: "p56", slug: "tcl-65c6ks-mini-led-tv", name: "TCL 65C6KS 65-inch Premium QD-Mini LED TV", brand: "TCL", category: "home-appliances", price: 123999, regularPrice: 151990, image: "https://picsum.photos/seed/tcl-65c6ks-mini-led-tv/800/800"},
  {id: "p57", slug: "miyako-af-401-cg-air-fryer", name: "Miyako AF-401-CG Inverter Air Fryer 4L", brand: "Miyako", category: "home-appliances", price: 5700, regularPrice: 6500, image: "https://picsum.photos/seed/miyako-af-401-cg-air-fryer/800/800"},
  {id: "p58", slug: "philips-hl7757-mixer-grinder", name: "Philips HL7757 3 Jars Mixer Grinder - 750W", brand: "Philips", category: "home-appliances", price: 6000, regularPrice: 10450, image: "https://picsum.photos/seed/philips-hl7757-mixer-grinder/800/800"},
  {id: "p59", slug: "panasonic-mx-ge3750-mixer-grinder", name: "Panasonic MX-GE3750 3 Jars Mixer Grinder - 1200W", brand: "Panasonic", category: "home-appliances", price: 7700, regularPrice: 13000, image: "https://picsum.photos/seed/panasonic-mx-ge3750-mixer-grinder/800/800"},
  {id: "p60", slug: "ecoflow-river-2-max", name: "EcoFlow River 2 Max Portable Power Station", brand: "EcoFlow", category: "home-appliances", price: 42499, regularPrice: 45900, image: "https://picsum.photos/seed/ecoflow-river-2-max/800/800"},
  {id: "p61", slug: "ecoflow-delta-3", name: "EcoFlow Delta 3 Portable Power Station", brand: "EcoFlow", category: "home-appliances", price: 71500, regularPrice: 77900, image: "https://picsum.photos/seed/ecoflow-delta-3/800/800"},
  {id: "p62", slug: "samsung-rt47k6231-refrigerator", name: "Samsung RT47K6231UT/D3 Twin Cooling Refrigerator - 465L", brand: "Samsung", category: "home-appliances", price: 92000, regularPrice: 112900, image: "https://picsum.photos/seed/samsung-rt47k6231-refrigerator/800/800"},
  {id: "p63", slug: "midea-msi-18crn-inverter-ac", name: "Midea MSI-18CRN Inverter Air Conditioner - 1.5 Ton", brand: "Midea", category: "home-appliances", price: 53999, image: "https://picsum.photos/seed/midea-msi-18crn-inverter-ac/800/800"},
  {id: "p64", slug: "bluetti-premium-30-v2", name: "BLUETTI Premium 30 V2 600W Portable Power Station", brand: "Bluetti", category: "home-appliances", price: 29500, regularPrice: 31900, image: "https://picsum.photos/seed/bluetti-premium-30-v2/800/800"},
  {id: "p65", slug: "philips-qp2520-trimmer", name: "Philips QP2520 Hybrid One-Blade Trimmer", brand: "Philips", category: "personal-care", price: 6850, newArrival: true, image: "https://picsum.photos/seed/philips-qp2520-trimmer/800/800"},
  {id: "p66", slug: "philips-pq182-shaver", name: "Philips PQ182 Twin Rotary Blades Shaver", brand: "Philips", category: "personal-care", price: 3200, newArrival: true, image: "https://picsum.photos/seed/philips-pq182-shaver/800/800"},
  {id: "p67", slug: "philips-bt1243-beard-trimmer", name: "Philips BT1243/18 1000 Series Beard Trimmer", brand: "Philips", category: "personal-care", price: 1799, image: "https://picsum.photos/seed/philips-bt1243-beard-trimmer/800/800"},
  {id: "p68", slug: "manli-nebula-rtx-5050", name: "Manli Nebula GeForce RTX 5050 8GB GDDR6 Graphics Card", brand: "Manli", category: "pc-components", price: 54800, image: "https://picsum.photos/seed/manli-nebula-rtx-5050/800/800"},
  {id: "p69", slug: "msi-rtx-5060-ti-ventus", name: "MSI GeForce RTX 5060 Ti 8G Ventus 2X Plus Graphics Card", brand: "MSI", category: "pc-components", price: 72900, image: "https://picsum.photos/seed/msi-rtx-5060-ti-ventus/800/800"},
  {id: "p70", slug: "msi-b850m-gaming-plus-wifi6e", name: "MSI B850M Gaming Plus WiFi6E AM5 mATX Motherboard", brand: "MSI", category: "pc-components", price: 23800, image: "https://picsum.photos/seed/msi-b850m-gaming-plus-wifi6e/800/800"},
  {id: "p71", slug: "corsair-vengeance-ddr5-6000", name: "Corsair Vengeance DDR5 6000MHz Heatsink Desktop RAM", brand: "Corsair", category: "pc-components", price: 18900, image: "https://picsum.photos/seed/corsair-vengeance-ddr5-6000/800/800"},
  {id: "p72", slug: "logitech-g512-keyboard", name: "Logitech G512 Lightsync RGB Mechanical Gaming Keyboard", brand: "Logitech", category: "pc-components", price: 11499, image: "https://picsum.photos/seed/logitech-g512-keyboard/800/800"},
  {id: "p73", slug: "dahua-lm43-f200n-monitor", name: "Dahua DHI-LM43-F200N 43-inch 60Hz FHD Monitor", brand: "Dahua", category: "pc-components", price: 45000, image: "https://picsum.photos/seed/dahua-lm43-f200n-monitor/800/800"},
  {id: "p74", slug: "logitech-mx-brio-webcam", name: "Logitech MX Brio Ultra HD 4K Webcam", brand: "Logitech", category: "pc-components", price: 23500, image: "https://picsum.photos/seed/logitech-mx-brio-webcam/800/800"},
  {id: "p75", slug: "hp-laserjet-pro-4003dn-printer", name: "HP LaserJet Pro 4003dn Single Function Mono Laser Printer", brand: "HP", category: "pc-components", price: 37500, regularPrice: 55000, image: "https://picsum.photos/seed/hp-laserjet-pro-4003dn-printer/800/800"},
  {id: "p76", slug: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", category: "mobile-phone", price: 143999, regularPrice: 147500, image: "https://picsum.photos/seed/iphone-17-pro/800/800"},
  {id: "p77", slug: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple", category: "mobile-phone", price: 145999, image: "https://picsum.photos/seed/iphone-16-pro-max/800/800"},
  {id: "p78", slug: "galaxy-s25-fe-5g", name: "Galaxy S25 FE 5G", brand: "Samsung", category: "mobile-phone", price: 62499, image: "https://picsum.photos/seed/galaxy-s25-fe-5g/800/800"},
  {id: "p79", slug: "iphone-17", name: "iPhone 17", brand: "Apple", category: "mobile-phone", price: 107499, image: "https://picsum.photos/seed/iphone-17/800/800"},
  {id: "p80", slug: "iphone-16", name: "iPhone 16", brand: "Apple", category: "mobile-phone", price: 89999, image: "https://picsum.photos/seed/iphone-16/800/800"},
  {id: "p81", slug: "honor-600", name: "Honor 600 5G", brand: "Honor", category: "mobile-phone", price: 54999, image: "https://picsum.photos/seed/honor-600/800/800"},
  {id: "p82", slug: "motorola-edge-60-pro-5g", name: "Motorola Edge 60 Pro 5G", brand: "Motorola", category: "mobile-phone", price: 44000, image: "https://picsum.photos/seed/motorola-edge-60-pro-5g/800/800"},
  {id: "p83", slug: "galaxy-a57-5g", name: "Galaxy A57 5G", brand: "Samsung", category: "mobile-phone", price: 44099, image: "https://picsum.photos/seed/galaxy-a57-5g/800/800"},
];

// Rich content for a few products, keyed by slug. Products not listed here get the basic page.
const productDetailsData = {
  "galaxy-s26-ultra-5g": {
    colors: [
      {
        id: "black",
        name: "Black",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-black-4396.png"
      },
      {
        id: "cobalt-violet",
        name: "Cobalt Violet",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultracobaltviolet-8743.png"
      },
      {
        id: "pink-gold",
        name: "Pink Gold",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-pinkgold-1209.png"
      },
      {
        id: "silver-shadow",
        name: "Silver Shadow",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-silvershadow-5304.png"
      },
      {
        id: "sky-blue",
        name: "Sky Blue",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-skyblue-9021.png"
      },
      {
        id: "white",
        name: "White",
        image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-white-7743.png"
      }
    ],
    specs: [
      {
        id: "body",
        label: "Body",
        value: "163.6 × 78.1 × 7.9 mm, 214 g. Gorilla Armor 2 front, Victus 2 back, aluminium frame."
      },
      {
        id: "platform",
        label: "Platform",
        value: "Android 16, One UI 8.5. Snapdragon 8 Elite Gen 5, octa-core CPU, Adreno 840 GPU."
      },
      {
        id: "display",
        label: "Display",
        value: "6.9-inch Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, up to 2600 nits, 1440 × 3120 (~498 ppi)."
      },
      {
        id: "memory",
        label: "Memory",
        value: "256GB / 12GB RAM, 512GB / 12GB RAM, 1TB / 16GB RAM."
      },
      {
        id: "main-camera",
        label: "Main camera",
        value: "Quad: 200MP wide, 10MP telephoto, 50MP telephoto, 50MP ultrawide. Video up to 8K."
      },
      {
        id: "selfie-camera",
        label: "Selfie camera",
        value: "12MP wide, dual pixel PDAF, HDR10+, 4K video."
      },
      {
        id: "battery",
        label: "Battery",
        value: "5000 mAh Li-Ion. 60W wired, 25W wireless, 4.5W reverse wireless charging."
      },
      {
        id: "network",
        label: "Network",
        value: "GSM / CDMA / HSPA / EVDO / LTE / 5G."
      },
      {
        id: "connectivity",
        label: "Connectivity",
        value: "Wi-Fi 7, Bluetooth 6.0, NFC, UWB."
      },
      {
        id: "other",
        label: "Other",
        value: "IP68 water resistance, ultrasonic fingerprint, Samsung DeX and Wireless DeX, stylus support."
      }
    ],
    highlights: [
      {
        id: "display",
        text: "6.9-inch LTPO AMOLED display with 120Hz smooth scrolling"
      },
      {
        id: "chip",
        text: "Snapdragon 8 Elite Gen 5 for heavy gaming and multitasking"
      },
      {
        id: "camera",
        text: "200MP quad camera system with 8K video"
      },
      {
        id: "build",
        text: "Aluminium frame with IP68 water and dust resistance"
      },
      {
        id: "battery",
        text: "5000mAh battery with fast wired and wireless charging"
      },
      {
        id: "software",
        text: "Android 16 with up to 7 major Android upgrades"
      }
    ],
    description: "Samsung's ultra-premium flagship pairs a large, bright display and a pro-grade camera system with a refined aluminium build. It is aimed at buyers who want top performance for photography, video, gaming and desktop-style work with DeX.",
    faqs: [
      {
        id: "stylus",
        question: "Does the Galaxy S26 Ultra support stylus input?",
        answer: "Yes. It has built-in stylus support, in line with the Ultra range, for note-taking, drawing and document editing."
      },
      {
        id: "updates",
        question: "How long will it get software updates?",
        answer: "Samsung promises up to 7 major Android upgrades plus long-term security updates."
      }
    ]
  },
  "iphone-17-pro-max": {
    colors: [
      {
        id: "titanium-black",
        name: "Titanium Black",
        image: "https://picsum.photos/seed/iphone-17-pro-max-titanium-black/800/800"
      },
      {
        id: "titanium-white",
        name: "Titanium White",
        image: "https://picsum.photos/seed/iphone-17-pro-max-titanium-white/800/800"
      },
      {
        id: "titanium-blue",
        name: "Titanium Blue",
        image: "https://picsum.photos/seed/iphone-17-pro-max-titanium-blue/800/800"
      },
      {
        id: "titanium-natural",
        name: "Titanium Natural",
        image: "https://picsum.photos/seed/iphone-17-pro-max-titanium-natural/800/800"
      }
    ],
    specs: [
      {
        id: "body",
        label: "Body",
        value: "163.0 × 77.6 × 8.25 mm, 227 g. Titanium frame, Ceramic Shield 2 front and back."
      },
      {
        id: "platform",
        label: "Platform",
        value: "iOS 19. Apple A19 Pro chip, 6-core CPU, 6-core GPU."
      },
      {
        id: "display",
        label: "Display",
        value: "6.9-inch Super Retina XDR OLED, ProMotion 120Hz, up to 3000 nits, 2868 × 1320 (~460 ppi)."
      },
      {
        id: "memory",
        label: "Memory",
        value: "256GB, 512GB, 1TB. No memory card slot."
      },
      {
        id: "main-camera",
        label: "Main camera",
        value: "Triple: 48MP wide, 48MP ultrawide, 12MP telephoto (5x). Video up to 4K@120fps."
      },
      {
        id: "selfie-camera",
        label: "Selfie camera",
        value: "12MP, autofocus, 4K video."
      },
      {
        id: "battery",
        label: "Battery",
        value: "Li-Ion, up to 33h video playback. 27W wired, 25W MagSafe wireless charging."
      },
      {
        id: "network",
        label: "Network",
        value: "GSM / CDMA / HSPA / EVDO / LTE / 5G."
      },
      {
        id: "connectivity",
        label: "Connectivity",
        value: "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3."
      },
      {
        id: "other",
        label: "Other",
        value: "IP68 water resistance, Face ID, Dynamic Island, Ceramic Shield 2."
      }
    ],
    highlights: [
      {
        id: "chip",
        text: "A19 Pro chip for top-tier performance and efficiency"
      },
      {
        id: "camera",
        text: "Pro camera system with 5x optical zoom telephoto"
      },
      {
        id: "display",
        text: "6.9-inch ProMotion display with 120Hz refresh rate"
      },
      {
        id: "build",
        text: "Titanium frame with Ceramic Shield 2 front and back"
      },
      {
        id: "battery",
        text: "All-day battery life with fast MagSafe charging"
      }
    ],
    description: "Apple's largest Pro iPhone pairs the A19 Pro chip with a titanium frame and a pro camera system built for photography, video and gaming.",
    faqs: [
      {
        id: "storage",
        question: "Which storage option should I pick?",
        answer: "256GB suits most users; go for 512GB or 1TB if you shoot a lot of 4K video or ProRes footage."
      },
      {
        id: "esim",
        question: "Does it support a physical SIM?",
        answer: "This depends on region. Check with us for the SIM configuration available on the unit in stock."
      }
    ]
  },
  "macbook-air-m5": {
    colors: [
      {
        id: "midnight",
        name: "Midnight",
        image: "https://picsum.photos/seed/macbook-air-m5-midnight/800/800"
      },
      {
        id: "starlight",
        name: "Starlight",
        image: "https://picsum.photos/seed/macbook-air-m5-starlight/800/800"
      },
      {
        id: "silver",
        name: "Silver",
        image: "https://picsum.photos/seed/macbook-air-m5-silver/800/800"
      },
      {
        id: "space-grey",
        name: "Space Grey",
        image: "https://picsum.photos/seed/macbook-air-m5-space-grey/800/800"
      }
    ],
    specs: [
      {
        id: "body",
        label: "Body",
        value: "304.1 × 215.0 × 11.3 mm, 1.24 kg. Unibody aluminium enclosure."
      },
      {
        id: "platform",
        label: "Platform",
        value: "Apple M5 chip, 10-core CPU, up to 10-core GPU, 16-core Neural Engine."
      },
      {
        id: "display",
        label: "Display",
        value: "13.6-inch Liquid Retina, 2560 × 1664, 500 nits, True Tone, wide colour (P3)."
      },
      {
        id: "memory",
        label: "Memory",
        value: "16GB / 24GB / 32GB unified memory. 256GB to 2TB SSD storage."
      },
      {
        id: "battery",
        label: "Battery",
        value: "Up to 18 hours battery life. 35W or 70W USB-C power adapter, MagSafe 3 charging."
      },
      {
        id: "connectivity",
        label: "Connectivity",
        value: "Wi-Fi 6E, Bluetooth 5.3, two Thunderbolt / USB 4 ports, MagSafe 3, headphone jack."
      },
      {
        id: "other",
        label: "Other",
        value: "Backlit Magic Keyboard, Touch ID, four-speaker sound system, 1080p FaceTime HD camera."
      }
    ],
    highlights: [
      {
        id: "chip",
        text: "Apple M5 chip for fast, fanless performance"
      },
      {
        id: "battery",
        text: "Up to 18 hours of battery life on a single charge"
      },
      {
        id: "display",
        text: "13.6-inch Liquid Retina display with True Tone"
      },
      {
        id: "design",
        text: "Slim, fanless unibody aluminium design"
      }
    ],
    description: "The thinnest, lightest MacBook Air yet, built around the Apple M5 chip. Silent, fast and portable enough for everyday work, study and creative projects.",
    faqs: [
      {
        id: "ram",
        question: "Can the memory be upgraded after purchase?",
        answer: "No. Unified memory is fixed at the time of purchase and cannot be upgraded later, so choose based on expected workload."
      }
    ]
  },
  "apple-watch-series-11": {
    colors: [
      {
        id: "midnight-aluminium",
        name: "Midnight Aluminium",
        image: "https://picsum.photos/seed/apple-watch-series-11-midnight-aluminium/800/800"
      },
      {
        id: "starlight-aluminium",
        name: "Starlight Aluminium",
        image: "https://picsum.photos/seed/apple-watch-series-11-starlight-aluminium/800/800"
      },
      {
        id: "jet-black-aluminium",
        name: "Jet Black Aluminium",
        image: "https://picsum.photos/seed/apple-watch-series-11-jet-black-aluminium/800/800"
      },
      {
        id: "rose-gold-aluminium",
        name: "Rose Gold Aluminium",
        image: "https://picsum.photos/seed/apple-watch-series-11-rose-gold-aluminium/800/800"
      }
    ],
    specs: [
      {
        id: "body",
        label: "Body",
        value: "42mm or 46mm aluminium case, Ion-X strengthened glass front."
      },
      {
        id: "display",
        label: "Display",
        value: "Always-On LTPO OLED Retina display, up to 2000 nits."
      },
      {
        id: "sensors",
        label: "Sensors",
        value: "Blood oxygen, ECG, heart rate, temperature sensing, skin temperature."
      },
      {
        id: "battery",
        label: "Battery",
        value: "Up to 18 hours normal use, up to 36 hours in low power mode."
      },
      {
        id: "connectivity",
        label: "Connectivity",
        value: "Wi-Fi, Bluetooth 5.3, optional LTE, NFC (Apple Pay)."
      },
      {
        id: "other",
        label: "Other",
        value: "WR50 water resistance, always-on altimeter, crash detection, fall detection."
      }
    ],
    highlights: [
      {
        id: "health",
        text: "Advanced health sensors including ECG and blood oxygen"
      },
      {
        id: "display",
        text: "Bright Always-On Retina display, easy to read outdoors"
      },
      {
        id: "safety",
        text: "Crash detection and fall detection built in"
      },
      {
        id: "battery",
        text: "All-day battery with fast charging"
      }
    ],
    description: "Apple Watch Series 11 tracks activity, sleep and vital health metrics with a bright always-on display, wrapped in a refined aluminium case.",
    faqs: [
      {
        id: "lte",
        question: "Is a cellular version available?",
        answer: "Both GPS-only and GPS+Cellular versions exist; cellular lets you call, message and stream without your phone nearby."
      }
    ]
  },
  "galaxy-buds4-pro": {
    colors: [
      {
        id: "titan-black",
        name: "Titan Black",
        image: "https://picsum.photos/seed/galaxy-buds4-pro-titan-black/800/800"
      },
      {
        id: "silver-blue",
        name: "Silver Blue",
        image: "https://picsum.photos/seed/galaxy-buds4-pro-silver-blue/800/800"
      },
      {
        id: "pink-gold",
        name: "Pink Gold",
        image: "https://picsum.photos/seed/galaxy-buds4-pro-pink-gold/800/800"
      }
    ],
    specs: [
      {
        id: "driver",
        label: "Driver",
        value: "Two-way dynamic driver with dedicated tweeter and woofer."
      },
      {
        id: "anc",
        label: "Noise control",
        value: "Active Noise Cancellation up to 40dB, ambient sound mode."
      },
      {
        id: "battery",
        label: "Battery",
        value: "Up to 8h per charge (ANC off), 26h total with case. Wireless charging case."
      },
      {
        id: "connectivity",
        label: "Connectivity",
        value: "Bluetooth 5.4, multipoint connection, 360 Audio with head tracking."
      },
      {
        id: "other",
        label: "Other",
        value: "IP57 water and dust resistance, touch controls, in-ear detection."
      }
    ],
    highlights: [
      {
        id: "anc",
        text: "Strong active noise cancellation for daily commutes"
      },
      {
        id: "battery",
        text: "Up to 26 hours total playback with the case"
      },
      {
        id: "fit",
        text: "IP57-rated, secure fit for workouts"
      }
    ],
    description: "Samsung's flagship earbuds combine strong ANC, rich two-way drivers and a comfortable, durable fit for all-day listening.",
    faqs: []
  },
};

const allCategories = [ALL_CATEGORY, ...categories];

const products = productsData.map((product) => ({ ...product, brandSlug: slugify(product.brand) }));

const matchesFilters = (product, { category, brand, q, offer, preorder, newArrival, min, max }) => {
  if (category && category !== "all" && product.category !== category) return false;
  if (brand && product.brandSlug !== brand) return false;
  if (q) {
    const needle = q.toLowerCase();
    if (!product.name.toLowerCase().includes(needle) && !product.brand.toLowerCase().includes(needle)) {
      return false;
    }
  }
  if (offer && !(product.regularPrice && product.regularPrice > product.price)) return false;
  if (preorder && !product.preorder) return false;
  if (newArrival && !product.newArrival) return false;
  if (min !== undefined && product.price < min) return false;
  if (max !== undefined && product.price > max) return false;
  return true;
};

const getSavings = (product) => (product.regularPrice ? product.regularPrice - product.price : 0);

const sortProducts = (list, sort) => {
  const sorted = [...list];
  if (sort === "price-asc") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return sorted.sort((a, b) => b.price - a.price);
  if (sort === "discount") return sorted.sort((a, b) => getSavings(b) - getSavings(a));
  return sorted;
};

const findProducts = (filters) =>
  sortProducts(products.filter((product) => matchesFilters(product, filters)), filters.sort);

export const getCategory = async (slug) => {
  await simulateLatency();
  return allCategories.find((category) => category.slug === slug) ?? null;
};

export const getProducts = async ({
  category = "all",
  brand,
  q,
  sort,
  offer = false,
  preorder = false,
  newArrival = false,
  min,
  max,
  limit,
} = {}) => {
  await simulateLatency();
  const found = findProducts({ category, brand, q, sort, offer, preorder, newArrival, min, max });
  return (limit ? found.slice(0, limit) : found).map((product) => ({ ...product }));
};

// Same filters as getProducts, sliced into pages.
export const getProductPage = async ({ page = 1, pageSize = PAGE_SIZE, ...filters } = {}) => {
  await simulateLatency();
  const found = findProducts(filters);
  const total = found.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const items = found.slice(start, start + pageSize).map((product) => ({ ...product }));

  return { items, total, page, pageSize, pageCount };
};

export const getProduct = async (slug) => {
  await simulateLatency();
  const product = products.find((item) => item.slug === slug);
  return product ? { ...product } : null;
};

export const getProductDetails = async (slug) => {
  await simulateLatency();
  return productDetailsData[slug] ?? null;
};

export const getProductsBySlugs = async (slugs) => {
  await simulateLatency();
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean)
    .map((product) => ({ ...product }));
};

export const getRelatedProducts = async (product, limit = 4) => {
  await simulateLatency();
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit)
    .map((item) => ({ ...item }));
};

export const getProductSlugs = async () => {
  await simulateLatency();
  return products.map((product) => product.slug);
};

// Brands present in one category (or all), alphabetical.
export const getBrands = async (category = "all") => {
  await simulateLatency();
  const scoped = category === "all" ? products : products.filter((product) => product.category === category);
  const seen = new Map();
  scoped.forEach((product) => {
    if (!seen.has(product.brandSlug)) seen.set(product.brandSlug, product.brand);
  });
  return [...seen.entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Brands ordered by how many products they have.
export const getTopBrands = async (limit = 12) => {
  await simulateLatency();
  const counts = new Map();
  products.forEach((product) => {
    const entry = counts.get(product.brandSlug) ?? { slug: product.brandSlug, name: product.brand, count: 0 };
    entry.count += 1;
    counts.set(product.brandSlug, entry);
  });
  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ slug, name }) => ({ slug, name }));
};
