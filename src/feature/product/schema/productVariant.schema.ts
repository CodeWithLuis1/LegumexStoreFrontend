import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductVariantSchema = z.object({
    productId: z.number().int().positive(),
    presentationId: z.number().int().positive().optional(),
    packagingId: z.number().int().positive().optional(),
    skuCode: z.string().trim().max(60).optional(),
    unitPrice: z.number().optional(),
    unitCost: z.number().optional(),
    isPriceManual: z.boolean().optional(),
    minimumOrderQuantity: z.number().int().optional(),
})

export const updateProductVariantSchema = createProductVariantSchema.partial()

export const responseProductVariantSchema = baseCatalogSchema.extend({
    productId: z.number().int(),
    presentationId: z.number().int().nullable(),
    packagingId: z.number().int().nullable(),
    skuCode: z.string().nullable(),
    unitPrice: z.string().nullable(),
    unitCost: z.string().nullable(),
    isPriceManual: z.boolean(),
    minimumOrderQuantity: z.number().int().nullable(),
})

export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>
export type ProductVariantResponse = z.infer<typeof responseProductVariantSchema>
