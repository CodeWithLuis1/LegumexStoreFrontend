import { useTranslation } from "react-i18next"
import { SiteContainer } from "@/shared/component/siteContainer.component"
// import { SectionHeading } from "@/shared/component/sectionHeading.component"
import { CategoryShowcaseCard } from "@/feature/home/component/categoryShowcaseCard.component"
import { HOME_CATEGORY_SHOWCASE_ITEMS } from "@/feature/home/data/homeContent.data"

export function CategoryShowcaseSection() {
    const { t } = useTranslation()

    return (
        <section className="py-16 sm:py-24">
            <SiteContainer>
                {/* <SectionHeading eyebrow={t("home.categories.eyebrow")} title={t("home.categories.title")} /> */}

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {HOME_CATEGORY_SHOWCASE_ITEMS.map((category) => (
                        <CategoryShowcaseCard
                            key={category.id}
                            categoryUrl={`/catalogo/${category.slug}`}
                            tintClassName={category.tintClassName}
                            title={t(category.titleKey)}
                        />
                    ))}
                </div>
            </SiteContainer>
        </section>
    )
}
