import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

const attributeDataType = z.enum(["string", "number", "boolean", "date"])

export const createAttributeSchema = z.object({
    attributeName: z.string().trim().min(1).max(80),
    dataType: attributeDataType,
    unitLabel: z.string().trim().max(20).optional(),
})

export const updateAttributeSchema = createAttributeSchema.partial()

export const responseAttributeSchema = baseCatalogSchema.extend({
    attributeName: z.string(),
    dataType: attributeDataType,
    unitLabel: z.string().nullable(),
})

export type CreateAttributeInput = z.infer<typeof createAttributeSchema>
export type UpdateAttributeInput = z.infer<typeof updateAttributeSchema>
export type AttributeResponse = z.infer<typeof responseAttributeSchema>
