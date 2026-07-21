import { NavLink } from "react-router-dom"
import { Blocks, Carrot, FolderTree, Ruler, Shapes, Tags } from "lucide-react"
import { useTranslation } from "react-i18next"

const NAV_ITEMS = [
    { url: "/categories", labelKey: "category.list.title", icon: FolderTree },
    { url: "/product-types", labelKey: "productType.list.title", icon: Shapes },
    { url: "/attributes", labelKey: "attribute.list.title", icon: Tags },
    { url: "/units", labelKey: "unit.list.title", icon: Ruler },
    { url: "/ingredients", labelKey: "ingredient.list.title", icon: Carrot },
    { url: "/addins", labelKey: "addin.list.title", icon: Blocks },
]

export function Navigation() {
    const { t } = useTranslation()

    return (
        <nav className="space-y-1 px-3">
            {NAV_ITEMS.map(({ url, labelKey, icon: Icon }) => (
                <NavLink
                    key={url}
                    to={url}
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition ${
                            isActive ? "bg-verde-tinta text-dorado" : "text-crema/80 hover:bg-verde-tinta hover:text-crema"
                        }`
                    }
                >
                    <Icon size={18} />
                    {t(labelKey)}
                </NavLink>
            ))}
        </nav>
    )
}
