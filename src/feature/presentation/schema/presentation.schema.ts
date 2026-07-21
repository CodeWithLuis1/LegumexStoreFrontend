import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createPresentationSchema = z.object({
    displayLabel: z.string().trim().min(1).max(40),
    netWeightGrams: z.number().optional(),
    displayValue: z.number().optional(),
    displayUnitId: z.number().int().positive().optional(),
    categoryId: z.number().int().positive().optional(),
})

export const updatePresentationSchema = createPresentationSchema.partial()

export const responsePresentationSchema = baseCatalogSchema.extend({
    displayLabel: z.string(),
    netWeightGrams: z.string().nullable(),
    displayValue: z.string().nullable(),
    displayUnitId: z.number().int().nullable(),
    categoryId: z.number().int().nullable(),
})

export type CreatePresentationInput = z.infer<typeof createPresentationSchema>
export type UpdatePresentationInput = z.infer<typeof updatePresentationSchema>
export type PresentationResponse = z.infer<typeof responsePresentationSchema>
