import z from "zod";

export const paymentValidation = z.object({
    amount: z.number().min(1, "Amount must be at least 1 cent"),
})