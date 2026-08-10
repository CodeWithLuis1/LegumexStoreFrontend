import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getDestinationsAPI } from "@/feature/destination/api/destination.api"
import { usePermission } from "@/shared/auth/usePermission"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function DestinationTable() {
    const { t } = useTranslation()
    const { hasPermission } = usePermission()
    const [search, setSearch] = useState("")

    const destinationsQuery = useQuery({
        queryKey: ["destinations"],
        queryFn: getDestinationsAPI,
        retry: false,
    })

    if (destinationsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (destinationsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const destinations = destinationsQuery.data?.data ?? []
    const filteredDestinations = destinations.filter((destination) =>
        destination.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("destination.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("destination.form.displayName")}</Th>
                            <Th>{t("destination.form.baseCost")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDestinations.map((destination) => (
                            <TableRow key={destination.id}>
                                <Td>{destination.displayName}</Td>
                                <Td>{destination.baseCost}</Td>
                                <Td>
                                    {hasPermission("destinations:edit") && (
                                        <Link
                                            to={`/admin/destinations/${destination.id}/edit`}
                                            className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                        >
                                            {t("common.edit")}
                                        </Link>
                                    )}
                                </Td>
                            </TableRow>
                        ))}
                        {filteredDestinations.length === 0 && (
                            <TableEmpty message={t("destination.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
