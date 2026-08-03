import { useTranslation } from "react-i18next"
import { ClipboardList, LogOut } from "lucide-react"
import { useCustomerAuth } from "@/shared/auth/customer/useCustomerAuth"
import { SiteContainer } from "@/shared/component/siteContainer.component"

export function QuoteRequestPage() {
    const { t } = useTranslation()
    const { customer, logout } = useCustomerAuth()

    return (
        <SiteContainer className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
            <ClipboardList className="h-10 w-10 text-dorado" />
            <h1 className="font-display text-2xl font-bold text-verde-profundo">{t("site.quoteRequest.title")}</h1>
            <p className="max-w-md text-texto-suave">
                {t("site.quoteRequest.description", { name: customer?.name ?? "" })}
            </p>
            <button
                onClick={logout}
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-texto-suave transition hover:text-verde-profundo"
            >
                <LogOut size={16} />
                {t("common.logout")}
            </button>
        </SiteContainer>
    )
}
