import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseSubCategorySchema } from "@/feature/category/schema/subCategory.schema"
import type { CreateSubCategoryInput, UpdateSubCategoryInput } from "@/feature/category/schema/subCategory.schema"

const subCategoryListResponseSchema = apiListResponseSchema(responseSubCategorySchema)
const subCategoryItemResponseSchema = apiItemResponseSchema(responseSubCategorySchema)
const subCategoryMutationResponseSchema = apiMutationResponseSchema(responseSubCategorySchema)

export async function getSubCategoriesAPI() {
    try {
        const { data } = await api.get("/sub-categories")
        return subCategoryListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getSubCategoryByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/sub-categories/${id}`)
        return subCategoryItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createSubCategoryAPI(formData: CreateSubCategoryInput) {
    try {
        const { data } = await api.post("/sub-categories", formData)
        return subCategoryMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateSubCategoryAPI(id: number, formData: UpdateSubCategoryInput) {
    try {
        const { data } = await api.put(`/sub-categories/${id}`, formData)
        return subCategoryMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteSubCategoryAPI(id: number) {
    try {
        const { data } = await api.delete(`/sub-categories/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
