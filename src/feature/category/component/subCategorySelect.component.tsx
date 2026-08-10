import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getSubCategoriesAPI } from "@/feature/category/api/subCategory.api"
import { SearchableSelect } from "@/shared/component/searchableSelect.component"
import type { SearchableSelectOption } from "@/shared/component/searchableSelect.component"

type SubCategorySelectProps = {
    inputId?: string
    hasError?: boolean
    value: number | undefined
    onChange: (value: number | undefined) => void
}

// Select con búsqueda (react-select) en vez del <select> nativo: la lista de subcategorías
// crece con el catálogo y escribir para filtrar es más rápido que scrollear un dropdown.
// Controlado (value/onChange) porque react-select no se puede spread-conectar con
// register() de react-hook-form -- el padre debe envolverlo en un <Controller>.
export function SubCategorySelect({ inputId, hasError, value, onChange }: SubCategorySelectProps) {
    const { t } = useTranslation()
    const subCategoriesQuery = useQuery({ queryKey: ["subCategories"], queryFn: getSubCategoriesAPI })

    const options: SearchableSelectOption[] = (subCategoriesQuery.data?.data ?? []).map((subCategory) => ({
        value: subCategory.id,
        label: subCategory.displayName,
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
