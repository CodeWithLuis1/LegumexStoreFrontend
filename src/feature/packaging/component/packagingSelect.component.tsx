import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getPackagingsAPI } from "@/feature/packaging/api/packaging.api"
import { Select } from "@/shared/component/select.component"

type PackagingSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const PackagingSelect = forwardRef<HTMLSelectElement, PackagingSelectProps>(function PackagingSelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const packagingsQuery = useQuery({ queryKey: ["packagings"], queryFn: getPackagingsAPI })
    const packagings = packagingsQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {packagings.map((packaging) => (
                <option key={packaging.id} value={packaging.id}>
                    {packaging.displayName}
                </option>
            ))}
        </Select>
    )
})
