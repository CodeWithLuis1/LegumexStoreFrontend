import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getSubCategoriesAPI } from "@/feature/category/api/subCategory.api"
import { Select } from "@/shared/component/select.component"

type SubCategorySelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const SubCategorySelect = forwardRef<HTMLSelectElement, SubCategorySelectProps>(function SubCategorySelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const subCategoriesQuery = useQuery({ queryKey: ["subCategories"], queryFn: getSubCategoriesAPI })
    const subCategories = subCategoriesQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.displayName}
                </option>
            ))}
        </Select>
    )
})
