import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiListResponseSchema } from "@/shared/api/apiResponse.schema"
import { adminQuoteSchema } from "@/feature/quote/schema/quote.schema"

const adminQuoteListResponseSchema = apiListResponseSchema(adminQuoteSchema)

// Panel admin (staff, permiso "quotes:view"): TODAS las cotizaciones, sin importar el cliente.
// Usa `api` (JWT staff), no `customerApi` -- distinto de getMyQuotesAPI en quote.api.ts.
export async function getAllQuotesAPI() {
    try {
        const { data } = await api.get("/admin/quotes")
        return adminQuoteListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
