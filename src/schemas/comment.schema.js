import { z } from "zod";

/* ================= ADD COMMENT ================= */

export const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(300, "Comment too long"),

  pinId: z
    .string()
    .min(1, "Pin ID is required"),
});
