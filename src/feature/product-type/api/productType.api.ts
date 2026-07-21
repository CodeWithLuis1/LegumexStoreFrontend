import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseProductTypeSchema } from "@/feature/product-type/schema/productType.schema"
import type { CreateProductTypeInput, UpdateProductTypeInput } from "@/feature/product-type/schema/productType.schema"

const productTypeListResponseSchema = apiListResponseSchema(responseProductTypeSchema)
const productTypeItemResponseSchema = apiItemResponseSchema(responseProductTypeSchema)
const productTypeMutationResponseSchema = apiMutationResponseSchema(responseProductTypeSchema)

export async function getProductTypesAPI() {
    try {
        const { data } = await api.get("/product-types")
        return productTypeListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getProductTypeByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/product-types/${id}`)
        return productTypeItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createProductTypeAPI(formData: CreateProductTypeInput) {
    try {
        const { data } = await api.post("/product-types", formData)
        return productTypeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateProductTypeAPI(id: number, formData: UpdateProductTypeInput) {
    try {
        const { data } = await api.put(`/product-types/${id}`, formData)
        return productTypeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteProductTypeAPI(id: number) {
    try {
        const { data } = await api.delete(`/product-types/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
