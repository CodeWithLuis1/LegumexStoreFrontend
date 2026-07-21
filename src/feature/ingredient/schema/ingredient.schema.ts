import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

const ingredientTypeEnum = z.enum(["fruit", "vegetable", "pulp", "other"])

export const createIngredientSchema = z.object({
    displayName: z.string().trim().min(1).max(120),
    urlSlug: z.string().trim().min(1).max(120),
    ingredientType: ingredientTypeEnum,
    isOrganicAvailable: z.boolean().optional(),
    isMixable: z.boolean().optional(),
    costPerUnit: z.number().optional(),
    costUnitId: z.number().int().positive().optional(),
})

export const updateIngredientSchema = createIngredientSchema.partial()

export const responseIngredientSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    urlSlug: z.string(),
    ingredientType: ingredientTypeEnum,
    isOrganicAvailable: z.boolean(),
    isMixable: z.boolean(),
    costPerUnit: z.string().nullable(),
    costUnitId: z.number().int().nullable(),
})

export type CreateIngredientInput = z.infer<typeof createIngredientSchema>
export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>
export type IngredientResponse = z.infer<typeof responseIngredientSchema>
