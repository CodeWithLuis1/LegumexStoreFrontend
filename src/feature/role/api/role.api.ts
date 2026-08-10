import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseRoleSchema } from "@/feature/role/schema/role.schema"
import type { CreateRoleInput, UpdateRoleInput } from "@/feature/role/schema/role.schema"

const roleListResponseSchema = apiListResponseSchema(responseRoleSchema)
const roleItemResponseSchema = apiItemResponseSchema(responseRoleSchema)
const roleMutationResponseSchema = apiMutationResponseSchema(responseRoleSchema)

export async function getRolesAPI() {
    try {
        const { data } = await api.get("/roles")
        return roleListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getRoleByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/roles/${id}`)
        return roleItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createRoleAPI(formData: CreateRoleInput) {
    try {
        const { data } = await api.post("/roles", formData)
        return roleMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateRoleAPI(id: number, formData: UpdateRoleInput) {
    try {
        const { data } = await api.patch(`/roles/${id}`, formData)
        return roleMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteRoleAPI(id: number) {
    try {
        const { data } = await api.delete(`/roles/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
