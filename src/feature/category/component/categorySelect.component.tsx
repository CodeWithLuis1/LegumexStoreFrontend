import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getCategoriesAPI } from "@/feature/category/api/category.api"
import { Select } from "@/shared/component/select.component"

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(function CategorySelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategoriesAPI })
    const categories = categoriesQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.displayName}
                </option>
            ))}
        </Select>
    )
})
