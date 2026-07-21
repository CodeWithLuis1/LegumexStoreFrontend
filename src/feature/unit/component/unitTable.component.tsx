import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getUnitsAPI } from "@/feature/unit/api/unit.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function UnitTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const unitsQuery = useQuery({
        queryKey: ["units"],
        queryFn: getUnitsAPI,
    })

    if (unitsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (unitsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const units = unitsQuery.data?.data ?? []
    const filteredUnits = units.filter((unit) => unit.displayName.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("unit.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("unit.form.unitCode")}</Th>
                            <Th>{t("unit.form.displayName")}</Th>
                            <Th>{t("unit.form.unitType")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUnits.map((unit) => (
                            <TableRow key={unit.id}>
                                <Td>{unit.unitCode}</Td>
                                <Td>{unit.displayName}</Td>
                                <Td>{t(`unit.form.unitTypeOptions.${unit.unitType}`)}</Td>
                                <Td>
                                    <Link
                                        to={`/units/${unit.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredUnits.length === 0 && <TableEmpty message={t("unit.table.empty")} colSpan={4} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
