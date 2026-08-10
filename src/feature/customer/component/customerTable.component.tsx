import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getCustomersAPI } from "@/feature/customer/api/customer.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function CustomerTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const customersQuery = useQuery({
        queryKey: ["customers"],
        queryFn: getCustomersAPI,
        retry: false,
    })

    if (customersQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (customersQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const customers = customersQuery.data?.data ?? []
    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("customer.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("customer.form.name")}</Th>
                            <Th>{t("customer.form.companyName")}</Th>
                            <Th>{t("customer.form.email")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                                <Td>{customer.name}</Td>
                                <Td>{customer.companyName ?? "-"}</Td>
                                <Td>{customer.email}</Td>
                                <Td>
                                    {hasPermission("customers:edit") && (
                                        <Link
                                            to={`/admin/customers/${customer.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredCustomers.length === 0 && <TableEmpty message={t("customer.table.empty")} colSpan={4} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
