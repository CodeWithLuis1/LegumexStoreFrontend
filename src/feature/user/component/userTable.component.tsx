import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getUsersAPI } from "@/feature/user/api/user.api"
import { getRolesAPI } from "@/feature/role/api/role.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function UserTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: getUsersAPI,
        retry: false,
    })
    const rolesQuery = useQuery({ queryKey: ["roles"], queryFn: getRolesAPI })
    const roleNameById = new Map((rolesQuery.data?.data ?? []).map((role) => [role.id, role.name]))

    if (usersQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (usersQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const users = usersQuery.data?.data ?? []
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("user.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("user.form.name")}</Th>
                            <Th>{t("user.form.username")}</Th>
                            <Th>{t("user.form.roleId")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <Td>{user.name}</Td>
                                <Td>{user.username}</Td>
                                <Td>{roleNameById.get(user.role_id) ?? "-"}</Td>
                                <Td>
                                    {hasPermission("users:edit") && (
                                        <Link
                                            to={`/admin/users/${user.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && <TableEmpty message={t("user.table.empty")} colSpan={4} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
