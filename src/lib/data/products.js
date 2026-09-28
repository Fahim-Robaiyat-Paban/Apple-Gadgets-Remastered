// Mock catalogue based on prices shown on the current site (BDT).
// - `regularPrice` is only set where the site shows a struck-through price.
// - The "Apple Exclusive 2026" items are listed at ৳ 10,000 on the current site;
//   confirm whether that is a booking amount before shipping. They are flagged `preorder`.
// - `newArrival` mirrors the current site's "New Arrival" shelf.
// - `image` is null until real product image URLs are available (see ProductImage).
export const products = [
  { id: "p01", slug: "iphone-18-pro", name: "iPhone 18 Pro", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: null },
  { id: "p02", slug: "iphone-18-pro-max", name: "iPhone 18 Pro Max", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: null },
  { id: "p03", slug: "iphone-duo", name: "iPhone Duo", brand: "Apple", category: "mobile-phone", price: 10000, preorder: true, image: null },
  { id: "p04", slug: "galaxy-s26-ultra-5g", name: "Galaxy S26 Ultra 5G", brand: "Samsung", category: "mobile-phone", price: 113999, regularPrice: 117000, image: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S26-Ultra-black-4396.png" },
  { id: "p05", slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple", category: "mobile-phone", price: 155499, regularPrice: 162499, image: null },
  { id: "p06", slug: "galaxy-s25-ultra-5g", name: "Galaxy S25 Ultra 5G", brand: "Samsung", category: "mobile-phone", price: 98999, regularPrice: 101000, image: null },
  { id: "p07", slug: "pixel-9", name: "Pixel 9", brand: "Google", category: "mobile-phone", price: 69999, regularPrice: 73000, image: null },
  { id: "p08", slug: "galaxy-a37-5g", name: "Galaxy A37 5G", brand: "Samsung", category: "mobile-phone", price: 36799, image: null },
  { id: "p09", slug: "motorola-edge-70-fusion", name: "Motorola Edge 70 Fusion 5G", brand: "Motorola", category: "mobile-phone", price: 37599, image: null },
  { id: "p10", slug: "galaxy-s25-5g", name: "Galaxy S25 5G", brand: "Samsung", category: "mobile-phone", price: 72999, regularPrice: 82000, image: null },
  { id: "p11", slug: "redmi-note-15-4g", name: "Redmi Note 15 4G", brand: "Xiaomi", category: "mobile-phone", price: 26399, image: null },
  { id: "p12", slug: "honor-600-pro", name: "Honor 600 Pro 5G", brand: "Honor", category: "mobile-phone", price: 76499, image: null },
  { id: "p13", slug: "iphone-15", name: "iPhone 15", brand: "Apple", category: "mobile-phone", price: 82499, image: null },
  { id: "p14", slug: "nothing-phone-4a-pro", name: "Nothing Phone (4a) Pro", brand: "Nothing", category: "mobile-phone", price: 56499, regularPrice: 58500, image: null },

  { id: "p15", slug: "ipad-11th-gen", name: "iPad 11th Gen - 2025", brand: "Apple", category: "tablet", price: 54499, regularPrice: 56499, image: null },
  { id: "p16", slug: "galaxy-tab-s10-fe-plus", name: "Galaxy Tab S10 FE+", brand: "Samsung", category: "tablet", price: 59499, image: null },
  { id: "p17", slug: "galaxy-tab-s10-fe", name: "Galaxy Tab S10 FE", brand: "Samsung", category: "tablet", price: 45499, regularPrice: 50000, image: null },
  { id: "p18", slug: "ipad-air-m4", name: "iPad Air M4 - 2026", brand: "Apple", category: "tablet", price: 91999, regularPrice: 95999, image: null },
  { id: "p19", slug: "galaxy-tab-a11", name: "Galaxy Tab A11", brand: "Samsung", category: "tablet", price: 15999, regularPrice: 16999, image: null },
  { id: "p20", slug: "xiaomi-pad-7", name: "Xiaomi Pad 7", brand: "Xiaomi", category: "tablet", price: 37499, regularPrice: 39499, image: null },

  { id: "p21", slug: "macbook-neo", name: "MacBook Neo", brand: "Apple", category: "laptops", price: 84999, image: null },
  { id: "p22", slug: "macbook-air-m5", name: "MacBook Air M5 13-Inch", brand: "Apple", category: "laptops", price: 170999, image: null },
  { id: "p23", slug: "macbook-air-m5-15-inch", name: "MacBook Air M5 15-Inch", brand: "Apple", category: "laptops", price: 198999, regularPrice: 199999, image: null },
  { id: "p24", slug: "macbook-pro-m5-pro-14-inch", name: "MacBook Pro M5 Pro 14-Inch 24/1TB", brand: "Apple", category: "laptops", price: 318999, image: null },

  { id: "p25", slug: "mac-mini-m4-16-256gb", name: "Apple Mac mini M4 - 16/256GB", brand: "Apple", category: "mac-mini", price: 96999, image: null },
  { id: "p26", slug: "mac-mini-m4-16-512gb", name: "Apple Mac mini M4 - 16/512GB", brand: "Apple", category: "mac-mini", price: 120999, regularPrice: 122999, image: null },

  { id: "p27", slug: "apple-airpods-5", name: "Apple AirPods 5", brand: "Apple", category: "airpods", price: 10000, preorder: true, image: null },
  { id: "p28", slug: "airpods-pro-2nd-generation-usbc", name: "AirPods Pro (2nd generation) USB-C", brand: "Apple", category: "airpods", price: 20999, regularPrice: 24000, image: null },
  { id: "p29", slug: "apple-airpods-4", name: "Apple AirPods 4", brand: "Apple", category: "airpods", price: 13799, regularPrice: 15500, image: null },

  { id: "p30", slug: "apple-watch-series-12", name: "Apple Watch Series 12", brand: "Apple", category: "smart-watch", price: 10000, preorder: true, image: null },
  { id: "p31", slug: "apple-watch-ultra-4", name: "Apple Watch Ultra 4", brand: "Apple", category: "smart-watch", price: 10000, preorder: true, image: null },
  { id: "p32", slug: "apple-watch-series-11", name: "Apple Watch Series 11", brand: "Apple", category: "smart-watch", price: 41499, regularPrice: 53500, image: null },
  { id: "p33", slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", brand: "Apple", category: "smart-watch", price: 97500, regularPrice: 105000, image: null },
  { id: "p34", slug: "galaxy-watch9", name: "Galaxy Watch9", brand: "Samsung", category: "smart-watch", price: 37000, newArrival: true, image: null },
  { id: "p35", slug: "galaxy-watch-ultra-2025", name: "Galaxy Watch Ultra - 2025", brand: "Samsung", category: "smart-watch", price: 41500, regularPrice: 46500, image: null },
  { id: "p36", slug: "cmf-watch-3-pro", name: "CMF by Nothing Watch 3 Pro BT Calling Smart Watch", brand: "Nothing", category: "smart-watch", price: 8999, regularPrice: 9999, image: null },

  { id: "p37", slug: "qcy-melobuds-n20-pro", name: "QCY MeloBuds N20 Pro Earbuds", brand: "QCY", category: "earbuds", price: 2549, regularPrice: 2800, newArrival: true, image: null },
  { id: "p38", slug: "galaxy-buds4-pro", name: "Galaxy Buds4 Pro", brand: "Samsung", category: "earbuds", price: 19999, regularPrice: 25500, newArrival: true, image: null },
  { id: "p39", slug: "realme-buds-air-8-pro", name: "realme Buds Air 8 Pro ANC TWS Earbuds", brand: "realme", category: "earbuds", price: 8499, newArrival: true, image: null },
  { id: "p40", slug: "realme-buds-air-8", name: "realme Buds Air 8 ANC TWS Earbuds", brand: "realme", category: "earbuds", price: 4699, regularPrice: 5500, newArrival: true, image: null },
  { id: "p41", slug: "oneplus-nord-buds-4-pro", name: "OnePlus Nord Buds 4 Pro ANC TWS Earbuds", brand: "OnePlus", category: "earbuds", price: 4649, regularPrice: 5000, newArrival: true, image: null },
  { id: "p42", slug: "anker-soundcore-r60i", name: "Anker Soundcore R60i NC TWS Earbuds", brand: "Anker", category: "earbuds", price: 2999, regularPrice: 3500, newArrival: true, image: null },

  { id: "p43", slug: "anker-soundcore-q20i", name: "Anker Soundcore Q20i Hybrid Active Noise Cancelling Headphones", brand: "Anker", category: "headphone", price: 4999, regularPrice: 5999, image: null },
  { id: "p44", slug: "plextone-g31-venom", name: "PLEXTONE G31 Venom Gaming Headphones", brand: "Plextone", category: "headphone", price: 1100, newArrival: true, image: null },
  { id: "p45", slug: "hoco-w65-plus", name: "Hoco W65 Plus ANC Wireless Headphones", brand: "Hoco", category: "headphone", price: 2000, regularPrice: 2200, image: null },

  { id: "p46", slug: "jbl-go-5", name: "JBL GO 5 Portable Waterproof Speaker", brand: "JBL", category: "speakers", price: 5799, newArrival: true, image: null },
  { id: "p47", slug: "jbl-xtreme-5", name: "JBL Xtreme 5 Portable Bluetooth Speaker", brand: "JBL", category: "speakers", price: 39300, image: null },
  { id: "p48", slug: "jbl-boombox-4", name: "JBL Boombox 4 Wireless Speaker", brand: "JBL", category: "speakers", price: 49999, image: null },
  { id: "p49", slug: "jbl-flip-7", name: "JBL Flip 7 Portable Wireless Speaker", brand: "JBL", category: "speakers", price: 11299, image: null },
  { id: "p50", slug: "anker-soundcore-flare-2", name: "Anker Soundcore Flare 2", brand: "Anker", category: "speakers", price: 5699, regularPrice: 7500, image: null },

  { id: "p51", slug: "anker-nano-45w-power-bank", name: "Anker A1638 Nano 45W Power Bank - 10000mAh", brand: "Anker", category: "power-bank", price: 4799, regularPrice: 5500, image: null },
  { id: "p52", slug: "anker-zolo-a1116-power-bank", name: "Anker Zolo A1116 45W Power Bank - 10000mAh", brand: "Anker", category: "power-bank", price: 3499, regularPrice: 5800, image: null },
  { id: "p53", slug: "apple-40w-dynamic-power-adapter", name: "Apple 40W Dynamic Power Adapter with 60W Max", brand: "Apple", category: "adapter", price: 7000, image: null },

  { id: "p54", slug: "philips-na231-air-fryer", name: "Philips NA231 Air Fryer - 6.2L", brand: "Philips", category: "home-appliances", price: 12500, regularPrice: 18500, image: null },
  { id: "p55", slug: "philips-na120-air-fryer", name: "Philips NA120/00 Air Fryer 4.2L", brand: "Philips", category: "home-appliances", price: 7500, regularPrice: 12990, image: null },
  { id: "p56", slug: "tcl-65c6ks-mini-led-tv", name: "TCL 65C6KS 65-inch Premium QD-Mini LED TV", brand: "TCL", category: "home-appliances", price: 123999, regularPrice: 151990, image: null },
  { id: "p57", slug: "miyako-af-401-cg-air-fryer", name: "Miyako AF-401-CG Inverter Air Fryer 4L", brand: "Miyako", category: "home-appliances", price: 5700, regularPrice: 6500, image: null },
  { id: "p58", slug: "philips-hl7757-mixer-grinder", name: "Philips HL7757 3 Jars Mixer Grinder - 750W", brand: "Philips", category: "home-appliances", price: 6000, regularPrice: 10450, image: null },
  { id: "p59", slug: "panasonic-mx-ge3750-mixer-grinder", name: "Panasonic MX-GE3750 3 Jars Mixer Grinder - 1200W", brand: "Panasonic", category: "home-appliances", price: 7700, regularPrice: 13000, image: null },
  { id: "p60", slug: "ecoflow-river-2-max", name: "EcoFlow River 2 Max Portable Power Station", brand: "EcoFlow", category: "home-appliances", price: 42499, regularPrice: 45900, image: null },
  { id: "p61", slug: "ecoflow-delta-3", name: "EcoFlow Delta 3 Portable Power Station", brand: "EcoFlow", category: "home-appliances", price: 71500, regularPrice: 77900, image: null },
  { id: "p62", slug: "samsung-rt47k6231-refrigerator", name: "Samsung RT47K6231UT/D3 Twin Cooling Refrigerator - 465L", brand: "Samsung", category: "home-appliances", price: 92000, regularPrice: 112900, image: null },
  { id: "p63", slug: "midea-msi-18crn-inverter-ac", name: "Midea MSI-18CRN Inverter Air Conditioner - 1.5 Ton", brand: "Midea", category: "home-appliances", price: 53999, image: null },
  { id: "p64", slug: "bluetti-premium-30-v2", name: "BLUETTI Premium 30 V2 600W Portable Power Station", brand: "Bluetti", category: "home-appliances", price: 29500, regularPrice: 31900, image: null },

  { id: "p65", slug: "philips-qp2520-trimmer", name: "Philips QP2520 Hybrid One-Blade Trimmer", brand: "Philips", category: "personal-care", price: 6850, newArrival: true, image: null },
  { id: "p66", slug: "philips-pq182-shaver", name: "Philips PQ182 Twin Rotary Blades Shaver", brand: "Philips", category: "personal-care", price: 3200, newArrival: true, image: null },
  { id: "p67", slug: "philips-bt1243-beard-trimmer", name: "Philips BT1243/18 1000 Series Beard Trimmer", brand: "Philips", category: "personal-care", price: 1799, image: null },

  { id: "p68", slug: "manli-nebula-rtx-5050", name: "Manli Nebula GeForce RTX 5050 8GB GDDR6 Graphics Card", brand: "Manli", category: "pc-components", price: 54800, image: null },
  { id: "p69", slug: "msi-rtx-5060-ti-ventus", name: "MSI GeForce RTX 5060 Ti 8G Ventus 2X Plus Graphics Card", brand: "MSI", category: "pc-components", price: 72900, image: null },
  { id: "p70", slug: "msi-b850m-gaming-plus-wifi6e", name: "MSI B850M Gaming Plus WiFi6E AM5 mATX Motherboard", brand: "MSI", category: "pc-components", price: 23800, image: null },
  { id: "p71", slug: "corsair-vengeance-ddr5-6000", name: "Corsair Vengeance DDR5 6000MHz Heatsink Desktop RAM", brand: "Corsair", category: "pc-components", price: 18900, image: null },
  { id: "p72", slug: "logitech-g512-keyboard", name: "Logitech G512 Lightsync RGB Mechanical Gaming Keyboard", brand: "Logitech", category: "pc-components", price: 11499, image: null },
  { id: "p73", slug: "dahua-lm43-f200n-monitor", name: "Dahua DHI-LM43-F200N 43-inch 60Hz FHD Monitor", brand: "Dahua", category: "pc-components", price: 45000, image: null },
  { id: "p74", slug: "logitech-mx-brio-webcam", name: "Logitech MX Brio Ultra HD 4K Webcam", brand: "Logitech", category: "pc-components", price: 23500, image: null },
  { id: "p75", slug: "hp-laserjet-pro-4003dn-printer", name: "HP LaserJet Pro 4003dn Single Function Mono Laser Printer", brand: "HP", category: "pc-components", price: 37500, regularPrice: 55000, image: null },

  { id: "p76", slug: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", category: "mobile-phone", price: 143999, regularPrice: 147500, image: null },
  { id: "p77", slug: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple", category: "mobile-phone", price: 145999, image: null },
  { id: "p78", slug: "galaxy-s25-fe-5g", name: "Galaxy S25 FE 5G", brand: "Samsung", category: "mobile-phone", price: 62499, image: null },
  { id: "p79", slug: "iphone-17", name: "iPhone 17", brand: "Apple", category: "mobile-phone", price: 107499, image: null },
  { id: "p80", slug: "iphone-16", name: "iPhone 16", brand: "Apple", category: "mobile-phone", price: 89999, image: null },
  { id: "p81", slug: "honor-600", name: "Honor 600 5G", brand: "Honor", category: "mobile-phone", price: 54999, image: null },
  { id: "p82", slug: "motorola-edge-60-pro-5g", name: "Motorola Edge 60 Pro 5G", brand: "Motorola", category: "mobile-phone", price: 44000, image: null },
  { id: "p83", slug: "galaxy-a57-5g", name: "Galaxy A57 5G", brand: "Samsung", category: "mobile-phone", price: 44099, image: null },
];
