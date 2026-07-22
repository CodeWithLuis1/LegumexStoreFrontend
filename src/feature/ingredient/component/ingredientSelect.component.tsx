import { forwardRef } from "react"
import type { SelectHTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getIngredientsAPI } from "@/feature/ingredient/api/ingredient.api"
import { Select } from "@/shared/component/select.component"

type IngredientSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean
}

export const IngredientSelect = forwardRef<HTMLSelectElement, IngredientSelectProps>(function IngredientSelect(
    { hasError, ...props },
    ref
) {
    const { t } = useTranslation()
    const ingredientsQuery = useQuery({ queryKey: ["ingredients"], queryFn: getIngredientsAPI })
    const ingredients = ingredientsQuery.data?.data ?? []

    return (
        <Select ref={ref} hasError={hasError} defaultValue="" {...props}>
            <option value="">{t("common.selectPlaceholder")}</option>
            {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.displayName}
                </option>
            ))}
        </Select>
    )
})
