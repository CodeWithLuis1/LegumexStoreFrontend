import { useTranslation } from "react-i18next"
import { ProductCardImage } from "@/feature/product/component/productCardImage.component"
import { ProductCardSpecs } from "@/feature/product/component/productCardSpecs.component"
import { ProductCardDetails } from "@/feature/product/component/productCardDetails.component"

export type ProductLine = "fresh" | "frozen"
export type ProductBadgeTone = "new" | "season" | "bestseller"

export type StorefrontProductSummary = {
    id: string
    slug: string
    displayName: string
    shortDescription: string
    imageUrl?: string
    categoryTintClassName: string
    caliber: string
    cutType: string
    line: ProductLine
    badgeTone?: ProductBadgeTone
    unitPriceLabel?: string
}

type ProductCardProps = {
    product: StorefrontProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
    const { t } = useTranslation()
    const badgeLabelKeys: Record<ProductBadgeTone, string> = {
        new: "product.card.badgeNew",
        season: "product.card.badgeSeason",
        bestseller: "product.card.badgeBestseller",
    }

    return (
        <article className="overflow-hidden rounded-card bg-hueso shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover">
            <ProductCardImage
                imageUrl={product.imageUrl}
                productName={product.displayName}
                tintClassName={product.categoryTintClassName}
                badgeTone={product.badgeTone}
                badgeLabel={product.badgeTone ? t(badgeLabelKeys[product.badgeTone]) : undefined}
            />
            <ProductCardSpecs caliber={product.caliber} cutType={product.cutType} />
            <ProductCardDetails
                productSlug={product.slug}
                displayName={product.displayName}
                shortDescription={product.shortDescription}
                line={product.line}
                unitPriceLabel={product.unitPriceLabel}
            />
        </article>
    )
}
