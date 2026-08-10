import { z } from "zod"
import { responseDestinationSchema } from "@/feature/destination/schema/destination.schema"

export const quotableVariantSchema = z.object({
    id: z.number().int(),
    skuCode: z.string().nullable(),
    unitsPerPallet: z.number().int(),
    minimumOrderQuantity: z.number().int().nullable(),
    presentationLabel: z.string().nullable(),
    packagingLabel: z.string().nullable(),
})

export const quotableIngredientOptionSchema = z.object({
    ingredientId: z.number().int(),
    displayName: z.string(),
    isOrganic: z.boolean(),
    minPercentage: z.number(),
    maxPercentage: z.number(),
})

export const quotableProductSchema = z.object({
    id: z.number().int(),
    displayName: z.string(),
    isOrganic: z.boolean(),
    isCustomizable: z.boolean(),
    productTypeName: z.string().nullable(),
    ingredientPool: z.array(quotableIngredientOptionSchema),
    variants: z.array(quotableVariantSchema),
})

export const quoteDestinationSchema = responseDestinationSchema

// Solo se envía cuando el producto elegido es customizable (ver QuotableProduct.isCustomizable);
// el cliente arma la mezcla y debe sumar 100% (con tolerancia de redondeo, valida el backend).
const ingredientMixLineSchema = z.object({
    ingredientId: z.number().int().positive(),
    percentage: z.number().min(0).max(100),
})

export const calculateQuoteSchema = z.object({
    productVariantId: z.number().int().positive(),
    destinationId: z.number().int().positive(),
    requestedPallets: z.number().int().min(1),
    ingredientMix: z.array(ingredientMixLineSchema).optional(),
})

const rawMaterialLineSchema = z.object({
    ingredientId: z.number().int(),
    displayName: z.string(),
    unitCost: z.number(),
    quantityPerUnit: z.number(),
    totalUnits: z.number(),
    lineTotal: z.number(),
})

const unitPackagingLineSchema = z.object({
    packagingId: z.number().int(),
    displayName: z.string(),
    unitCost: z.number(),
    totalUnits: z.number(),
    lineTotal: z.number(),
})

const palletMaterialLineSchema = z.object({
    packagingId: z.number().int(),
    displayName: z.string(),
    unitCost: z.number(),
    quantityPerPallet: z.number(),
    requestedPallets: z.number(),
    lineTotal: z.number(),
})

const transportLineSchema = z.object({
    destinationId: z.number().int(),
    displayName: z.string(),
    baseCost: z.number(),
})

export const quoteCalculationSchema = z.object({
    productVariantId: z.number().int(),
    destinationId: z.number().int(),
    productDisplayName: z.string(),
    variantLabel: z.string().nullable(),
    requestedPallets: z.number().int(),
    totalUnits: z.number(),
    // El preview calcula estos valores en JS (siempre llegan como número), pero al leer una
    // cotización ya guardada vienen de columnas DECIMAL de Postgres, que Sequelize serializa
    // como string (mismo comportamiento que costPerUnit/unitCost/baseCost en el resto del repo).
    // z.coerce.number() acepta ambos casos sin romper ninguno de los dos consumidores.
    rawMaterialCost: z.coerce.number(),
    unitPackagingCost: z.coerce.number(),
    palletMaterialCost: z.coerce.number(),
    transportCost: z.coerce.number(),
    totalCost: z.coerce.number(),
    breakdown: z.object({
        rawMaterials: z.array(rawMaterialLineSchema),
        unitPackaging: unitPackagingLineSchema.nullable(),
        palletMaterials: z.array(palletMaterialLineSchema),
        transport: transportLineSchema,
    }),
})

// Cotización ya guardada -- mismo shape que el cálculo (preview), más lo que agrega la persistencia.
export const savedQuoteSchema = quoteCalculationSchema.extend({
    id: z.number().int(),
    createdAt: z.coerce.date(),
})

// Solo lo que el panel admin necesita mostrar de "quién pidió la cotización" -- no el objeto
// Customer completo (evita filtrar password/failed_attempts/etc., que ya se excluyen en el
// backend, pero además mantiene el contrato de esta pantalla mínimo a propósito).
export const quoteCustomerSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    companyName: z.string().nullable(),
    email: z.string(),
})

// Vista admin de una cotización: TODAS las cotizaciones, sin importar el cliente (a diferencia
// de savedQuoteSchema/GET /quotes/mine, que solo trae las del cliente logueado). Trae además
// quotingCustomer para poder mostrar quién la pidió.
export const adminQuoteSchema = savedQuoteSchema.extend({
    customerId: z.number().int(),
    quotingCustomer: quoteCustomerSchema,
})

export type QuotableVariant = z.infer<typeof quotableVariantSchema>
export type QuotableIngredientOption = z.infer<typeof quotableIngredientOptionSchema>
export type QuotableProduct = z.infer<typeof quotableProductSchema>
export type QuoteDestination = z.infer<typeof quoteDestinationSchema>
export type CalculateQuoteInput = z.infer<typeof calculateQuoteSchema>
export type QuoteCalculation = z.infer<typeof quoteCalculationSchema>
export type SavedQuote = z.infer<typeof savedQuoteSchema>
export type QuoteCustomer = z.infer<typeof quoteCustomerSchema>
export type AdminQuote = z.infer<typeof adminQuoteSchema>
