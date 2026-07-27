import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"
import { useTranslation } from "react-i18next"
import { buttonClassName } from "@/shared/component/button.component"
import { SiteContainer } from "@/shared/component/siteContainer.component"

export function HeroSection() {
    const { t } = useTranslation()

    return (
        <section className="py-16 sm:py-24">
            <SiteContainer className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-texto-suave">
                        {t("home.hero.eyebrow")}
                    </p>
                    <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] font-extrabold uppercase tracking-[-0.02em] text-verde-profundo">
                        {t("home.hero.titleLineOne")}
                        <br />
                        {t("home.hero.titleLineTwo")}
                    </h1>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-texto-suave">{t("home.hero.description")}</p>

                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <Link to="/catalogo" className={buttonClassName("primary")}>
                            {t("home.hero.primaryAction")}
                        </Link>
                        <Link
                            to="/catalogo"
                            className="text-sm font-semibold text-verde-profundo underline decoration-dorado decoration-2 underline-offset-4"
                        >
                            {t("home.hero.secondaryAction")}
                        </Link>
                    </div>
                </div>

                <div className="aspect-4/5 w-full overflow-hidden rounded-card bg-cat-vainas lg:aspect-square">
                    <div className="flex h-full w-full items-center justify-center text-verde-profundo/25">
                        <Leaf size={120} strokeWidth={1} />
                    </div>
                </div>
            </SiteContainer>
        </section>
    )
}
