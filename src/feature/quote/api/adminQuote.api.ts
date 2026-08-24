import api from "@/shared/api/api"
import { handleApiError } from "@/shared/api/handleApiError"
import { apiListResponseSchema } from "@/shared/api/apiResponse.schema"
import { adminQuoteSchema } from "@/feature/quote/schema/quote.schema"

const adminQuoteListResponseSchema = apiListResponseSchema(adminQuoteSchema)

// Panel admin (staff, permiso "quotes:view"): TODAS las cotizaciones, sin importar el cliente --
// único listado de cotizaciones guardadas que existe (ver quote.api.ts, saveQuoteAPI). Usa
// `api` (JWT staff), no `customerApi`.
export async function getAllQuotesAPI() {
    try {
        const { data } = await api.get("/admin/quotes")
        return adminQuoteListResponseSchema.parse(data)
    } catch (error) {
        handleApiError(error)
    }
}
