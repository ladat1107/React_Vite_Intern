import { z } from "zod";

export const PostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
});

// extract the inferred type
export type TPostSchema = z.infer<typeof PostSchema>;
