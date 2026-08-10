import { z } from "zod"

export const syncRolePermissionsSchema = z.object({
    permissionIds: z.array(z.number().int().positive()),
})

export type SyncRolePermissionsInput = z.infer<typeof syncRolePermissionsSchema>
