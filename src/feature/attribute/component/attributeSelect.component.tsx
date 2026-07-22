import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getAttributesAPI } from "@/feature/attribute/api/attribute.api"
import { Select } from "@/shared/component/select.component"

type AttributeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const AttributeSelect = forwardRef<HTMLSelectElement, AttributeSelectProps>(function AttributeSelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const attributesQuery = useQuery({ queryKey: ["attributes"], queryFn: getAttributesAPI })
    const attributes = attributesQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {attributes.map((attribute) => (
                <option key={attribute.id} value={attribute.id}>
                    {attribute.attributeName}
                </option>
            ))}
        </Select>
    )
})
