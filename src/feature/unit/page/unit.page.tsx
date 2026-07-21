import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { UnitTable } from "@/feature/unit/component/unitTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function UnitListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("unit.list.title")}</h1>
                <Link to="/units/create" className={buttonClassName("primary")}>
                    {t("unit.list.createLink")}
                </Link>
            </div>
            <UnitTable />
        </PageContainer>
    )
}
