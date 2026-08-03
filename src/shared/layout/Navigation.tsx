import { NavLink } from "react-router-dom"
import { Blocks, Carrot, FolderTree, Layers, Package, PackageOpen, Ruler, Shapes, ShoppingBag, Tags, Users } from "lucide-react"
import { useTranslation } from "react-i18next"

const NAV_ITEMS = [
    { url: "/admin/products", labelKey: "product.list.title", icon: ShoppingBag },
    { url: "/admin/customers", labelKey: "customer.list.title", icon: Users },
    { url: "/admin/categories", labelKey: "category.list.title", icon: FolderTree },
    { url: "/admin/sub-categories", labelKey: "subCategory.list.title", icon: Layers },
    { url: "/admin/product-types", labelKey: "productType.list.title", icon: Shapes },
    { url: "/admin/attributes", labelKey: "attribute.list.title", icon: Tags },
    { url: "/admin/units", labelKey: "unit.list.title", icon: Ruler },
    { url: "/admin/ingredients", labelKey: "ingredient.list.title", icon: Carrot },
    { url: "/admin/addins", labelKey: "addin.list.title", icon: Blocks },
    { url: "/admin/packagings", labelKey: "packaging.list.title", icon: Package },
    { url: "/admin/presentations", labelKey: "presentation.list.title", icon: PackageOpen },
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
