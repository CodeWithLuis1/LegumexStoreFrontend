import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseUserSchema } from "@/feature/user/schema/user.schema"
import type { CreateUserInput, UpdateUserInput } from "@/feature/user/schema/user.schema"

const userListResponseSchema = apiListResponseSchema(responseUserSchema)
const userItemResponseSchema = apiItemResponseSchema(responseUserSchema)
const userMutationResponseSchema = apiMutationResponseSchema(responseUserSchema)

export async function getUsersAPI() {
    try {
        const { data } = await api.get("/users")
        return userListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getUserByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/users/${id}`)
        return userItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createUserAPI(formData: CreateUserInput) {
    try {
        const { data } = await api.post("/users", formData)
        return userMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateUserAPI(id: number, formData: UpdateUserInput) {
    try {
        const { data } = await api.patch(`/users/${id}`, formData)
        return userMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteUserAPI(id: number) {
    try {
        const { data } = await api.delete(`/users/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
