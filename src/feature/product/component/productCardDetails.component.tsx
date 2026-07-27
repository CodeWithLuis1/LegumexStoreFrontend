import { Link } from "react-router-dom"
import { ArrowRight, Snowflake } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Chip } from "@/shared/component/chip.component"
import { isB2cMode } from "@/shared/config/salesMode.config"
import type { ProductLine } from "@/feature/product/component/productCard.component"

type ProductCardDetailsProps = {
    productSlug: string
    displayName: string
    shortDescription: string
    line: ProductLine
    unitPriceLabel?: string
}

export function ProductCardDetails({ productSlug, displayName, shortDescription, line, unitPriceLabel }: ProductCardDetailsProps) {
    const { t } = useTranslation()
    const productUrl = `/producto/${productSlug}`

    return (
        <div className="p-4">
            <h3 className="text-base font-semibold text-verde-profundo">{displayName}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-texto-suave">{shortDescription}</p>

            <div className="mt-3 flex items-center justify-between">
                <Chip tone={line === "frozen" ? "frozen" : "fresh"}>
                    {line === "frozen" && <Snowflake size={12} />}
                    {t(line === "frozen" ? "product.card.lineFrozen" : "product.card.lineFresh")}
                </Chip>

                <Link
                    to={productUrl}
                    className="flex items-center gap-1 text-sm font-semibold text-verde-profundo transition hover:text-dorado-hover"
                >
                    {isB2cMode() && unitPriceLabel ? unitPriceLabel : t("product.card.requestQuote")}
                    <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    )
}
