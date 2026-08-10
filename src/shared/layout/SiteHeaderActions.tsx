import { Link } from "react-router-dom"
import { FileText } from "lucide-react"
import { useTranslation } from "react-i18next"
import { buttonClassName } from "@/shared/component/button.component"
import { LanguageSwitch } from "@/shared/layout/LanguageSwitch"
import { SiteSearchButton } from "@/shared/layout/SiteSearchButton"
import { SiteRequestButton } from "@/shared/layout/SiteRequestButton"
import { useCustomerAuth } from "@/shared/auth/customer/useCustomerAuth"

export function SiteHeaderActions() {
    const { t } = useTranslation()
    const { isAuthenticated } = useCustomerAuth()

    return (
        <div className="flex items-center gap-2">
            <LanguageSwitch />
            <SiteSearchButton />
            <SiteRequestButton />
            {isAuthenticated && (
                <Link
                    to="/mis-cotizaciones"
                    className="flex h-10 items-center gap-1.5 px-2 text-xs font-medium text-verde-profundo transition hover:text-dorado"
                >
                    <FileText size={16} />
                    {t("site.myQuotes.navLink")}
                </Link>
            )}
            <Link to="/solicitud" className={`${buttonClassName("primary")} h-10 px-5 text-xs`}>
                {t("site.header.cta")}
            </Link>
        </div>
    )
}
