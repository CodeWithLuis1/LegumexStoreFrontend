import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createAddinSchema = z.object({
    displayName: z.string().trim().min(1).max(80),
    fullDescription: z.string().trim().optional(),
    costPerServing: z.number().optional(),
})

export const updateAddinSchema = createAddinSchema.partial()

export const responseAddinSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    fullDescription: z.string().nullable(),
    costPerServing: z.string().nullable(),
})

export type CreateAddinInput = z.infer<typeof createAddinSchema>
export type UpdateAddinInput = z.infer<typeof updateAddinSchema>
export type AddinResponse = z.infer<typeof responseAddinSchema>
