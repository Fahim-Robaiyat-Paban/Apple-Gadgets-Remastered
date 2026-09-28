"use client";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const NavSearch = ({ onSearch, className = "" }) => {
  const router = useRouter();
  const inputId = useId();
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = value.trim();
    if (!term) return;
    router.push(`/category/all?q=${encodeURIComponent(term)}`);
    onSearch?.();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`flex ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products"
        className="h-11 min-w-0 flex-1 rounded-l-full border-2 border-r-0 border-ink bg-white px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid size-11 shrink-0 place-items-center rounded-r-full bg-ink text-paper transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
};

export default NavSearch;
