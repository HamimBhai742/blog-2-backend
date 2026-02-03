import z from "zod";

export const postValidation = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    content: z.string().min(20, "Content must be at least 20 characters long"),
    
});