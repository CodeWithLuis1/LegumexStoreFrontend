import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductAttributeSchema = z.object({
    productId: z.number().int().positive(),
    attributeId: z.number().int().positive(),
    valueString: z.string().trim().max(255).optional(),
    valueNumber: z.number().optional(),
    valueBoolean: z.boolean().optional(),
})

export const updateProductAttributeSchema = createProductAttributeSchema.partial()

export const responseProductAttributeSchema = baseCatalogSchema.extend({
    productId: z.number().int(),
    attributeId: z.number().int(),
    valueString: z.string().nullable(),
    valueNumber: z.string().nullable(),
    valueBoolean: z.boolean().nullable(),
})

export type CreateProductAttributeInput = z.infer<typeof createProductAttributeSchema>
export type UpdateProductAttributeInput = z.infer<typeof updateProductAttributeSchema>
export type ProductAttributeResponse = z.infer<typeof responseProductAttributeSchema>
