import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const createPackagingSchema = z.object({
    displayName: z.string().trim().min(1).max(80),
    packagingMaterial: z.string().trim().max(80).optional(),
    capacityValue: z.number().optional(),
    capacityUnitId: z.number().int().positive().optional(),
    unitCost: z.number().optional(),
})

export const updatePackagingSchema = createPackagingSchema.partial()

export const responsePackagingSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    packagingMaterial: z.string().nullable(),
    capacityValue: z.string().nullable(),
    capacityUnitId: z.number().int().nullable(),
    unitCost: z.string().nullable(),
})

export type CreatePackagingInput = z.infer<typeof createPackagingSchema>
export type UpdatePackagingInput = z.infer<typeof updatePackagingSchema>
export type PackagingResponse = z.infer<typeof responsePackagingSchema>
