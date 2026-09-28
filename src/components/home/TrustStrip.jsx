import { BadgePercent, CreditCard, Repeat, Truck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const points = [
  { id: "emi", label: "36 Months EMI", Icon: CreditCard },
  { id: "delivery", label: "Fastest Home Delivery", Icon: Truck },
  { id: "exchange", label: "Exchange Facility", Icon: Repeat },
  { id: "price", label: "Best Price Deals", Icon: BadgePercent },
  { id: "service", label: "After-Sales Service", Icon: Wrench },
];

const TrustStrip = () => (
  <section className="bg-linear-to-r from-sticker via-amber-300 to-sticker pt-3 text-ink">
    <Reveal>
      <ul className="site-container grid grid-cols-2 gap-x-6 px-5 py-3 sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:px-16">
        {points.map(({ id, label, Icon }) => (
          <li key={id} className="flex items-center gap-3 py-3 text-sm font-bold">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-sticker">
              <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </Reveal>
  </section>
);

export default TrustStrip;
