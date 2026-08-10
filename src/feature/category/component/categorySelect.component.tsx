import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getCategoriesAPI } from "@/feature/category/api/category.api"
import { SearchableSelect } from "@/shared/component/searchableSelect.component"
import type { SearchableSelectOption } from "@/shared/component/searchableSelect.component"

type CategorySelectProps = {
    inputId?: string
    hasError?: boolean
    value: number | undefined
    onChange: (value: number | undefined) => void
}

// Select con búsqueda (react-select) en vez del <select> nativo -- mismo motivo que
// SubCategorySelect: la lista crece con el catálogo. Controlado (value/onChange), el
// padre debe envolverlo en un <Controller> de react-hook-form.
export function CategorySelect({ inputId, hasError, value, onChange }: CategorySelectProps) {
    const { t } = useTranslation()
    const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategoriesAPI })

    const options: SearchableSelectOption[] = (categoriesQuery.data?.data ?? []).map((category) => ({
        value: category.id,
        label: category.displayName,
    }))

    return (
        <SearchableSelect
            inputId={inputId}
            hasError={hasError}
            options={options}
            placeholder={t("common.searchPlaceholder")}
            noOptionsMessage={() => t("common.noOptionsFound")}
            isClearable
            value={options.find((option) => option.value === value) ?? null}
            onChange={(selected) => onChange(selected?.value ?? undefined)}
        />
    )
}
