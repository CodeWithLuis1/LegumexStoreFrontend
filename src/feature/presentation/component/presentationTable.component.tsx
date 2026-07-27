import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getPresentationsAPI } from "@/feature/presentation/api/presentation.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function PresentationTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const presentationsQuery = useQuery({
        queryKey: ["presentations"],
        queryFn: getPresentationsAPI,
    })

    if (presentationsQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (presentationsQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const presentations = presentationsQuery.data?.data ?? []
    const filteredPresentations = presentations.filter((presentation) =>
        presentation.displayLabel.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("presentation.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("presentation.form.displayLabel")}</Th>
                            <Th>{t("presentation.form.netWeightGrams")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPresentations.map((presentation) => (
                            <TableRow key={presentation.id}>
                                <Td>{presentation.displayLabel}</Td>
                                <Td>{presentation.netWeightGrams ?? "-"}</Td>
                                <Td>
                                    <Link
                                        to={`/admin/presentations/${presentation.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredPresentations.length === 0 && (
                            <TableEmpty message={t("presentation.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
