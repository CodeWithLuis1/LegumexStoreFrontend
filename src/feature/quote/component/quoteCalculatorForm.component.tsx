import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { Package } from "lucide-react"
import { calculateQuoteSchema } from "@/feature/quote/schema/quote.schema"
import type { CalculateQuoteInput, QuotableProduct, QuoteDestination } from "@/feature/quote/schema/quote.schema"
import { Card } from "@/shared/component/card.component"
import { Chip } from "@/shared/component/chip.component"
import { FormField } from "@/shared/component/formField.component"
import { Select } from "@/shared/component/select.component"
import { SearchableSelect } from "@/shared/component/searchableSelect.component"
import type { SearchableSelectOption } from "@/shared/component/searchableSelect.component"
import { Input } from "@/shared/component/input.component"
import { Button } from "@/shared/component/button.component"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

type QuoteCalculatorFormProps = {
    products: QuotableProduct[]
    destinations: QuoteDestination[]
    onSubmit: (formData: CalculateQuoteInput) => void
    isSubmitting: boolean
}

const MIX_PERCENTAGE_TOLERANCE = 0.5

// El admin ya clasifica cada producto como terminado o personalizable (Product.isCustomizable);
// se lo preguntamos al cliente primero para no mezclar ambos catálogos en un solo dropdown.
// Es un filtro puramente visual sobre datos que el cliente ya recibió completos: el backend
// revalida productId/ingredientMix igual sin importar qué modo haya elegido la UI.
type QuoteMode = "finished" | "customizable"

function variantLabel(variant: QuotableProduct["variants"][number]): string {
    return [variant.presentationLabel, variant.packagingLabel, variant.skuCode].filter(Boolean).join(" · ")
}

export function QuoteCalculatorForm({ products, destinations, onSubmit, isSubmitting }: QuoteCalculatorFormProps) {
    const { t } = useTranslation()
    const [mode, setMode] = useState<QuoteMode>("finished")
    const [selectedProductId, setSelectedProductId] = useState("")
    // Solo se usa en modo "customizable": % que el cliente arma a mano por ingrediente del
    // pool (ver QuotableProduct.ingredientPool). Vive fuera de react-hook-form porque el set
    // de inputs cambia dinámicamente según el producto seleccionado.
    const [mixPercentages, setMixPercentages] = useState<Record<number, string>>({})

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<CalculateQuoteInput>({ resolver: zodResolver(calculateQuoteSchema) })

    const modeProducts = products.filter((product) => product.isCustomizable === (mode === "customizable"))
    const selectedProduct = modeProducts.find((product) => String(product.id) === selectedProductId)
    const variants = selectedProduct?.variants ?? []
    const ingredientPool = selectedProduct?.ingredientPool ?? []

    // Listas largas (muchos productos, muchos destinos) -> select con búsqueda.
    // La variante ya queda corta porque depende del producto elegido, un <Select> nativo alcanza.
    const productOptions: SearchableSelectOption[] = modeProducts.map((product) => ({
        value: product.id,
        label: product.displayName,
    }))
    const destinationOptions: SearchableSelectOption[] = destinations.map((destination) => ({
        value: destination.id,
        label: destination.displayName,
    }))

    const mixTotal = ingredientPool.reduce((sum, option) => sum + (Number(mixPercentages[option.ingredientId]) || 0), 0)
    const isMixComplete = Math.abs(mixTotal - 100) <= MIX_PERCENTAGE_TOLERANCE

    const resetProductSelection = () => {
        setSelectedProductId("")
        setValue("productVariantId", undefined as unknown as number)
        setMixPercentages({})
    }

    const handleModeChange = (nextMode: QuoteMode) => {
        if (nextMode === mode) return
        setMode(nextMode)
        resetProductSelection()
    }

    const handleProductChange = (option: SearchableSelectOption | null) => {
        setSelectedProductId(option ? String(option.value) : "")
        setValue("productVariantId", undefined as unknown as number)
        setMixPercentages({})
    }

    const handleMixPercentageChange = (ingredientId: number, value: string) => {
        setMixPercentages((current) => ({ ...current, [ingredientId]: value }))
    }

    const submit = handleSubmit((formData) => {
        if (mode !== "customizable") {
            onSubmit(formData)
            return
        }
        const ingredientMix = ingredientPool
            .map((option) => ({ ingredientId: option.ingredientId, percentage: Number(mixPercentages[option.ingredientId]) || 0 }))
            .filter((line) => line.percentage > 0)
        onSubmit({ ...formData, ingredientMix })
    })

    return (
        <Card>
            <div className="mb-5 flex items-center gap-2">
                <Package className="h-5 w-5 text-dorado" />
                <h2 className="font-display text-lg font-bold text-verde-profundo">{t("site.quoteRequest.form.title")}</h2>
            </div>

            <div className="mb-2 grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => handleModeChange("finished")}
                    className={`rounded-[10px] border-[1.5px] px-3 py-2.5 text-sm font-semibold transition ${
                        mode === "finished"
                            ? "border-verde-profundo bg-verde-profundo text-crema"
                            : "border-gris-campo bg-hueso text-texto-suave hover:border-verde-profundo hover:text-verde-profundo"
                    }`}
                >
                    {t("site.quoteRequest.form.modeFinished")}
                </button>
                <button
                    type="button"
                    onClick={() => handleModeChange("customizable")}
                    className={`rounded-[10px] border-[1.5px] px-3 py-2.5 text-sm font-semibold transition ${
                        mode === "customizable"
                            ? "border-verde-profundo bg-verde-profundo text-crema"
                            : "border-gris-campo bg-hueso text-texto-suave hover:border-verde-profundo hover:text-verde-profundo"
                    }`}
                >
                    {t("site.quoteRequest.form.modeCustomizable")}
                </button>
            </div>
            <p className="mb-5 text-xs text-texto-suave">
                {mode === "finished" ? t("site.quoteRequest.form.modeFinishedHint") : t("site.quoteRequest.form.modeCustomizableHint")}
            </p>

            <form onSubmit={submit}>
                <FormField label={t("site.quoteRequest.form.product")} htmlFor="productId">
                    <SearchableSelect
                        inputId="productId"
                        options={productOptions}
                        placeholder={t("common.searchPlaceholder")}
                        noOptionsMessage={() => t("common.noOptionsFound")}
                        isClearable
                        value={productOptions.find((option) => String(option.value) === selectedProductId) ?? null}
                        onChange={handleProductChange}
                    />
                    {modeProducts.length === 0 && (
                        <p className="mt-1.5 text-sm text-texto-suave">
                            {mode === "finished" ? t("site.quoteRequest.form.noProductsFinished") : t("site.quoteRequest.form.noProductsCustomizable")}
                        </p>
                    )}
                </FormField>

                {selectedProduct && (selectedProduct.productTypeName || selectedProduct.isOrganic) && (
                    <div className="mb-5 flex flex-wrap gap-2">
                        {selectedProduct.productTypeName && <Chip>{selectedProduct.productTypeName}</Chip>}
                        {selectedProduct.isOrganic && <Chip>{t("site.quoteRequest.form.organicBadge")}</Chip>}
                    </div>
                )}

                {mode === "customizable" && selectedProduct && (
                    <div className="mb-5 rounded-[10px] border border-gris-campo p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-verde-profundo">{t("site.quoteRequest.form.mixTitle")}</p>
                            <p className={`text-sm font-semibold ${isMixComplete ? "text-verde-profundo" : "text-error-fg"}`}>
                                {t("site.quoteRequest.form.mixTotal", { total: mixTotal })}
                            </p>
                        </div>

                        {ingredientPool.length === 0 ? (
                            <p className="text-sm text-texto-suave">{t("site.quoteRequest.form.mixEmpty")}</p>
                        ) : (
                            <div className="space-y-3">
                                {ingredientPool.map((option) => (
                                    <div key={option.ingredientId} className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-verde-profundo">{option.displayName}</p>
                                                <Chip tone={option.isOrganic ? "fresh" : "neutral"}>
                                                    {option.isOrganic ? t("ingredient.organicTag") : t("ingredient.conventionalTag")}
                                                </Chip>
                                            </div>
                                            <p className="text-xs text-texto-suave">
                                                {t("site.quoteRequest.form.mixRange", {
                                                    min: option.minPercentage,
                                                    max: option.maxPercentage,
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex w-24 items-center gap-1">
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min={option.minPercentage}
                                                max={option.maxPercentage}
                                                value={mixPercentages[option.ingredientId] ?? ""}
                                                onChange={(event) => handleMixPercentageChange(option.ingredientId, event.target.value)}
                                            />
                                            <span className="text-sm text-texto-suave">%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!isMixComplete && ingredientPool.length > 0 && (
                            <p className="mt-3 text-xs text-error-fg">{t("site.quoteRequest.form.mixIncomplete")}</p>
                        )}
                    </div>
                )}

                <FormField
                    label={t("site.quoteRequest.form.variant")}
                    htmlFor="productVariantId"
                    error={getFieldErrorMessage(t, errors.productVariantId)}
                >
                    <Select
                        id="productVariantId"
                        hasError={!!errors.productVariantId}
                        disabled={!selectedProduct}
                        defaultValue=""
                        {...register("productVariantId", { setValueAs: toOptionalNumber })}
                    >
                        <option value="">{t("common.selectPlaceholder")}</option>
                        {variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                                {variantLabel(variant)}
                            </option>
                        ))}
                    </Select>
                </FormField>

                <FormField
                    label={t("site.quoteRequest.form.requestedPallets")}
                    htmlFor="requestedPallets"
                    error={getFieldErrorMessage(t, errors.requestedPallets)}
                >
                    <Input
                        id="requestedPallets"
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={1}
                        hasError={!!errors.requestedPallets}
                        {...register("requestedPallets", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("site.quoteRequest.form.destination")}
                    htmlFor="destinationId"
                    error={getFieldErrorMessage(t, errors.destinationId)}
                >
                    <Controller
                        name="destinationId"
                        control={control}
                        render={({ field }) => (
                            <SearchableSelect
                                inputId="destinationId"
                                hasError={!!errors.destinationId}
                                options={destinationOptions}
                                placeholder={t("common.searchPlaceholder")}
                                noOptionsMessage={() => t("common.noOptionsFound")}
                                isClearable
                                value={destinationOptions.find((option) => option.value === field.value) ?? null}
                                onChange={(selected) => field.onChange(selected?.value ?? undefined)}
                            />
                        )}
                    />
                </FormField>

                <Button
                    type="submit"
                    disabled={isSubmitting || (mode === "customizable" && !isMixComplete)}
                    className="mt-2 w-full"
                >
                    {isSubmitting ? t("common.loading") : t("site.quoteRequest.form.submit")}
                </Button>
            </form>
        </Card>
    )
}
