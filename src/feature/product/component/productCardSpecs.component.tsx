type ProductCardSpecsProps = {
    caliber: string
    cutType: string
}

export function ProductCardSpecs({ caliber, cutType }: ProductCardSpecsProps) {
    return (
        <div className="border-b border-gris-campo bg-gris-campo/60 px-4 py-2">
            <p className="truncate font-mono text-[13px] uppercase tracking-wide text-texto-suave">
                {caliber} · {cutType}
            </p>
        </div>
    )
}
