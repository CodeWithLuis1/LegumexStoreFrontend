import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createDestinationSchema = z.object({
    displayName: z.string().trim().min(1).max(120),
    baseCost: z.number().nonnegative(),
})

export const updateDestinationSchema = createDestinationSchema.partial()

export const responseDestinationSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    // DECIMAL en Postgres: Sequelize lo devuelve como string en un SELECT normal, pero como
    // número tras un .update() -- z.coerce.number() acepta ambos formatos.
    baseCost: z.coerce.number(),
})

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>
export type DestinationResponse = z.infer<typeof responseDestinationSchema>
