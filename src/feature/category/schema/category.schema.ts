import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createCategorySchema = z.object({
    displayName: z.string().trim().min(1).max(80),
    urlSlug: z.string().trim().min(1).max(80),
    fullDescription: z.string().trim().optional(),
    displayOrder: z.number().int().optional(),
    defaultMargin: z.number().min(0).max(999.99).optional(),
})

export const updateCategorySchema = createCategorySchema.partial()

export const responseCategorySchema = baseCatalogSchema.extend({
    displayName: z.string(),
    urlSlug: z.string(),
    fullDescription: z.string().nullable(),
    displayOrder: z.number().int(),
    defaultMargin: z.string().nullable(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type CategoryResponse = z.infer<typeof responseCategorySchema>
