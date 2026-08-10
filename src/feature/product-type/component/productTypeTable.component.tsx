import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getProductTypesAPI } from "@/feature/product-type/api/productType.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function ProductTypeTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const productTypesQuery = useQuery({
        queryKey: ["productTypes"],
        queryFn: getProductTypesAPI,
        retry: false,
    })

    if (productTypesQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (productTypesQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const productTypes = productTypesQuery.data?.data ?? []
    const filteredProductTypes = productTypes.filter((productType) =>
        productType.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("productType.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("productType.form.typeCode")}</Th>
                            <Th>{t("productType.form.displayName")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProductTypes.map((productType) => (
                            <TableRow key={productType.id}>
                                <Td>{productType.typeCode}</Td>
                                <Td>{productType.displayName}</Td>
                                <Td>
                                    {hasPermission("productTypes:edit") && (
                                        <Link
                                            to={`/admin/product-types/${productType.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredProductTypes.length === 0 && (
                            <TableEmpty message={t("productType.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
