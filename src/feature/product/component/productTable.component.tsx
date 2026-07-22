import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getProductsAPI } from "@/feature/product/api/product.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function ProductTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: getProductsAPI,
    })

    if (productsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (productsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const products = productsQuery.data?.data ?? []
    const filteredProducts = products.filter((product) =>
        product.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("product.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("product.form.displayName")}</Th>
                            <Th>{t("product.form.urlSlug")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <Td>{product.displayName}</Td>
                                <Td>{product.urlSlug}</Td>
                                <Td>
                                    <Link
                                        to={`/products/${product.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredProducts.length === 0 && (
                            <TableEmpty message={t("product.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
