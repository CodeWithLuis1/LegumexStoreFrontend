import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getCategoriesAPI } from "@/feature/category/api/category.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function CategoryTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesAPI,
    })

    if (categoriesQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (categoriesQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const categories = categoriesQuery.data?.data ?? []
    const filteredCategories = categories.filter((category) =>
        category.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("category.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("category.form.displayName")}</Th>
                            <Th>{t("category.form.urlSlug")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.map((category) => (
                            <TableRow key={category.id}>
                                <Td>{category.displayName}</Td>
                                <Td>{category.urlSlug}</Td>
                                <Td>
                                    <Link
                                        to={`/categories/${category.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredCategories.length === 0 && (
                            <TableEmpty message={t("category.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
