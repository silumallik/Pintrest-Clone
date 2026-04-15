import { z } from "zod";

/* ================= CREATE PIN ================= */

export const createPinSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),

  description: z
    .string()
    .max(500, "Description too long")
    .optional(),

  category: z
    .string()
    .min(2, "Category required"),

  image: z
    .string()
    .url("Image must be valid URL"),
});

/* ================= UPDATE PIN ================= */

export const updatePinSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
});
