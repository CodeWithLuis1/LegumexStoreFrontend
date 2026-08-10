import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getPackagingsAPI } from "@/feature/packaging/api/packaging.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"
import { formatCurrency } from "@/shared/format/currency"

export function PackagingTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const packagingsQuery = useQuery({
        queryKey: ["packagings"],
        queryFn: getPackagingsAPI,
        retry: false,
    })

    if (packagingsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (packagingsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const packagings = packagingsQuery.data?.data ?? []
    const filteredPackagings = packagings.filter((packaging) =>
        packaging.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("packaging.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("packaging.form.displayName")}</Th>
                            <Th>{t("packaging.form.packagingRole")}</Th>
                            <Th>{t("packaging.form.unitCost")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPackagings.map((packaging) => (
                            <TableRow key={packaging.id}>
                                <Td>{packaging.displayName}</Td>
                                <Td>{t(`packaging.form.packagingRoleOptions.${packaging.packagingRole}`)}</Td>
                                <Td>{packaging.unitCost != null ? formatCurrency(Number(packaging.unitCost)) : "-"}</Td>
                                <Td>
                                    {hasPermission("packagings:edit") && (
                                        <Link
                                            to={`/admin/packagings/${packaging.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredPackagings.length === 0 && (
                            <TableEmpty message={t("packaging.table.empty")} colSpan={4} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
