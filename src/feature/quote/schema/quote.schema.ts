import { z } from "zod"
import { responseDestinationSchema } from "@/feature/destination/schema/destination.schema"

const quotableVariantSchema = z.object({
    id: z.number().int(),
    skuCode: z.string().nullable(),
    unitsPerPallet: z.number().int(),
    presentationLabel: z.string().nullable(),
    packagingLabel: z.string().nullable(),
})

const quotableIngredientOptionSchema = z.object({
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
    // Selector visual (Categoría -> Producto) del cotizador: ver quoteCalculatorForm.component.tsx.
    // SubCategoría no se expone a propósito -- la categoría visual es el único nivel intermedio.
    imageUrl: z.string().nullable(),
    categoryId: z.number().int(),
    categoryName: z.string(),
    categoryImageUrl: z.string().nullable(),
    ingredientPool: z.array(quotableIngredientOptionSchema),
    variants: z.array(quotableVariantSchema),
})

export const quoteDestinationSchema = responseDestinationSchema

// Solo se envía cuando el producto elegido es customizable (ver QuotableProduct.isCustomizable);
// el cliente arma la mezcla y debe sumar 100% (con tolerancia de redondeo, valida el backend).
const ingredientMixLineSchema = z.object({
    ingredientId: z.number().int().positive(),
    // Mismo tope de 2 decimales que valida el backend (ver quote.schema.ts del backend) --
    // coincide con el step="0.1" del input y con la precisión DECIMAL(5,2) de min/maxPercentage.
    percentage: z.number().min(0).max(100).multipleOf(0.01),
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

const quoteCalculationSchema = z.object({
    productVariantId: z.number().int(),
    destinationId: z.number().int(),
    productDisplayName: z.string(),
    variantLabel: z.string().nullable(),
    requestedPallets: z.number().int(),
    totalUnits: z.number(),
    // Un cálculo recién hecho llega en JS (siempre número), pero al releer una cotización ya
    // guardada (panel admin) vienen de columnas DECIMAL de Postgres, que Sequelize serializa
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
        // Idioma en el que quedaron congelados los nombres de este desglose (ver
        // quoteService.calculateQuote en el backend). Cotizaciones guardadas antes de este campo
        // no lo traen -- optional para no romper su parseo.
        language: z.enum(["es", "en"]).optional(),
    }),
})

// Cotización ya guardada -- mismo shape que el cálculo, más lo que agrega la persistencia.
// El cliente solo la ve una vez, justo después de calcular (POST /quotes ya la guarda de una
// vez); no hay listado propio del lado cliente, solo del lado admin (ver adminQuoteSchema).
export const savedQuoteSchema = quoteCalculationSchema.extend({
    id: z.number().int(),
    createdAt: z.coerce.date(),
})

// Solo lo que el panel admin necesita mostrar de "quién pidió la cotización" -- no el objeto
// Customer completo (evita filtrar password/failed_attempts/etc., que ya se excluyen en el
// backend, pero además mantiene el contrato de esta pantalla mínimo a propósito).
const quoteCustomerSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    companyName: z.string().nullable(),
    email: z.string(),
})

// Vista admin de una cotización: TODAS las cotizaciones, de todos los clientes (única forma de
// listar cotizaciones que existe en el sistema, ver savedQuoteSchema). Trae además
// quotingCustomer para poder mostrar quién la pidió.
export const adminQuoteSchema = savedQuoteSchema.extend({
    customerId: z.number().int(),
    quotingCustomer: quoteCustomerSchema,
})

export type QuotableProduct = z.infer<typeof quotableProductSchema>
export type QuoteDestination = z.infer<typeof quoteDestinationSchema>
export type CalculateQuoteInput = z.infer<typeof calculateQuoteSchema>
export type QuoteCalculation = z.infer<typeof quoteCalculationSchema>
