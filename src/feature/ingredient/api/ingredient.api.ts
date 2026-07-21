import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseIngredientSchema } from "@/feature/ingredient/schema/ingredient.schema"
import type { CreateIngredientInput, UpdateIngredientInput } from "@/feature/ingredient/schema/ingredient.schema"

const ingredientListResponseSchema = apiListResponseSchema(responseIngredientSchema)
const ingredientItemResponseSchema = apiItemResponseSchema(responseIngredientSchema)
const ingredientMutationResponseSchema = apiMutationResponseSchema(responseIngredientSchema)

export async function getIngredientsAPI() {
    try {
        const { data } = await api.get("/ingredients")
        return ingredientListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getIngredientByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/ingredients/${id}`)
        return ingredientItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createIngredientAPI(formData: CreateIngredientInput) {
    try {
        const { data } = await api.post("/ingredients", formData)
        return ingredientMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateIngredientAPI(id: number, formData: UpdateIngredientInput) {
    try {
        const { data } = await api.put(`/ingredients/${id}`, formData)
        return ingredientMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteIngredientAPI(id: number) {
    try {
        const { data } = await api.delete(`/ingredients/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
