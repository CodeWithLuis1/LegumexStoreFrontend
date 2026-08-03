import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMessageResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import { responseCustomerSchema } from "@/feature/customer/schema/customer.schema"
import type { CreateCustomerInput, UpdateCustomerInput } from "@/feature/customer/schema/customer.schema"

const customerListResponseSchema = apiListResponseSchema(responseCustomerSchema)
const customerItemResponseSchema = apiItemResponseSchema(responseCustomerSchema)
const customerMutationResponseSchema = apiMutationResponseSchema(responseCustomerSchema)

export async function getCustomersAPI() {
    try {
        const { data } = await api.get("/customers")
        return customerListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getCustomerByIdAPI(id: number) {
    try {
        const { data } = await api.get(`/customers/${id}`)
        return customerItemResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function createCustomerAPI(formData: CreateCustomerInput) {
    try {
        const { data } = await api.post("/customers", formData)
        return customerMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function updateCustomerAPI(id: number, formData: UpdateCustomerInput) {
    try {
        const { data } = await api.patch(`/customers/${id}`, formData)
        return customerMutationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function deleteCustomerAPI(id: number) {
    try {
        const { data } = await api.delete(`/customers/${id}`)
        return apiMessageResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
