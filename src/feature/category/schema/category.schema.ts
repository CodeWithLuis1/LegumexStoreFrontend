import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createCategorySchema = z.object({
    displayName: z.string().trim().min(1).max(80),
    fullDescription: z.string().trim().optional(),
})

export const updateCategorySchema = createCategorySchema.partial()

export const responseCategorySchema = baseCatalogSchema.extend({
    displayName: z.string(),
    fullDescription: z.string().nullable(),
    urlSlug: z.string(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type CategoryResponse = z.infer<typeof responseCategorySchema>
