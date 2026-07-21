import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductAddinSchema = z.object({
    productId: z.number().int().positive(),
    addinId: z.number().int().positive(),
    isDefault: z.boolean().optional(),
})

export const updateProductAddinSchema = createProductAddinSchema.partial()

export const responseProductAddinSchema = baseCatalogSchema.extend({
    productId: z.number().int(),
    addinId: z.number().int(),
    isDefault: z.boolean(),
})

export type CreateProductAddinInput = z.infer<typeof createProductAddinSchema>
export type UpdateProductAddinInput = z.infer<typeof updateProductAddinSchema>
export type ProductAddinResponse = z.infer<typeof responseProductAddinSchema>
