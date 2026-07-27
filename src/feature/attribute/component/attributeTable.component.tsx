import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAttributesAPI } from "@/feature/attribute/api/attribute.api"
import { Input } from "@/shared/component/input.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"

export function AttributeTable() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")

    const attributesQuery = useQuery({
        queryKey: ["attributes"],
        queryFn: getAttributesAPI,
    })

    if (attributesQuery.isLoading) return <p className="text-texto-suave">{t("common.loading")}</p>
    if (attributesQuery.isError) return <p className="text-error-fg">{t("common.loadError")}</p>

    const attributes = attributesQuery.data?.data ?? []
    const filteredAttributes = attributes.filter((attribute) =>
        attribute.attributeName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("attribute.table.searchPlaceholder")}
                className="mb-4 max-w-sm"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("attribute.form.attributeName")}</Th>
                            <Th>{t("attribute.form.dataType")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAttributes.map((attribute) => (
                            <TableRow key={attribute.id}>
                                <Td>{attribute.attributeName}</Td>
                                <Td>{t(`attribute.form.dataTypeOptions.${attribute.dataType}`)}</Td>
                                <Td>
                                    <Link
                                        to={`/admin/attributes/${attribute.id}/edit`}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </Link>
                                </Td>
                            </TableRow>
                        ))}
                        {filteredAttributes.length === 0 && (
                            <TableEmpty message={t("attribute.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
