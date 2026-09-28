"use client";
import Link from "next/link";
import { motion } from "motion/react";
import CategoryIcon from "@/components/ui/CategoryIcon";
import TiltCard from "@/components/ui/TiltCard";
import { getTone } from "@/lib/data/tones";
import { staggerContainer, stampItem } from "@/lib/utils/motion";
import { chamferBottomLeft, chamferTopRight } from "@/lib/utils/shapes";

// Tiles alternate which corner is cut, and every other one sits a little lower, so the grid
// reads like a row of hand-hung tags instead of a spreadsheet.
const CategoryGrid = ({ categories }) => (
  <motion.ul
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
  >
    {categories.map((category, index) => {
      const tone = getTone(index);

      return (
        <motion.li
          key={category.slug}
          variants={stampItem}
          className={index % 2 === 1 ? "lg:mt-8" : ""}
        >
          <TiltCard
            max={10}
            className={`bg-linear-to-br ${index % 2 === 0 ? chamferTopRight : chamferBottomLeft} ${tone.tile}`}
          >
            <Link
              href={`/category/${category.slug}`}
              className="group flex h-full min-h-36 flex-col justify-between p-4 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
            >
              <span
                className={`grid size-12 place-items-center rounded-full transition-transform duration-200 group-hover:-rotate-12 ${tone.badge}`}
              >
                <CategoryIcon name={category.icon} className="size-6" />
              </span>
              <p className="mt-6 font-bold leading-tight text-ink">{category.name}</p>
            </Link>
          </TiltCard>
        </motion.li>
      );
    })}
  </motion.ul>
);

export default CategoryGrid;
