import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseAddinSchema } from "@/feature/addin/schema/addin.schema"
import type { CreateAddinInput, UpdateAddinInput } from "@/feature/addin/schema/addin.schema"

const addinListResponseSchema = apiListResponseSchema(responseAddinSchema)
const addinItemResponseSchema = apiItemResponseSchema(responseAddinSchema)
const addinMutationResponseSchema = apiMutationResponseSchema(responseAddinSchema)

export async function getAddinsAPI() {
    try {
        const { data } = await api.get("/addins")
        return addinListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getAddinByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/addins/${id}`)
        return addinItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createAddinAPI(formData: CreateAddinInput) {
    try {
        const { data } = await api.post("/addins", formData)
        return addinMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateAddinAPI(id: number, formData: UpdateAddinInput) {
    try {
        const { data } = await api.put(`/addins/${id}`, formData)
        return addinMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteAddinAPI(id: number) {
    try {
        const { data } = await api.delete(`/addins/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
