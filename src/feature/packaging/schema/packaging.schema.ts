import { z } from "zod"
import { baseCatalogSchema } from "@/shared/schema/baseCatalog.schema"

export const packagingRoleEnum = z.enum(["unit", "pallet"])

export const createPackagingSchema = z.object({
    displayName: z.string().trim().min(1).max(80),
    // Requerido: sin packagingRole el material queda invisible tanto para el selector de
    // empaque unitario ("unit") como para el de materiales de palet ("pallet").
    packagingRole: packagingRoleEnum,
    // Requerido: unitCost alimenta directo el costo de empaque unitario y de paletización en
    // el cotizador. Si falta, esa línea de costo queda en 0 sin ningún aviso.
    unitCost: z.number().nonnegative(),
})

// .partial() salvo packagingRole/unitCost -- no pueden quedar vacíos ni siquiera al editar
// un registro existente (ver comentario arriba).
export const updatePackagingSchema = createPackagingSchema.partial().extend({
    packagingRole: createPackagingSchema.shape.packagingRole,
    unitCost: createPackagingSchema.shape.unitCost,
})

export const responsePackagingSchema = baseCatalogSchema.extend({
    displayName: z.string(),
    packagingRole: packagingRoleEnum,
    packagingMaterial: z.string().nullable(),
    unitCost: z.coerce.number().nullable(),
})

export type CreatePackagingInput = z.infer<typeof createPackagingSchema>
export type UpdatePackagingInput = z.infer<typeof updatePackagingSchema>
export type PackagingResponse = z.infer<typeof responsePackagingSchema>
