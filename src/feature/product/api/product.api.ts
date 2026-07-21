import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseProductSchema } from "@/feature/product/schema/product.schema"
import type { CreateProductInput, UpdateProductInput } from "@/feature/product/schema/product.schema"

const productListResponseSchema = apiListResponseSchema(responseProductSchema)
const productItemResponseSchema = apiItemResponseSchema(responseProductSchema)
const productMutationResponseSchema = apiMutationResponseSchema(responseProductSchema)

export async function getProductsAPI() {
    try {
        const { data } = await api.get("/products")
        return productListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getProductByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/products/${id}`)
        return productItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createProductAPI(formData: CreateProductInput) {
    try {
        const { data } = await api.post("/products", formData)
        return productMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateProductAPI(id: number, formData: UpdateProductInput) {
    try {
        const { data } = await api.put(`/products/${id}`, formData)
        return productMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteProductAPI(id: number) {
    try {
        const { data } = await api.delete(`/products/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
