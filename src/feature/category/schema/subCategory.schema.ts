import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createSubCategorySchema = z.object({
    categoryId: z.number().int().positive(),
    displayName: z.string().trim().min(1).max(80),
    urlSlug: z.string().trim().min(1).max(80),
    fullDescription: z.string().trim().optional(),
    displayOrder: z.number().int().optional(),
})

export const updateSubCategorySchema = createSubCategorySchema.partial()

export const responseSubCategorySchema = baseCatalogSchema.extend({
    categoryId: z.number().int(),
    displayName: z.string(),
    urlSlug: z.string(),
    fullDescription: z.string().nullable(),
    displayOrder: z.number().int(),
})

export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>
export type UpdateSubCategoryInput = z.infer<typeof updateSubCategorySchema>
export type SubCategoryResponse = z.infer<typeof responseSubCategorySchema>
