import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseProductAttributeSchema } from "@/feature/product/schema/productAttribute.schema"
import type { CreateProductAttributeInput, UpdateProductAttributeInput } from "@/feature/product/schema/productAttribute.schema"

const productAttributeListResponseSchema = apiListResponseSchema(responseProductAttributeSchema)
const productAttributeItemResponseSchema = apiItemResponseSchema(responseProductAttributeSchema)
const productAttributeMutationResponseSchema = apiMutationResponseSchema(responseProductAttributeSchema)

export async function getProductAttributesAPI() {
    try {
        const { data } = await api.get("/product-attributes")
        return productAttributeListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getProductAttributeByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/product-attributes/${id}`)
        return productAttributeItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createProductAttributeAPI(formData: CreateProductAttributeInput) {
    try {
        const { data } = await api.post("/product-attributes", formData)
        return productAttributeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateProductAttributeAPI(id: number, formData: UpdateProductAttributeInput) {
    try {
        const { data } = await api.put(`/product-attributes/${id}`, formData)
        return productAttributeMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteProductAttributeAPI(id: number) {
    try {
        const { data } = await api.delete(`/product-attributes/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
