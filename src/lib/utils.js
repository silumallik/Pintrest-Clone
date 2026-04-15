import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateUsername(name) {
  return (
    name.replace(/\s+/g, "").toLowerCase() +
    Math.floor(Math.random() * 1000)
  );
}
