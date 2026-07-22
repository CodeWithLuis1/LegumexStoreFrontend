import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SubCategoryTable } from "@/feature/category/component/subCategoryTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function SubCategoryListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("subCategory.list.title")}</h1>
                <Link to="/sub-categories/create" className={buttonClassName("primary")}>
                    {t("subCategory.list.createLink")}
                </Link>
            </div>
            <SubCategoryTable />
        </PageContainer>
    )
}
