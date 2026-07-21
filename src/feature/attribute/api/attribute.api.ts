import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseAttributeSchema } from "@/feature/attribute/schema/attribute.schema"
import type { CreateAttributeInput, UpdateAttributeInput } from "@/feature/attribute/schema/attribute.schema"

const attributeListResponseSchema = apiListResponseSchema(responseAttributeSchema)
const attributeItemResponseSchema = apiItemResponseSchema(responseAttributeSchema)
const attributeMutationResponseSchema = apiMutationResponseSchema(responseAttributeSchema)

export async function getAttributesAPI() {
    try {
        const { data } = await api.get("/attributes")
        return attributeListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getAttributeByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/attributes/${id}`)
        return attributeItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createAttributeAPI(formData: CreateAttributeInput) {
    try {
        const { data } = await api.post("/attributes", formData)
        return attributeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateAttributeAPI(id: number, formData: UpdateAttributeInput) {
    try {
        const { data } = await api.put(`/attributes/${id}`, formData)
        return attributeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteAttributeAPI(id: number) {
    try {
        const { data } = await api.delete(`/attributes/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
