import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { buttonClassName } from "@/shared/component/button.component"
import { SiteContainer } from "@/shared/component/siteContainer.component"

export function FinalCtaSection() {
    const { t } = useTranslation()

    return (
        <section className="bg-verde-profundo py-16 sm:py-24">
            <SiteContainer className="flex flex-col items-center gap-6 text-center">
                <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-[0.95] font-extrabold uppercase tracking-[-0.02em] text-crema">
                    {t("home.finalCta.title")}
                </h2>
                <p className="max-w-xl text-crema/80">{t("home.finalCta.description")}</p>
                <Link to="/catalogo" className={buttonClassName("dark")}>
                    {t("home.finalCta.action")}
                </Link>
            </SiteContainer>
        </section>
    )
}
