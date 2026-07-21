import { X } from "lucide-react"
import { Navigation } from "@/shared/layout/Navigation"

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && <div className="fixed inset-0 z-40 bg-verde-profundo/40 lg:hidden" onClick={onClose} />}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-verde-profundo transition-transform duration-200 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-16 items-center justify-between px-6">
                    <span className="text-lg font-semibold text-crema">Legumex</span>
                    <button onClick={onClose} className="text-crema lg:hidden" type="button">
                        <X size={20} />
                    </button>
                </div>
                <Navigation />
            </aside>
        </>
    )
}
