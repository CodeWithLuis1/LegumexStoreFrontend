import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AttributeTable } from "@/feature/attribute/component/attributeTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function AttributeListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("attribute.list.title")}</h1>
                <Link to="/attributes/create" className={buttonClassName("primary")}>
                    {t("attribute.list.createLink")}
                </Link>
            </div>
            <AttributeTable />
        </PageContainer>
    )
}
