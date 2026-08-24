import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Truck, Wheat, PackageOpen, Layers, FileSpreadsheet } from "lucide-react"
import type { QuoteCalculation } from "@/feature/quote/schema/quote.schema"
import { Card } from "@/shared/component/card.component"
import { Spinner } from "@/shared/component/spinner.component"
import { formatCurrency } from "@/shared/format/currency"

type QuoteResultCardProps = {
    result: QuoteCalculation | null
    isPending: boolean
    showCostBreakdown?: boolean
}

function CostRow({ label, quantityLabel, lineTotal }: Readonly<{ label: string; quantityLabel?: string; lineTotal: number }>) {
    return (
        <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
            <div>
                <p className="text-verde-profundo">{label}</p>
                {quantityLabel && <p className="text-xs text-texto-suave">{quantityLabel}</p>}
            </div>
            <p className="shrink-0 font-medium text-verde-profundo">{formatCurrency(lineTotal)}</p>
        </div>
    )
}

function CostSection({
    icon,
    title,
    subtotal,
    children,
}: Readonly<{
    icon: ReactNode
    title: string
    subtotal: number
    children: ReactNode
}>) {
    return (
        <div className="border-t border-gris-campo pt-4 first:border-t-0 first:pt-0">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-texto-suave">
                    {icon}
                    {title}
                </div>
                <p className="text-sm font-semibold text-verde-profundo">{formatCurrency(subtotal)}</p>
            </div>
            <div className="divide-y divide-gris-campo/60">{children}</div>
        </div>
    )
}

export function QuoteResultCard({ result, isPending, showCostBreakdown = true }: Readonly<QuoteResultCardProps>) {
    const { t } = useTranslation()

    if (isPending) {
        return (
            <Card className="flex min-h-[320px] items-center justify-center">
                <Spinner />
            </Card>
        )
    }

    if (!result) {
        return (
            <Card className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-center">
                <FileSpreadsheet className="h-10 w-10 text-gris-campo" />
                <p className="max-w-xs text-texto-suave">{t("site.quoteRequest.result.empty")}</p>
            </Card>
        )
    }

    const { breakdown } = result
    const costPerPallet = result.totalCost / result.requestedPallets

    return (
        <Card>
            <div className="mb-5 flex items-start justify-between gap-3 border-b border-gris-campo pb-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-texto-suave">
                        {t("site.quoteRequest.result.destination")}
                    </p>
                    <p className="font-display text-lg font-bold text-verde-profundo">{breakdown.transport.displayName}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-texto-suave">
                        {t("site.quoteRequest.result.total")}
                    </p>
                    <p className="font-display text-2xl font-extrabold text-verde-profundo">{formatCurrency(result.totalCost)}</p>
                </div>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-[10px] bg-crema p-3">
                    <p className="text-lg font-bold text-verde-profundo">{result.requestedPallets}</p>
                    <p className="text-xs text-texto-suave">{t("site.quoteRequest.result.pallets")}</p>
                </div>
                <div className="rounded-[10px] bg-crema p-3">
                    <p className="text-lg font-bold text-verde-profundo">{result.totalUnits.toLocaleString("es-MX")}</p>
                    <p className="text-xs text-texto-suave">{t("site.quoteRequest.result.units")}</p>
                </div>
                <div className="rounded-[10px] bg-crema p-3">
                    <p className="text-lg font-bold text-verde-profundo">{formatCurrency(costPerPallet)}</p>
                    <p className="text-xs text-texto-suave">{t("site.quoteRequest.result.perPallet")}</p>
                </div>
            </div>

            <div className="space-y-4">
                {showCostBreakdown && breakdown.rawMaterials.length > 0 && (
                    <CostSection
                        icon={<Wheat size={15} />}
                        title={t("site.quoteRequest.result.rawMaterials")}
                        subtotal={result.rawMaterialCost}
                    >
                        {breakdown.rawMaterials.map((line) => (
                            <CostRow
                                key={line.ingredientId}
                                label={line.displayName}
                                quantityLabel={t("site.quoteRequest.result.unitsQuantity", {
                                    count: line.totalUnits.toLocaleString("es-MX"),
                                })}
                                lineTotal={line.lineTotal}
                            />
                        ))}
                    </CostSection>
                )}

                {showCostBreakdown && breakdown.unitPackaging && (
                    <CostSection
                        icon={<PackageOpen size={15} />}
                        title={t("site.quoteRequest.result.unitPackaging")}
                        subtotal={result.unitPackagingCost}
                    >
                        <CostRow
                            label={breakdown.unitPackaging.displayName}
                            quantityLabel={t("site.quoteRequest.result.unitsQuantity", {
                                count: breakdown.unitPackaging.totalUnits.toLocaleString("es-MX"),
                            })}
                            lineTotal={breakdown.unitPackaging.lineTotal}
                        />
                    </CostSection>
                )}

                {showCostBreakdown && breakdown.palletMaterials.length > 0 && (
                    <CostSection
                        icon={<Layers size={15} />}
                        title={t("site.quoteRequest.result.palletMaterials")}
                        subtotal={result.palletMaterialCost}
                    >
                        {breakdown.palletMaterials.map((line) => (
                            <CostRow
                                key={line.packagingId}
                                label={line.displayName}
                                quantityLabel={t("site.quoteRequest.result.palletsQuantity", { count: line.requestedPallets })}
                                lineTotal={line.lineTotal}
                            />
                        ))}
                    </CostSection>
                )}

                <CostSection icon={<Truck size={15} />} title={t("site.quoteRequest.result.transport")} subtotal={result.transportCost}>
                    <CostRow label={breakdown.transport.displayName} lineTotal={result.transportCost} />
                </CostSection>
            </div>
        </Card>
    )
}
