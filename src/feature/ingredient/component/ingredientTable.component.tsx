import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getIngredientsAPI } from "@/feature/ingredient/api/ingredient.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function IngredientTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const ingredientsQuery = useQuery({
        queryKey: ["ingredients"],
        queryFn: getIngredientsAPI,
    })

    if (ingredientsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (ingredientsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const ingredients = ingredientsQuery.data?.data ?? []
    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("ingredient.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("ingredient.form.displayName")}</Th>
                            <Th>{t("ingredient.form.ingredientType")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIngredients.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                                <Td>{ingredient.displayName}</Td>
                                <Td>{t(`ingredient.form.ingredientTypeOptions.${ingredient.ingredientType}`)}</Td>
                                <Td>
                                    <Link
                                        to={`/ingredients/${ingredient.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredIngredients.length === 0 && (
                            <TableEmpty message={t("ingredient.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
