import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { buttonClassName } from "@/shared/component/button.component"
import { SiteNavigation } from "@/shared/layout/SiteNavigation"
// import { LanguageSwitch } from "@/shared/layout/LanguageSwitch"

type SiteMobileMenuProps = {
    isOpen: boolean
    onClose: () => void
}

export function SiteMobileMenu({ isOpen, onClose }: SiteMobileMenuProps) {
    const { t } = useTranslation()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-verde-profundo/40" onClick={onClose} />
            <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col gap-8 bg-hueso p-6 shadow-card">
                <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-extrabold uppercase text-verde-profundo">Legumex</span>
                    <button type="button" aria-label={t("site.header.closeMenu")} onClick={onClose} className="text-verde-profundo">
                        <X size={22} />
                    </button>
                </div>

                <SiteNavigation orientation="vertical" onLinkClick={onClose} />

                <Link to="/catalogo" onClick={onClose} className={`${buttonClassName("primary")} w-full`}>
                    {t("site.header.cta")}
                </Link>

                {/* <LanguageSwitch /> */}
            </div>
        </div>
    )
}
