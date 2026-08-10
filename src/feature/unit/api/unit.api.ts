import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseUnitSchema } from "@/feature/unit/schema/unit.schema"
import type { CreateUnitInput, UpdateUnitInput } from "@/feature/unit/schema/unit.schema"

const unitListResponseSchema = apiListResponseSchema(responseUnitSchema)
const unitItemResponseSchema = apiItemResponseSchema(responseUnitSchema)
const unitMutationResponseSchema = apiMutationResponseSchema(responseUnitSchema)

export async function getUnitsAPI() {
    try {
        const { data } = await api.get("/units")
        return unitListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getUnitByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/units/${id}`)
        return unitItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createUnitAPI(formData: CreateUnitInput) {
    try {
        const { data } = await api.post("/units", formData)
        console.log("createUnitAPI data:", data)
        return unitMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateUnitAPI(id: number, formData: UpdateUnitInput) {
    try {
        const { data } = await api.put(`/units/${id}`, formData)
        return unitMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteUnitAPI(id: number) {
    try {
        const { data } = await api.delete(`/units/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
