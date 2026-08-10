import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getRolesAPI } from "@/feature/role/api/role.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function RoleTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const rolesQuery = useQuery({
        queryKey: ["roles"],
        queryFn: getRolesAPI,
        retry: false,
    })

    if (rolesQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (rolesQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const roles = rolesQuery.data?.data ?? []
    const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("role.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("role.form.name")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRoles.map((role) => (
                            <TableRow key={role.id}>
                                <Td>{role.name}</Td>
                                <Td>
                                    {hasPermission("roles:edit") && (
                                        <Link
                                            to={`/admin/roles/${role.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredRoles.length === 0 && <TableEmpty message={t("role.table.empty")} colSpan={2} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
