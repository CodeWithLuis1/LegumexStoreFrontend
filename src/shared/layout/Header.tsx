import { Menu } from "lucide-react"

type HeaderProps = {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b border-gris-campo bg-hueso px-6">
            <button onClick={onMenuClick} className="mr-auto text-verde-profundo lg:hidden" type="button">
                <Menu size={22} />
            </button>
        </header>
    )
}
