import type { LucideIcon } from "lucide-react"

type ColdChainCardProps = {
    tintClassName: string
    icon: LucideIcon
    title: string
    description: string
}

export function ColdChainCard({ tintClassName, icon: Icon, title, description }: ColdChainCardProps) {
    return (
        <div className={`flex flex-col gap-4 p-10 sm:p-14 ${tintClassName}`}>
            <Icon size={36} strokeWidth={1.25} className="text-verde-profundo" />
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-[-0.02em] text-verde-profundo">
                {title}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-verde-profundo">{description}</p>
        </div>
    )
}
