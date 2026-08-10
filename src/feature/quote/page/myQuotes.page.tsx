import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { ChevronDown, ChevronUp, FileSpreadsheet, ArrowLeft } from "lucide-react"
import { SiteContainer } from "@/shared/component/siteContainer.component"
import { Spinner } from "@/shared/component/spinner.component"
import { Card } from "@/shared/component/card.component"
import { getMyQuotesAPI } from "@/feature/quote/api/quote.api"
import { QuoteResultCard } from "@/feature/quote/component/quoteResultCard.component"
import { formatCurrency } from "@/shared/format/currency"

export function MyQuotesPage() {
    const { t } = useTranslation()
    const [expandedId, setExpandedId] = useState<number | null>(null)

    const myQuotesQuery = useQuery({ queryKey: ["myQuotes"], queryFn: getMyQuotesAPI })
    const quotes = myQuotesQuery.data?.data ?? []

    return (
        <SiteContainer className="py-12 sm:py-16">
            <header className="mb-10 border-b border-gris-campo pb-8">
                <Link
                    to="/solicitud"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-texto-suave transition hover:text-verde-profundo"
                >
                    <ArrowLeft size={16} />
                    {t("site.myQuotes.backLink")}
                </Link>
                <h1 className="font-display text-2xl font-bold text-verde-profundo sm:text-3xl">{t("site.myQuotes.title")}</h1>
                <p className="mt-1 max-w-xl text-texto-suave">{t("site.myQuotes.description")}</p>
            </header>

            {myQuotesQuery.isLoading ? (
                <Spinner />
            ) : myQuotesQuery.isError ? (
                <p className="py-12 text-center text-error-fg">{t("common.loadError")}</p>
            ) : quotes.length === 0 ? (
                <Card className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-center">
                    <FileSpreadsheet className="h-10 w-10 text-gris-campo" />
                    <p className="max-w-xs text-texto-suave">{t("site.myQuotes.empty")}</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {quotes.map((quote) => {
                        const isExpanded = expandedId === quote.id
                        return (
                            <Card key={quote.id} className="p-0">
                                <button
                                    type="button"
                                    onClick={() => setExpandedId(isExpanded ? null : quote.id)}
                                    className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-6"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate font-display text-lg font-bold text-verde-profundo">
                                            {quote.productDisplayName}
                                            {quote.variantLabel && (
                                                <span className="font-sans text-sm font-normal text-texto-suave"> · {quote.variantLabel}</span>
                                            )}
                                        </p>
                                        <p className="mt-1 text-sm text-texto-suave">
                                            {t("site.myQuotes.summary", {
                                                date: quote.createdAt.toLocaleDateString("es-GT"),
                                                pallets: quote.requestedPallets,
                                                destination: quote.breakdown.transport.displayName,
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-3">
                                        <p className="font-display text-lg font-extrabold text-verde-profundo">
                                            {formatCurrency(quote.totalCost)}
                                        </p>
                                        {isExpanded ? (
                                            <ChevronUp size={20} className="text-texto-suave" />
                                        ) : (
                                            <ChevronDown size={20} className="text-texto-suave" />
                                        )}
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="border-t border-gris-campo p-4 sm:p-6">
                                        <QuoteResultCard result={quote} isPending={false} />
                                    </div>
                                )}
                            </Card>
                        )
                    })}
                </div>
            )}
        </SiteContainer>
    )
}
