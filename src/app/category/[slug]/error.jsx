"use client";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

const CategoryError = ({ error, reset }) => {
  // The real error goes to the console; the visitor only sees a clean message.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24 bg-linear-to-b from-mist to-paper">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Something went wrong on this shelf.</h1>
        <p className="mt-3 max-w-md text-ink/80">We couldn&apos;t load these products. Please try again.</p>
        <Button onClick={reset} variant="sticker" className="mt-6">
          Try again
        </Button>
      </div>
    </section>
  );
};

export default CategoryError;
