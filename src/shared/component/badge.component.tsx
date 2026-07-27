import type { HTMLAttributes } from "react"

type BadgeTone = "new" | "season" | "bestseller"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    tone: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
    new: "bg-brote",
    season: "bg-cat-mini",
    bestseller: "bg-dorado",
}

export function Badge({ tone, className = "", ...props }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-chip px-2 py-1 font-mono text-xs uppercase tracking-wide text-verde-profundo ${toneClasses[tone]} ${className}`}
            {...props}
        />
    )
}
