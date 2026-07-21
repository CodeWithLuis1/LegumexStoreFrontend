import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createProductIngredientSchema = z.object({
    productId: z.number().int().positive(),
    ingredientId: z.number().int().positive(),
    proportionPercent: z.number().min(0).max(999.99).optional(),
    quantityValue: z.number().optional(),
    quantityUnitId: z.number().int().positive().optional(),
    displayOrder: z.number().int().optional(),
})

export const updateProductIngredientSchema = createProductIngredientSchema.partial()

export const responseProductIngredientSchema = baseCatalogSchema.extend({
    productId: z.number().int(),
    ingredientId: z.number().int(),
    proportionPercent: z.string().nullable(),
    quantityValue: z.string().nullable(),
    quantityUnitId: z.number().int().nullable(),
    displayOrder: z.number().int(),
})

export type CreateProductIngredientInput = z.infer<typeof createProductIngredientSchema>
export type UpdateProductIngredientInput = z.infer<typeof updateProductIngredientSchema>
export type ProductIngredientResponse = z.infer<typeof responseProductIngredientSchema>
