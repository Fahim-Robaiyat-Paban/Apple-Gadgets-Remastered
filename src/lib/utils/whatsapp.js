import { WHATSAPP_NUMBER } from "@/lib/data/contact";
import { formatPrice } from "@/lib/utils/formatters";

export const getWhatsAppUrl = (message = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const buildOrderMessage = (items, total) =>
  [
    "Hi, I'd like to order:",
    ...items.map(
      (item) =>
        `${item.quantity} x ${item.name}${item.variant ? ` (${item.variant})` : ""} - ${formatPrice(item.price * item.quantity)}`,
    ),
    `Total: ${formatPrice(total)}`,
  ].join("\n");
