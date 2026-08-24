import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { PackagingTable } from "@/feature/packaging/component/packagingTable.component"
import { usePermission } from "@/shared/auth/usePermission"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { buttonClassName } from "@/shared/component/buttonClassName"

export function PackagingListPage() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()

    return (
        <PageContainer wide>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("packaging.list.title")}</h1>
                {hasPermission("packagings:create") && (
                    <Link to="/admin/packagings/create" className={buttonClassName("primary")}>
                        {t("packaging.list.createLink")}
                    </Link>
                )}
            </div>
            <PackagingTable />
        </PageContainer>
    )
}
