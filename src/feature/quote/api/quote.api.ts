import customerApi from "@/shared/api/customerApi"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiItemResponseSchema, apiListResponseSchema, apiMutationResponseSchema } from "@/shared/api/apiResponse.schema"
import {
    quotableProductSchema,
    quoteDestinationSchema,
    quoteCalculationSchema,
    savedQuoteSchema,
} from "@/feature/quote/schema/quote.schema"
import type { CalculateQuoteInput } from "@/feature/quote/schema/quote.schema"

const quoteProductListResponseSchema = apiListResponseSchema(quotableProductSchema)
const quoteDestinationListResponseSchema = apiListResponseSchema(quoteDestinationSchema)
const quoteCalculationResponseSchema = apiItemResponseSchema(quoteCalculationSchema)
const saveQuoteResponseSchema = apiMutationResponseSchema(savedQuoteSchema)
const myQuotesResponseSchema = apiListResponseSchema(savedQuoteSchema)

export async function getQuoteProductsAPI() {
    try {
        const { data } = await customerApi.get("/quotes/products")
        return quoteProductListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getQuoteDestinationsAPI() {
    try {
        const { data } = await customerApi.get("/quotes/destinations")
        return quoteDestinationListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function previewQuoteAPI(formData: CalculateQuoteInput) {
    try {
        const { data } = await customerApi.post("/quotes/preview", formData)
        return quoteCalculationResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function saveQuoteAPI(formData: CalculateQuoteInput) {
    try {
        const { data } = await customerApi.post("/quotes", formData)
        return saveQuoteResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}

export async function getMyQuotesAPI() {
    try {
        const { data } = await customerApi.get("/quotes/mine")
        return myQuotesResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
