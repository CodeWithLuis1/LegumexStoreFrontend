import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAddinsAPI } from "@/feature/addin/api/addin.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function AddinTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const addinsQuery = useQuery({
        queryKey: ["addins"],
        queryFn: getAddinsAPI,
    })

    if (addinsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (addinsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const addins = addinsQuery.data?.data ?? []
    const filteredAddins = addins.filter((addin) =>
        addin.displayName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("addin.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("addin.form.displayName")}</Th>
                            <Th>{t("addin.form.costPerServing")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAddins.map((addin) => (
                            <TableRow key={addin.id}>
                                <Td>{addin.displayName}</Td>
                                <Td>{addin.costPerServing ?? "-"}</Td>
                                <Td>
                                    <Link to={`/addins/${addin.id}/edit`} className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta">
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredAddins.length === 0 && <TableEmpty message={t("addin.table.empty")} colSpan={3} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
