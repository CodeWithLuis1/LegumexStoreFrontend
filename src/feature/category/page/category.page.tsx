import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { CategoryTable } from "@/feature/category/component/categoryTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function CategoryListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("category.list.title")}</h1>
                <Link to="/admin/categories/create" className={buttonClassName("primary")}>
                    {t("category.list.createLink")}
                </Link>
            </div>
            <CategoryTable />
        </PageContainer>
    )
}
