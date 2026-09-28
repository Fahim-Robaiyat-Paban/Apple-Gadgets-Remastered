"use client";
import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/store/useCartStore";

const stepperButton =
  "grid size-11 place-items-center border-2 border-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink";

const QuantityStepper = ({ value, onChange, label }) => (
  <div role="group" aria-label={label} className="flex items-center">
    <button
      type="button"
      aria-label="Decrease quantity"
      disabled={value <= 1}
      onClick={() => onChange(value - 1)}
      className={`${stepperButton} rounded-l-full`}
    >
      <Minus className="size-4" aria-hidden="true" />
    </button>
    <p className="grid h-11 min-w-12 place-items-center border-y-2 border-ink bg-white font-mono font-semibold">
      {value}
    </p>
    <button
      type="button"
      aria-label="Increase quantity"
      disabled={value >= MAX_QUANTITY}
      onClick={() => onChange(value + 1)}
      className={`${stepperButton} rounded-r-full`}
    >
      <Plus className="size-4" aria-hidden="true" />
    </button>
  </div>
);

export default QuantityStepper;
