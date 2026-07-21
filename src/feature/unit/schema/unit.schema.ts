import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

const unitTypeEnum = z.enum(["weight", "volume", "count"])

export const createUnitSchema = z.object({
    unitCode: z.string().trim().min(1).max(40),
    displayName: z.string().trim().min(1).max(80),
    unitType: unitTypeEnum,
    baseFactor: z.number().positive(),
})

export const updateUnitSchema = createUnitSchema.partial()

export const responseUnitSchema = baseCatalogSchema.extend({
    unitCode: z.string(),
    displayName: z.string(),
    unitType: unitTypeEnum,
    baseFactor: z.string(),
})

export type CreateUnitInput = z.infer<typeof createUnitSchema>
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>
export type UnitResponse = z.infer<typeof responseUnitSchema>
