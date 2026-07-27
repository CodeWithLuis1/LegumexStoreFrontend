import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getSubCategoriesAPI } from "@/feature/category/api/subCategory.api"
import { getCategoriesAPI } from "@/feature/category/api/category.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function SubCategoryTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const subCategoriesQuery = useQuery({
        queryKey: ["subCategories"],
        queryFn: getSubCategoriesAPI,
    })
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesAPI,
    })

    if (subCategoriesQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (subCategoriesQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const subCategories = subCategoriesQuery.data?.data ?? []
    const categories = categoriesQuery.data?.data ?? []
    const categoryNameById = new Map(categories.map((category) => [category.id, category.displayName]))

    const filteredSubCategories = subCategories.filter((subCategory) =>
        subCategory.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("subCategory.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("subCategory.form.displayName")}</Th>
                            <Th>{t("subCategory.form.categoryId")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSubCategories.map((subCategory) => (
                            <TableRow key={subCategory.id}>
                                <Td>{subCategory.displayName}</Td>
                                <Td>{categoryNameById.get(subCategory.categoryId) ?? "-"}</Td>
                                <Td>
                                    <Link
                                        to={`/admin/sub-categories/${subCategory.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredSubCategories.length === 0 && (
                            <TableEmpty message={t("subCategory.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
