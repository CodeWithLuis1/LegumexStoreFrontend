import { LogOut, Menu } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/shared/auth/useAuth"
import { LanguageSwitch } from "@/shared/layout/LanguageSwitch"

type HeaderProps = {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { t } = useTranslation()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/admin/login", { replace: true })
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gris-campo bg-hueso px-6">
            <button onClick={onMenuClick} className="text-verde-profundo lg:hidden" type="button">
                <Menu size={22} />
            </button>

            <div className="ml-auto flex items-center gap-4">
                <LanguageSwitch />
                {user && <span className="text-sm font-medium text-verde-profundo">{user.name}</span>}
                <button
                    onClick={handleLogout}
                    type="button"
                    className="flex items-center gap-1.5 text-sm font-medium text-texto-suave transition hover:text-verde-profundo"
                >
                    <LogOut size={16} />
                    {t("common.logout")}
                </button>
            </div>
        </header>
    )
}
