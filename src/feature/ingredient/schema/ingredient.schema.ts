import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

const ingredientTypeEnum = z.enum(["fruit", "vegetable", "pulp", "other"])

export const createIngredientSchema = z.object({
    displayName: z.string().trim().min(1).max(120),
    ingredientType: ingredientTypeEnum,
    isOrganic: z.boolean().optional(),
    isMixable: z.boolean().optional(),
    // Requeridos: el motor de cotización multiplica costPerUnit * cantidad, y en productos
    // personalizables además divide por costUnit.baseFactor. Si cualquiera de los dos falta,
    // el costo de esa línea queda mal (en 0, o sin convertir de gramos) sin ningún aviso.
    costPerUnit: z.number().nonnegative(),
    costUnitId: z.number().int().positive(),
})

// .partial() salvo costPerUnit/costUnitId: si se dejaran opcionales aquí, un admin podría
// editar un ingrediente existente y volver a dejarlos vacíos sin que el formulario lo impida.
export const updateIngredientSchema = createIngredientSchema.partial().extend({
    costPerUnit: createIngredientSchema.shape.costPerUnit,
    costUnitId: createIngredientSchema.shape.costUnitId,
})

export const responseIngredientSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    urlSlug: z.string(),
    ingredientType: ingredientTypeEnum,
    isOrganic: z.boolean(),
    isMixable: z.boolean(),
    // DECIMAL en Postgres: Sequelize lo devuelve como string en un SELECT normal, pero como
    // número tras un .update() (mismo caso que netWeightGrams/unitCost/baseCost). z.coerce.number()
    // acepta ambos formatos -- antes esto rompía el PUT con "server response does not have the
    // expected format" aunque el update sí se guardara en la BD.
    costPerUnit: z.coerce.number().nullable(),
    costUnitId: z.number().int().nullable(),
})

export type CreateIngredientInput = z.infer<typeof createIngredientSchema>
export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>
export type IngredientResponse = z.infer<typeof responseIngredientSchema>
