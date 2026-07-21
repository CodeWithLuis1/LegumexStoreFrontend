import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responsePackagingSchema } from "@/feature/packaging/schema/packaging.schema"
import type { CreatePackagingInput, UpdatePackagingInput } from "@/feature/packaging/schema/packaging.schema"

const packagingListResponseSchema = apiListResponseSchema(responsePackagingSchema)
const packagingItemResponseSchema = apiItemResponseSchema(responsePackagingSchema)
const packagingMutationResponseSchema = apiMutationResponseSchema(responsePackagingSchema)

export async function getPackagingsAPI() {
    try {
        const { data } = await api.get("/packagings")
        return packagingListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getPackagingByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/packagings/${id}`)
        return packagingItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createPackagingAPI(formData: CreatePackagingInput) {
    try {
        const { data } = await api.post("/packagings", formData)
        return packagingMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updatePackagingAPI(id: number, formData: UpdatePackagingInput) {
    try {
        const { data } = await api.put(`/packagings/${id}`, formData)
        return packagingMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deletePackagingAPI(id: number) {
    try {
        const { data } = await api.delete(`/packagings/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
