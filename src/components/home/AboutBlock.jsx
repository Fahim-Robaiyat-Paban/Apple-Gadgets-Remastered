import Reveal from "@/components/ui/Reveal";
import CategoryIcon from "@/components/ui/CategoryIcon";
import Spotlight from "@/components/ui/Spotlight";
import { tones } from "@/lib/data/tones";
import { chamferBottomLeft, chamferTopRight } from "@/lib/utils/shapes";

const blocks = [
  {
    id: "power",
    icon: "battery",
    tone: tones.sun,
    title: "Power that keeps up with power cuts",
    text: "Portable power stations, charger fans and power banks for home, travel and outdoors, so your devices keep running when the lights go out.",
  },
  {
    id: "accessories",
    icon: "headphones",
    tone: tones.sky,
    title: "Accessories for everyday devices",
    text: "Chargers, cables, adapters, hubs, smartwatches, earbuds, headphones and speakers, chosen for quality and compatibility.",
  },
  {
    id: "ecosystem",
    icon: "smartphone",
    tone: tones.coral,
    title: "The full Apple lineup, and the rest",
    text: "iPhone, iPad, MacBook, Apple Watch and AirPods alongside Samsung, Xiaomi, OnePlus and more, all with proper authenticity and support.",
  },
  {
    id: "home",
    icon: "refrigerator",
    tone: tones.sun,
    title: "Home appliances and lifestyle electronics",
    text: "Air fryers, rice cookers, blenders, TVs, refrigerators and personal care devices for everyday living.",
  },
];

// Cards alternate their cut corner and the second column sits lower, echoing the category tiles.
const AboutBlock = () => (
  <Spotlight glow="rgba(43,54,255,0.16)" className="bg-linear-to-b from-paper to-mist py-12 lg:py-20">
    <div className="site-container px-5 sm:px-8 lg:px-16">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Bangladesh&apos;s trusted tech and lifestyle store
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">
          Apple Gadgets has grown beyond a gadget shop. Genuine products, reliable service and a
          smooth shopping experience, online and in-store.
        </p>
      </Reveal>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {blocks.map((block, index) => (
          <li key={block.id} className={index % 2 === 1 ? "md:mt-10" : ""}>
            <Reveal delay={index % 2 === 0 ? 0 : 0.1} className="h-full">
              <div
                className={`flex h-full gap-5 bg-linear-to-br p-6 sm:p-8 ${
                  index % 2 === 0 ? chamferTopRight : chamferBottomLeft
                } ${block.tone.tile}`}
              >
                <span className={`grid size-12 shrink-0 place-items-center rounded-full ${block.tone.badge}`}>
                  <CategoryIcon name={block.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{block.title}</h3>
                  <p className="mt-2 text-ink/80">{block.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </Spotlight>
);

export default AboutBlock;
