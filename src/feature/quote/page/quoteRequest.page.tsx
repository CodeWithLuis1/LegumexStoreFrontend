import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { ClipboardList, LogOut, FileText } from "lucide-react"
import { useCustomerAuth } from "@/shared/auth/customer/useCustomerAuth"
import { SiteContainer } from "@/shared/component/siteContainer.component"
import { Spinner } from "@/shared/component/spinner.component"
import { getQuoteProductsAPI, getQuoteDestinationsAPI, previewQuoteAPI, saveQuoteAPI } from "@/feature/quote/api/quote.api"
import { QuoteCalculatorForm } from "@/feature/quote/component/quoteCalculatorForm.component"
import { QuoteResultCard } from "@/feature/quote/component/quoteResultCard.component"
import type { CalculateQuoteInput, QuoteCalculation } from "@/feature/quote/schema/quote.schema"

export function QuoteRequestPage() {
    const { t } = useTranslation()
    const { customer, logout } = useCustomerAuth()
    const queryClient = useQueryClient()
    const [result, setResult] = useState<QuoteCalculation | null>(null)
    const [lastFormData, setLastFormData] = useState<CalculateQuoteInput | null>(null)
    const [isResultSaved, setIsResultSaved] = useState(false)

    const productsQuery = useQuery({ queryKey: ["quoteProducts"], queryFn: getQuoteProductsAPI })
    const destinationsQuery = useQuery({ queryKey: ["quoteDestinations"], queryFn: getQuoteDestinationsAPI })

    const previewMutation = useMutation({
        mutationFn: previewQuoteAPI,
        onSuccess: (response) => {
            if (response) setResult(response.data)
        },
        onError: (error) => {
            setResult(null)
            toast.error(error.message)
        },
    })

    const saveMutation = useMutation({
        mutationFn: saveQuoteAPI,
        onSuccess: (response) => {
            if (!response) return
            setIsResultSaved(true)
            toast.success(response.message)
            queryClient.invalidateQueries({ queryKey: ["myQuotes"] })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const products = productsQuery.data?.data ?? []
    const destinations = destinationsQuery.data?.data ?? []
    const isLoadingCatalog = productsQuery.isLoading || destinationsQuery.isLoading
    const hasCatalogError = productsQuery.isError || destinationsQuery.isError

    const handleSubmit = (formData: CalculateQuoteInput) => {
        setResult(null)
        setIsResultSaved(false)
        setLastFormData(formData)
        previewMutation.mutate(formData)
    }

    const handleSave = () => {
        if (!lastFormData) return
        saveMutation.mutate(lastFormData)
    }

    return (
        <SiteContainer className="py-12 sm:py-16">
            <header className="mb-10 flex flex-col gap-4 border-b border-gris-campo pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-3">
                    <ClipboardList className="mt-1 h-8 w-8 shrink-0 text-dorado" />
                    <div>
                        <h1 className="font-display text-2xl font-bold text-verde-profundo sm:text-3xl">
                            {t("site.quoteRequest.title")}
                        </h1>
                        <p className="mt-1 max-w-xl text-texto-suave">
                            {t("site.quoteRequest.description", { name: customer?.name ?? "" })}
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                    <Link
                        to="/mis-cotizaciones"
                        className="flex items-center gap-1.5 text-sm font-medium text-texto-suave transition hover:text-verde-profundo"
                    >
                        <FileText size={16} />
                        {t("site.myQuotes.navLink")}
                    </Link>
                    <button
                        onClick={logout}
                        type="button"
                        className="flex items-center gap-1.5 text-sm font-medium text-texto-suave transition hover:text-verde-profundo"
                    >
                        <LogOut size={16} />
                        {t("common.logout")}
                    </button>
                </div>
            </header>

            {isLoadingCatalog ? (
                <Spinner />
            ) : hasCatalogError ? (
                <p className="py-12 text-center text-error-fg">{t("common.loadError")}</p>
            ) : (
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
                    <QuoteCalculatorForm
                        products={products}
                        destinations={destinations}
                        onSubmit={handleSubmit}
                        isSubmitting={previewMutation.isPending}
                    />
                    <QuoteResultCard
                        result={result}
                        isPending={previewMutation.isPending}
                        onSave={handleSave}
                        isSaving={saveMutation.isPending}
                        isSaved={isResultSaved}
                    />
                </div>
            )}
        </SiteContainer>
    )
}
