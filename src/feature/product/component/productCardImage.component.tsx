import { Leaf } from "lucide-react"
import { Badge } from "@/shared/component/badge.component"
import type { ProductBadgeTone } from "@/feature/product/component/productCard.component"

type ProductCardImageProps = {
    imageUrl?: string
    productName: string
    tintClassName: string
    badgeTone?: ProductBadgeTone
    badgeLabel?: string
}

export function ProductCardImage({ imageUrl, productName, tintClassName, badgeTone, badgeLabel }: ProductCardImageProps) {
    return (
        <div className={`relative aspect-square w-full overflow-hidden rounded-t-card ${tintClassName}`}>
            {badgeTone && badgeLabel && <Badge tone={badgeTone} className="absolute top-3 left-3">{badgeLabel}</Badge>}

            {imageUrl ? (
                <img src={imageUrl} alt={productName} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-verde-profundo/25">
                    <Leaf size={56} strokeWidth={1.25} />
                </div>
            )}
        </div>
    )
}
