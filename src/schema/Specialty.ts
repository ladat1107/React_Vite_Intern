import { z } from "zod";

export const SpecialtySchema = z.object({
    name: z.string().min(1, "Name is required"),
    shortDescription: z.string().min(1, "Short Description is required"),
});

// extract the inferred type
export type TSpecialtySchema = z.infer<typeof SpecialtySchema>;
