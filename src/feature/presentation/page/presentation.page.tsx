import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { PresentationTable } from "@/feature/presentation/component/presentationTable.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/button.component"

export function PresentationListPage() {
    const { t } = useTranslation()

    return (
        <PageContainer className="max-w-4xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("presentation.list.title")}</h1>
                <Link to="/presentations/create" className={buttonClassName("primary")}>
                    {t("presentation.list.createLink")}
                </Link>
            </div>
            <PresentationTable />
        </PageContainer>
    )
}
