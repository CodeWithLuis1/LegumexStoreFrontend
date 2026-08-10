import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductVariantSchema = z.object({
    productId: z.number().int().positive(),
    presentationId: z.number().int().positive().optional(),
    packagingId: z.number().int().positive().optional(),
    skuCode: z.string().trim().max(60).optional(),
    minimumOrderQuantity: z.number().int().optional(),
    unitsPerPallet: z.number().int().positive().optional(),
    unitsPerBox: z.number().int().positive().optional(),
})

export const updateProductVariantSchema = createProductVariantSchema.partial()

export const responseProductVariantSchema = baseCatalogSchema.extend({
    productId: z.number().int(),
    presentationId: z.number().int().nullable(),
    packagingId: z.number().int().nullable(),
    skuCode: z.string().nullable(),
    minimumOrderQuantity: z.number().int().nullable(),
    unitsPerPallet: z.number().int().nullable(),
    unitsPerBox: z.number().int().nullable(),
})

export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>
export type ProductVariantResponse = z.infer<typeof responseProductVariantSchema>
