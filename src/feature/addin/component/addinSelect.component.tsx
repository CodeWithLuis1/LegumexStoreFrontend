import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getAddinsAPI } from "@/feature/addin/api/addin.api"
import { Select } from "@/shared/component/select.component"

type AddinSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const AddinSelect = forwardRef<HTMLSelectElement, AddinSelectProps>(function AddinSelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const addinsQuery = useQuery({ queryKey: ["addins"], queryFn: getAddinsAPI })
    const addins = addinsQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {addins.map((addin) => (
                <option key={addin.id} value={addin.id}>
                    {addin.displayName}
                </option>
            ))}
        </Select>
    )
})
