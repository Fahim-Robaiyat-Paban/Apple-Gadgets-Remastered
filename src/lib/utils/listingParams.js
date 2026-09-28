export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Biggest discount" },
];

// Merges `updates` into an existing URLSearchParams. null/""/undefined removes a key.
export const buildQuery = (currentParams, updates) => {
  const next = new URLSearchParams(currentParams.toString());
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  });
  const query = next.toString();
  return query ? `?${query}` : "";
};

export const first = (value) => (Array.isArray(value) ? value[0] : value);

// Positive whole number from a URL param, or undefined.
export const parsePositiveNumber = (value) => {
  const number = Number(first(value));
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : undefined;
};

// Flattens Next's searchParams object into URLSearchParams (first value of each key).
export const toSearchParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    const single = first(value);
    if (single) params.set(key, single);
  });
  return params;
};
