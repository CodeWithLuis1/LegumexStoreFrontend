import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { IngredientTable } from "@/feature/ingredient/component/ingredientTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function IngredientListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("ingredient.list.title")}</h1>
                <Link to="/ingredients/create" className={buttonClassName("primary")}>
                    {t("ingredient.list.createLink")}
                </Link>
            </div>
            <IngredientTable />
        </PageContainer>
    )
}
