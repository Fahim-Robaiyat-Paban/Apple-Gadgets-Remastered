"use client";
import { useState } from "react";
import { formatPrice } from "@/lib/utils/formatters";

const MONTH_OPTIONS = [3, 6, 12, 24, 36];
export const EMI_MIN_AMOUNT = 5000; // the current site offers EMI on orders above ৳ 5,000

// A rough planning aid only: price divided by months, before any bank charges or offers.
const EmiEstimator = ({ price }) => {
  const [months, setMonths] = useState(12);

  if (price < EMI_MIN_AMOUNT) return null;

  return (
    <div className="rounded-3xl border-2 border-ink bg-white p-4">
      <p className="font-semibold">EMI available for orders above {formatPrice(EMI_MIN_AMOUNT)}</p>
      <div role="group" aria-label="EMI months" className="mt-3 flex flex-wrap gap-2">
        {MONTH_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={months === option}
            onClick={() => setMonths(option)}
            className={`min-h-11 min-w-14 rounded-full border-2 border-ink px-3 font-mono text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              months === option ? "bg-ink text-paper" : "hover:bg-sticker"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold">
        {formatPrice(Math.ceil(price / months))}
        <span className="ml-2 text-sm font-normal text-ink/70">a month for {months} months</span>
      </p>
      <p className="mt-1 text-sm text-ink/70">
        Estimate only (price ÷ months, before bank charges). Final EMI terms are confirmed at checkout.
      </p>
    </div>
  );
};

export default EmiEstimator;
