export const formatPrice = (amount) => `৳ ${amount.toLocaleString("en-US")}`;

export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
