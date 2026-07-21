import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseProductAddinSchema } from "@/feature/product/schema/productAddin.schema"
import type { CreateProductAddinInput, UpdateProductAddinInput } from "@/feature/product/schema/productAddin.schema"

const productAddinListResponseSchema = apiListResponseSchema(responseProductAddinSchema)
const productAddinItemResponseSchema = apiItemResponseSchema(responseProductAddinSchema)
const productAddinMutationResponseSchema = apiMutationResponseSchema(responseProductAddinSchema)

export async function getProductAddinsAPI() {
    try {
        const { data } = await api.get("/product-addins")
        return productAddinListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getProductAddinByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/product-addins/${id}`)
        return productAddinItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createProductAddinAPI(formData: CreateProductAddinInput) {
    try {
        const { data } = await api.post("/product-addins", formData)
        return productAddinMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateProductAddinAPI(id: number, formData: UpdateProductAddinInput) {
    try {
        const { data } = await api.put(`/product-addins/${id}`, formData)
        return productAddinMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteProductAddinAPI(id: number) {
    try {
        const { data } = await api.delete(`/product-addins/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
