import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

const SITE_NAV_ITEMS = [
    { url: "/catalogo", labelKey: "site.nav.catalog" },
    { url: "/calidad", labelKey: "site.nav.quality" },
    { url: "/nosotros", labelKey: "site.nav.about" },
    { url: "/contacto", labelKey: "site.nav.contact" },
]

type SiteNavigationProps = {
    orientation?: "horizontal" | "vertical"
    onLinkClick?: () => void
}

export function SiteNavigation({ orientation = "horizontal", onLinkClick }: SiteNavigationProps) {
    const { t } = useTranslation()

    return (
        <nav className={orientation === "horizontal" ? "flex items-center gap-8" : "flex flex-col gap-1"}>
            {SITE_NAV_ITEMS.map(({ url, labelKey }) => (
                <NavLink
                    key={url}
                    to={url}
                    onClick={onLinkClick}
                    className={({ isActive }) =>
                        orientation === "horizontal"
                            ? `text-sm font-medium transition ${
                                  isActive
                                      ? "text-verde-profundo underline decoration-dorado decoration-2 underline-offset-8"
                                      : "text-texto-suave hover:text-verde-profundo"
                              }`
                            : `rounded-[10px] px-3 py-2.5 text-sm font-medium transition ${
                                  isActive ? "bg-crema text-verde-profundo" : "text-texto-suave hover:bg-crema"
                              }`
                    }
                >
                    {t(labelKey)}
                </NavLink>
            ))}
        </nav>
    )
}
