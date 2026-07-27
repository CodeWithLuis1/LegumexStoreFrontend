import { Link } from "react-router-dom"

type FooterLink = {
    label: string
    url: string
}

type FooterLinkColumnProps = {
    title: string
    links: FooterLink[]
}

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
    return (
        <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.06em] text-crema/60">{title}</h3>
            <ul className="mt-4 space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link to={link.url} className="text-sm text-crema/85 transition hover:text-dorado">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
