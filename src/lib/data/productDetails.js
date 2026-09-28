// Rich product content, keyed by slug. Only products listed here get the specification,
// highlights and FAQ sections plus the colour gallery; everything else falls back to the basic page.
// TODO: replace with the product API once it exists. Storage variants are left out on purpose:
// their prices aren't known, and showing a size at the wrong price would be misleading.
const IMAGE_BASE = "https://adminapi.applegadgetsbd.com/storage/media/large";

export const productDetails = {
  "galaxy-s26-ultra-5g": {
    colors: [
      { id: "black", name: "Black", image: `${IMAGE_BASE}/Galaxy-S26-Ultra-black-4396.png` },
      { id: "cobalt-violet", name: "Cobalt Violet", image: `${IMAGE_BASE}/Galaxy-S26-Ultracobaltviolet-8743.png` },
      { id: "pink-gold", name: "Pink Gold", image: `${IMAGE_BASE}/Galaxy-S26-Ultra-pinkgold-1209.png` },
      { id: "silver-shadow", name: "Silver Shadow", image: `${IMAGE_BASE}/Galaxy-S26-Ultra-silvershadow-5304.png` },
      { id: "sky-blue", name: "Sky Blue", image: `${IMAGE_BASE}/Galaxy-S26-Ultra-skyblue-9021.png` },
      { id: "white", name: "White", image: `${IMAGE_BASE}/Galaxy-S26-Ultra-white-7743.png` },
    ],
    specs: [
      { id: "body", label: "Body", value: "163.6 × 78.1 × 7.9 mm, 214 g. Gorilla Armor 2 front, Victus 2 back, aluminium frame." },
      { id: "platform", label: "Platform", value: "Android 16, One UI 8.5. Snapdragon 8 Elite Gen 5, octa-core CPU, Adreno 840 GPU." },
      { id: "display", label: "Display", value: "6.9-inch Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, up to 2600 nits, 1440 × 3120 (~498 ppi)." },
      { id: "memory", label: "Memory", value: "256GB / 12GB RAM, 512GB / 12GB RAM, 1TB / 16GB RAM." },
      { id: "main-camera", label: "Main camera", value: "Quad: 200MP wide, 10MP telephoto, 50MP telephoto, 50MP ultrawide. Video up to 8K." },
      { id: "selfie-camera", label: "Selfie camera", value: "12MP wide, dual pixel PDAF, HDR10+, 4K video." },
      { id: "battery", label: "Battery", value: "5000 mAh Li-Ion. 60W wired, 25W wireless, 4.5W reverse wireless charging." },
      { id: "network", label: "Network", value: "GSM / CDMA / HSPA / EVDO / LTE / 5G." },
      { id: "connectivity", label: "Connectivity", value: "Wi-Fi 7, Bluetooth 6.0, NFC, UWB." },
      { id: "other", label: "Other", value: "IP68 water resistance, ultrasonic fingerprint, Samsung DeX and Wireless DeX, stylus support." },
    ],
    highlights: [
      { id: "display", text: "6.9-inch LTPO AMOLED display with 120Hz smooth scrolling" },
      { id: "chip", text: "Snapdragon 8 Elite Gen 5 for heavy gaming and multitasking" },
      { id: "camera", text: "200MP quad camera system with 8K video" },
      { id: "build", text: "Aluminium frame with IP68 water and dust resistance" },
      { id: "battery", text: "5000mAh battery with fast wired and wireless charging" },
      { id: "software", text: "Android 16 with up to 7 major Android upgrades" },
    ],
    description:
      "Samsung's ultra-premium flagship pairs a large, bright display and a pro-grade camera system with a refined aluminium build. It is aimed at buyers who want top performance for photography, video, gaming and desktop-style work with DeX.",
    faqs: [
      {
        id: "stylus",
        question: "Does the Galaxy S26 Ultra support stylus input?",
        answer: "Yes. It has built-in stylus support, in line with the Ultra range, for note-taking, drawing and document editing.",
      },
      {
        id: "updates",
        question: "How long will it get software updates?",
        answer: "Samsung promises up to 7 major Android upgrades plus long-term security updates.",
      },
    ],
  },
};
