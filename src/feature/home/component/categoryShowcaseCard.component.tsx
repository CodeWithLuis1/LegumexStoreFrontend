import { Link } from "react-router-dom"
import { Sprout } from "lucide-react"

type CategoryShowcaseCardProps = {
    categoryUrl: string
    tintClassName: string
    title: string
}

export function CategoryShowcaseCard({ categoryUrl, tintClassName, title }: CategoryShowcaseCardProps) {
    return (
        <Link
            to={categoryUrl}
            className={`group flex aspect-4/3 flex-col justify-end overflow-hidden rounded-card p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover ${tintClassName}`}
        >
            <Sprout size={32} strokeWidth={1.25} className="mb-auto text-verde-profundo/30" />
            <h3 className="font-display text-xl leading-none font-extrabold uppercase tracking-[-0.02em] text-verde-profundo">
                {title}
            </h3>
        </Link>
    )
}
