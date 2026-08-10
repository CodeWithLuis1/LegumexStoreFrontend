import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductSchema = z.object({
    subCategoryId: z.number().int().positive(),
    productTypeId: z.number().int().positive(),
    displayName: z.string().trim().min(1).max(120),
    isOrganic: z.boolean().optional(),
    isCustomizable: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.partial()

export const responseProductSchema = baseCatalogSchema.extend({
    subCategoryId: z.number().int(),
    productTypeId: z.number().int(),
    displayName: z.string(),
    urlSlug: z.string(),
    isOrganic: z.boolean(),
    isCustomizable: z.boolean(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductResponse = z.infer<typeof responseProductSchema>
