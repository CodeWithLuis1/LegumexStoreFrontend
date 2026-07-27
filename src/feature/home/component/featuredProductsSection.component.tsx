// import { useTranslation } from "react-i18next"
import { SiteContainer } from "@/shared/component/siteContainer.component"
// import { SectionHeading } from "@/shared/component/sectionHeading.component"
import { ProductCard } from "@/feature/product/component/productCard.component"
import { HOME_FEATURED_PRODUCTS } from "@/feature/home/data/homeContent.data"

export function FeaturedProductsSection() {
    // const { t } = useTranslation()

    return (
        <section className="py-16 sm:py-24">
            <SiteContainer>
                {/* <SectionHeading eyebrow={t("home.featured.eyebrow")} title={t("home.featured.title")} /> */}
            </SiteContainer>

            <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-none px-6 pb-4 sm:px-10">
                {HOME_FEATURED_PRODUCTS.map((product) => (
                    <div key={product.id} className="w-72 shrink-0 snap-start">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    )
}
