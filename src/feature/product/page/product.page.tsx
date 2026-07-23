import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ProductTable } from "@/feature/product/component/productTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function ProductListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("product.list.title")}</h1>
                <Link to="/products/create" className={buttonClassName("primary")}>
                    {t("product.list.createLink")}
                </Link>
            </div>
            <ProductTable />
        </PageContainer>
    )
}
